
public interface ICategoryService
{
    public IEnumerable<dynamic> GetAllGroupByParent();
    public IEnumerable<dynamic> GetAll();
    public IEnumerable<dynamic> GetBookByCategory(int id);
}