﻿using System;
using System.Collections.Generic;

namespace book_ecommerce.Models;

public partial class Category
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public DateTime? DeletedAt { get; set; }

    public int? ParentId { get; set; }

    public virtual ICollection<Book>? Books { get; set; } = new List<Book>();

    public virtual ICollection<Category>? InverseParent { get; set; } = new List<Category>();

    public virtual Category? Parent { get; set; }
}
