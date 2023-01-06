using Microsoft.AspNetCore.Mvc;

namespace book_ecommerce.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ProviderController : ControllerBase
    {
        public readonly IProviderService _providerService;
        public ProviderController(IProviderService providerService)
        {
            _providerService = providerService;
        }
        [HttpGet(Name = "GetAllProvider")]
        public IActionResult GetAll()
        {
            return Ok(_providerService.GetAll());
        }
    }
}