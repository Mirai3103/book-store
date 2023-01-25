using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bookecommerce.Migrations
{
    /// <inheritdoc />
    public partial class addpromocode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "bill_ibfk_1",
                table: "bill");

            migrationBuilder.AlterColumn<int>(
                name: "Role",
                table: "user",
                type: "int",
                maxLength: 255,
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldMaxLength: 255,
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Password",
                keyValue: null,
                column: "Password",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "user",
                type: "varchar(255)",
                maxLength: 255,
                nullable: false,
                collation: "utf8mb4_0900_ai_ci",
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldMaxLength: 255,
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "FullName",
                keyValue: null,
                column: "FullName",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                table: "user",
                type: "varchar(255)",
                maxLength: 255,
                nullable: false,
                collation: "utf8mb4_0900_ai_ci",
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldMaxLength: 255,
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Email",
                keyValue: null,
                column: "Email",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "user",
                type: "varchar(255)",
                maxLength: 255,
                nullable: false,
                collation: "utf8mb4_0900_ai_ci",
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldMaxLength: 255,
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.AlterColumn<decimal>(
                name: "Discount",
                table: "promocode",
                type: "decimal(10)",
                precision: 10,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10,30)",
                oldPrecision: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "AllowMultiple",
                table: "promocode",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "ApplyTo",
                table: "promocode",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ApplyToCategoryID",
                table: "promocode",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<uint>(
                name: "MaxDiscount",
                table: "promocode",
                type: "int unsigned",
                nullable: true);

            migrationBuilder.AddColumn<uint>(
                name: "MinOrderAmount",
                table: "promocode",
                type: "int unsigned",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "promocode",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<decimal>(
                name: "weight",
                table: "book",
                type: "decimal(10)",
                precision: 10,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10,30)",
                oldPrecision: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "discount",
                table: "book",
                type: "decimal(10)",
                precision: 10,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(10,30)",
                oldPrecision: 10);

            migrationBuilder.AlterColumn<uint>(
                name: "Quantity",
                table: "billdetail",
                type: "int unsigned",
                nullable: false,
                defaultValue: 0u,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "billdetail",
                type: "decimal(10)",
                precision: 10,
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "decimal(10,30)",
                oldPrecision: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "bill",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "TotalBill",
                table: "bill",
                type: "decimal(10)",
                precision: 10,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10,30)",
                oldPrecision: 10,
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "bill",
                keyColumn: "Address",
                keyValue: null,
                column: "Address",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "bill",
                type: "longtext",
                nullable: false,
                collation: "utf8mb4_0900_ai_ci",
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.CreateIndex(
                name: "IX_promocode_ApplyToCategoryID",
                table: "promocode",
                column: "ApplyToCategoryID");

            migrationBuilder.AddForeignKey(
                name: "bill_ibfk_1",
                table: "bill",
                column: "UserId",
                principalTable: "user",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_promocode_category_ApplyToCategoryID",
                table: "promocode",
                column: "ApplyToCategoryID",
                principalTable: "category",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "bill_ibfk_1",
                table: "bill");

            migrationBuilder.DropForeignKey(
                name: "FK_promocode_category_ApplyToCategoryID",
                table: "promocode");

            migrationBuilder.DropIndex(
                name: "IX_promocode_ApplyToCategoryID",
                table: "promocode");

            migrationBuilder.DropColumn(
                name: "AllowMultiple",
                table: "promocode");

            migrationBuilder.DropColumn(
                name: "ApplyTo",
                table: "promocode");

            migrationBuilder.DropColumn(
                name: "ApplyToCategoryID",
                table: "promocode");

            migrationBuilder.DropColumn(
                name: "MaxDiscount",
                table: "promocode");

            migrationBuilder.DropColumn(
                name: "MinOrderAmount",
                table: "promocode");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "promocode");

            migrationBuilder.AlterColumn<int>(
                name: "Role",
                table: "user",
                type: "int",
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "user",
                type: "varchar(255)",
                maxLength: 255,
                nullable: true,
                collation: "utf8mb4_0900_ai_ci",
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldMaxLength: 255)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                table: "user",
                type: "varchar(255)",
                maxLength: 255,
                nullable: true,
                collation: "utf8mb4_0900_ai_ci",
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldMaxLength: 255)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "user",
                type: "varchar(255)",
                maxLength: 255,
                nullable: true,
                collation: "utf8mb4_0900_ai_ci",
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldMaxLength: 255)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.AlterColumn<decimal>(
                name: "Discount",
                table: "promocode",
                type: "decimal(10,30)",
                precision: 10,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10)",
                oldPrecision: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "weight",
                table: "book",
                type: "decimal(10,30)",
                precision: 10,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10)",
                oldPrecision: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "discount",
                table: "book",
                type: "decimal(10,30)",
                precision: 10,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(10)",
                oldPrecision: 10);

            migrationBuilder.AlterColumn<int>(
                name: "Quantity",
                table: "billdetail",
                type: "int",
                nullable: true,
                oldClrType: typeof(uint),
                oldType: "int unsigned");

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "billdetail",
                type: "decimal(10,30)",
                precision: 10,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10)",
                oldPrecision: 10);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "bill",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<decimal>(
                name: "TotalBill",
                table: "bill",
                type: "decimal(10,30)",
                precision: 10,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(10)",
                oldPrecision: 10,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "bill",
                type: "longtext",
                nullable: true,
                collation: "utf8mb4_0900_ai_ci",
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            migrationBuilder.AddForeignKey(
                name: "bill_ibfk_1",
                table: "bill",
                column: "UserId",
                principalTable: "user",
                principalColumn: "Id");
        }
    }
}
