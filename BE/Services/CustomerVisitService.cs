using Environics_Analytics.Models;
using Newtonsoft.Json.Linq;

namespace Environics_Analytics.Services
{
    public class CustomerVisitService : ICustomerVisitService
    {
        //method thats takes in list of records and maps it into list of customer visits
        //returns the list of customer visits
        public async Task<List<CustomerVisit>> GetCustomerVisits(List<string> records, bool isPreview = true)
        {
            var list = new List<CustomerVisit>();

            // Create a dictionary to group the CustomerVisit objects by postal code
            var groups = new Dictionary<string, List<CustomerVisit>>();

            for (int i = 1; i < records.Count; i++)
            {
                var elements = records[i].Split(',');
                var visit = new CustomerVisit
                {
                    StoreID = elements[0],
                    CustomerID = elements[1],
                    PostalCode = elements[2],
                    TotalVisits = int.Parse(elements[3]),
                    DollarsSpend = decimal.Parse(elements[4]),
                    ProductType = elements[5]
                };

                visit.SegmentCode = !isPreview ? await GetPrizmId(visit.PostalCode) : 0;

                list.Add(visit);
            }

            return list;
        }

        //method to get the prizmId from the api
        //returns the prizmId
        public async Task<int> GetPrizmId(string postalCode)
        {
            if (!Utils.Utils.IsValidPostalCode(postalCode))
            {
                return -1;
            }

            var prizmId = new Random().Next(1, 67);
            var apiUrl = $"https://prizm.environicsanalytics.com/api/pcode/get_segment?postal_code={postalCode}";

            using var httpClient = new HttpClient();
            var response = await httpClient.GetAsync(apiUrl);

            if (response.IsSuccessStatusCode)
            {
                JObject json = JObject.Parse(await response.Content.ReadAsStringAsync());

                //return 0 if the result has an error
                if (json["result"].ToString() == "error")
                {
                    return 0;
                }

                //if the format is multi then get the prizmId from first object in data array, else the data is itself a number
                if (json["format"].ToString() == "multi")
                {
                    return (int)json["data"][0]["prizm_id"];
                }
                else
                {
                    return (int)json["data"];
                }
            }

            return prizmId;
        }
    }
}
