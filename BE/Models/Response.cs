using Newtonsoft.Json;

namespace Environics_Analytics.Models
{
    public class Response<T>
    {
        [JsonProperty("data")]
        public List<T> Data { get; set; }

        [JsonProperty("length")]
        public int Length { get; set; }

        [JsonProperty("fileName")]
        public string FileName { get; set; }
    }
}
