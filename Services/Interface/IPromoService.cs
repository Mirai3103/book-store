using book_ecommerce.Models;
namespace book_ecommerce.Services.Interface
{
    public interface IPromoService
    {
        public IEnumerable<dynamic> GetValidPromoCodes();
        public bool CheckPromoCode(string promoCode);
        public dynamic? GetPromoCode(string promoCode);
    }
}