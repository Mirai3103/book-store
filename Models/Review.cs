using System;
using System.Collections.Generic;

namespace book_ecommerce.Models;

public partial class Review
{
    public int Id { get; set; }

    public int? BookId { get; set; }

    public int? UserId { get; set; }

    public string? Content { get; set; }

    public int? Rating { get; set; }

    public int? Likes { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual Book? Book { get; set; }

    public virtual User? User { get; set; }
}
