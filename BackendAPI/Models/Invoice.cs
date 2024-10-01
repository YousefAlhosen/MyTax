namespace BackendAPI.Models
{
    public class Invoice
    {
        public int Id { get; set; }
        public required string ClientName { get; set; }
        public decimal Amount { get; set; }
        public DateTime DueDate { get; set; }
        public required string Status { get; set; }
    }
}
