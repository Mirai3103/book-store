using System;
using System.Collections.Generic;

namespace book_ecommerce.Models;

public partial class Image
{
    public int Id { get; set; }

    public int BookId { get; set; }

    public string Url { get; set; } = null!;

    public virtual Book Book { get; set; } = null!;
}
