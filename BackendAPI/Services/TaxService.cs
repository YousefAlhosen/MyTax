using BackendAPI.Models;

namespace BackendAPI.Services
{
    public class TaxService : ITaxService
    {
        public TaxCalculationResult CalculateTax(TaxFilingModel taxData)
        {
            var totalTax = taxData.TotalTax;
            return new TaxCalculationResult
            {
                TotalTax = totalTax, 
                VATAmount = taxData.VATAmount,
                CorporateTax = taxData.CorporateTax

            };
        }
    }

    public class TaxCalculationResult
    {
        public decimal TotalTax { get; set;}
        public decimal VATAmount { get; set;}
        public decimal CorporateTax { get; set;}
    }
}