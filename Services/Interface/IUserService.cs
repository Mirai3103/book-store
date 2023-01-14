using book_ecommerce.Models;
namespace book_ecommerce.Services.Interface
{
    public interface IUserService
    {
        public IEnumerable<dynamic> GetCartDetails(int userId);
        public void UpdateBookToCart(int userId, int bookId, int amount, bool isSet = false);
        public void ClearCart(int userId);

    }
}