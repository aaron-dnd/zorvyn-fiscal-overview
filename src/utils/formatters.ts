/**
 * Formats a number based on the selected currency and live exchange rates.
 */
export const formatCurrency = (
  amount: number, 
  currency: string = 'USD', 
  rates: Record<string, number> = { USD: 1 }
): string => {
  // 1. Get the specific rate for the selected currency
  const rate = rates[currency] || 1;
  
  // 2. Convert the base amount
  const convertedAmount = amount * rate;

  // 3. Use Intl for perfect localization (₹, $, etc.)
  return new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0, 
  }).format(convertedAmount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};