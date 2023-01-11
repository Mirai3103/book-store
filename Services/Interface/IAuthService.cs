using book_ecommerce.Models;
namespace book_ecommerce.Services.Interface
{
    public interface IAuthService
    {

        public (string accessToken, string refreshToken) Login(string email, string password);
        public (string accessToken, string refreshToken) Register(User user);
        public void Logout(string refreshToken);
        dynamic? GetUserInfo(System.Security.Principal.IIdentity? identity);
    }
}
