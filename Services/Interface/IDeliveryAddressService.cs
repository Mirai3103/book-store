using book_ecommerce.Models;

namespace book_ecommerce.Services.Interface
{
    public interface IDeliveryAddressService
    {
        public IEnumerable<dynamic> GetAllOfUser(int userId);
        public dynamic CreateDeliveryAddress(DeliveryAddress address);
        public dynamic UpdateDeliveryAddress(DeliveryAddress address, int userId);
        public bool DeleteDeliveryAddress(uint id, int userId);
        public dynamic GetDeliveryAddress(uint id, int userId);
        public bool SetAsPrimary(uint id, int userId);
    }
}
