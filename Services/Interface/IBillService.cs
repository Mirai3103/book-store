using book_ecommerce.Models;
using book_ecommerce.Controllers.Models;
namespace book_ecommerce.Services.Interface
{
    public interface IBillService
    {
        public bool CreateBill(CreateBillRequestModel model);

    }
}
