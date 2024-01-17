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
            #region �����n�J���A�A�ѤU�N���acontroller, �䥦�X���@�w�]
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