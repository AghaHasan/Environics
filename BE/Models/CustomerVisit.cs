namespace Environics_Analytics.Models
{
    public class CustomerVisit
    {
        public string StoreID { get; set; }
        public string CustomerID { get; set; }
        public string PostalCode { get; set; }
        public int TotalVisits { get; set; }
        public decimal DollarsSpend { get; set; }
        public string ProductType { get; set; }
        public int SegmentCode { get; set; }
    }
}
