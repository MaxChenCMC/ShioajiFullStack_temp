using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sinopac.Shioaji;
using System.IO;
using System.Text.Json;
using System;

using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using SjSource;

namespace DotnetReactShioaji
{
    public class Program
    {
        public static void Main(string[] args)
        {
            #region 維持登入狀態，剩下就都靠controller, 其它碼維護預設
            SJ InitSJ = new();
            InitSJ.Login();
            #endregion

            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}