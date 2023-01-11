using book_ecommerce.Models;
namespace book_ecommerce.Services.Interface
{
    public interface IBillService
    {
        public bool CreateBill(Bill bill, IEnumerable<Billdetail> billDetails, string? promoCode);

    }
}
