

using book_ecommerce.Models;
using Microsoft.EntityFrameworkCore;
namespace book_ecommerce.Services;
using book_ecommerce.Services.Interface;

public class SeriesService : ISeriesService
{
    private readonly BookdataContext _context;

    public SeriesService(BookdataContext context)
    {
        _context = context;
    }

    public IEnumerable<dynamic> GetAllSeries(int page, int limit, int? userId = null)
    {
        var listSeries = _context.Series
            .Include(s => s.Books)
            .Include(s => s.Publisher)
            .Skip((page - 1) * limit)
            .Take(limit)
            .Select(s => new
            {
                s.Id,
                s.Name,
                s.Alias,
                s.Author,
                LastestBook = s.Books.OrderByDescending(b => b.Episode).Select(b => new { Episode = b.Episode, Image = b.ImageCover }).FirstOrDefault(),
                Publisher = new { Id = s.Publisher != null ? s.Publisher.Id : 0, Name = s.Publisher != null ? s.Publisher.Name : "" },
                NumberOfFollowers = s.NumberOfFollowers == 0 ? (int)(new Random().NextDouble() * 100000) : s.NumberOfFollowers,
                s.UpdatedAt,
                IsFollowed = userId != null && s.Users.Any(u => u.Id == userId)
            }
               );

        return listSeries.ToList();
    }

    public IEnumerable<dynamic> GetTopSeries(int page = 1, int limit = 8, int? userId = null)
    {
        var skip = (page - 1) * limit;
        var topSeries = _context.Series
            .Include(s => s.Books)
            .Include(s => s.Publisher)
            .OrderByDescending(s => s.NumberOfFollowers)
            .Skip(skip)
            .Take(limit)
            .Select(s => new
            {
                s.Id,
                s.Name,
                s.Alias,
                s.Author,
                LastestBook = s.Books.OrderByDescending(b => b.Episode).Select(b => new { Episode = b.Episode, Image = b.ImageCover }).FirstOrDefault(),
                Publisher = new { Id = s.Publisher != null ? s.Publisher.Id : 0, Name = s.Publisher != null ? s.Publisher.Name : "" },
                s.NumberOfFollowers,
                s.UpdatedAt,
                IsSeries = true,
                IsFollowed = userId != null && s.Users.Any(u => u.Id == userId)
            }
               );

        return topSeries.ToList();
    }

    public void ToggleFollowSeries(int seriesId, int userId)
    {
        var series = _context.Series.Find(seriesId);
        var user = _context.Users.Find(userId);
        if (series is null || user is null)
        {
            throw new HttpResponseException(System.Net.HttpStatusCode.NotFound, "Không tìm thấy series hoặc user");
        }
        if (series.Users.Contains(user))
        {
            series.Users.Remove(user);
            series.NumberOfFollowers--;
        }
        else
        {
            series.Users.Add(user);
            series.NumberOfFollowers++;
        }
        _context.Update(series);

        _context.SaveChanges();
    }
}