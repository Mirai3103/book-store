using book_ecommerce.Controllers.Models;
using book_ecommerce.Models;
namespace book_ecommerce.Services.Interface
{
    public interface IAuthService
    {

        public (string accessToken, string refreshToken, dynamic user) Login(string email, string password);
        public (string accessToken, string refreshToken, dynamic user) Register(UserRegisterPayload user);
        public void Logout(string refreshToken);
        dynamic? GetUserInfo(System.Security.Principal.IIdentity? identity);
        public (string accessToken, dynamic user) RefreshToken(string refreshToken);
    }
}
