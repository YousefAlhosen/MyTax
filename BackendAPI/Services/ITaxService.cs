using BackendAPI.Models;

namespace BackendAPI.Services
{
    public interface ITaxService
    {
        TaxCalculationResult CalculateTax(TaxFilingModel taxData);
    }
}
