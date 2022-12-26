using System;
using System.Collections.Generic;

namespace book_ecommerce.Models;

public partial class Book
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Title { get; set; } = null!;

    public string? Alias { get; set; }

    public string? Author { get; set; }

    public string BookCoverType { get; set; } = null!;

    public int? Price { get; set; }

    public string? TranslatorName { get; set; }

    public string? PublishYear { get; set; }

    public string? Language { get; set; }

    public decimal? Weight { get; set; }

    public string? Size { get; set; }

    public int? NumberOfPages { get; set; }

    public string? Description { get; set; }

    public string? Episode { get; set; }

    public int Stock { get; set; }

    public decimal Discount { get; set; }

    public string? AgeGroup { get; set; }

    public string? Level { get; set; }

    public string? Grade { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public string ImageCover { get; set; } = null!;

    public int? ProviderId { get; set; }

    public int? PublisherId { get; set; }

    public int? SeriesId { get; set; }

    public int? CategoryId { get; set; }

    public virtual ICollection<Billdetail> Billdetails { get; } = new List<Billdetail>();

    public virtual ICollection<Cartdetail> Cartdetails { get; } = new List<Cartdetail>();

    public virtual Category? Category { get; set; }

    public virtual ICollection<Image> Images { get; set; } = new List<Image>();

    public virtual Provider? Provider { get; set; }

    public virtual Publisher? Publisher { get; set; }

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual Series? Series { get; set; }
    public Book(Book otherBook)
    {
        this.Id = otherBook.Id;
        this.Name = otherBook.Name;
        this.Title = otherBook.Title;
        this.Alias = otherBook.Alias;
        this.Author = otherBook.Author;
        this.BookCoverType = otherBook.BookCoverType;
        this.Price = otherBook.Price;
        this.TranslatorName = otherBook.TranslatorName;
        this.PublishYear = otherBook.PublishYear;
        this.Language = otherBook.Language;
        this.Weight = otherBook.Weight;
        this.Size = otherBook.Size;
        this.NumberOfPages = otherBook.NumberOfPages;
        this.Description = otherBook.Description;
        this.Episode = otherBook.Episode;
        this.Stock = otherBook.Stock;
        this.Discount = otherBook.Discount;
        this.AgeGroup = otherBook.AgeGroup;
        this.Level = otherBook.Level;
        this.Grade = otherBook.Grade;
        this.CreatedAt = otherBook.CreatedAt;
        this.UpdatedAt = otherBook.UpdatedAt;
        this.DeletedAt = otherBook.DeletedAt;
        this.ImageCover = otherBook.ImageCover;
        this.ProviderId = otherBook.ProviderId;
        this.PublisherId = otherBook.PublisherId;
        this.SeriesId = otherBook.SeriesId;
        this.CategoryId = otherBook.CategoryId;

    }
    public Book()
    {
    }
}
