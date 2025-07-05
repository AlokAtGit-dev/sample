import React from 'react';
import { Stock, StockCategory } from '../types';
import StockCard from './StockCard';

interface StockListProps {
  stocks: Stock[];
  onAddAnalysis: (stockId: string) => void;
  category: StockCategory;
}

const StockList: React.FC<StockListProps> = ({ stocks, onAddAnalysis, category }) => {
  if (stocks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No stocks available</h3>
        <p className="text-gray-500">
          {category === 'trending' && 'No trending stocks at the moment. Check back later!'}
          {category === 'largecap' && 'No large-cap stocks in the current selection.'}
          {category === 'midcap' && 'No mid-cap stocks in the current selection.'}
          {category === 'smallcap' && 'No small-cap stocks in the current selection.'}
          {category === 'ideas' && 'No investment ideas available right now.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stocks.map((stock) => (
        <StockCard
          key={stock.id}
          stock={stock}
          onAddAnalysis={onAddAnalysis}
          category={category}
        />
      ))}
    </div>
  );
};

export default StockList;