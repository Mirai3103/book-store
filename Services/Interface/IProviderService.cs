
using book_ecommerce.Models;
namespace book_ecommerce.Services.Interface;
public interface IProviderService
{
    public IEnumerable<dynamic> GetAll();
}