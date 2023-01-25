using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using book_ecommerce.Controllers.Models;
using book_ecommerce.Models;
using book_ecommerce.Services.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace book_ecommerce.Services
{
    public class AuthService : IAuthService
    {
        private readonly BookdataContext _context;
        public readonly IConfiguration _configuration;
        public AuthService(BookdataContext context, IConfiguration configuration)
        {
            this._context = context;
            this._configuration = configuration;
        }

        public string GenerateRefreshToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email!),
                new Claim(ClaimTypes.Role, user.Role.ToString()!),
            };
            var timeExpire = DateTime.Now.AddDays(7);
            return GenerateToken(claims, timeExpire);
        }
        public string GenerateToken(IEnumerable<Claim> claims, DateTime expires)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string GenerateAccessToken(string refreshToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JWT:Secret"]!);
            tokenHandler.ValidateToken(refreshToken, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidIssuer = _configuration["JWT:ValidIssuer"],
                ValidateAudience = true,
                ValidAudience = _configuration["JWT:ValidAudience"],
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);
            var jwtToken = (JwtSecurityToken)validatedToken;
            var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "nameid").Value);
            var user = _context.Users.Where(u => u.Id == userId && u.RefreshToken == refreshToken).FirstOrDefault();
            if (user == null)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized, "Unauthorized");
            }
            return GenerateAccessToken(user);
        }

        public string GenerateAccessToken(User user)
        {

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.GivenName, user.FullName!),
                new Claim(ClaimTypes.Role, user.Role.ToString()!),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email!),
                new Claim ("Avatar", user.Avatar!),
            };
            var timeExpire = DateTime.Now.AddMinutes(2);
            return GenerateToken(claims, timeExpire);
        }



        public User GetUserFromRefreshToken(string refreshToken)
        {
            var user = _context.Users.Where(u => u.RefreshToken == refreshToken).FirstOrDefault();
            if (user == null)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized, "Unauthorized");
            }
            return user;
        }

        public (string accessToken, string refreshToken, dynamic user) Login(string email, string password)
        {
            var user = _context.Users.Where(u => u.Email == email).FirstOrDefault();
            if (user == null)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized, "User with this email does not exist");
            }
            if (user.Password != password)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized, "Password is incorrect");
            }
            var accessToken = GenerateAccessToken(user);
            var refreshToken = GenerateRefreshToken(user);
            user.RefreshToken = refreshToken;
            _context.Update(user);
            _context.SaveChanges();
            return (accessToken, refreshToken, new
            {
                user.Id,
                user.FullName,
                user.Email,
                user.Avatar,
                user.Role,
                //Address = user.Address,
                user.Phone,
            });
        }

        public void Logout(string refreshToken)
        {
            var user = _context.Users.Where(u => u.RefreshToken == refreshToken).FirstOrDefault();
            if (user == null)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized, "User with this refresh token does not exist");
            }
            user.RefreshToken = null;
            _context.SaveChanges();

        }
        public (string accessToken, string refreshToken, dynamic user) Register(UserRegisterPayload user)
        {
            if (string.IsNullOrEmpty(user.Email))
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest, "User is required");
            }
            var existingUser = _context.Users.Where(u => u.Email == user.Email).FirstOrDefault();
            if (existingUser != null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest, "User with this email already exists");
            }
            if (string.IsNullOrEmpty(user.Password))
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest, "Password is required");
            }
            if (string.IsNullOrEmpty(user.FullName))
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest, "Name is required");
            }

            var newUser = new User
            {
                Email = user.Email,
                Password = user.Password,
                FullName = user.FullName,
                Phone = user.Phone,
                Avatar = user.Avatar,
                CreatedAt = DateTime.Now,
            };
            _context.Users.Add(
                newUser
                 );
            _context.SaveChanges();
            var accessToken = GenerateAccessToken(newUser);
            var refreshToken = GenerateRefreshToken(newUser);
            return (accessToken, refreshToken, new
            {
                newUser.Id,
                newUser.FullName,
                newUser.Email,
                newUser.Avatar,
                newUser.Role,

                newUser.Phone,
            });

        }

        public dynamic GetUserInfo(System.Security.Principal.IIdentity? identity)
        {
            if (identity == null)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized, "Unauthorized");
            }
            var userClaimsIndentity = identity as ClaimsIdentity;
            var userId = int.Parse(userClaimsIndentity!.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var user = _context.Users.Where(u => u.Id == userId).Select(u => new
            {
                u.Id,
                u.FullName,
                u.Email,
                u.Role,
                u.Avatar,
                u.CreatedAt,
                u.Phone,

            }).FirstOrDefault();
            if (user == null)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized, "Unauthorized");
            }
            return user;
        }

        public (string accessToken, dynamic user) RefreshToken(string refreshToken)
        {
            var user = GetUserFromRefreshToken(refreshToken);
            var accessToken = GenerateAccessToken(user);
            return (accessToken, new
            {
                user.Id,
                user.FullName,
                user.Email,
                user.Avatar,
                user.Role,
                user.Phone,
            });
        }
    }
}
