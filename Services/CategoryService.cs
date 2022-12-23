
using book_ecommerce.Models;
using System.Linq;
using System.Net;

class CategoryService : ICategoryService
{
    private readonly BookdataContext _context;
    public CategoryService(BookdataContext context)
    {
        _context = context;
    }
    public IEnumerable<dynamic> GetAll()
    {
        return _context.Categories.Where(c => c.DeletedAt == null).Select(c => new
        {
            Id = c.Id,
            Name = c.Name,
            ParentId = c.ParentId,
        }).ToList();
    }

    public IEnumerable<dynamic> GetAllGroupByParent()
    {
        var listCategoryGroupByParent = from parentCategory in _context.Categories
                                        where parentCategory.ParentId == null && parentCategory.DeletedAt == null
                                        join childCategory in _context.Categories on parentCategory.Id equals childCategory.ParentId into childCategories
                                        select new
                                        {
                                            Id = parentCategory.Id,
                                            Name = parentCategory.Name,
                                            ChildCategory = childCategories.Select(c => new
                                            {
                                                Id = c.Id,
                                                Name = c.Name,
                                                ParentId = c.ParentId,
                                            }).ToList()
                                        };

        return listCategoryGroupByParent.ToList();
    }

    public IEnumerable<dynamic> GetBookByCategory(int id)
    {
        var categories = from c in _context.Categories
                         where c.Id == id || c.ParentId == id
                         select c;


        var listBookByCategory = _context.Books.Where(b => b.CategoryId != null && categories.Contains(b.Category!))
                                                .Select(b => new { Id = b.Id, Alias = b.Alias, Author = b.Author, Price = b.Price, Episode = b.Episode, Title = b.Title, Name = b.Name, BookImages = b.BookImages, Discount = b.Discount, })
                                                .ToList();
        return listBookByCategory;

    }
}