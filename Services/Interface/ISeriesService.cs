
public interface ISeriesService
{
    public IEnumerable<dynamic> GetTopSeries(int page, int limit, int? userId = null);
    public IEnumerable<dynamic> GetAllSeries(int page, int limit, int? userId = null);
}