using book_ecommerce.Models;
using book_ecommerce.Services.Interface;
using Microsoft.EntityFrameworkCore;
namespace book_ecommerce.Services;
public class UserService : IUserService
{
    private readonly BookdataContext _context;

    public UserService(BookdataContext context)
    {
        _context = context;
    }

    public void ClearCart(int userId)
    {
        var cart = _context.Cartdetails.Where(x => x.UserId == userId).ToList();
        _context.Cartdetails.RemoveRange(cart);
        _context.SaveChanges();
    }

    public IEnumerable<dynamic> GetCartDetails(int userId)
    {
        var cartDetails = _context.Cartdetails
            .Include(cd => cd.Book)
            .Where(cd => cd.UserId == userId)
            .Select(cd => new
            {
                Book = new { Id = cd.Book.Id, Alias = cd.Book.Alias, Author = cd.Book.Author, Price = cd.Book.Price, Episode = cd.Book.Episode, Title = cd.Book.Title, Name = cd.Book.Name, ImageCover = cd.Book.ImageCover, Discount = cd.Book.Discount, },
                BookId = cd.BookId,
                UserId = cd.UserId,
                CreatedAt = cd.CreatedAt,
                Quantity = cd.Quantity,
            }).ToList();
        return cartDetails;

    }

    public void UpdateBookToCart(int userId, int bookId, int amount, bool isSet = false)
    {
        if (amount == 0)
        {
            //remove
            var b = _context.Cartdetails.FirstOrDefault(cd => cd.UserId == userId && cd.BookId == bookId);

            if (b != null) _context.Cartdetails.Remove(b);
            _context.SaveChanges();
            return;
        }
        var book = _context.Books.Find(bookId);
        if (book == null)
        {
            throw new HttpResponseException(System.Net.HttpStatusCode.NotFound, "Book not found");
        }
        var existCartDetail = _context.Cartdetails.Where(cd => cd.UserId == userId && cd.BookId == bookId).FirstOrDefault();
        if (existCartDetail == null)
        {
            var cartDetail = new Cartdetail
            {
                BookId = bookId,
                UserId = userId,
                Quantity = amount,
                CreatedAt = DateTime.Now,
            };
            _context.Cartdetails.Add(cartDetail);
        }
        else
        {
            if (isSet)
            {
                existCartDetail.Quantity = amount;
            }
            else
            {
                existCartDetail.Quantity += amount;
            }
            if (existCartDetail.Quantity <= 0)
            {
                _context.Cartdetails.Remove(existCartDetail);
            }
            else
            {
                _context.Cartdetails.Update(existCartDetail);
            }
        }
        _context.SaveChanges();

    }
}
