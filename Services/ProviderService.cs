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

    public dynamic CreateProvider(Provider provider)
    {
        _context.Providers.Add(provider);
        _context.SaveChanges();
        return provider;
    }

    public bool DeleteProvider(uint id)
    {
        var provider = _context.Providers.Find(id);
        if (provider is not null)
        {
            provider.DeletedAt = DateTime.Now;
            _context.SaveChanges();
            return true;
        }
        return false;
    }

    public IEnumerable<dynamic> GetAll()
    {
        return _context.Providers.Where(p => p.DeletedAt == null).Select(p => new
        {
            Id = p.Id,
            Name = p.Name,

        }).ToList();
    }

    public dynamic GetProvider(uint id)
    {
        var provider = _context.Providers.Find(id);
        if (provider is null) throw new HttpResponseException(System.Net.HttpStatusCode.NotFound, "Provider not found");
        return provider;
    }

    public dynamic UpdateProvider(Provider provider)
    {
        var oldProvider = _context.Providers.Find(provider.Id);
        if (oldProvider is null) throw new HttpResponseException(System.Net.HttpStatusCode.NotFound, "Provider not found");
        oldProvider.Name = provider.Name;
        _context.SaveChanges();
        return oldProvider;
    }
}