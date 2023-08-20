using namespaceSJ
using System;

namespace csSJ
{
    class Program
    {
        static void Main(string[] args)
        {
            var data1 = new namespaceSJ.SJCls();
            data1.SpreadQuote(0, "TX4", "202308");
            data1.MyKbars(10);
            data1.MyScanners();
            data1.MyListPositions("holding");
            data1.TXFR1CB();
            Console.ReadLine();
        }
    }
}
