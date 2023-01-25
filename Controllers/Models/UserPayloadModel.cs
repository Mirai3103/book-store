namespace book_ecommerce.Controllers.Models;


public record UserRegisterPayload(
    string Email,
    string Password,
    string Name,
    string Phone,
    string FullName,
    string? Address = null,
    string? Avatar = null
);


public record LoginRequest
(
    string Email,
    string Password
);
