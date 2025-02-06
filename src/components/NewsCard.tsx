import React from 'react';
import { NewsItem } from '../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface NewsCardProps {
  news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.3) return 'text-green-600';
    if (sentiment < -0.3) return 'text-red-600';
    return 'text-gray-600';
  };

  const getSentimentIcon = (sentiment: number) => {
    if (sentiment > 0.3) return <TrendingUp className="w-5 h-5" />;
    if (sentiment < -0.3) return <TrendingDown className="w-5 h-5" />;
    return <Minus className="w-5 h-5" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
      <p className="text-gray-600 mb-4">{news.description}</p>
      <div className="flex items-center justify-between">
        <div className={`flex items-center ${getSentimentColor(news.sentiment)}`}>
          {getSentimentIcon(news.sentiment)}
          <span className="ml-2">
            Sentiment: {(news.sentiment * 100).toFixed(1)}%
          </span>
        </div>
        <div className="flex space-x-2">
          {news.relatedSymbols.map(symbol => (
            <span
              key={symbol}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
            >
              {symbol}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        {new Date(news.publishedAt).toLocaleDateString()}
      </div>
    </div>
  );
}