using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using Newtonsoft.Json;
using System.IO;
using System.Text.Json;
using Sinopac.Shioaji;

using Microsoft.AspNetCore.Mvc;
using ApiSource;


namespace ShioajiBackend.Controllers
{
    [ApiController]
    /// <summary>
    /// NavBar
    /// </summary>
    [Route("api/[controller]")]
    public class ListAccountsSnapshots_NavBarController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() { return Ok(new SJ().ListAccountsSnapshots_NavBar()); }
    }


    /// <summary>
    /// 成交值前20大 K棒速覽
    /// </summary>
    [Route("api/[controller]")]
    public class ScannersAmountRankController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() { return Ok(new SJ().ScannersAmountRank()); }
    }


    /// <summary>
    /// K棒1分K
    /// </summary>
    [Route("api/[controller]")]
    public class Kbars_ChartController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() { return Ok(new SJ().Kbars_Chart()); }
    }


    /// <summary>
    /// 逐筆明細
    /// </summary>
    [Route("api/[controller]")]
    public class TicksLastCountController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() { return Ok(new SJ().TicksLastCount()); }
    }


    /// <summary>
    /// 選擇權複式組合單
    /// </summary>
    [Route("api/[controller]")]
    public class Snapshots_OpPremiumController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() { return Ok(new SJ().Snapshots_OpPremium("TXO", "202401")); }
    }


    /// <summary>
    /// 權值前20+10
    /// </summary>
    [Route("api/[controller]")]
    public class Snapshots_BlueChipsController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() { return Ok(new SJ().Snapshots_BlueChips()); }
    }


    /// <summary>
    /// 漲幅排行且站上月均線
    /// </summary>
    [Route("api/[controller]")]
    public class ScannersChangePercentRankController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() { return Ok(new SJ().ScannersChangePercentRank()); }
    }
    //==========================================================================
    /// <summary>
    /// 庫存
    /// </summary>
    [Route("api/[controller]")]
    public class _ListPositionsController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        { 
            return Ok(new SJ().ListPositions());
        }
    }


    /// <summary>
    /// 權益數
    /// </summary>
    [Route("api/[controller]")]
    public class _MarginController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(
                new SJ().Margin()
                );
        }
    }


    /// <summary>
    /// 歷史損益
    /// </summary>
    [Route("api/[controller]")]
    public class _ListProfitLossSummaryController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(
                new SJ().ListProfitLossSummary()
                );
        }
    }
}
