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
        public Dictionary<string, List<object>> ListAccountsSnapshots_NavBar()
        {
            SJList acct = _api.ListAccounts();
            SJList res = _api.Snapshots(new List<IContract>() {
                _api.Contracts.Futures["TXF"]["TXFR1"],
                _api.Contracts.Indexs["TSE"]["001"],
                _api.Contracts.Indexs["OTC"]["101"]
                });

            Dictionary<string, List<object>> combinedList = new Dictionary<string, List<object>>();
            List<object> _temp = new List<object>();
            _temp.Add(acct[0].account_id.Substring(4, 3));
            _temp.Add(acct[1].account_id.Substring(4, 3));
            combinedList.Add("Acct", _temp);

            foreach (var i in res)
            {
                List<object> _temp1 = new List<object>();
                _temp1.Add(i.close.ToString());
                _temp1.Add(i.change_price.ToString());
                _temp1.Add(i.change_rate.ToString());
                combinedList.Add(i.exchange, _temp1);
            }
            return combinedList;
            //return TbarList.OfType<object>().ToList();
        }
        #endregion


        #region 成交值前20大 K棒速覽
        public Dictionary<string, List<double>> ScannersAmountRank()
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
            }
            return _AmountRanks;
        }
        #endregion


        #region K棒1分K
        //public object Kbars_Chart()
        public Dictionary<DateTime, List<double>> Kbars_Chart()
        {
            string bgn = "";
            string end = "";
            if (DateTime.Now.TimeOfDay >= new TimeSpan(15, 0, 0) && DateTime.Now.TimeOfDay <= new TimeSpan(23, 59, 59))
            { end = DateTime.Now.AddDays(+1).ToString("yyyy-MM-dd"); }
            else { end = DateTime.Now.ToString("yyyy-MM-dd"); }
            bgn = DateTime.Now.ToString("yyyy-MM-dd");
            object KBarChart = _api.Kbars(_api.Contracts.Futures["TXF"]["TXFR1"], bgn, end);
            var res = KBarChart.ToDict();

            long[] ts = res["ts"].ToArray();
            DateTime[] dateTimes = Array.ConvertAll(ts, x => new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddTicks(x / 100));

            Dictionary<DateTime, List<double>> combinedList = new Dictionary<DateTime, List<double>>();
            for (int i = 0; i < dateTimes.Length; i++)
            {
                List<double> _temp = new List<double>();
                _temp.Add(res["Open"][i]);
                _temp.Add(res["High"][i]);
                _temp.Add(res["Low"][i]);
                _temp.Add(res["Close"][i]);
                combinedList.Add(dateTimes[i], _temp);
            }
            return combinedList.TakeLast(60).ToDictionary(x => x.Key, x => x.Value);
        }
        #endregion


        #region 逐筆明細
        public Dictionary<string, double> TicksLastCount()
        {
            string yyyyMMdd = "";
            if (DateTime.Now.TimeOfDay >= new TimeSpan(15, 0, 0) && DateTime.Now.TimeOfDay <= new TimeSpan(23, 59, 59))
            { yyyyMMdd = DateTime.Now.AddDays(+1).ToString("yyyy-MM-dd"); }
            else { yyyyMMdd = DateTime.Now.ToString("yyyy-MM-dd"); }

            Ticks TicksQuery = _api.Ticks(_api.Contracts.Futures["TXF"]["TXFR1"], yyyyMMdd, TicksQueryType.LastCount, last_cnt: 60);
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
            return combinedList.OrderByDescending(x => x.Key).ToDictionary(x => x.Key, x => x.Value);
        }
        #endregion


        #region 選擇權複式組合單
        public Dictionary<string, List<object>> Snapshots_OpPremium(string OptionWeek, string yyyyMM)
        {
            Dictionary<string, List<object>> combinedList = new Dictionary<string, List<object>>();
            double close = _api.Snapshots(new List<IContract>() { _api.Contracts.Futures["TXF"]["TXFR1"] })[0].close;
            var strikeLower = Math.Floor(close / 50) * 50;
            var strikeUpper = strikeLower + 100;
            var res = _api.Snapshots(new List<IContract>() {
            _api.Contracts.Options[OptionWeek][OptionWeek + yyyyMM + strikeLower + "C"],
            _api.Contracts.Options[OptionWeek][OptionWeek + yyyyMM + strikeUpper + "C"],
            _api.Contracts.Options[OptionWeek][OptionWeek + yyyyMM + strikeUpper + "P"],
            _api.Contracts.Options[OptionWeek][OptionWeek + yyyyMM + strikeLower + "P"],
            });

            List<object> _temp = new List<object>();
            _temp.Add(res[0].code.Substring(3, 5));
            _temp.Add(res[1].code.Substring(3, 5));
            combinedList.Add("strike", _temp);

            List<object> _temp1 = new List<object>();
            _temp1.Add(res[0].sell_price);
            _temp1.Add(res[1].buy_price);
            _temp1.Add(res[2].sell_price);
            _temp1.Add(res[3].buy_price);
            combinedList.Add("premium", _temp1);

            return combinedList;
        }
        #endregion


        #region 權益數與庫存
        public Dictionary<string, List<object>> MarginListPositions()
        {
            Dictionary<string, List<object>> combinedList = new Dictionary<string, List<object>>();

            var _tempM = _api.Margin();
            List<object> _temp = new List<object>();
            _temp.Add(_tempM.equity_amount);
            _temp.Add(_tempM.available_margin);
            combinedList.Add("Margin", _temp);

            var _tempL = _api.ListPositions(_api.FutureAccount);
            List<object> _temp1 = new List<object>();
            foreach (var i in _tempL)
            {
                _temp1.Add(i.code.Substring(3, 5));
                _temp1.Add(i.price);
            }
            combinedList.Add("ListPositions", _temp1);
            return combinedList;
        }
        #endregion


        #region 權值前20+10
        public Dictionary<string, List<object>> Snapshots_BlueChips()
        {
            var BlueChipsList = new List<IContract>();
            foreach (var i in new List<string> {
                "2330", "2454", "2317", "2412", "2382", "2881", "2308", "6505", "2882", "2303",
                "3711", "2886", "2891", "1303", "1301", "2002", "1216", "2884", "2207", "5880",
            }) { BlueChipsList.Add(_api.Contracts.Stocks["TSE"][i]); }

            foreach (var i in new List<string> {
                "6488", "8069", "3529", "5347", "5274", "6446", "5483", "8299", "3293", "4966"
            }) { BlueChipsList.Add(_api.Contracts.Stocks["OTC"][i]); }

            var src = _api.Snapshots(BlueChipsList);
            Dictionary<string, List<object>> _BlueChipsList = new Dictionary<string, List<object>>();
            for (int i = 0; i < src.ToArray().Length; i++)
            {
                List<object> _temp = new List<object>();
                _temp.Add(src[i].change_rate);
                _temp.Add(Math.Round(src[i].total_amount / 100_000_000d, 2));
                _temp.Add(src[i].tick_type);
                _BlueChipsList.Add(src[i].code, _temp);
            }

            //在這跟在IActionResult加排序都沒用！！
            //return _BlueChipsList.OrderByDescending(x => x.Value[1]).ToDictionary(x => x.Key, x => x.Value);
            return _BlueChipsList;
        }
        #endregion




    }
    //==========================================================================
    [ApiController]//===========================================================
    //==========================================================================

    [Route("api/[controller]")]
    public class ListAccountsSnapshots_NavBarController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() { return Ok(new SJCls().ListAccountsSnapshots_NavBar()); }
    }


    [Route("api/[controller]")]
    public class ScannersAmountRankController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() { return Ok(new SJCls().ScannersAmountRank()); }
    }


    [Route("api/[controller]")]
    public class Kbars_ChartController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() { return Ok(new SJCls().Kbars_Chart()); }
    }


    [Route("api/[controller]")]
    public class TicksLastCountController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() { return Ok(new SJCls().TicksLastCount()); }
    }


    [Route("api/[controller]")]
    public class Snapshots_OpPremiumController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() { return Ok(new SJCls().Snapshots_OpPremium("TXO", "202401")); }
    }


    [Route("api/[controller]")]
    public class MarginListPositionsController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() { return Ok(new SJCls().MarginListPositions()); }
    }


    [Route("api/[controller]")]
    public class Snapshots_BlueChipsController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() { return Ok(new SJCls().Snapshots_BlueChips()); }
    }

}
