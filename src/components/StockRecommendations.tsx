import React from 'react';
import { StockRecommendation } from '../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StockRecommendationsProps {
  recommendations: StockRecommendation[];
}

export function StockRecommendations({ recommendations }: StockRecommendationsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Stock Recommendations</h2>
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.symbol}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center">
              <span className="text-xl font-semibold">{rec.symbol}</span>
              {rec.recommendation === 'Buy' && (
                <TrendingUp className="w-5 h-5 text-green-600 ml-2" />
              )}
              {rec.recommendation === 'Sell' && (
                <TrendingDown className="w-5 h-5 text-red-600 ml-2" />
              )}
              {rec.recommendation === 'Hold' && (
                <Minus className="w-5 h-5 text-gray-600 ml-2" />
              )}
            </div>
            <div className="text-right">
              <div className="font-medium">{rec.recommendation}</div>
              <div className="text-sm text-gray-500">
                Confidence: {(rec.confidence * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}