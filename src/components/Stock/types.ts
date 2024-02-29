export type TStockApiResponse = {
  status: {
    timestamp: string | Date;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
    notice: string | null;
    total_count: number;
  };
  data: TStock[];
};

export type TStock = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: string | Date;
  tags: string[];
  max_supply: number;
  circulating_supply: number;
  total_supply: number;
  platform: [Object];
  cmc_rank: number;
  self_reported_circulating_supply: null;
  self_reported_market_cap: null;
  tvl_ratio: number;
  last_updated: string | Date;
  quote: Record<string, TQuote>;
};

export type TQuote = {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  tvl: null;
  last_updated: string | Date;
};
