import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  Eye, 
  Edit3, 
  Youtube,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Stock, StockCategory } from '../types';

interface StockCardProps {
  stock: Stock;
  onAddAnalysis: (stockId: string) => void;
  category: StockCategory;
}

const StockCard: React.FC<StockCardProps> = ({ stock, onAddAnalysis, category }) => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);

  const isPositive = stock.change > 0;
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const changeIcon = isPositive ? TrendingUp : TrendingDown;
  const ChangeTrendIcon = changeIcon;

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'BUY':
        return 'text-green-600 bg-green-50';
      case 'SELL':
        return 'text-red-600 bg-red-50';
      case 'HOLD':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'BUY':
        return CheckCircle;
      case 'SELL':
        return XCircle;
      case 'HOLD':
        return AlertTriangle;
      default:
        return AlertTriangle;
    }
  };

  const RecommendationIcon = getRecommendationIcon(stock.analysis.recommendation);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume.toString();
  };

  return (
    <div className="stock-card animate-fade-in">
      <div className="stock-card-header">
        <div>
          <h3 className="stock-symbol">{stock.symbol}</h3>
          <p className="text-sm text-gray-600 truncate">{stock.name}</p>
        </div>
        <div className="text-right">
          <div className={`stock-price ${changeColor}`}>
            {formatNumber(stock.price)}
          </div>
          <div className={`flex items-center text-sm ${changeColor}`}>
            <ChangeTrendIcon className="h-4 w-4 mr-1" />
            <span>{formatNumber(stock.change)}</span>
            <span className="ml-1">({stock.changePercent.toFixed(2)}%)</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Volume:</span>
          <span className="font-medium">{formatVolume(stock.volume)}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Market Cap:</span>
          <span className="font-medium">{stock.marketCap}</span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Sector:</span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
            {stock.sector}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Recommendation:</span>
          <div className={`flex items-center px-2 py-1 rounded-full text-xs ${getRecommendationColor(stock.analysis.recommendation)}`}>
            <RecommendationIcon className="h-3 w-3 mr-1" />
            {stock.analysis.recommendation}
          </div>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Target Price:</span>
          <span className="font-medium text-green-600">
            {formatNumber(stock.analysis.targetPrice)}
          </span>
        </div>

        <div className="pt-2">
          <div className="text-sm text-gray-600 mb-2">Why it's trending:</div>
          <p className="text-sm text-gray-800 line-clamp-3">
            {stock.analysis.whyTrending}
          </p>
        </div>

        {showAnalysis && (
          <div className="border-t pt-4 space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-600 mb-1">Financial Health</div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${stock.analysis.financialHealth.score * 10}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs font-medium">
                    {stock.analysis.financialHealth.score}/10
                  </span>
                </div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">Valuation</div>
                <div className="text-sm font-medium">
                  PE: {stock.analysis.valuation.pe}
                </div>
              </div>
            </div>

            <div className="text-sm">
              <div className="text-gray-600 mb-1">Key Metrics</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>ROE: {stock.analysis.financialHealth.roe}%</div>
                <div>Debt/Equity: {stock.analysis.financialHealth.debtToEquity}</div>
              </div>
            </div>

            {stock.analysis.redFlags.length > 0 && (
              <div className="text-sm">
                <div className="text-gray-600 mb-1">Red Flags</div>
                <div className="space-y-1">
                  {stock.analysis.redFlags.slice(0, 2).map((flag, index) => (
                    <div key={index} className="flex items-start text-xs text-red-600">
                      <AlertTriangle className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                      <span>{flag}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="pt-4 border-t flex flex-wrap gap-2">
          <button
            onClick={() => setShowAnalysis(!showAnalysis)}
            className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
          >
            <Eye className="h-4 w-4" />
            <span>{showAnalysis ? 'Hide Analysis' : 'View Analysis'}</span>
          </button>
          
          <button
            onClick={() => onAddAnalysis(stock.id)}
            className="flex items-center space-x-1 text-sm text-green-600 hover:text-green-800"
          >
            <Edit3 className="h-4 w-4" />
            <span>Edit Analysis</span>
          </button>

          {stock.analysis.youtubeVideoId && (
            <a
              href={`https://www.youtube.com/watch?v=${stock.analysis.youtubeVideoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-800"
            >
              <Youtube className="h-4 w-4" />
              <span>Watch Video</span>
            </a>
          )}
        </div>

        <div className="flex flex-wrap gap-1 pt-2">
          {stock.analysis.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockCard;