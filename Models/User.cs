using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace book_ecommerce.Models;
public enum Role
{
    ADMIN,
    USER,
    MANAGER
}

public partial class User
{
    public int Id { get; set; }
    [Required]

    public string FullName { get; set; } = null!;
    [Required]


    public string Email { get; set; } = null!;
    [Required]
    public string Password { get; set; } = null!;
    public string? Phone { get; set; }
    public string? Avatar { get; set; }
    public string? Address { get; set; }
    public Role Role { get; set; } = Models.Role.USER;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }
    public string? RefreshToken { get; set; }

    public virtual ICollection<Bill> Bills { get; } = new List<Bill>();

    public virtual ICollection<Cartdetail> Cartdetails { get; } = new List<Cartdetail>();

    public virtual ICollection<Review> Reviews { get; } = new List<Review>();

    public virtual Userpayment? Userpayment { get; set; }

    public virtual ICollection<Series> Series { get; } = new List<Series>();
}
