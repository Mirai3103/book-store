using System;
using System.Collections.Generic;

namespace book_ecommerce.Models;

public partial class Provider
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public DateTime? DeletedAt { get; set; }

    public virtual ICollection<Book> Books { get; } = new List<Book>();
}
