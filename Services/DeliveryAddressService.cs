using book_ecommerce.Models;
using book_ecommerce.Services.Interface;
using System.Net;

namespace book_ecommerce.Services
{
    public class DeliveryAddressService : IDeliveryAddressService
    {
        private readonly BookdataContext _context;
        public DeliveryAddressService(BookdataContext context)
        {
            _context = context;
        }
        public dynamic CreateDeliveryAddress(DeliveryAddress address)
        {
            var newAddress = new DeliveryAddress()
            {
                Address = address.Address,
                FullName = address.FullName,
                Phone = address.Phone,
                UserId = address.UserId,
                IsPrimary = _context.DeliveryAddresses.FirstOrDefault(d => d.UserId == address.UserId) is null
            };
            _context.DeliveryAddresses.Add(newAddress);
            _context.SaveChanges();
            return newAddress;
        }

        public bool DeleteDeliveryAddress(uint id, int userId)
        {
            var address = _context.DeliveryAddresses.Find(id);
            if (address is not null)
            {
                address.DeletedAt = DateTime.Now;
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        public IEnumerable<dynamic> GetAllOfUser(int userId)
        {
            return _context.DeliveryAddresses.Where(d => d.UserId == userId && d.DeletedAt == null).Select(d => new
            {
                d.Id,
                d.Address,
                d.FullName,
                d.Phone,
                d.IsPrimary,
                d.UserId,
            }).ToList();
        }

        public dynamic GetDeliveryAddress(uint id, int userId)
        {
            var address = _context.DeliveryAddresses.Find(id);
            if (address is null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound, "Delivery address not found");
            }
            if (address.UserId != userId || address.DeletedAt != null)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized, "You are not authorized to access this resource");
            }
            return new
            {
                address.Id,
                address.Address,
                address.FullName,
                address.Phone,
                address.IsPrimary,
                address.UserId,
            };
        }


        public bool SetAsPrimary(uint id, int userId)
        {
            var oldPrimary = _context.DeliveryAddresses.FirstOrDefault(d => d.IsPrimary == true && d.DeletedAt == null);
            if (oldPrimary is not null)
            {
                oldPrimary.IsPrimary = false;
            }
            var newPrimary = _context.DeliveryAddresses.FirstOrDefault(d => d.Id == id && d.UserId == userId && d.DeletedAt == null);
            if (newPrimary is null)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized, "You are not authorized to access this resource");
            }
            newPrimary.IsPrimary = true;
            _context.SaveChanges();
            return true;
        }

        public dynamic UpdateDeliveryAddress(DeliveryAddress address, int userId)
        {
            var needUpdate = _context.DeliveryAddresses.FirstOrDefault(d => d.Id == address.Id && d.UserId == userId && d.DeletedAt == null);
            if (needUpdate is null)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized, "You are not authorized to access this resource");
            }

            needUpdate.Address = address.Address;
            needUpdate.Phone = address.Phone;
            needUpdate.FullName = address.FullName;
            if (address.IsPrimary)
            {
                SetAsPrimary(address.Id, userId);
            }
            _context.SaveChanges();
            return new
            {
                needUpdate.UserId,
                needUpdate.Address,
                needUpdate.IsPrimary,
                needUpdate.Phone,
            };
        }
    }
}
