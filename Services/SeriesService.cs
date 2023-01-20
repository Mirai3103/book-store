

using book_ecommerce.Models;
using Microsoft.EntityFrameworkCore;
namespace book_ecommerce.Services;
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
                Id = s.Id,
                Name = s.Name,
                Alias = s.Alias,
                Author = s.Author,
                LastestBook = s.Books.OrderByDescending(b => b.Episode).Select(b => new { Episode = b.Episode, Image = b.ImageCover }).FirstOrDefault(),
                Publisher = new { Id = s.Publisher != null ? s.Publisher.Id : 0, Name = s.Publisher != null ? s.Publisher.Name : "" },
                NumberOfFollowers = s.NumberOfFollowers == 0 ? (int)(new Random().NextDouble() * 100000) : s.NumberOfFollowers,
                UpdatedAt = s.UpdatedAt,
                IsFollowed = userId != null ? s.Users.Any(u => u.Id == userId) : false
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
                Id = s.Id,
                Name = s.Name,
                Alias = s.Alias,
                Author = s.Author,
                LastestBook = s.Books.OrderByDescending(b => b.Episode).Select(b => new { Episode = b.Episode, Image = b.ImageCover }).FirstOrDefault(),
                Publisher = new { Id = s.Publisher != null ? s.Publisher.Id : 0, Name = s.Publisher != null ? s.Publisher.Name : "" },
                NumberOfFollowers = s.NumberOfFollowers,
                UpdatedAt = s.UpdatedAt,
                IsSeries = true,
                IsFollowed = userId != null ? s.Users.Any(u => u.Id == userId) : false
            }
               );

        return topSeries.ToList();
    }
}