using book_ecommerce.Models;

public interface IBookService
{
    public enum SortOrder
    {
        WeekBestSeller,
        MonthBestSeller,
        YearBestSeller,
        PriceLowToHigh,
        PriceHighToLow,
        Newest,
        Oldest

    }
    public IEnumerable<dynamic> GetAll(int page = 1, int limit = 50);
    public Book GetBookDetail(int id);
    public Book GetByAlias(string alias);
    public IEnumerable<dynamic> SearchByName(string name);
    public IEnumerable<dynamic> GetBooksSameSeries(int bookId, int limit = 8);
    public IEnumerable<dynamic> GetBooksSameAuthor(int bookId, int limit = 8);
    public IEnumerable<dynamic> AdvancedSearch(string keyword, int? categoryId, int? providerId, string? language, int? minPrice, int? maxPrice, int page = 1, int limit = 24);
}