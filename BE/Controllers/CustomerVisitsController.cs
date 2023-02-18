using Environics_Analytics.Models;
using Environics_Analytics.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Text.Json;

namespace Environics_Analytics.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerVisitsController : ControllerBase
    {
        private IConfiguration _configuration;
        private readonly ICustomerVisitService _customerVisitService;
        public CustomerVisitsController(IConfiguration iconfig, ICustomerVisitService customerVisitService)
        {
            _configuration = iconfig;
            _customerVisitService = customerVisitService;
        }

        //get request to get the first 6 rows in excel file
        [HttpGet("preview")]
        public async Task<IActionResult> GetPreview(string filePath)
        {            
            try
            {
                //checks if the format is .csv
                if (!Utils.Utils.IsCsvFile(filePath))
                {
                    return BadRequest("File path needs to be .csv");
                }

                //get the base path from appSettings
                string basePath = _configuration.GetValue<string>("BasePath");

                // Read the first 6 rows of the file
                var lines = await System.IO.File.ReadAllLinesAsync(basePath + filePath);
                var preview = lines.Take(6).ToList();

                var response = new Response<CustomerVisit>
                {
                    Length = preview.Count,
                    Data = await _customerVisitService.GetCustomerVisits(preview),
                    FileName = Path.GetFileName(filePath)
                };

                // Return the preview as a JSON response
                return Ok(response);
            }
            catch (Exception ex)
            {
                // Return an error response if something goes wrong
                return BadRequest(ex.Message);
            }
        }

        //get request to process the entire excel file and the prizmId
        [HttpGet("process")]
        public async Task<IActionResult> ReadFile(string filePath)
        {
            try
            {
                //checks if the format is .csv
                if (!Utils.Utils.IsCsvFile(filePath))
                {
                    return BadRequest("File path needs to be .csv");
                }

                string basePath = _configuration.GetValue<string>("BasePath");

                // Read all lines of the file
                var lines = await System.IO.File.ReadAllLinesAsync(basePath + filePath);

                var response = new Response<CustomerVisit>
                {
                    Length = lines.Length - 1,
                    Data = await _customerVisitService.GetCustomerVisits(lines.ToList(), false),
                    FileName = Path.GetFileName(filePath)
                };

                // Return the lines as a JSON response
                return Ok(response);
            }
            catch (Exception ex)
            {
                // Return an error response if something goes wrong
                return BadRequest(ex.Message);
            }
        }     
    }
}
