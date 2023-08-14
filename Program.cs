using System.Collections;
using System.Data;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

using Microsoft.Data.Analysis;
using Sinopac.Shioaji;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;

namespace csSJ
{
    class Program
    {
        static void Main(string[] args)
        {
            #region 初始化
            Shioaji _api = new Shioaji();
            string jsonString = File.ReadAllText(@"C:\Users\hhped\Desktop\_csSJ\Sinopac.json");
            JsonElement root = JsonDocument.Parse(jsonString).RootElement;
            _api.Login(root.GetProperty("API_Key").GetString(),
                       root.GetProperty("Secret_Key").GetString());
            _api.ca_activate(@"C:\Users\hhped\Desktop\_csSJ\Sinopac.pfx",
                             root.GetProperty("ca_passwd").GetString(),
                             root.GetProperty("person_id").GetString());
            #endregion


            #region 訂閱商品、設定委單與報價的callback
            _api.Subscribe(_api.Contracts.Futures["TXF"]["TXF202308"], QuoteType.tick);
            _api.SetQuoteCallback_v1(myQuoteCB_v1);
            #endregion


            Console.ReadLine();
        }

        private static void myQuoteCB_v1(Exchange exchange, dynamic quote)
        {
            var _updn = quote.price_chg > 0 ? "▲" : "▼";
            var _bodycolor = quote.close - quote.open > 0 ? "↑" : "↓";
            Console.WriteLine(
                $"{quote.datetime} | {quote.code} | {quote.close} | {_updn} {quote.price_chg.ToString().PadLeft(3)} | " +
                $"{_bodycolor} {Math.Abs(quote.close - quote.open).ToString().PadLeft(3)} | TSE {quote.underlying_price}。"
                );
        }

    }
}
