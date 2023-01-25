using book_ecommerce.Services.Interface;
using Microsoft.AspNetCore.Mvc;


namespace book_ecommerce.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]

    public class CategoryController : ControllerBase
    {
        public readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        [HttpGet(Name = "GetAllGroupByParent")]
        public IActionResult GetAllGroupByParent()
        {
            return Ok(_categoryService.GetAllGroupByParent());
        }
        [HttpGet(Name = "GetAllCategory")]
        public IActionResult GetAll()
        {
            return Ok(_categoryService.GetAll());
        }
        [HttpGet(Name = "GetBookByCategory")]
        public IActionResult GetBookByCategory([FromQuery] int id)
        {
            return Ok(_categoryService.GetBookByCategory(id));
        }
    }
}
