using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace book_ecommerce.Models;

public partial class BookdataContext : DbContext
{
    public BookdataContext()
    {
    }

    public BookdataContext(DbContextOptions<BookdataContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Bill> Bills { get; set; } = null!;

    public virtual DbSet<Billdetail> Billdetails { get; set; } = null!;

    public virtual DbSet<Book> Books { get; set; } = null!;

    public virtual DbSet<Cartdetail> Cartdetails { get; set; } = null!;

    public virtual DbSet<Category> Categories { get; set; } = null!;

    public virtual DbSet<Image> Images { get; set; } = null!;

    public virtual DbSet<Promocode> Promocodes { get; set; } = null!;

    public virtual DbSet<Provider> Providers { get; set; } = null!;

    public virtual DbSet<Publisher> Publishers { get; set; } = null!;

    public virtual DbSet<Review> Reviews { get; set; } = null!;

    public virtual DbSet<Series> Series { get; set; } = null!;

    public virtual DbSet<User> Users { get; set; } = null!;

    public virtual DbSet<Userpayment> Userpayments { get; set; } = null!;
    public virtual DbSet<DeliveryAddress> DeliveryAddresses { get; set; } = null!;
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseMySql("server=localhost;port=3306;database=bookdata;uid=root", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.30-mysql"));
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Bill>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("bill");

            entity.HasIndex(e => e.PromoCodeId, "PromoCodeId");

            entity.HasIndex(e => e.UserId, "UserId");

            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            entity.Property(e => e.CreatedAt).HasColumnType("datetime");
            entity.Property(e => e.DeletedAt).HasColumnType("datetime");
            entity.Property(e => e.IsPaid).HasColumnType("bit(1)");
            entity.Property(e => e.TotalBill).HasPrecision(10);

            entity.HasOne(d => d.PromoCode).WithMany(p => p.Bills)
                .HasForeignKey(d => d.PromoCodeId)
                .HasConstraintName("bill_ibfk_2");

            entity.HasOne(d => d.User).WithMany(p => p.Bills)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("bill_ibfk_1");
        });

