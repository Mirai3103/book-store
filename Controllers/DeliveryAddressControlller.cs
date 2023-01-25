using Microsoft.AspNetCore.Mvc;
using book_ecommerce.Models;
using book_ecommerce.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace book_ecommerce.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]

    public class DeliveryAddressController : ControllerBase
    {

        public readonly IDeliveryAddressService _deliveryAddressService;
        public DeliveryAddressController(IDeliveryAddressService deliveryAddressService)
        {
            _deliveryAddressService = deliveryAddressService;
        }
        [HttpGet(Name = "GetMyAddress")]
        public IActionResult GetMyAddress()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            return Ok(_deliveryAddressService.GetAllOfUser(userId));
        }
        [HttpPost(Name = "CreateAddress")]
        public IActionResult CreateAddress([FromBody] DeliveryAddress model)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            model.UserId = userId;
            return Ok(_deliveryAddressService.CreateDeliveryAddress(model));
        }
        [HttpPut(Name = "UpdateAddress")]
        public IActionResult UpdateAddress([FromBody] DeliveryAddress model)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            model.UserId = userId;
            return Ok(_deliveryAddressService.UpdateDeliveryAddress(model, userId));
        }
        [HttpDelete(Name = "DeleteAddress")]
        public IActionResult DeleteAddress([FromQuery] uint id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            return Ok(_deliveryAddressService.DeleteDeliveryAddress(id, userId));
        }
        [HttpPut(Name = "SetDefaultAddress")]
        public IActionResult SetDefaultAddress([FromQuery] uint id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            return Ok(_deliveryAddressService.SetAsPrimary(id, userId));
        }
    }
}
