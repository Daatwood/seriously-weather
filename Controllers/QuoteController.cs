using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace seriously_weather.Controllers
{
    [Route("api/[controller]")]
    public class QuoteController : Controller
    {
        [HttpGet("[action]")]
        public async Task<IActionResult> Random()
        {
                    
            using (var client = new HttpClient())
            {
                try
                {

                    client.BaseAddress = new System.Uri("http://quotesondesign.com");
                    var response = await client.GetAsync($"wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1");
                    response.EnsureSuccessStatusCode();

                    var stringResult = await response.Content.ReadAsStringAsync();
                    var rawQuote = JsonConvert.DeserializeObject<List<QuoteResponse>>(stringResult).FirstOrDefault();
                    return Ok(new
                    {
                        Quote = MassageString(rawQuote.Content),
                        Author = MassageString(rawQuote.Title),
                        rawQuote.Link
                    });
                }
                catch (System.Exception httpRequestException)
                {
                    return BadRequest($"Error getting quote: {httpRequestException.Message}");
                }
            }
        }

        private string MassageString(string jsonString) {
            jsonString = Regex.Replace(jsonString, @"[^\u0000-\u007F]+", string.Empty);
            jsonString = Regex.Replace(jsonString, @"(&.....;)+", string.Empty);
            return Regex.Replace(jsonString, @"(?></?\w+)(?>(?:[^>'""]+|'[^']*'|""[^""]*"")*)>", string.Empty);
        }
    }
    public class QuoteResponse {
        public string Title { get; set; }
        public string Content { get; set; }
        public string Link { get; set; }
    }
}