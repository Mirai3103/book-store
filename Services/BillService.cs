
using book_ecommerce.Services.Interface;
using book_ecommerce.Models;
namespace book_ecommerce.Services
{
    public class BillService : IBillService
    {
        private readonly BookdataContext _context;
        public BillService(BookdataContext context)
        {
            _context = context;
        }
        public bool CreateBill(Bill bill, IEnumerable<Billdetail> billDetails, string? promoCode = null)
        {
            var newBill = new Bill()
            {
                Address = bill.Address,
                UserId = bill.UserId,
                CreatedAt = DateTime.Now
            };
            if (promoCode != null)
            {
                var existPromoCode = _context.Promocodes.FirstOrDefault(p => p.Code == promoCode);
                if (existPromoCode == null)
                {
                    throw new HttpResponseException(System.Net.HttpStatusCode.BadRequest, $"Promo code {promoCode} is not exist");
                }
                if (existPromoCode.EndDate < DateTime.Now && existPromoCode.Stock > 0)
                {
                    bill.PromoCode = existPromoCode;
                    existPromoCode.Stock -= 1;
                }
            }

            _context.Bills.Add(newBill);
            _context.SaveChanges();
            var listBillDetails = new List<Billdetail>();
            foreach (var item in billDetails)
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
                        Book = book,
                        BillId = newBill.Id,
                        Price = (decimal)(book.Price! - book.Price! * book.Discount / 100),
                        Quantity = item.Quantity,
                        Bill = newBill,
                    });
                }
                else
                {
                    existDetail.Quantity += item.Quantity;
                }
            }
            _context.Billdetails.AddRange(listBillDetails);
            _context.SaveChanges();
            return true;

        }
    }

}
