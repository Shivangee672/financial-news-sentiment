import React, { useState, useEffect } from 'react';
import { NewsCard } from './components/NewsCard';
import { NewsItem } from './types';
import { analyzeSentiment } from './utils/sentiment';
import { Newspaper, Loader2 } from 'lucide-react';

const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || 'demo';

function App() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${ALPHA_VANTAGE_API_KEY}&topics=technology,earnings`
        );
        
        if (!response.ok) throw new Error('Failed to fetch news');
        
        const data = await response.json();
        
        if (data.feed) {
          const processedNews = data.feed.map((item: any) => ({
            title: item.title,
            url: item.url,
            time_published: item.time_published,
            summary: item.summary,
            sentiment: analyzeSentiment(item.title + ' ' + item.summary),
            tickers: item.ticker_sentiment
              ? item.ticker_sentiment.map((t: any) => t.ticker)
              : [],
          }));
          
          setNews(processedNews);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center space-x-2 mb-8">
          <Newspaper className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-900">
            Financial News Sentiment
          </h1>
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-blue-600" size={32} />
          </div>
        ) : (
          <div className="space-y-6">
            {news.map((item, index) => (
              <NewsCard key={index} news={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;