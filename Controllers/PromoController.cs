

using System.Security.Claims;
using book_ecommerce.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace book_ecommerce.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class PromoController : ControllerBase
{
    private readonly IPromoService _promoService;
    public PromoController(IPromoService promoService)
    {
        _promoService = promoService;
    }
    [HttpGet(Name = "GetValidPromoCodes")]
    public IActionResult GetValidPromoCodes()
    {
        return Ok(_promoService.GetValidPromoCodes());
    }
    [HttpPost(Name = "CheckPromoCode")]
    public IActionResult CheckPromoCode([FromBody] string promoCode)
    {
        return Ok(_promoService.CheckPromoCode(promoCode));
    }
    [HttpPost(Name = "GetPromoCode")]
    public IActionResult GetPromoCode([FromBody] string promoCode)
    {
        return Ok(_promoService.GetPromoCode(promoCode));
    }
}