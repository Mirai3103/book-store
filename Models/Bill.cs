﻿using System;
using System.Collections.Generic;

namespace book_ecommerce.Models;

public partial class Bill
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public decimal? TotalBill { get; set; }

    public int? PromoCodeId { get; set; }

    public ulong? IsPaid { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual ICollection<Billdetail> Billdetails { get; } = new List<Billdetail>();

    public virtual Promocode? PromoCode { get; set; }

    public virtual User? User { get; set; }
}
