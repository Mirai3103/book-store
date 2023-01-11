using System;
using System.Collections.Generic;

namespace book_ecommerce.Models;
using System.ComponentModel.DataAnnotations;


public partial class Billdetail
{
    public int BillId { get; set; }
    [Required]

    public int BookId { get; set; }
    [Required]

    public uint Quantity { get; set; }

    public decimal Price { get; set; }

    public virtual Bill Bill { get; set; } = null!;

    public virtual Book Book { get; set; } = null!;
}
