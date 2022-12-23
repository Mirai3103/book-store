using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace book_ecommerce.Controllers
{
    [ApiController]

    [Route("api/[controller]/[action]")]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;
        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }
        [HttpGet(Name = "GetAllBook")]
        public IActionResult GetAll([FromQuery] int page = 1, [FromQuery] int limit = 50)
        {
            var books = _bookService.GetAll(page, limit);
            return Ok(books);
        }
        [HttpGet(Name = "GetDetail")]
        public IActionResult GetDetail([FromQuery] int? id, [FromQuery] string? alias)
        {
            if (id == null && alias == null)
                return BadRequest("Id or alias is required");
            if (id != null)
                return Ok(_bookService.GetBookDetail(id.Value));
            return Ok(_bookService.GetByAlias(alias!));

        }
    }
}
