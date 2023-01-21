

using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace book_ecommerce.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class SeriesController : ControllerBase
{
    private readonly ISeriesService _seriesService;
    public SeriesController(ISeriesService seriesService)
    {
        _seriesService = seriesService;
    }
    [HttpGet(Name = "GetAllSeries")]
    public IActionResult GetAll([FromQuery] int page = 1, [FromQuery] int limit = 10)
    {
        var series = _seriesService.GetAllSeries(page, limit);
        return Ok(series);
    }
    [HttpGet(Name = "GetTopSeries")]
    public IActionResult GetTopSeries([FromQuery] int page = 1, [FromQuery] int limit = 10)
    {
        if (!User.Identity.IsAuthenticated) return Ok(_seriesService.GetTopSeries(page, limit));

        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        return Ok(_seriesService.GetTopSeries(page, limit, userId));
    }
    [HttpPost(Name = "FollowSeries")]
    [Authorize]
    public IActionResult ToggleFollow([FromBody] int id)
    {
        _seriesService.ToggleFollowSeries(id, int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value));
        return Ok();
    }
}