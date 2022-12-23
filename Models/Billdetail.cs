using System;
using System.Collections.Generic;

namespace book_ecommerce.Models;

public partial class Billdetail
{
    public int BillId { get; set; }

    public int BookId { get; set; }

    public int? Quantity { get; set; }

    public decimal? Price { get; set; }

    public virtual Bill Bill { get; set; } = null!;

    public virtual Book Book { get; set; } = null!;
}
