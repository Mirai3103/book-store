
using book_ecommerce.Models;

namespace book_ecommerce.Services.Interface;
public interface ICategoryService
{
    public IEnumerable<dynamic> GetAllGroupByParent();
    public IEnumerable<dynamic> GetAll();
    public IEnumerable<dynamic> GetBookByCategory(int id);
    public void DeleteCategory(int id);
    public dynamic UpdateCategory(Category category);
    public dynamic CreateCategory(Category category);
    public dynamic GetCategory(int id);
}