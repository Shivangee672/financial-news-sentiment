import React from 'react';
import { NewsItem } from '../types';
import { TrendingUp, TrendingDown, Minus, ExternalLink } from 'lucide-react';

interface NewsCardProps {
  news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
  const sentimentColor = 
    news.sentiment.label === 'positive' ? 'text-green-600' :
    news.sentiment.label === 'negative' ? 'text-red-600' : 'text-gray-600';

  const SentimentIcon = 
    news.sentiment.label === 'positive' ? TrendingUp :
    news.sentiment.label === 'negative' ? TrendingDown : Minus;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold flex-1">{news.title}</h3>
        <a 
          href={news.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="ml-2 text-blue-500 hover:text-blue-700"
        >
          <ExternalLink size={20} />
        </a>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-3">{news.summary}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <SentimentIcon className={`${sentimentColor}`} size={20} />
          <span className={`${sentimentColor} font-medium capitalize`}>
            {news.sentiment.label}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {news.tickers.map(ticker => (
            <span 
              key={ticker}
              className="px-2 py-1 bg-gray-100 rounded-md text-sm font-medium"
            >
              {ticker}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}