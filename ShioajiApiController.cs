using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Text.Json;
using Sinopac.Shioaji;

namespace ShioajiBackend.Controllers
{
    public class SJCls
    {
        #region 登入沒事不會改
        private static Shioaji _api = new Shioaji();

        public void Login()
        {
            string jsonString = File.ReadAllText("Sinopac.json");
            JsonElement root = JsonDocument.Parse(jsonString).RootElement;
            _api.Login(root.GetProperty("API_Key").GetString(), root.GetProperty("Secret_Key").GetString());
            _api.ca_activate("Sinopac.pfx", root.GetProperty("ca_passwd").GetString(), root.GetProperty("person_id").GetString());
        }
        #endregion


        #region NavBar
        public List<string> TbarTseTxfOtc()
        {
            List<object> TbarList = new List<object>();
            SJList acct = _api.ListAccounts();
            TbarList.Add(acct[0].account_id.Substring(4, 3));
            TbarList.Add(acct[1].account_id.Substring(4, 3));

            SJList res = _api.Snapshots(new List<IContract>() {
                _api.Contracts.Futures["TXF"]["TXFR1"],
                _api.Contracts.Indexs["TSE"]["001"],
                _api.Contracts.Indexs["OTC"]["101"]
                });

            foreach (var i in res)
            {
                TbarList.Add(i.close.ToString());
                TbarList.Add(i.change_price.ToString());
                TbarList.Add(i.change_rate.ToString());
            }
            return TbarList.OfType<string>().ToList();
        }
        #endregion


        #region ?熱門榜

        #endregion


        #region ?乖離榜

        #endregion


        #region 成交值前20大 K棒速覽
        /// <summary>
        /// 指定return的型別 ❤字典<字,[物件]>>❤ 多檔也不必再額外用List多包一層
        /// </summary>
        /// <returns> 
        /// {"陽明" = [1.57, 2.79, -0.87, 1.22, 120], "台積電" : [-0.34, 0, -1.03, -0.69, 104], "..."=[...]} 
        /// </returns>
        public Dictionary<string, List<double>> AmountRank()
        {
            string yyyyMMdd = "";
            if (DateTime.Now.TimeOfDay >= new TimeSpan(0, 0, 0) && DateTime.Now.TimeOfDay <= new TimeSpan(8, 59, 59))
            { yyyyMMdd = DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd"); }
            else { yyyyMMdd = DateTime.Today.ToString("yyyy-MM-dd"); }

            var Scanners_AmountRank = _api.Scanners(scannerType: ScannerType.AmountRank, date: yyyyMMdd, count: 20);
            Dictionary<string, List<double>> _AmountRanks = new Dictionary<string, List<double>>();
            for (int i = 0; i < Scanners_AmountRank.ToArray().Length; i++)
            {
                List<double> _temp = new List<double>();
                var _lastClose = Scanners_AmountRank[i].close - Scanners_AmountRank[i].change_price;
                _temp.Add(Math.Round(100 * (Scanners_AmountRank[i].open - _lastClose) / _lastClose, 2));
                _temp.Add(Math.Round(100 * (Scanners_AmountRank[i].high - _lastClose) / _lastClose, 2));
                _temp.Add(Math.Round(100 * (Scanners_AmountRank[i].low - _lastClose) / _lastClose, 2));
                _temp.Add(Math.Round(100 * (Scanners_AmountRank[i].close - _lastClose) / _lastClose, 2));
                _temp.Add(Math.Round(Scanners_AmountRank[i].total_amount / 100_000_000d, 0));
                _AmountRanks.Add(Scanners_AmountRank[i].name, _temp);
                //else
                //{
                //    _temp.Add(Scanners_AmountRank[i].name);
                //    _temp.Add(Math.Round(Scanners_AmountRank[i].change_price * 100 / _lastClose, 2));
                //    _temp.Add(Scanners_AmountRank[i].tick_type == "1" ? "內" : "外");
                //    _temp.Add(Scanners_AmountRank[i].total_amount / 100_000_000);
                //    _AmountRanks.Add(Scanners_AmountRank[i].code, _temp);
                //}
            }
            return _AmountRanks;
        }
        #endregion


        #region 權值前20
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public Dictionary<string, List<object>> BlueChips()
        {
            var _tw20 = new List<IContract>();
            foreach (var i in new List<string> {
                "2330", "2454", "2317", "2412", "2382", "2881", "2308", "6505", "2882", "2303",
                "3711", "2886", "2891", "1303", "1301", "2002", "1216", "2884", "2207", "5880",
            })
            {
                _tw20.Add(_api.Contracts.Stocks["TSE"][i]);
            }

            foreach (var i in new List<string> {
                "6488", "8069", "3529", "5347", "5274", "6446", "5483", "8299", "3293", "4966"
            })
            {
                _tw20.Add(_api.Contracts.Stocks["OTC"][i]);
            }

            var src = _api.Snapshots(_tw20);
            Dictionary<string, List<object>> _BlueChips = new Dictionary<string, List<object>>();
            for (int i = 0; i < src.ToArray().Length; i++)
            {
                List<object> _temp = new List<object>();
                _temp.Add(src[i].change_rate);
                _temp.Add(Math.Round(src[i].total_amount / 100_000_000d, 2)); 
                _temp.Add(src[i].tick_type);
                _BlueChips.Add(src[i].code, _temp);
            }
            return _BlueChips.OrderByDescending(x => x.Key).ToDictionary(entry => entry.Key, entry => entry.Value);
        }
        #endregion


        #region 台指期1分K沒寫完，不曉得OHLC跟TS分兩個變數，react畫圖套件能識別嗎？
        public dynamic TXFR1Chart(string bgn, string end)
        {
            var KBarChart = _api.Kbars(_api.Contracts.Futures["TXF"]["TXFR1"], "2024-01-05", "2024-01-05");
            long[] ts = KBarChart.ts.ToArray();
            DateTime[] dateTimes = Array.ConvertAll(ts, x => new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddTicks(x / 100));
            return null;
        }
        #endregion


        #region 台指期最近逐筆明細
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public Dictionary<string, double> TicksLastCount()
        {
            //Ticks TicksQuery = new Ticks();
            Ticks TicksQuery = _api.Ticks(_api.Contracts.Futures["TXF"]["TXFR1"],
                //DateTimeOffset.FromUnixTimeMilliseconds(
                //    _api.Snapshots(new List<IContract>() { _api.Contracts.Futures["TXF"]["TXFR1"] })[0].ts
                //    / 1000000).UtcDateTime.ToString("yyyy-MM-dd")
                "2024-01-09",
                TicksQueryType.LastCount, last_cnt: 120);

            List<DateTimeOffset> generalTimes = new List<DateTimeOffset>();
            foreach (long timestamp in TicksQuery.ts)
            {
                DateTime dateTime = DateTimeOffset.FromUnixTimeMilliseconds(timestamp / 1000000).UtcDateTime;
                generalTimes.Add(new DateTimeOffset(dateTime, TimeSpan.Zero));
            }

            List<string> tsFormat = new List<string>();
            foreach (var i in generalTimes) tsFormat.Add(i.ToString("HH:mm:ss"));

            Dictionary<string, double> combinedList = new Dictionary<string, double>();
            for (int i = 0; i < tsFormat.ToArray().Length; i++)
            {
                if (combinedList.ContainsKey(tsFormat[i])) { combinedList[tsFormat[i]] = TicksQuery.close[i]; }
                else { combinedList.Add(tsFormat[i], TicksQuery.close[i]); }
            }
            return combinedList.OrderByDescending(x => x.Key).ToDictionary(entry => entry.Key, entry => entry.Value);
        }
        #endregion


        #region 複式單權利金
        /// <summary>
        /// 
        /// </summary>
        /// <param name="close"></param>
        /// <param name="OptionWeek"></param>
        /// <param name="YearMonth"></param>
        /// <returns> [ 17500, 17600, 107, 58, 146, 92 ] </returns>
        public List<object> OpPremium(string OptionWeek, string YearMonth)
        {
            double close = _api.Snapshots(new List<IContract>() { _api.Contracts.Futures["TXF"]["TXFR1"] })[0].close;
            var strikeLower = Math.Floor(close / 50) * 50;
            var strikeUpper = strikeLower + 100;
            var res = _api.Snapshots(new List<IContract>() {
                _api.Contracts.Options[OptionWeek][OptionWeek + YearMonth + strikeLower + "C"],
                _api.Contracts.Options[OptionWeek][OptionWeek + YearMonth + strikeUpper + "C"],
                _api.Contracts.Options[OptionWeek][OptionWeek + YearMonth + strikeUpper + "P"],
                _api.Contracts.Options[OptionWeek][OptionWeek + YearMonth + strikeLower + "P"],
                });
            List<object> op = new List<object>();
            op.Add(res[0].code.Substring(3, 5));
            op.Add(res[1].code.Substring(3, 5));
            op.Add(res[0].sell_price);
            op.Add(res[1].buy_price);
            op.Add(res[2].sell_price);
            op.Add(res[3].buy_price);
            //op.Add(res[2].code);
            //op.Add(res[3].code);
            return op;
        }
        #endregion


        #region 庫存與權益數
        /// <summary>
        /// 
        /// </summary>
        /// <returns> [權益數, 可動用保證金, 風險指標] </returns>
        public List<decimal> Margin()
        {
            var res = _api.Margin();
            List<decimal> acct = new List<decimal>();
            acct.Add(res.equity);
            acct.Add(res.available_margin);
            acct.Add(res.risk_indicator);
            return acct;
        }
        #endregion


        #region ?營收棒棒榜

        #endregion

    }
    //==================================================================================================
    [ApiController]//===================================================================================
    //==================================================================================================

