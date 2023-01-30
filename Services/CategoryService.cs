
using System.Linq;
using System.Net;
using book_ecommerce.Models;
namespace book_ecommerce.Services;
using book_ecommerce.Services.Interface;
using Microsoft.EntityFrameworkCore;

public class CategoryService : ICategoryService
{
    private readonly BookdataContext _context;
    public CategoryService(BookdataContext context)
    {
        _context = context;
    }

    public dynamic CreateCategory(Category category)
    {
        var newCategory = new Category()
        {
            Name = category.Name,
            ParentId = category.ParentId,
        };
        _context.Categories.Add(newCategory);
        _context.SaveChanges();
        return newCategory;
    }

    public void DeleteCategory(int id)
    {
        var category = _context.Categories.Find(id);
        if (category is not null)
        {
            category.DeletedAt = DateTime.Now;
            _context.SaveChanges();
        }
    }

    public IEnumerable<dynamic> GetAll()
    {
        return _context.Categories.Where(c => c.DeletedAt == null).Select(c => new
        {
            c.Id,
            c.Name,
            c.ParentId,
        }).ToList();
    }

    public IEnumerable<dynamic> GetAllGroupByParent()
    {
        var listCategoryGroupByParent = from parentCategory in _context.Categories
                                        where parentCategory.ParentId == null && parentCategory.DeletedAt == null
                                        join childCategory in _context.Categories on parentCategory.Id equals childCategory.ParentId into childCategories
                                        select new
                                        {
                                            parentCategory.Id,
                                            parentCategory.Name,
                                            childCategories = childCategories.Select(c => new
                                            {
                                                c.Id,
                                                c.Name,
                                                c.ParentId,
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
                                                .Select(b => new { b.Id, b.Alias, b.Author, b.Price, b.Episode, b.Title, b.Name, b.ImageCover, b.Discount, })
                                                .ToList();
        return listBookByCategory;

    }

    public dynamic GetCategory(int id)
    {
        var category = _context.Categories.Include(c => c.Parent).FirstOrDefault(c => c.Id == id);
        if (category is null)
        {
            throw new HttpResponseException(HttpStatusCode.NotFound, "Category not found");
        }
        return new
        {
            category.Id,
            category.Name,
            category.ParentId,
            category.Parent
        };
    }

    public dynamic UpdateCategory(Category category)
    {
        var oldCategory = _context.Categories.Find(category.Id);
        if (oldCategory is null)
        {
            throw new HttpResponseException(HttpStatusCode.NotFound, "Category not found");
        }
        oldCategory.Name = category.Name;
        oldCategory.ParentId = category.ParentId;
        _context.SaveChanges();
        return oldCategory;
    }
}