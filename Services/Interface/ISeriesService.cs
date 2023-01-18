
public interface ISeriesService
{
    public IEnumerable<dynamic> GetTopSeries(int page, int limit);
    public IEnumerable<dynamic> GetAllSeries(int page, int limit);
}