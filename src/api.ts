const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}
export function fetchCoinsPrice() {
  return fetch(`${BASE_URL}/tickers?quotes=USD`).then((response) =>
    response.json()
  );
}
export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) => {
    if (!response.ok) {
      throw new Error("Data was not found");
    }
    return response.json();
  });
}
export function fetchCoinPrice(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) => {
    if (!response.ok) {
      throw new Error("Data was not found");
    }
    return response.json();
  });
}
export function fetchCoinHistory(coinId: string) {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Data was not found");
    }
    return response.json();
  });
}

// export function fetchCoinHistory(coinId: string) { // api down.
//   const endDate = Math.floor(Date.now() / 1000);
//   const startDate = endDate - 60 * 60 * 24 * 7 * 2;
//   return fetch(
//     `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
//   ).then((response) => response.json());
// }
