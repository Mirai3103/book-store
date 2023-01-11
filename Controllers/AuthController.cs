

using book_ecommerce.Models;
using book_ecommerce.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace book_ecommerce.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        public readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        [HttpPost]
        [AllowAnonymous]
        public IActionResult Login([FromForm] string email, [FromForm] string password)
        {
            var (accessToken, refreshToken) = _authService.Login(email, password);
            return Ok(new { accessToken, refreshToken });
        }
        [HttpPost]
        [AllowAnonymous]
        public IActionResult Register([FromBody] User user)
        {
            var (accessToken, refreshToken) = _authService.Register(user);
            return Ok(new { accessToken, refreshToken });
        }
        [HttpPost]
        [Authorize]
        public IActionResult Logout([FromBody] string refreshToken)
        {
            _authService.Logout(refreshToken);
            return Ok();
        }
        [HttpGet]
        [Authorize]
        public IActionResult GetUser()
        {
            return Ok(_authService.GetUserInfo(HttpContext.User.Identity));
        }
    }
}