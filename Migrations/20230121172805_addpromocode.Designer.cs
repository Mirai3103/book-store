﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using book_ecommerce.Models;

#nullable disable

namespace bookecommerce.Migrations
{
    [DbContext(typeof(BookdataContext))]
    [Migration("20230121172805_addpromocode")]
    partial class addpromocode
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseCollation("utf8mb4_0900_ai_ci")
                .HasAnnotation("ProductVersion", "7.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.HasCharSet(modelBuilder, "utf8mb4");

            modelBuilder.Entity("Userfollowseries", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("SeriesId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "SeriesId")
                        .HasName("PRIMARY")
                        .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                    b.HasIndex(new[] { "SeriesId" }, "SeriesId");

                    b.ToTable("userfollowseries", (string)null);
                });

            modelBuilder.Entity("book_ecommerce.Models.Bill", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime");

                    b.Property<ulong?>("IsPaid")
                        .HasColumnType("bit(1)");

                    b.Property<int?>("PromoCodeId")
                        .HasColumnType("int");

                    b.Property<int?>("Status")
                        .HasColumnType("int");

                    b.Property<decimal?>("TotalBill")
                        .HasPrecision(10)
                        .HasColumnType("decimal(10)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "PromoCodeId" }, "PromoCodeId");

                    b.HasIndex(new[] { "UserId" }, "UserId");

                    b.ToTable("bill", (string)null);
                });

            modelBuilder.Entity("book_ecommerce.Models.Billdetail", b =>
                {
                    b.Property<int>("BillId")
                        .HasColumnType("int");

                    b.Property<int>("BookId")
                        .HasColumnType("int");

                    b.Property<decimal>("Price")
                        .HasPrecision(10)
                        .HasColumnType("decimal(10)");

                    b.Property<uint>("Quantity")
                        .HasColumnType("int unsigned");

                    b.HasKey("BillId", "BookId")
                        .HasName("PRIMARY")
                        .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                    b.HasIndex(new[] { "BookId" }, "BookId");

                    b.ToTable("billdetail", (string)null);
                });

            modelBuilder.Entity("book_ecommerce.Models.Book", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<string>("AgeGroup")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("ageGroup");

                    b.Property<string>("Alias")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("alias");

                    b.Property<string>("Author")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("author");

                    b.Property<string>("BookCoverType")
                        .IsRequired()
                        .HasColumnType("enum('Bìa Cứng','Bìa Mềm','Ebook')")
                        .HasColumnName("bookCoverType");

                    b.Property<int?>("CategoryId")
                        .HasColumnType("int")
                        .HasColumnName("categoryId");

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(6)
                        .HasColumnType("datetime(6)")
                        .HasColumnName("createdAt")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP(6)");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime")
                        .HasColumnName("deletedAt");

                    b.Property<string>("Description")
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<decimal>("Discount")
                        .HasPrecision(10)
                        .HasColumnType("decimal(10)")
                        .HasColumnName("discount");

                    b.Property<string>("Episode")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("episode");

                    b.Property<string>("Grade")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("grade");

                    b.Property<string>("ImageCover")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("imageCover");

                    b.Property<string>("Language")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("language");

                    b.Property<string>("Level")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("level");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("name");

                    b.Property<int?>("NumberOfPages")
                        .HasColumnType("int")
                        .HasColumnName("numberOfPages");

                    b.Property<int?>("Price")
                        .HasColumnType("int")
                        .HasColumnName("price");

                    b.Property<int?>("ProviderId")
                        .HasColumnType("int")
                        .HasColumnName("providerId");

                    b.Property<string>("PublishYear")
                        .HasMaxLength(15)
                        .HasColumnType("varchar(15)")
                        .HasColumnName("publishYear");

                    b.Property<int?>("PublisherId")
                        .HasColumnType("int")
                        .HasColumnName("publisherId");

                    b.Property<int?>("SeriesId")
                        .HasColumnType("int")
                        .HasColumnName("seriesId");

                    b.Property<string>("Size")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("size");

                    b.Property<int>("Stock")
                        .HasColumnType("int")
                        .HasColumnName("stock");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("title");

                    b.Property<string>("TranslatorName")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("translatorName");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime")
                        .HasColumnName("updatedAt");

                    b.Property<decimal?>("Weight")
                        .HasPrecision(10)
                        .HasColumnType("decimal(10)")
                        .HasColumnName("weight");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "Alias" }, "IDX_2e95e271f67f2ea98d12f0013e")
                        .IsUnique();

                    b.HasIndex(new[] { "CategoryId" }, "categoryId");

                    b.HasIndex(new[] { "ProviderId" }, "providerId");

                    b.HasIndex(new[] { "PublisherId" }, "publisherId");

                    b.HasIndex(new[] { "SeriesId" }, "seriesId");

                    b.ToTable("book", (string)null);
                });

            modelBuilder.Entity("book_ecommerce.Models.Cartdetail", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("BookId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime");

                    b.Property<int?>("Quantity")
                        .HasColumnType("int");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime");

                    b.HasKey("UserId", "BookId")
                        .HasName("PRIMARY")
                        .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

                    b.HasIndex(new[] { "BookId" }, "BookId")
                        .HasDatabaseName("BookId1");

                    b.ToTable("cartdetail", (string)null);
                });

            modelBuilder.Entity("book_ecommerce.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime")
                        .HasColumnName("deletedAt");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("name");

                    b.Property<int?>("ParentId")
                        .HasColumnType("int")
                        .HasColumnName("parentId");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "ParentId" }, "parentId");

                    b.ToTable("category", (string)null);
                });

            modelBuilder.Entity("book_ecommerce.Models.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("BookId")
                        .HasColumnType("int");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("url");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "BookId" }, "BookId")
                        .HasDatabaseName("BookId2");

                    b.ToTable("image", (string)null);
                });

            modelBuilder.Entity("book_ecommerce.Models.Promocode", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("AllowMultiple")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("ApplyTo")
                        .HasColumnType("int");

                    b.Property<int?>("ApplyToCategoryID")
                        .HasColumnType("int");

                    b.Property<string>("Code")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<decimal?>("Discount")
                        .HasPrecision(10)
                        .HasColumnType("decimal(10)");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("datetime");

                    b.Property<uint?>("MaxDiscount")
                        .HasColumnType("int unsigned");

                    b.Property<uint?>("MinOrderAmount")
                        .HasColumnType("int unsigned");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<string>("PromoType")
                        .HasColumnType("enum('Delivery','TotalBill')");

                    b.Property<DateTime?>("StartDate")
                        .HasColumnType("datetime");

                    b.Property<int?>("Stock")
                        .HasColumnType("int");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.HasIndex("ApplyToCategoryID");

                    b.ToTable("promocode", (string)null);
                });

            modelBuilder.Entity("book_ecommerce.Models.Provider", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime")
                        .HasColumnName("deletedAt");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("name");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.ToTable("provider", (string)null);
                });

            modelBuilder.Entity("book_ecommerce.Models.Publisher", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime")
                        .HasColumnName("deletedAt");

                    b.Property<string>("Description")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("description")
                        .HasDefaultValueSql("''");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("name");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.ToTable("publisher", (string)null);
                });

            modelBuilder.Entity("book_ecommerce.Models.Review", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("BookId")
                        .HasColumnType("int");

                    b.Property<string>("Content")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime");

                    b.Property<int?>("Likes")
                        .HasColumnType("int");

                    b.Property<int?>("Rating")
                        .HasColumnType("int");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "BookId" }, "BookId")
                        .HasDatabaseName("BookId3");

                    b.HasIndex(new[] { "UserId" }, "UserId")
                        .HasDatabaseName("UserId1");

                    b.ToTable("review", (string)null);
                });

            modelBuilder.Entity("book_ecommerce.Models.Series", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<string>("Alias")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("alias");

                    b.Property<string>("Author")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime")
                        .HasColumnName("createdAt");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime")
                        .HasColumnName("deletedAt");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("name");

                    b.Property<int>("NumberOfFollowers")
                        .HasColumnType("int")
                        .HasColumnName("numberOfFollowers");

                    b.Property<int?>("PublisherId")
                        .HasColumnType("int")
                        .HasColumnName("publisherId");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime")
                        .HasColumnName("updatedAt");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "Alias" }, "IDX_e0f05a7743bb6ef16918bddcd5")
                        .IsUnique();

                    b.HasIndex(new[] { "PublisherId" }, "publisherId")
                        .HasDatabaseName("publisherId1");

                    b.ToTable("series", (string)null);
                });

            modelBuilder.Entity("book_ecommerce.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .HasColumnType("longtext");

                    b.Property<string>("Avatar")
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Phone")
                        .HasColumnType("longtext");

                    b.Property<string>("RefreshToken")
                        .HasColumnType("longtext");

                    b.Property<int>("Role")
                        .HasMaxLength(255)
                        .HasColumnType("int");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.ToTable("user", (string)null);
                });

            modelBuilder.Entity("book_ecommerce.Models.Userpayment", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("CardCvv")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("CardCVV");

                    b.Property<DateTime?>("CardExpiryDate")
                        .HasColumnType("datetime");

                    b.Property<string>("CardHolderName")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("CardNumber")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("CardType")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.HasKey("UserId")
                        .HasName("PRIMARY");

                    b.ToTable("userpayment", (string)null);
                });

            modelBuilder.Entity("Userfollowseries", b =>
                {
                    b.HasOne("book_ecommerce.Models.Series", null)
                        .WithMany()
                        .HasForeignKey("SeriesId")
                        .IsRequired()
                        .HasConstraintName("userfollowseries_ibfk_2");

                    b.HasOne("book_ecommerce.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .IsRequired()
                        .HasConstraintName("userfollowseries_ibfk_1");
                });

            modelBuilder.Entity("book_ecommerce.Models.Bill", b =>
                {
                    b.HasOne("book_ecommerce.Models.Promocode", "PromoCode")
                        .WithMany("Bills")
                        .HasForeignKey("PromoCodeId")
                        .HasConstraintName("bill_ibfk_2");

                    b.HasOne("book_ecommerce.Models.User", "User")
                        .WithMany("Bills")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("bill_ibfk_1");

                    b.Navigation("PromoCode");

                    b.Navigation("User");
                });

            modelBuilder.Entity("book_ecommerce.Models.Billdetail", b =>
                {
                    b.HasOne("book_ecommerce.Models.Bill", "Bill")
                        .WithMany("Billdetails")
                        .HasForeignKey("BillId")
                        .IsRequired()
                        .HasConstraintName("billdetail_ibfk_1");

                    b.HasOne("book_ecommerce.Models.Book", "Book")
                        .WithMany("Billdetails")
                        .HasForeignKey("BookId")
                        .IsRequired()
                        .HasConstraintName("billdetail_ibfk_2");

                    b.Navigation("Bill");

                    b.Navigation("Book");
                });

            modelBuilder.Entity("book_ecommerce.Models.Book", b =>
                {
                    b.HasOne("book_ecommerce.Models.Category", "Category")
                        .WithMany("Books")
                        .HasForeignKey("CategoryId")
                        .HasConstraintName("book_ibfk_4");

                    b.HasOne("book_ecommerce.Models.Provider", "Provider")
                        .WithMany("Books")
                        .HasForeignKey("ProviderId")
                        .HasConstraintName("book_ibfk_1");

                    b.HasOne("book_ecommerce.Models.Publisher", "Publisher")
                        .WithMany("Books")
                        .HasForeignKey("PublisherId")
                        .HasConstraintName("book_ibfk_2");

                    b.HasOne("book_ecommerce.Models.Series", "Series")
                        .WithMany("Books")
                        .HasForeignKey("SeriesId")
                        .HasConstraintName("book_ibfk_3");

                    b.Navigation("Category");

                    b.Navigation("Provider");

                    b.Navigation("Publisher");

                    b.Navigation("Series");
                });

            modelBuilder.Entity("book_ecommerce.Models.Cartdetail", b =>
                {
                    b.HasOne("book_ecommerce.Models.Book", "Book")
                        .WithMany("Cartdetails")
                        .HasForeignKey("BookId")
                        .IsRequired()
                        .HasConstraintName("cartdetail_ibfk_2");

                    b.HasOne("book_ecommerce.Models.User", "User")
                        .WithMany("Cartdetails")
                        .HasForeignKey("UserId")
                        .IsRequired()
                        .HasConstraintName("cartdetail_ibfk_1");

                    b.Navigation("Book");

                    b.Navigation("User");
                });

            modelBuilder.Entity("book_ecommerce.Models.Category", b =>
                {
                    b.HasOne("book_ecommerce.Models.Category", "Parent")
                        .WithMany("InverseParent")
                        .HasForeignKey("ParentId")
                        .HasConstraintName("category_ibfk_1");

                    b.Navigation("Parent");
                });

            modelBuilder.Entity("book_ecommerce.Models.Image", b =>
                {
                    b.HasOne("book_ecommerce.Models.Book", "Book")
                        .WithMany("Images")
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("image_ibfk_1");

                    b.Navigation("Book");
                });

            modelBuilder.Entity("book_ecommerce.Models.Promocode", b =>
                {
                    b.HasOne("book_ecommerce.Models.Category", "ApplyToCategory")
                        .WithMany("Promocodes")
                        .HasForeignKey("ApplyToCategoryID");

                    b.Navigation("ApplyToCategory");
                });

            modelBuilder.Entity("book_ecommerce.Models.Review", b =>
                {
                    b.HasOne("book_ecommerce.Models.Book", "Book")
                        .WithMany("Reviews")
                        .HasForeignKey("BookId")
                        .HasConstraintName("review_ibfk_1");

                    b.HasOne("book_ecommerce.Models.User", "User")
                        .WithMany("Reviews")
                        .HasForeignKey("UserId")
                        .HasConstraintName("review_ibfk_2");

                    b.Navigation("Book");

                    b.Navigation("User");
                });

            modelBuilder.Entity("book_ecommerce.Models.Series", b =>
                {
                    b.HasOne("book_ecommerce.Models.Publisher", "Publisher")
                        .WithMany("Series")
                        .HasForeignKey("PublisherId")
                        .HasConstraintName("FK_83d5fa146d00f7ce42c9c995d05");

                    b.Navigation("Publisher");
                });

            modelBuilder.Entity("book_ecommerce.Models.Userpayment", b =>
                {
                    b.HasOne("book_ecommerce.Models.User", "User")
                        .WithOne("Userpayment")
                        .HasForeignKey("book_ecommerce.Models.Userpayment", "UserId")
                        .IsRequired()
                        .HasConstraintName("userpayment_ibfk_1");

                    b.Navigation("User");
                });

            modelBuilder.Entity("book_ecommerce.Models.Bill", b =>
                {
                    b.Navigation("Billdetails");
                });

            modelBuilder.Entity("book_ecommerce.Models.Book", b =>
                {
                    b.Navigation("Billdetails");

                    b.Navigation("Cartdetails");

                    b.Navigation("Images");

                    b.Navigation("Reviews");
                });

            modelBuilder.Entity("book_ecommerce.Models.Category", b =>
                {
                    b.Navigation("Books");

                    b.Navigation("InverseParent");

                    b.Navigation("Promocodes");
                });

            modelBuilder.Entity("book_ecommerce.Models.Promocode", b =>
                {
                    b.Navigation("Bills");
                });

            modelBuilder.Entity("book_ecommerce.Models.Provider", b =>
                {
                    b.Navigation("Books");
                });

            modelBuilder.Entity("book_ecommerce.Models.Publisher", b =>
                {
                    b.Navigation("Books");

                    b.Navigation("Series");
                });

            modelBuilder.Entity("book_ecommerce.Models.Series", b =>
                {
                    b.Navigation("Books");
                });

            modelBuilder.Entity("book_ecommerce.Models.User", b =>
                {
                    b.Navigation("Bills");

                    b.Navigation("Cartdetails");

                    b.Navigation("Reviews");

                    b.Navigation("Userpayment");
                });
#pragma warning restore 612, 618
        }
    }
}
