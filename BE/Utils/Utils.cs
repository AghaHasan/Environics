namespace Environics_Analytics.Utils
{
    public static class Utils
    {
        //method that checks if the extension of file is .csv
        //returns true if extension is .csv else false
        public static bool IsCsvFile(string filePath)
        {
            string extension = Path.GetExtension(filePath);
            return extension.Equals(".csv", StringComparison.OrdinalIgnoreCase);
        }

        //method to check if a postal code is valid or not according to the format <letter><number><letter><number><letter><number> 
        //returns true if format is valid else false
        public static bool IsValidPostalCode(string postalCode)
        {
            // Ensure the postal code is 6 characters long
            if (postalCode.Length != 6)
            {
                return false;
            }

            // Check if the first, third, and fifth characters are letters
            if (!char.IsLetter(postalCode[0]) || !char.IsLetter(postalCode[2]) || !char.IsLetter(postalCode[4]))
            {
                return false;
            }

            // Check if the second, fourth, and sixth characters are digits
            if (!char.IsDigit(postalCode[1]) || !char.IsDigit(postalCode[3]) || !char.IsDigit(postalCode[5]))
            {
                return false;
            }

            // The postal code is valid if it passes all of the above checks
            return true;
        }
    }
}
