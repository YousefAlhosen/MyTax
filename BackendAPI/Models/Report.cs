namespace BackendAPI.Models
{
    public class FinancialReport
    {
        public required string Month { get; set; }
        public decimal Revenue { get; set; }
        public decimal Expenses { get; set; }
        public decimal Profit { get; set; }
    }

}