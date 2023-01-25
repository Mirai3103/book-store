using book_ecommerce.Models;
namespace book_ecommerce.Controllers.Models
{
    public record CreateBillRequestModel
    (
        ICollection<BillDetailRequestModel> BillDetails,
        uint? ShippingAddressId,
        DeliveryAddress? newAddress,
        int? UserId = null,
        string? PromoCode = null,
        bool? IsAnonymous = false

    );
    public record BillDetailRequestModel
    (
        uint BookId,
        uint Quantity
    );
}
