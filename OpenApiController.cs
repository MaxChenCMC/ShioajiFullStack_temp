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
    [ApiController]

    [Route("api/[controller]")]
    public class MI_INDEX20Controller : ControllerBase
    {
        private async Task<Dictionary<string, Dictionary<string, object>>> OpenApiTwseAsync()
        {
            var client = new HttpClient();
            var response = await client.GetAsync("https://openapi.twse.com.tw/v1/" +
                "exchangeReport/MI_INDEX20");
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




    [Route("api/[controller]")]
    public class FMTQIKController : ControllerBase
    {
        private async Task<Dictionary<string, Dictionary<string, object>>> FMTQIKAsync()
        {
            var client = new HttpClient();
            var response = await client.GetAsync("https://openapi.twse.com.tw/v1/" +
                "exchangeReport/FMTQIK");
            var json = await response.Content.ReadAsStringAsync();
            List<dynamic> src = JsonConvert.DeserializeObject<List<dynamic>>(json);

            Dictionary<string, Dictionary<string, object>> src_new = new Dictionary<string, Dictionary<string, object>>();
            foreach (var item in src)
            {
                src_new[item["Date"].ToString()] = new Dictionary<string, object>
                {
                    { "TradeVolume", (Double)item["TradeVolume"]},
                    { "TradeValue", (Double)item["TradeValue"]},
                    { "Transaction", (Double)item["Transaction"]},
                    { "TAIEX", (Double)item["TAIEX"]},
                    { "Change", (Double)item["Change"]},
                };
            }
            return (Dictionary<string, Dictionary<string, object>>)src_new;
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
}


