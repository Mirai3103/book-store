
using book_ecommerce.Models;
namespace book_ecommerce.Services.Interface;
public interface IProviderService
{
    public IEnumerable<dynamic> GetAll();
    public dynamic CreateProvider(Provider provider);
    public dynamic UpdateProvider(Provider provider);
    public bool DeleteProvider(uint id);
    public dynamic GetProvider(uint id);

}