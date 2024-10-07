using System.ComponentModel.DataAnnotations;

namespace BackendAPI.Models
{
    public class TaxFilingModel
    {
        [Required(ErrorMessage = "Income is required.")]
        [Range(1, double.MaxValue, ErrorMessage ="Income must be greater than 0.")]
        public decimal Income {get; set; }


        [Required(ErrorMessage = "Deductions are required.")]
        [Range(0, double.MaxValue, ErrorMessage ="Deductions cannot be negative.")]
        public decimal Deductions { get; set; }

        public decimal VAT { get; set;}

        public decimal SocialContributions { get; set;}
        public decimal CorporateTaxRate { get; set;} = 0.22M;  // 22% Corporate tax

        public decimal NetIncome => Income - Deductions;
        public decimal VATAmount => NetIncome * VAT;
        public decimal CorporateTax => NetIncome * CorporateTaxRate;
        public decimal TotalTax => VATAmount + CorporateTax + SocialContributions;
    }
}