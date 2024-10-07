using BackendAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetFinancialReports()
        {
            var reports = new List<FinancialReport>
            {
                new FinancialReport { Month = "January", Revenue = 12000, Expenses = 8000, Profit = 4000 },
                new FinancialReport { Month = "February", Revenue = 15000, Expenses = 9000, Profit = 6000 },
                new FinancialReport { Month = "March", Revenue = 18000, Expenses = 10000, Profit = 8000 },
                new FinancialReport { Month = "April", Revenue = 20000, Expenses = 11000, Profit = 9000 },
                new FinancialReport { Month = "May", Revenue = 25000, Expenses = 12000, Profit = 13000 },
                new FinancialReport { Month = "June", Revenue = 28000, Expenses = 15000, Profit = 13000 },
                new FinancialReport { Month = "July", Revenue = 30000, Expenses = 17000, Profit = 13000 },
                new FinancialReport { Month = "August", Revenue = 32000, Expenses = 18000, Profit = 14000 }
            };

            return Ok(reports);
        }
    }
}