import React, { useState, useEffect } from 'react';
import { NewsCard } from './components/NewsCard';
import { StockRecommendations } from './components/StockRecommendations';
import { NewsItem, StockRecommendation } from './types';
import { analyzeSentiment } from './utils/sentimentAnalysis';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Newspaper } from 'lucide-react';

// Simulated news data since we can't use the real Yahoo Finance API
const MOCK_NEWS: NewsItem[] = [
  {
    title: "Tesla's Strong Q4 Earnings Beat Expectations",
    description: "Tesla reported impressive fourth-quarter results, surpassing analyst estimates with strong vehicle deliveries and revenue growth.",
    url: "https://example.com/tesla-earnings",
    publishedAt: new Date().toISOString(),
    sentiment: 0.8,
    relatedSymbols: ["TSLA"]
  },
  {
    title: "Apple Faces Supply Chain Challenges",
    description: "Apple is experiencing production delays due to ongoing supply chain disruptions in Asia.",
    url: "https://example.com/apple-supply-chain",
    publishedAt: new Date().toISOString(),
    sentiment: -0.4,
    relatedSymbols: ["AAPL"]
  }
];

function App() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [recommendations, setRecommendations] = useState<StockRecommendation[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const processedNews = MOCK_NEWS.map(item => ({
      ...item,
      sentiment: analyzeSentiment(item.title + " " + item.description)
    }));
    setNews(processedNews);

    // Generate recommendations based on sentiment
    const newRecommendations = processedNews.map(item => ({
      symbol: item.relatedSymbols[0],
      sentiment: item.sentiment,
      recommendation: item.sentiment > 0.3 ? 'Buy' : item.sentiment < -0.3 ? 'Sell' : 'Hold',
      confidence: Math.abs(item.sentiment)
    }));
    setRecommendations(newRecommendations);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Newspaper className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">
              Financial News Sentiment Analyzer
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Latest News</h2>
            {news.map((item, index) => (
              <NewsCard key={index} news={item} />
            ))}
          </div>
          
          <div className="space-y-6">
            <StockRecommendations recommendations={recommendations} />
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Sentiment Trends</h2>
              <LineChart width={400} height={300} data={news}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="publishedAt" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sentiment" stroke="#8884d8" />
              </LineChart>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;