using System.Linq;
using System.Threading.Tasks;
using System.Configuration;

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using Sinopac.Shioaji;

namespace DotnetReactShioaji.Controllers
{
    public class SJCls
    {
        private static Shioaji _api = new Shioaji();
        public void Login()
        {
            string jsonString = File.ReadAllText("Sinopac.json");
            JsonElement root = JsonDocument.Parse(jsonString).RootElement;
            _api.Login(root.GetProperty("API_Key").GetString(), root.GetProperty("Secret_Key").GetString());
            _api.ca_activate("Sinopac.pfx", root.GetProperty("ca_passwd").GetString(), root.GetProperty("person_id").GetString());
        }


        #region NavBar
        /// <summary>
        /// 
        /// </summary>
        /// <returns> [ 1526110, 0333511, 17508, -10, -0.06, 17519.14, -30.51, -0.17, 230.61, 1.17, 0.5 ] </returns>
        public List<string> TbarTseTxfOtc()
        {
            List<object> TbarList = new List<object>();
            SJList acct = _api.ListAccounts();
            TbarList.Add(acct[0].account_id);
            TbarList.Add(acct[1].account_id);

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


        #region 焦點股、當沖榜
        /// <summary>
        /// 
        /// </summary>
        /// <returns> 內外盤	股號	股名	漲幅	振幅	成交值 </returns>
        public SJList Snapshots()
        {
            List<string> tw50 = new List<string>(){
                "2330", "2454", "2317", "2412", "2382", "2881", "2308", "6505", "2882", "2303",
                "3711", "2886", "2891", "1303", "1301", "2002", "1216", "2884", "2207", "5880",
                "3008", "2892", "3045", "1326", "2357", "2885", "6669", "2395", "3034", "5871",
                "2880", "2603", "2345", "3231", "4904", "2912", "2301", "3037", "1101", "2327",
                "2890", "2379", "2408", "3661", "3443", "4938", "5876", "2887", "2883", "1590"
            };
            var tw50_otc10 = new List<IContract>();
            foreach (var i in tw50)
            {
                tw50_otc10.Add(_api.Contracts.Stocks["TSE"][i]);
            }
            foreach (var i in new List<string> { "6488", "8069", "3529", "5347", "5274", "6446", "5483", "8299", "3293", "4966" })
            {
                tw50_otc10.Add(_api.Contracts.Stocks["OTC"][i]);
            }
            return _api.Snapshots(tw50_otc10);
        }
        #endregion


        #region 成交值前20大
        /// <summary>
        /// 
        /// </summary>
        /// <returns> {"陽明" = [1.57, 2.79, -0.87, 1.22, 120], "台積電" : [-0.34, 0, -1.03, -0.69, 104], "..."=[...]} </returns>
        public List<Dictionary<string, List<object>>> AmountRank()
        {
            var Scanners_AmountRank = _api.Scanners(scannerType: ScannerType.AmountRank, date: DateTime.Now.ToString("yyyy-MM-dd"), count: 20);
            List<Dictionary<string, List<object>>> _AmountRanks = new List<Dictionary<string, List<object>>>();
            for (int i = 0; i < Scanners_AmountRank.ToArray().Length; i++)
            {
                Dictionary<string, List<object>> _AmountRank = new Dictionary<string, List<object>>();
                List<object> _temp = new List<object>();
                var _lastClose = Scanners_AmountRank[i].close - Scanners_AmountRank[i].change_price;
                // _temp.Add(Scanners_AmountRank[i].name);
                // _temp.Add(Math.Round(Scanners_AmountRank[i].change_price * 100 / _lastClose, 2));
                // _temp.Add(Scanners_AmountRank[i].tick_type == "1" ? "內":"外");
                _temp.Add(Math.Round(100 * (Scanners_AmountRank[i].open - _lastClose) / _lastClose, 2));
                _temp.Add(Math.Round(100 * (Scanners_AmountRank[i].high - _lastClose) / _lastClose, 2));
                _temp.Add(Math.Round(100 * (Scanners_AmountRank[i].low - _lastClose) / _lastClose, 2));
                _temp.Add(Math.Round(100 * (Scanners_AmountRank[i].close - _lastClose) / _lastClose, 2));
                _temp.Add(Scanners_AmountRank[i].total_amount / 100_000_000);
                _AmountRank.Add(Scanners_AmountRank[i].name, _temp);
                _AmountRanks.Add(_AmountRank);
            }
            return _AmountRanks;
        }

        #endregion


        #region 台指日內走勢，感覺TicksQueryType.LastCount 跟 TicksQueryType.RangeTime 都可以
        /// <summary>
        /// 
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        public object TicksLastCount(int num)
        {
            var TicksQuery = _api.Ticks(_api.Contracts.Futures["TXF"]["TXFR1"], DateTime.Now.ToString("yyyy-MM-dd"), TicksQueryType.LastCount, last_cnt: num);

            List<DateTimeOffset> generalTimes = new List<DateTimeOffset>();
            foreach (long timestamp in TicksQuery.ts)
            {
                DateTime dateTime = DateTimeOffset.FromUnixTimeMilliseconds(timestamp / 1000000).UtcDateTime;
                generalTimes.Add(new DateTimeOffset(dateTime, TimeSpan.Zero));
            }
            List<string> tsFormat = new List<string>();
            foreach (var i in generalTimes) tsFormat.Add(i.ToString("HH:mm:ss"));

            List<Dictionary<string, object>> combinedList = new List<Dictionary<string, object>>();
            for (int i = 0; i < tsFormat.ToArray().Length; i++)
            {
                Dictionary<string, object> dict = new Dictionary<string, object>();
                dict.Add(tsFormat[i], TicksQuery.close[i]);
                combinedList.Add(dict);
            }

            return combinedList;
        }


        public Ticks TicksRangeTime()
        {
            Ticks res = _api.Ticks(_api.Contracts.Futures["TXF"]["TXFR1"],
                DateTime.Now.ToString("yyyy-MM-dd"), TicksQueryType.RangeTime,
                time_start: "08:45:00", time_end: DateTime.Now.ToString("HH:mm:ss"));
            return res;
        }
        #endregion


        #region 複式單權利金
        /// <summary>
        /// 
        /// </summary>
        /// <param name="close"></param>
        /// <param name="OptionWeek"></param>
        /// <param name="YearMonth"></param>
        /// <returns> [ 107, 58, 146, 92 ] </returns>
        public List<double> OpPremium(double close, string OptionWeek, string YearMonth)
        {
            var strikeLower = Math.Floor(close / 50) * 50;
            var strikeUpper = strikeLower + 100;
            var res = _api.Snapshots(new List<IContract>() {
        _api.Contracts.Options[OptionWeek][OptionWeek + YearMonth + strikeLower + "C"],
        _api.Contracts.Options[OptionWeek][OptionWeek + YearMonth + strikeUpper + "C"],
        _api.Contracts.Options[OptionWeek][OptionWeek + YearMonth + strikeUpper + "P"],
        _api.Contracts.Options[OptionWeek][OptionWeek + YearMonth + strikeLower + "P"],
        });

            List<double> op = new List<double>();
            //op.Add(res[0].code);
            op.Add(res[0].sell_price);
            //op.Add(res[1].code);
            op.Add(res[1].buy_price);
            //op.Add(res[2].code);
            op.Add(res[2].sell_price);
            //op.Add(res[3].code);
            op.Add(res[3].buy_price);
            //return new List<object> {op[1], op[3], op[5], op[7],$"BCSC:{(double)op[1]-(double)op[3]}、BPSP: {(double)op[5]-(double)op[7]}" };
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
            //acct.Add(res.today_balance);
            acct.Add(res.equity);
            acct.Add(res.available_margin);
            acct.Add(res.risk_indicator);
            return acct;
        }
        #endregion


        #region 營收累計Yoy自選股，要寫在另一個TWSEOpenApi才對, 但Method跟傳出api都寫在一起很冗長

        #endregion


        //==================================================================================================
        [ApiController]//===================================================================================
        //==================================================================================================
        // TbarTseTxfOtc
        // 內外盤 股號 股名 漲幅 振幅 成交值
        // 股名 漲幅 月乖離
        // AmountRank  +AmountRank  
        // TicksRangeTime   TicksLastCount 
        // Snapshots
        // Margin
        // ChangePercentRank

        public class TbarTseTxfOtcController : ControllerBase
        {
            /// <summary>
            /// 
            /// </summary>
            /// <returns> {TXFR1 = [16700, 80, 0.45%], TWSE = [16784.12, 100.41, 0.67%], OTC = [268, 12.55, 0.68%], ACCT = ["02154", "06458"]} </returns>
            [HttpGet]
            public IActionResult Get()
            {
                var Res = new SJCls().TbarTseTxfOtc();
                return Ok(Res);
            }
        }


        //欠兩個


        [Route("api/[controller]")]
        public class AmountRankController : ControllerBase
        {
            /// <summary>
            /// 
            /// </summary>
            /// <returns> {name, open%, high%, low%, close%, vola%, code, total_amount} </returns>
            [HttpGet]
            public IActionResult Get() { return Ok(new SJCls().AmountRank(7)); }
        }


        [Route("api/[controller]")]
        public class ChangePercentRankController : ControllerBase
        {
            [HttpGet]
            public IActionResult Get() { return Ok(new SJCls().ChangePercentRank(7)); }
        }


        [Route("api/[controller]")]
        public class SnapshotsController : ControllerBase
        {
            [HttpGet]
            public IActionResult Get() { return Ok(new SJCls().Snapshots()); }
        }


        [Route("api/[controller]")]
        public class TicksLastCountController : ControllerBase
        {
            [HttpGet]
            public IActionResult Get() { return Ok(new SJCls().TicksLastCount(10)); }
        }

        [Route("api/[controller]")]
        public class TicksRangeTimeController : ControllerBase
        {
            [HttpGet]
            public IActionResult Get() { return Ok(new SJCls().TicksRangeTime()); }
        }


        [Route("api/[controller]")]
        public class KbarsController : ControllerBase
        {
            [HttpGet]
            public IActionResult Get() { return Ok(new SJCls().Kline(1)); }
        }


        [Route("api/[controller]")]
        public class MarginController : ControllerBase
        {
            [HttpGet]
            public IActionResult Get() { return Ok(new SJCls().Margin()); }
        }
    }
}
