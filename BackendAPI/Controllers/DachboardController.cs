using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController: ControllerBase
    {
        [HttpGet]
        public IActionResult GetDashboardData()
        {
            var dashboardData = new 
            {
                income = 5000,
                expenses = 3000,
                incomeHistory = new[] { 1000, 1200, 1500, 1800, 2000 },
                expenseHistory = new[] { 800, 900, 950, 1100, 1200 }
            };

            return Ok(dashboardData);
        }
    }
}