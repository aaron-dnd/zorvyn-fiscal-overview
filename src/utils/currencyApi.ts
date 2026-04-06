const BASE_URL = 'https://api.frankfurter.dev/v1';

export const fetchLatestRates = async (base: string = 'USD') => {
  try {
    const response = await fetch(`${BASE_URL}/latest?base=${base}&symbols=INR,EUR,USD`);
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error("Failed to fetch rates, using fallback:", error);
    return { INR: 83.5, EUR: 0.92, USD: 1 }; // Safe fallbacks
  }
};