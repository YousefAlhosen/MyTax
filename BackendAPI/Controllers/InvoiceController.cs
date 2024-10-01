using Microsoft.AspNetCore.Mvc;
using BackendAPI.Models;


// InvoiceController that handle CRUD
namespace BackendAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InvoiceController: ControllerBase
    {
        // Mock data for invoices
        private static readonly List<Invoice> invoices = new List<Invoice>
    {
        new Invoice { Id = 1, ClientName = "Client A", Amount = 100, DueDate = new DateTime(2024, 9, 30), Status = "Pending" },
        new Invoice { Id = 2, ClientName = "Client B", Amount = 200, DueDate = new DateTime(2024, 10, 15), Status = "Paid" }
    };


        // GET : api/invoice
        [HttpGet]
        public ActionResult<IEnumerable<Invoice>> GetInvoices()
        {
            return Ok(invoices);
        }

        //Get : api/invoice/{id}
        [HttpGet("{id}")]
        public IActionResult GetInvoice(int id)
        {
            var invoice = invoices.FirstOrDefault(i => i.Id ==id);
            if (invoice == null) return NotFound();
            return Ok(invoice);
        }


        //POST: api/invoice 
        [HttpPost]
        public IActionResult createInvoice([FromBody] Invoice newInvoice)
        {
            newInvoice.Id = invoices.Count + 1;
            invoices.Add(newInvoice);
            return CreatedAtAction(nameof(GetInvoice), new {id = newInvoice.Id}, newInvoice);

        }

        // PUT: api/invoice/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateInvoice(int id, [FromBody] Invoice updatedInvoice)
        {
            var invoice = invoices.FirstOrDefault(i => i.Id == id);
            if (invoice == null) return NotFound();

            invoice.ClientName = updatedInvoice.ClientName;
            invoice.Amount = updatedInvoice.Amount;
            invoice.DueDate = updatedInvoice.DueDate;
            invoice.Status = updatedInvoice.Status;

            return NoContent();

        }

        // DELETE: api/invoice/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteInvoice (int id)
        {
            var invoice = invoices.FirstOrDefault(i => i.Id == id);
            if (invoice == null) return NotFound();

            invoices.Remove(invoice);
            return NoContent();
        }


        // Mobilepay payment simulation
        [HttpPost("mobilepay/pay/{invoiceId}")]
        public async Task<ActionResult> PayWithMobilePay(int invoiceId)
        {
            var invoice = invoices.FirstOrDefault(i => i.Id == invoiceId);
            if (invoice ==  null || invoice.Status != "Pending" )
            {
                return BadRequest("Invoice not found or already paid.");
            }

            await Task.Delay(1000);

            invoice.Status = "Paid";
            return Ok(new { message = "Payment successful", invoice});
        }

    }
}