using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace book_ecommerce.Models;
public enum PromocodeType
{
    Percentage,
    Fixed
}
public enum ApplyTo
{
    Total,
    Shipping
}

public partial class Promocode
{
    public int Id { get; set; }

    public string? Code { get; set; }
    public string? Description { get; set; }
    public string? Name { get; set; }

    public decimal? Discount { get; set; }
    public uint? MaxDiscount { get; set; }
    public uint? MinOrderAmount { get; set; }

    //public string? PromoType { get; set; }
    public PromocodeType Type { get; set; }
    public ApplyTo ApplyTo { get; set; }

    public int? Stock { get; set; }
    public int? ApplyToCategoryID { get; set; }
    [ForeignKey("ApplyToCategoryID")]
    public virtual Category? ApplyToCategory { get; set; }
    public bool AllowMultiple { get; set; } = false;

    public DateTime? StartDate { get; set; } = DateTime.Now;

    public DateTime? EndDate { get; set; } = DateTime.Now + TimeSpan.FromDays(30);

    public DateTime? CreatedAt { get; set; } = DateTime.Now;

    public DateTime? DeletedAt { get; set; }

    public virtual ICollection<Bill> Bills { get; } = new List<Bill>();
}
