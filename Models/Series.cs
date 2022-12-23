using System;
using System.Collections.Generic;

namespace book_ecommerce.Models;

public partial class Series
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Alias { get; set; }

    public string Author { get; set; } = null!;

    public int NumberOfFollowers { get; set; }

    public DateTime? DeletedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public DateTime? CreatedAt { get; set; }

    public int? PublisherId { get; set; }

    public virtual ICollection<Book> Books { get; } = new List<Book>();

    public virtual Publisher? Publisher { get; set; }

    public virtual ICollection<User> Users { get; } = new List<User>();
}
