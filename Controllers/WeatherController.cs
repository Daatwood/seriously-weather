using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System;

namespace seriously_weather.Controllers
{
    [Route("api/[controller]")]
    public class WeatherController : Controller
    {
        [HttpGet("[action]/{city}")]
        public async Task<IActionResult> City(string city)
        {
            using (var client = new HttpClient())
            {
                try
                {
                    var apiKey = Environment.GetEnvironmentVariable("OPEN_WEATHER_API_KEY");
                    client.BaseAddress = new System.Uri("http://api.openweathermap.org");
                    var response = await client.GetAsync($"/data/2.5/weather?q={city}&appid={apiKey}&units=imperial");
                    response.EnsureSuccessStatusCode();

                    var stringResult = await response.Content.ReadAsStringAsync();

                    var rawWeather = JsonConvert.DeserializeObject<OpenWeatherResponse>(stringResult);
                    return Ok(new
                    {
                        Temperature = rawWeather.Main.Temp,
                        High = rawWeather.Main.Temp_Max,
                        Low = rawWeather.Main.Temp_Min,
                        IconUrl = $"http://openweathermap.org/img/w/{rawWeather.Weather.FirstOrDefault().Icon}.png",
                        rawWeather.Main.Humidity,
                        Summary = rawWeather.Weather.FirstOrDefault().Description,
                        City = rawWeather.Name,
                        rawWeather.Sys.Country,
                        SunriseUTC = rawWeather.Sys.Sunrise,
                        SunsetUTC = rawWeather.Sys.Sunset

                    });
                }
                catch (HttpRequestException httpRequestException)
                {
                    return BadRequest($"Error getting weather from OpenWeather: {httpRequestException.Message}");
                }
            }
        }
    }
    public class OpenWeatherResponse {
        public string Name { get; set; }
        public IEnumerable<WeatherDescription> Weather { get; set; }
        public Main Main { get; set; }
        public Sys Sys { get; set; }
    }
    public class WeatherDescription{
        public string Main { get; set; }
        public string Description { get; set; }
        public string Icon { get; set; }
    }
    public class Main {
        public string Temp { get; set; }
        public string Temp_Min { get; set; }
        public string Temp_Max { get; set; }
        public string Humidity { get; set; }
    }
    public class Sys {
        public string Country { get; set; }
        public string Sunrise { get; set; }
        public string Sunset { get; set; }
    }
}