using book_ecommerce.Models;
public enum SortOrder
{
    WeekBestSeller = 1,
    MonthBestSeller = 2,
    YearBestSeller = 3,
    PriceLowToHigh = 4,
    PriceHighToLow = 5,
    Newest = 6,
    Oldest = 7,
}


public class Query
{
    public class PriceRange
    {
        public int min { get; set; } = 0;
        public int max { get; set; } = 500000;
    }
    public Query()
    {
        page = 1;
        limit = 24;
        sortBy = SortOrder.Newest;

    }
    public int page { get; set; }
    public int limit { get; set; }
    public string? search { get; set; }
    public int? categoryId { get; set; }
    public PriceRange? price { get; set; }
    public int[]? providerId { get; set; }
    public SortOrder sortBy { get; set; }
    public string[]? ageGroup { get; set; }
    public string[]? level { get; set; }
    public string[]? grade { get; set; }
    public string[]? language { get; set; }
    public string[]? bookCoverType { get; set; }
}
public interface IBookService
{




    public IEnumerable<dynamic> GetAll(int page = 1, int limit = 50);
    public Book GetBookDetail(int id);
    public Book GetByAlias(string alias);
    public IEnumerable<dynamic> SearchByName(string name);
    public IEnumerable<dynamic> GetBooksSameSeries(int bookId, int limit = 8);
    public IEnumerable<dynamic> GetBooksSameAuthor(int bookId, int limit = 8);
    public dynamic AdvancedSearch(Query query);
    public IEnumerable<string> GetAllLanguage();


}
