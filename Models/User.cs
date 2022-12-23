using System;
using System.Collections.Generic;

namespace book_ecommerce.Models;

public partial class User
{
    public int Id { get; set; }

    public string? FullName { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public string? Role { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual ICollection<Bill> Bills { get; } = new List<Bill>();

    public virtual ICollection<Cartdetail> Cartdetails { get; } = new List<Cartdetail>();

    public virtual ICollection<Review> Reviews { get; } = new List<Review>();

    public virtual Userpayment? Userpayment { get; set; }

    public virtual ICollection<Series> Series { get; } = new List<Series>();
}
