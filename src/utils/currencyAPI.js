const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;

export const convertCurrency = async (from, to, amount) => {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`
    );

    const data = await response.json();

    const rate = data.conversion_rates[to];

    return Number(amount) * rate;

  } catch (error) {
    console.error("Currency conversion failed:", error);
    return null;
  }
};