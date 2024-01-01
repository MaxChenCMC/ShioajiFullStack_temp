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
    [Route("api/[controller]")] //OpenApiTwse
    public class OpenApiTwseController : ControllerBase
    {
        private async Task<Dictionary<string, Dictionary<string, object>>> OpenApiTwseAsync()
        {
            var client = new HttpClient();
            var response = await client.GetAsync("https://openapi.twse.com.tw/v1/" + "/exchangeReport/MI_INDEX20");
            var json = await response.Content.ReadAsStringAsync();
            List<dynamic> src = JsonConvert.DeserializeObject<List<dynamic>>(json);

            Dictionary<string, Dictionary<string, object>> src_new = new Dictionary<string, Dictionary<string, object>>();
            foreach (var item in src)
            {
                src_new[item["Code"].ToString()] = new Dictionary<string, object>
                {
                    { "Name", item["Name"].ToString()},
                    { "ClosingPrice", Convert.ToDouble(item["ClosingPrice"])},
                    { "Change", Convert.ToString(item["Change"])}
                };
            }
            return src_new;
        }



        [HttpGet("GetTwseData")]
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


}


