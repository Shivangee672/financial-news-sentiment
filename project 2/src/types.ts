export interface NewsItem {
  title: string;
  url: string;
  time_published: string;
  summary: string;
  sentiment: {
    score: number;
    label: 'positive' | 'negative' | 'neutral';
  };
  tickers: string[];
}

export interface SentimentResult {
  score: number;
  label: 'positive' | 'negative' | 'neutral';
}