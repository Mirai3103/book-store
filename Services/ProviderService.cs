using book_ecommerce.Models;

namespace book_ecommerce.Servies;

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