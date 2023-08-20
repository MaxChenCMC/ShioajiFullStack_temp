using System.Collections;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

using System.Data;
using System;
using Microsoft.Data.Analysis;
using System.Linq;
using Sinopac.Shioaji;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;


namespace namespaceSJ
// 命名空間亦可再內裝一層命名空間，只要在program.cs Using時多個「.」就好
{
    class SJCls
    {
        public static int ClsSelfAttribute = 999;
        public static void ClsWithoutInitMethod()
        {
            Console.WriteLine("類的靜態方法(天生就會的)，不屬於創建出來的物件用的方法");
        }
        //==================================================================================================

        // 類有基本屬性，要嘛是在實例化後才去一行一行賦值，不然就是弄個ctor讓實例化當下隨著參數賦值
        public Shioaji _api;
        public JsonElement root;
        public SJCls()
        {
            this._api = new Shioaji();
            this.root = JsonDocument.Parse(File.ReadAllText(@"C:\Users\hhped\Desktop\_csSJ\Sinopac.json")).RootElement;
            _api.Login(root.GetProperty("API_Key").GetString(), root.GetProperty("Secret_Key").GetString());
            //_api.ca_activate(@"C:\Users\hhped\Desktop\_csSJ\Sinopac.pfx", root.GetProperty("ca_passwd").GetString(), root.GetProperty("person_id").GetString());
        }
        //_api.Subscribe(_api.Contracts.Futures["TXF"]["TXF202308"], QuoteType.tick);
        //_api.Subscribe(_api.Contracts.Options["TX4"]["TX420230816350C"], QuoteType.tick);
        //_api.Subscribe(_api.Contracts.Stocks["TSE"]["2330"], QuoteType.tick);


        public void SpreadQuote(int backwardation, string weekth, string yearmonth)
        {
            var par0 = _api.Snapshots(new List<IContract>() { _api.Contracts.Futures["TXF"]["TXFR1"] })[0].close;
            var par1 = Math.Ceiling(par0 / 50) * 50 + backwardation;
            var opt_code = _api.Contracts.Options[weekth];
            SJList strBC = _api.Snapshots(new List<IContract>() { opt_code[weekth + yearmonth + (par1 - 100) + "C"] });
            SJList strSC = _api.Snapshots(new List<IContract>() { opt_code[weekth + yearmonth + par1 + "C"] });
            SJList strSP = _api.Snapshots(new List<IContract>() { opt_code[weekth + yearmonth + par1 + "P"] });
            SJList strBP = _api.Snapshots(new List<IContract>() { opt_code[weekth + yearmonth + (par1 + 100) + "P"] });
            var bcBid = strBC[0].sell_price;
            var scAsk = strSC[0].buy_price;
            var spAsk = strSP[0].buy_price;
            var bpBid = strBP[0].sell_price;
            Console.WriteLine($"{bcBid}、{scAsk}、{spAsk}、{bpBid}");
            Console.WriteLine($"SCSP價平{par1}，BPSP報價{bpBid - spAsk}、BCSC報價{bcBid - scAsk}。溢{bcBid - scAsk + bpBid - spAsk - 94}");
        }


        public void MyKbars(int len)
        {
            Kbars kbars = _api.Kbars(_api.Contracts.Futures["TXF"]["TXFR1"],
                                     DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd"),
                                     DateTime.Now.ToString("yyyy-MM-dd"));

            List<DateTimeOffset> generalTimes = new List<DateTimeOffset>();
            foreach (long timestamp in kbars.ts)
            {
                DateTime dateTime = DateTimeOffset.FromUnixTimeMilliseconds(timestamp / 1000000).UtcDateTime;
                generalTimes.Add(new DateTimeOffset(dateTime, TimeSpan.Zero));
            }

            DataFrame df = new DataFrame(
                                         new PrimitiveDataFrameColumn<DateTimeOffset>("Time", generalTimes),
                                         new PrimitiveDataFrameColumn<double>("Open", kbars.Open.ToList()),
                                         new PrimitiveDataFrameColumn<double>("High", kbars.High.ToList()),
                                         new PrimitiveDataFrameColumn<double>("Low", kbars.Low.ToList()),
                                         new PrimitiveDataFrameColumn<double>("Close", kbars.Close.ToList()),
                                         new PrimitiveDataFrameColumn<long>("Volume", kbars.Volume.ToList())
                                         );
            Console.WriteLine(df.Tail(len));
            
            try
            {
                // i => i[0] 0時間 1開 2高 3低 4收 5量
                df.Rows.Cast<DataFrameRow>().Select(i => i).ToList().ForEach(Console.WriteLine);
                df.Rows.Cast<DataFrameRow>().ElementAtOrDefault(50).ToList().ForEach(Console.WriteLine);

                //Console.WriteLine(df.Rows.Cast<DataFrameRow>().ElementAtOrDefault(^1));
                //Console.WriteLine(df.Rows.Cast<DataFrameRow>().ElementAtOrDefault(^1)[4]);
            }
            catch (Exception e1)
            {
                Console.WriteLine($"又是型別錯誤？___{e1.Message}");
            }
        }


        public void MyScanners()
        {
            SJList ScannersAmountRank = _api.Scanners(date: DateTime.Now.ToString("yyyy-MM-dd"), scannerType: ScannerType.AmountRank, count: 10);
            SJList ScannersChangePercentRank = _api.Scanners(date: DateTime.Now.ToString("yyyy-MM-dd"), scannerType: ScannerType.ChangePercentRank, count: 5);

            for (int i = 0; i < ScannersAmountRank.Count; i++)
            {
                var kbar_body = 100 * (ScannersAmountRank[i].close - ScannersAmountRank[i].open) / ScannersAmountRank[i].open;
                var updn_pct = Math.Round(ScannersAmountRank[i].change_price * 100 / ScannersAmountRank[i].open, 2);
                // Console.WriteLine($"{ScannersAmountRank[i].name} K棒%數{a*100:F2}");
                Console.WriteLine(string.Join("\t",
                                  ScannersAmountRank[i].name,
                                  ScannersAmountRank[i].code,
                                  Math.Round(kbar_body, 2).ToString().PadLeft(5).PadLeft(1),
                                  (ScannersAmountRank[i].total_amount / 100_000_000).ToString().PadLeft(3),
                                  (ScannersAmountRank[i].close > ScannersAmountRank[i].open) ? "↑" : "↓",
                                  updn_pct.ToString().PadLeft(5).PadLeft(1)
                                  ));
            }
            for (int i = 0; i < ScannersChangePercentRank.Count; i++)
            {
                var kbar_body = 100 * (ScannersChangePercentRank[i].close - ScannersChangePercentRank[i].open) / ScannersChangePercentRank[i].open;
                //漲幅排行肯定紅K，感覺不必再看C-O的符號 與 chg/O
                Console.WriteLine(string.Join("\t",
                                  ScannersChangePercentRank[i].name,
                                  ScannersChangePercentRank[i].code,
                                  Math.Round(kbar_body, 2).ToString().PadLeft(5).PadLeft(1),
                                  (ScannersChangePercentRank[i].total_amount / 100_000_000).ToString().PadLeft(3)
                                  ));
            }
            // 成交量與漲幅混加，但怕太混亂，先不用
            //var ScannersAmountRank1 = ScannersAmountRank.Concat(ScannersChangePercentRank);
        }


        public void MyListPositions(string mode)
        {
            var positions = _api.ListPositions(account: _api.FutureAccount);
            if (positions != null && mode == "holding")
            {
                foreach (var position in (List<FuturePosition>)positions)
                    Console.WriteLine($"Holding: {position.code}, {position.direction.PadRight(4)}@ {position.price.ToString().PadLeft(5)}, " +
                                      $"now: {position.last_price.ToString().PadLeft(5)}, P&L: {position.pnl.ToString().PadLeft(6)}");
            }
            else if (mode == "history")
            {
            var res = _api.ListProfitLossSummary(DateTime.Now.AddMonths(-1).ToString("yyyy-MM-dd"),
                                                 DateTime.Now.ToString("yyyy-MM-dd"),
                                                 _api.FutureAccount).profitloss_summary;
            foreach (var i in (List<FutureProfitLossSummary>)res)
                Console.WriteLine($"歷史損益：{i.code.PadRight(10)}、{i.direction.PadRight(4)}、{i.entry_price.ToString().PadLeft(8)}、{i.cover_price.ToString().PadLeft(8)}、{i.pnl.ToString().PadLeft(8)}");
            }
            else
            {
                Console.WriteLine(_api.Margin());
                Console.WriteLine("沒庫存");
            }
        }


        public void TXFR1CB()
        {
            _api.SetQuoteCallback_v1(myQuoteCB_v1);
            //_api.SetOrderCallback(order_cb);
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
        private static void order_cb(OrderState orderState, dynamic msg)
        {
            // 1.operation, 2.order兩層, 3.status, 4.contract  會報錯：DateTimeOffset.FromUnixTimeSeconds(msg.status.exchange_ts).ToString('yyyy-MM-dd HH:mm:ss')
            Console.WriteLine(
                // op_code 只能是00 其它的都是異常
                $"1. operation執行：\n{msg.operation.op_type}、{msg.operation.op_code }、{msg.operation.op_msg}" +
                "\n=================================\n" +
                $"2. order單子：\n{msg.order.action}、{msg.order.price}、{msg.order.quantity}、{msg.order.market_type}、{msg.order.oc_type}、{msg.order.combo}" +
                "\n=================================\n" +
                $"3. status狀態：\n{msg.status.exchange_ts}、{msg.status.modified_price}" +
                "\n=================================\n" +
                $"4. contract合約：\n {msg.contract.code}、{msg.contract.delivery_month}、{msg.contract.delivery_date}、{msg.contract.strike_price}、{msg.contract.option_right}\n"
                );
        }
    }
}











