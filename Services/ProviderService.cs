using book_ecommerce.Models;
using book_ecommerce.Services.Interface;


namespace book_ecommerce.Services;

public class ProviderSerice : IProviderService
{
    private readonly BookdataContext _context;
    public ProviderSerice(BookdataContext context)
    {
        _context = context;
    }
    public IEnumerable<dynamic> GetAll()
    {
        return _context.Providers.Where(p => p.DeletedAt == null).Select(p => new
        {
            Id = p.Id,
            Name = p.Name,

        }).ToList();
    }
}