using Microsoft.AspNetCore.Mvc;
using BackendAPI.Models;
using BackendAPI.Services;

namespace BackendAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaxFilingController(ITaxService taxService, ILogger<TaxFilingController> logger) : ControllerBase
    {
        private readonly ITaxService _taxService = taxService;
        private readonly ILogger<TaxFilingController> _logger = logger;

        [HttpPost]
        public async Task<IActionResult> FileTax([FromBody] TaxFilingModel taxData)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors)
                                           .Select(e => e.ErrorMessage)
                                           .ToList();
                _logger.LogWarning("Validation failed: {Errors}", string.Join(", " , errors));
                return BadRequest(new { message = "Validation failed", errors });
            }

            try
            {
                var result = _taxService.CalculateTax(taxData);
                await Task.Delay(100); // simulate database save or other I/O operations

                _logger.LogInformation("TAx filing successful for Income: {Income}, Total Tax: {TotalTax}",
                                            taxData.Income, result.TotalTax);

                return Ok(new
                {
                    message = "Tax filed successfully",
                    totalTax = result.TotalTax,
                    vatAmount = result.VATAmount,
                    corporateTax = result.CorporateTax
                });

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while filing tax");
                return StatusCode(500, new { message = "An error occurred while filing tax", error= ex.Message
                });
            }
        }
    }
}