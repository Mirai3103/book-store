using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace book_ecommerce.Models;

public enum BillStatus { PENDING, PAID, CANCELLED }

public partial class Bill
{

    public int Id { get; set; }

    public int UserId { get; set; }

    public decimal? TotalBill { get; set; }

    [Required]
    public string? Address { get; set; }
    public BillStatus? Status { get; set; } = BillStatus.PENDING;

    public int? PromoCodeId
    { get; set; }

    public ulong? IsPaid { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual ICollection<Billdetail> Billdetails { get; } = new List<Billdetail>();

    public virtual Promocode? PromoCode { get; set; }

    public virtual User? User { get; set; }
}
