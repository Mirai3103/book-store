using System;
using System.Collections.Generic;

namespace book_ecommerce.Models;

public partial class Userpayment
{
    public int UserId { get; set; }

    public string? CardNumber { get; set; }

    public string? CardHolderName { get; set; }

    public string? CardType { get; set; }

    public DateTime? CardExpiryDate { get; set; }

    public string? CardCvv { get; set; }

    public virtual User User { get; set; } = null!;
}
