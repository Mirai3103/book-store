
public interface ISeriesService
{
    public IEnumerable<dynamic> GetTopSeries();
    public IEnumerable<dynamic> GetAllSeries(int page, int limit);
}