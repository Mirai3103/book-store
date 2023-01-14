using book_ecommerce.Models;
using book_ecommerce.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace book_ecommerce.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class UserController : ControllerBase
    {
        public readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        public class UpdateCartRequest
        {
            public int bookId { get; set; }
            public int amount { get; set; }
            public bool isSet { get; set; } = false;
        }
        [HttpGet]
        public IActionResult GetCartDetails()
        {

            var idClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (idClaim == null)
            {
                return Unauthorized();
            }
            var user = _userService.GetCartDetails(int.Parse(idClaim.Value));
            return Ok(user);
        }

        [HttpPost]
        public IActionResult UpdateCart([FromBody] UpdateCartRequest addBookToCartRequest)
        {
            var idClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (idClaim == null)
            {
                return Unauthorized();
            }
            _userService.UpdateBookToCart(int.Parse(idClaim.Value), addBookToCartRequest.bookId, addBookToCartRequest.amount, addBookToCartRequest.isSet);
            return Ok();
        }
        [HttpPost]
        public IActionResult ClearCart()
        {
            var idClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (idClaim == null)
            {
                return Unauthorized();
            }
            _userService.ClearCart(int.Parse(idClaim.Value));
            return Ok();
        }
    }
}