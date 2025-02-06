export interface NewsItem {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  sentiment: number;
  relatedSymbols: string[];
}

export interface StockRecommendation {
  symbol: string;
  sentiment: number;
  recommendation: 'Buy' | 'Sell' | 'Hold';
  confidence: number;
}