    [Route("api/[controller]")]
    public class TbarTseTxfOtcController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() { return Ok(new SJCls().TbarTseTxfOtc()); }
    }


    //?
    //?


    [Route("api/[controller]")]
    public class AmountRankChartsController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() { return Ok(new SJCls().AmountRank()); }
    }


    [Route("api/[controller]")]
    public class BlueChipsController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            // 但用linq後就會從{ "1216": [ 0.41, "Sell", 4.87 ], "?": [?,?,?]} 變["1216": [ 0.41, "Sell", 4.87 ], "?": [?,?,?]]
            //.OrderByDescending(x => x.Value[1])
            return Ok(new SJCls().BlueChips());
        }
    }


    //沒做完沒做完沒做完沒做完沒做完沒做完沒做完沒做完沒做完沒做完沒做完沒做完沒做完沒做完沒做完沒做完沒做完沒做完沒做完沒做完沒做完
    [Route("api/[controller]")]
    public class TXFR1ChartController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() { return Ok(new SJCls().TXFR1Chart("2024-01-08", "2024-01-09")); }
    }


    [Route("api/[controller]")]
    public class TicksLastCountController : ControllerBase
    {
        [HttpGet]
        //DateTime.Today.ToString("yyyy-MM-dd")
        public IActionResult Get() { return Ok(new SJCls().TicksLastCount()); }
    }



    [Route("api/[controller]")]
    public class OpPremiumController : ControllerBase
    {

        [HttpGet]
        public IActionResult Get() { return Ok(new SJCls().OpPremium("TX2", "202401")); }
    }


    [Route("api/[controller]")]
    public class MarginController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() { return Ok(new SJCls().Margin()); }
    }


    // ?
}
