using book_ecommerce.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using book_ecommerce.Controllers.Models;
namespace book_ecommerce.Controllers
{
    [ApiController]

    [Route("api/[controller]/[action]")]
    public class BillController : ControllerBase
    {
        private readonly IBillService _billService;
        public BillController(IBillService billService)
        {
            _billService = billService;
        }
        [HttpPost(Name = "CreateBill")]
        public IActionResult CreateBill([FromBody] CreateBillRequestModel model)
        {
            var bill = _billService.CreateBill(model);
            return Ok(bill);
        }

    }
}
