using System.Net;
using book_ecommerce.Models;
namespace book_ecommerce.Servies;
public class BookService : IBookService
{
    private readonly BookdataContext _context;
    public BookService(BookdataContext context)
    {
        _context = context;
    }

    public IEnumerable<dynamic> GetAll(int page = 1, int limit = 50)
    {
        var skip = (page - 1) * limit;
        var books = _context.Books.Where(b => b.DeletedAt == null).Select(b => new { Id = b.Id, Alias = b.Alias, Author = b.Author, Price = b.Price, Episode = b.Episode, Title = b.Title, Name = b.Name, ImageCover = b.ImageCover, Discount = b.Discount, }).Skip(skip).Take(limit).ToList();
        return books;
    }

    public Book GetBookDetail(int id)
    {
        var book = (from b in _context.Books
                    where b.Id == id && b.DeletedAt == null
                    join c in _context.Categories on b.CategoryId equals c.Id
                    join c2 in _context.Categories on c.ParentId equals c2.Id
                    join p in _context.Providers on b.ProviderId equals p.Id
                    join pb in _context.Publishers on b.PublisherId equals pb.Id
                    join img in _context.Images on b.Id equals img.BookId into images
                    select new Book(b)
                    {
                        Category = new Category()
                        {
                            Id = c.Id,
                            Name = c.Name,
                            Parent = c2,
                        },
                        Provider = new Provider()
                        {
                            Id = p.Id,
                            Name = p.Name,

                        },
                        Publisher = new Publisher()
                        {
                            Id = pb.Id,
                            Name = pb.Name,
                            Description = pb.Description,
                        },
                        Images = images.Select(i => new Image()
                        {
                            Id = i.Id,
                            BookId = i.BookId,
                            Url = i.Url,
                        }).ToList()
                    }).FirstOrDefault();
        if (book == null)
        {
            throw new HttpResponseException(HttpStatusCode.NotFound, "Book not found");
        }
        return book;

    }

    public Book GetByAlias(string alias)
    {
        // join category, provider, publisher to book
        var book = (from b in _context.Books
                    where b.Alias == alias && b.DeletedAt == null
                    join c in _context.Categories on b.CategoryId equals c.Id
                    join c2 in _context.Categories on c.ParentId equals c2.Id
                    join p in _context.Providers on b.ProviderId equals p.Id
                    join pb in _context.Publishers on b.PublisherId equals pb.Id
                    join img in _context.Images on b.Id equals img.BookId into images
                    select new Book(b)
                    {
                        Category = new Category()
                        {
                            Id = c.Id,
                            Name = c.Name,
                            Parent = c2,
                        },
                        Provider = new Provider()
                        {
                            Id = p.Id,
                            Name = p.Name,

                        },
                        Publisher = new Publisher()
                        {
                            Id = pb.Id,
                            Name = pb.Name,
                            Description = pb.Description,
                        },
                        Images = images.Select(i => new Image()
                        {
                            Id = i.Id,
                            BookId = i.BookId,
                            Url = i.Url,
                        }).ToList()

                    }).FirstOrDefault();
        if (book == null)
        {
            throw new HttpResponseException(HttpStatusCode.NotFound, "Book not found");
        }
        return book;
    }



    public IEnumerable<dynamic> SearchByName(string name)
    {
        var books = _context.Books.Where(b => b.DeletedAt == null && (b.Name.Contains(name) || b.Title.Contains(name))).Select(b => new { Id = b.Id, Alias = b.Alias, Author = b.Author, Price = b.Price, Episode = b.Episode, Title = b.Title, Name = b.Name, ImageCover = b.ImageCover, Discount = b.Discount, }).ToList();
        return books;
    }
}