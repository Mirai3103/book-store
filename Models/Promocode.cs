using System;
using System.Collections.Generic;

namespace book_ecommerce.Models;

public partial class Promocode
{
    public int Id { get; set; }

    public string? Code { get; set; }

    public decimal? Discount { get; set; }

    public string? PromoType { get; set; }

    public int? Stock { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual ICollection<Bill> Bills { get; } = new List<Bill>();
}
