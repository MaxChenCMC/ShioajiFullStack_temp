using System.Linq;
using System.Configuration;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Text.Json;
using Sinopac.Shioaji;

using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace ShioajiBackend.Controllers
{
    //=============================================================================
    [ApiController]//==============================================================
    //=============================================================================

    #region 集中市場每日成交量前二十名證券 含雜魚ETF
    [Route("api/[controller]")]
    public class MI_INDEX20Controller : ControllerBase
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns>  回傳格式寫在這裡方便回憶   </returns>
        private async Task<Dictionary<string, Dictionary<string, object>>> OpenApiTwseAsync()
        {
            var client = new HttpClient();
            var response = await client.GetAsync("https://openapi.twse.com.tw/v1/" + "exchangeReport/MI_INDEX20");
            var json = await response.Content.ReadAsStringAsync();
            List<dynamic> src = JsonConvert.DeserializeObject<List<dynamic>>(json);

            Dictionary<string, Dictionary<string, object>> src_new = new Dictionary<string, Dictionary<string, object>>();
            foreach (var item in src)
            {
                src_new[item["Code"].ToString()] = new Dictionary<string, object>
                {
                    { "Name", item["Name"].ToString()},
                    { "ClosingPrice", Convert.ToDouble(item["ClosingPrice"])},
                    { "Change", item["Change"] == "" ? 0 : (Convert.ToDouble(item["Change"]))} // 平盤好像是空值 ☛ " "，故不能用double
                };
            }
            return (Dictionary<string, Dictionary<string, object>>)src_new;
        }

        [HttpGet("GetTwseData")] //API尾段URL可在這寫得更易讀
        public async Task<IActionResult> GetTwseData()
        {
            try
            {
                var result = await OpenApiTwseAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
    #endregion


    #region 集中市場每日市場成交資訊 只有近四天或五天的樣子
    [Route("api/[controller]")]
    public class FMTQIKController : ControllerBase
    {
        private async Task<Dictionary<string, Dictionary<string, object>>> FMTQIKAsync()
        {
            var client = new HttpClient();
            var response = await client.GetAsync("https://openapi.twse.com.tw/v1/" + "exchangeReport/FMTQIK");
            var json = await response.Content.ReadAsStringAsync();
            List<dynamic> src = JsonConvert.DeserializeObject<List<dynamic>>(json);
            var src1 = src.Where(x => x["Date"] == "1130105").ToList();

            Dictionary<string, Dictionary<string, object>> src_new = new Dictionary<string, Dictionary<string, object>>();
            foreach (var item in src1)
            {
                src_new[item["Date"].ToString()] = new Dictionary<string, object>
                {
                    { "TradeVolume", (Double)item["TradeVolume"]},
                    { "成交值", (Double)item["TradeValue"]},
                    { "Transaction", (Double)item["Transaction"]},
                    { "加權", (Double)item["TAIEX"]},
                    { "漲跌", (Double)item["Change"]},
                };
            }
            //return (Dictionary<string, Dictionary<string, object>>)src_new.Where(x => x.Key == "1130105");
            return src_new;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await FMTQIKAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
    #endregion


    #region  公開發行公司每月營業收入彙總表 怎麼全都未上市櫃
    [Route("api/[controller]")]
    public class RevenueController : ControllerBase
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        private async Task<Dictionary<string, Dictionary<string, object>>> RevenueAsync()
        {
            var client = new HttpClient();
            var response = await client.GetAsync("https://openapi.twse.com.tw/v1/" + "opendata/t187ap05_P");
            var json = await response.Content.ReadAsStringAsync();
            List<dynamic> src = JsonConvert.DeserializeObject<List<dynamic>>(json);

            // 用linq 查 IEnumerable<dynamic>後，要ToList()才會再多支援常見屬性
            var src1 = src.Where(x => (x["累計營業收入-前期比較增減(%)"] != "")
                                 && ((double)x["營業收入-當月營收"] >= 500_000.0)
                                 && ((double)x["營業收入-上月營收"] >= 500_000.0)
                                 && ((double)x["累計營業收入-前期比較增減(%)"] >= 200.0)
                                //  && x["資料年月"] != "11211"
                                // (x["公司代號"] == "2308") // "5868"
                                );
            src1.ToList().ForEach(Console.WriteLine);

            Dictionary<string, Dictionary<string, object>> _retDict = new Dictionary<string, Dictionary<string, object>>();
            foreach (var i in src1)
            {
                _retDict[i["公司代號"].ToString()] = new Dictionary<string, object>
                {
                    { "資料年月", i["資料年月"].ToString()},
                    { "公司代號", i["公司代號"].ToString()},
                    { "公司名稱", i["公司名稱"].ToString()},
                    { "上月營收", (long)i["營業收入-上月營收"]},
                    { "當月營收", (long)i["營業收入-當月營收"]},
                    { "累計收入Yoy(%)", Math.Round((decimal)i["累計營業收入-前期比較增減(%)"], 2)}
                };
            }
            return (Dictionary<string, Dictionary<string, object>>)_retDict;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await RevenueAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
    #endregion

// var client = new HttpClient();
// var response = await client.GetAsync("https://openapi.twse.com.tw/v1/" + 
// "exchangeReport/STOCK_DAY_ALL" //上市個股日成交資訊
// );
// var json = await response.Content.ReadAsStringAsync();
// List<dynamic> src = JsonConvert.DeserializeObject<List<dynamic>>(json);

// // foreach(var i in src
// // .Where(x=> x.Code == "3027" || x.Code == "2454")
// // ){Console.WriteLine(i);}

// Dictionary<string, Dictionary<string, object>> src_new = new Dictionary<string, Dictionary<string, object>>();
// foreach (var item in src)
// {
//     src_new[item["Code"].ToString()] = new Dictionary<string, object>
//     {
//         { "Name", item["Name"].ToString()},
//         { "OpeningPrice", item["OpeningPrice"].ToString()},
//         { "HighestPrice", item["HighestPrice"].ToString()},
//         { "LowestPrice", item["LowestPrice"].ToString()},
//         { "ClosingPrice", item["ClosingPrice"].ToString()},
//         { "Change", item["Change"].ToString()},
//         { "TradeValue", item["TradeValue"].ToString()},
//     };
// }
// src_new.Where(x=> x.Key == "2609" || x.Key == "2603")


}


