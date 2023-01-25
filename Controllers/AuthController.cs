

using book_ecommerce.Models;
using book_ecommerce.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using book_ecommerce.Controllers.Models;
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
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            var (accessToken, refreshToken, user) = _authService.Login(loginRequest.Email, loginRequest.Password);

            return Ok(new { accessToken, refreshToken, user });
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Register([FromBody] UserRegisterPayload user)
        {
            var (accessToken, refreshToken, a) = _authService.Register(user);
            return Ok(new { accessToken, refreshToken, user = a });
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
        public struct RefreshTokenRequest
        {
            public string refreshToken { get; set; }
        }
        [HttpPost]
        [AllowAnonymous]
        public IActionResult RefreshToken([FromBody] RefreshTokenRequest refreshToken)
        {
            var (accessToken, user) = _authService.RefreshToken(refreshToken.refreshToken);
            return Ok(new { accessToken, user });
        }
    }
}