        modelBuilder.Entity<Billdetail>(entity =>
        {
            entity.HasKey(e => new { e.BillId, e.BookId })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

            entity.ToTable("billdetail");

            entity.HasIndex(e => e.BookId, "BookId");

            entity.Property(e => e.Price).HasPrecision(10);

            entity.HasOne(d => d.Bill).WithMany(p => p.Billdetails)
                .HasForeignKey(d => d.BillId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("billdetail_ibfk_1");

            entity.HasOne(d => d.Book).WithMany(p => p.Billdetails)
                .HasForeignKey(d => d.BookId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("billdetail_ibfk_2");
        });

        modelBuilder.Entity<Book>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("book");

            entity.HasIndex(e => e.Alias, "IDX_2e95e271f67f2ea98d12f0013e").IsUnique();

            entity.HasIndex(e => e.CategoryId, "categoryId");

            entity.HasIndex(e => e.ProviderId, "providerId");

            entity.HasIndex(e => e.PublisherId, "publisherId");

            entity.HasIndex(e => e.SeriesId, "seriesId");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AgeGroup)
                .HasMaxLength(255)
                .HasColumnName("ageGroup");
            entity.Property(e => e.Alias).HasColumnName("alias");
            entity.Property(e => e.Author)
                .HasMaxLength(255)
                .HasColumnName("author");
            entity.Property(e => e.BookCoverType)
                .HasColumnType("enum('Bìa Cứng','Bìa Mềm','Ebook')")
                .HasColumnName("bookCoverType");
            entity.Property(e => e.CategoryId).HasColumnName("categoryId");
            entity.Property(e => e.CreatedAt)
                .HasMaxLength(6)
                .HasDefaultValueSql("CURRENT_TIMESTAMP(6)")
                .HasColumnName("createdAt");
            entity.Property(e => e.DeletedAt)
                .HasColumnType("datetime")
                .HasColumnName("deletedAt");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.Discount)
                .HasPrecision(10)
                .HasColumnName("discount");
            entity.Property(e => e.Episode)
                .HasMaxLength(255)
                .HasColumnName("episode");
            entity.Property(e => e.Grade)
                .HasMaxLength(255)
                .HasColumnName("grade");
            entity.Property(e => e.ImageCover)
                .HasMaxLength(255)
                .HasColumnName("imageCover");
            entity.Property(e => e.Language)
                .HasMaxLength(255)
                .HasColumnName("language");
            entity.Property(e => e.Level)
                .HasMaxLength(255)
                .HasColumnName("level");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.NumberOfPages).HasColumnName("numberOfPages");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.ProviderId).HasColumnName("providerId");
            entity.Property(e => e.PublishYear)
                .HasMaxLength(15)
                .HasColumnName("publishYear");
            entity.Property(e => e.PublisherId).HasColumnName("publisherId");
            entity.Property(e => e.SeriesId).HasColumnName("seriesId");
            entity.Property(e => e.Size)
                .HasMaxLength(255)
                .HasColumnName("size");
            entity.Property(e => e.Stock).HasColumnName("stock");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .HasColumnName("title");
            entity.Property(e => e.TranslatorName)
                .HasMaxLength(255)
                .HasColumnName("translatorName");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updatedAt");
            entity.Property(e => e.Weight)
                .HasPrecision(10)
                .HasColumnName("weight");

            entity.HasOne(d => d.Category).WithMany(p => p.Books)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("book_ibfk_4");

            entity.HasOne(d => d.Provider).WithMany(p => p.Books)
                .HasForeignKey(d => d.ProviderId)
                .HasConstraintName("book_ibfk_1");

            entity.HasOne(d => d.Publisher).WithMany(p => p.Books)
                .HasForeignKey(d => d.PublisherId)
                .HasConstraintName("book_ibfk_2");

            entity.HasOne(d => d.Series).WithMany(p => p.Books)
                .HasForeignKey(d => d.SeriesId)
                .HasConstraintName("book_ibfk_3");
        });

        modelBuilder.Entity<Cartdetail>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.BookId })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

            entity.ToTable("cartdetail");

            entity.HasIndex(e => e.BookId, "BookId");

            entity.Property(e => e.CreatedAt).HasColumnType("datetime");
            entity.Property(e => e.DeletedAt).HasColumnType("datetime");
            entity.Property(e => e.UpdatedAt).HasColumnType("datetime");

            entity.HasOne(d => d.Book).WithMany(p => p.Cartdetails)
                .HasForeignKey(d => d.BookId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("cartdetail_ibfk_2");

            entity.HasOne(d => d.User).WithMany(p => p.Cartdetails)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("cartdetail_ibfk_1");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("category");

            entity.HasIndex(e => e.ParentId, "parentId");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DeletedAt)
                .HasColumnType("datetime")
                .HasColumnName("deletedAt");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.ParentId).HasColumnName("parentId");

            entity.HasOne(d => d.Parent).WithMany(p => p.InverseParent)
                .HasForeignKey(d => d.ParentId)
                .HasConstraintName("category_ibfk_1");
        });

        modelBuilder.Entity<Image>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("image");

            entity.HasIndex(e => e.BookId, "BookId");

            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            entity.Property(e => e.Url)
                .HasMaxLength(255)
                .HasColumnName("url");

            entity.HasOne(d => d.Book).WithMany(p => p.Images)
                .HasForeignKey(d => d.BookId)
                .HasConstraintName("image_ibfk_1");
        });

        modelBuilder.Entity<Promocode>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("promocode");

            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            entity.Property(e => e.Code).HasMaxLength(255);
            entity.Property(e => e.CreatedAt).HasColumnType("datetime");
            entity.Property(e => e.DeletedAt).HasColumnType("datetime");
            entity.Property(e => e.Discount).HasPrecision(10);
            entity.Property(e => e.EndDate).HasColumnType("datetime");
            //entity.Property(e => e.PromoType).HasColumnType("enum('Delivery','TotalBill')");
            entity.Property(e => e.StartDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<Provider>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("provider");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DeletedAt)
                .HasColumnType("datetime")
                .HasColumnName("deletedAt");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Publisher>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("publisher");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DeletedAt)
                .HasColumnType("datetime")
                .HasColumnName("deletedAt");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasDefaultValueSql("''")
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("review");

            entity.HasIndex(e => e.BookId, "BookId");

            entity.HasIndex(e => e.UserId, "UserId");

            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            entity.Property(e => e.Content).HasMaxLength(255);
            entity.Property(e => e.CreatedAt).HasColumnType("datetime");
            entity.Property(e => e.DeletedAt).HasColumnType("datetime");
            entity.Property(e => e.UpdatedAt).HasColumnType("datetime");

            entity.HasOne(d => d.Book).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.BookId)
                .HasConstraintName("review_ibfk_1");

            entity.HasOne(d => d.User).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("review_ibfk_2");
        });

        modelBuilder.Entity<Series>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("series");

            entity.HasIndex(e => e.Alias, "IDX_e0f05a7743bb6ef16918bddcd5").IsUnique();

            entity.HasIndex(e => e.PublisherId, "publisherId");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Alias).HasColumnName("alias");
            entity.Property(e => e.Author).HasMaxLength(255);
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.DeletedAt)
                .HasColumnType("datetime")
                .HasColumnName("deletedAt");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.NumberOfFollowers).HasColumnName("numberOfFollowers");
            entity.Property(e => e.PublisherId).HasColumnName("publisherId");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updatedAt");

            entity.HasOne(d => d.Publisher).WithMany(p => p.Series)
                .HasForeignKey(d => d.PublisherId)
                .HasConstraintName("FK_83d5fa146d00f7ce42c9c995d05");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("user");

            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            entity.Property(e => e.CreatedAt).HasColumnType("datetime");
            entity.Property(e => e.DeletedAt).HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.FullName).HasMaxLength(255);
            entity.Property(e => e.Password).HasMaxLength(255);
            entity.Property(e => e.Role).HasMaxLength(255);
            entity.Property(e => e.UpdatedAt).HasColumnType("datetime");

            entity.HasMany(d => d.Series).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "Userfollowseries",
                    r => r.HasOne<Series>().WithMany()
                        .HasForeignKey("SeriesId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("userfollowseries_ibfk_2"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("userfollowseries_ibfk_1"),
                    j =>
                    {
                        j.HasKey("UserId", "SeriesId")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("userfollowseries");
                        j.HasIndex(new[] { "SeriesId" }, "SeriesId");
                    });
        });

        modelBuilder.Entity<Userpayment>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PRIMARY");

            entity.ToTable("userpayment");

            entity.Property(e => e.UserId).ValueGeneratedOnAdd();
            entity.Property(e => e.CardCvv)
                .HasMaxLength(255)
                .HasColumnName("CardCVV");
            entity.Property(e => e.CardExpiryDate).HasColumnType("datetime");
            entity.Property(e => e.CardHolderName).HasMaxLength(255);
            entity.Property(e => e.CardNumber).HasMaxLength(255);
            entity.Property(e => e.CardType).HasMaxLength(255);

            entity.HasOne(d => d.User).WithOne(p => p.Userpayment)
                .HasForeignKey<Userpayment>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("userpayment_ibfk_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
