using book_ecommerce.Models;

public interface IBookService
{
    public IEnumerable<dynamic> GetAll(int page = 1, int limit = 50);
    public Book GetBookDetail(int id);
    public Book GetByAlias(string alias);
    public IEnumerable<dynamic> SearchByName(string name);
}