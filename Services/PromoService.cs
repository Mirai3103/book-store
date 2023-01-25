
using System.Linq;
using System.Net;
using book_ecommerce.Services.Interface;
using book_ecommerce.Models;
namespace book_ecommerce.Services;

public class PromoService : IPromoService
{
    private readonly BookdataContext _context;
    public PromoService(BookdataContext context)
    {
        _context = context;
    }
    public bool CheckPromoCode(string promoCode)
    {
        var promo = _context.Promocodes.FirstOrDefault(p => p.Code == promoCode && p.DeletedAt == null && p.EndDate > System.DateTime.Now && p.StartDate < System.DateTime.Now);

        return promo != null;
    }

    public dynamic? GetPromoCode(string promoCode)
    {
        var promo = _context.Promocodes.FirstOrDefault(p => p.Code == promoCode && p.DeletedAt == null && p.EndDate > System.DateTime.Now && p.StartDate < System.DateTime.Now);

        if (promo == null)
        {
            return null;
        }

        return new
        {
            promo.AllowMultiple,
            promo.ApplyTo,
            promo.ApplyToCategory,
            promo.ApplyToCategoryID,
            promo.Code,
            promo.Name,
            promo.Description,
            promo.Discount,
            promo.Type,
            promo.StartDate,
            promo.EndDate,
            promo.CreatedAt,
            promo.MaxDiscount,
            promo.MinOrderAmount,
            promo.Stock,
        };
    }

    public IEnumerable<dynamic> GetValidPromoCodes()
    {
        var promos = _context.Promocodes.Where(p => p.DeletedAt == null && p.EndDate > System.DateTime.Now && p.StartDate < System.DateTime.Now).Select(p => new
        {
            p.AllowMultiple,
            p.ApplyTo,
            p.ApplyToCategory,
            p.ApplyToCategoryID,
            p.Code,
            p.Name,
            p.Description,
            p.Discount,
            p.Type,
            p.StartDate,
            p.EndDate,
            p.CreatedAt,
            p.MaxDiscount,
            p.MinOrderAmount,
            p.Stock,
        }).ToList();

        return promos;
    }
}