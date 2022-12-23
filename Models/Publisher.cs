using System;
using System.Collections.Generic;

namespace book_ecommerce.Models;

public partial class Publisher
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateTime? DeletedAt { get; set; }

    public virtual ICollection<Book> Books { get; } = new List<Book>();

    public virtual ICollection<Series> Series { get; } = new List<Series>();
}
