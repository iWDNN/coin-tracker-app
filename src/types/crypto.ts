export interface ICrypto {
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  symbol: string;
  type: "token" | "coin";
}

export interface ICryptoInfo {
  description: string;
  id: string;
  logo: string; // logo src
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean; // new
  is_active: boolean; // active
  type: string;
  links: {
    // sns link
    explorer: string[];
    facebook: string[];
    reddit: string[];
    source_code: string[];
    website: string[];
    youtube: string[];
  };
  links_extended: {
    // extend sns
    type: string;
    url: string;
  }[];
  message: string; // ?
  open_source: boolean;
  started_at: string; // ?
  development_status: string;
  hardware_wallet: boolean;
  org_structure: string; // 조직 구조
  first_data_at: string; // ?
  last_data_at: string; // ?
  tags: {
    // 연관 코인들인가 ?
    coin_counter: number;
    ico_counter: number;
    id: string;
    name: string;
  }[];
  team: {
    // 제작팀
    id: string;
    name: string;
    position: string;
  }[];
  whitepaper: {
    //어떤 정부 기관이나 회사 등의 공식적인 보고서를 white paper, 또는 백서라고 말한다.
    link: string;
    thumbnail: string;
  };
}

export interface ICryptoPrice {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

export interface ICryptoHistory {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
