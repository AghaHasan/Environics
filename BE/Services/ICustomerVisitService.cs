using Environics_Analytics.Models;

namespace Environics_Analytics.Services
{
    public interface ICustomerVisitService
    {
        Task<List<CustomerVisit>> GetCustomerVisits(List<string> records, bool isPreview = true);
        Task<int> GetPrizmId(string postalCode);
    }
}
