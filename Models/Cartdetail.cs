using System;
using System.Collections.Generic;

namespace book_ecommerce.Models;

public partial class Cartdetail
{
    public int UserId { get; set; }

    public int BookId { get; set; }

    public int? Quantity { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual Book Book { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
