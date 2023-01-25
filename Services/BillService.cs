
using book_ecommerce.Services.Interface;
using book_ecommerce.Models;
using book_ecommerce.Controllers.Models;
namespace book_ecommerce.Services
{
    public class BillService : IBillService
    {
        private readonly BookdataContext _context;
        public BillService(BookdataContext context)
        {
            _context = context;
        }
        public bool CreateBill(CreateBillRequestModel request)
        {
            var shippingAddress = _context.DeliveryAddresses.FirstOrDefault(s => s.Id == request.ShippingAddressId);
            if (shippingAddress == null)
            {
                throw new HttpResponseException(System.Net.HttpStatusCode.NotFound, "Shipping address not found");
            }
            var newBill = new Bill()
            {
                DeliveryAddressId = request.ShippingAddressId,
                UserId = request.UserId ?? 1,
                CreatedAt = DateTime.Now
            };
            if (request.PromoCode != null)
            {
                var existPromoCode = _context.Promocodes.FirstOrDefault(p => p.Code == request.PromoCode && p.DeletedAt == null && p.StartDate <= DateTime.Now && p.EndDate >= DateTime.Now);
                if (existPromoCode == null)
                {
                    throw new HttpResponseException(System.Net.HttpStatusCode.BadRequest, $"Promo code {request.PromoCode} is not exist");
                }
                if (existPromoCode.EndDate < DateTime.Now && existPromoCode.Stock > 0)
                {
                    newBill.PromoCode = existPromoCode;
                    existPromoCode.Stock -= 1;
                }
            }

            _context.Bills.Add(newBill);
            _context.SaveChanges();
            var listBillDetails = new List<Billdetail>();
            foreach (var item in request.BillDetails)
            {
                var existDetail = listBillDetails.Where(b => b.BookId == item.BookId).FirstOrDefault();
                if (existDetail == null)
                {
                    var book = _context.Books.Where(b => b.Id == item.BookId).Select(b => new Book { Id = b.Id, Price = b.Price, Discount = b.Discount, Stock = b.Stock, Title = b.Title }).FirstOrDefault();
                    if (book == null)
                    {
                        throw new HttpResponseException(System.Net.HttpStatusCode.BadRequest, $"Book with id {item.BookId} not found");
                    }
                    if (book.Stock < item.Quantity)
                    {
                        throw new HttpResponseException(System.Net.HttpStatusCode.BadRequest, $"Item {book.Title} is out of stock");
                    }
                    listBillDetails.Add(new Billdetail()
                    {
                        BookId = book.Id,
                        BillId = newBill.Id,
                        Price = (decimal)(book.Price! - book.Price! * book.Discount / 100) * item.Quantity,
                        Quantity = item.Quantity,
                        Bill = newBill,
                    });
                }
                else
                {
                    existDetail.Quantity += item.Quantity;
                }
            }
            newBill.TotalBill = listBillDetails.Sum(b => b.Price);
            _context.Billdetails.AddRange(listBillDetails);
            _context.SaveChanges();
            // update change from db to bill
            return true;

        }
    }

}
