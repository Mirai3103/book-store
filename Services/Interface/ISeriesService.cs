namespace book_ecommerce.Services.Interface;

public interface ISeriesService
{
    public IEnumerable<dynamic> GetTopSeries(int page, int limit, int? userId = null);
    public IEnumerable<dynamic> GetAllSeries(int page, int limit, int? userId = null);
    public void ToggleFollowSeries(int seriesId, int userId);
}