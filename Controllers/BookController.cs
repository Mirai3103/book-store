using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace book_ecommerce.Controllers
{
    [ApiController]

    [Route("api/[controller]/[action]")]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;
        private readonly ISeriesService _seriesService;
        public BookController(IBookService bookService, ISeriesService seriesService)
        {
            _bookService = bookService;
            _seriesService = seriesService;
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
        [HttpGet(Name = "GetBooksSameSeries")]
        public IActionResult GetBooksSameSeries([FromQuery] int bookId, [FromQuery] int limit = 8)
        {
            var books = _bookService.GetBooksSameSeries(bookId, limit);
            return Ok(books);
        }
        [HttpGet(Name = "GetBooksSameAuthor")]
        public IActionResult GetBooksSameAuthor([FromQuery] int bookId, [FromQuery] int limit = 8)
        {
            var books = _bookService.GetBooksSameAuthor(bookId, limit);
            return Ok(books);
        }
        [HttpGet(Name = "GetListLanguage")]
        public IActionResult GetListLanguage()
        {
            var languages = _bookService.GetAllLanguage();
            return Ok(languages);
        }
        [HttpPost(Name = "AdvancedSearch")]
        public IActionResult AdvancedSearch([FromBody] Query query)
        {
            var books = _bookService.AdvancedSearch(query);
            return Ok(books);
        }
        [HttpGet(Name = "GetTrendingBook")]
        public IActionResult GetTrendingBook([FromQuery] TrendingCategory category, [FromQuery] int limit = 8, [FromQuery] int page = 1)
        {

            if (category == TrendingCategory.TopSeries)
            {
                return Ok(_seriesService.GetTopSeries(page, limit));
            }
            var books = _bookService.GetTrendingBook(category, limit, page);
            return Ok(books);
        }
    }
}
