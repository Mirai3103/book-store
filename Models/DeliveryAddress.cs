using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace book_ecommerce.Models
{
    public class DeliveryAddress
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public uint Id { get; set; }
        [Required]
        public int UserId { get; set; }
        public virtual User? User { get; set; }

        [Required]
        public string FullName { get; set; } = null!;
        [Required]
        public string Phone { get; set; } = null!;
        [Required]
        public string Address { get; set; } = null!;
        public bool IsPrimary { get; set; } = false;
        public DateTime? DeletedAt { get; set; }

        public virtual ICollection<Bill> Bills { get; } = new List<Bill>();
    }
}
