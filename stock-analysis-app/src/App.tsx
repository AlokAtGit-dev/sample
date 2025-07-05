import React, { useState } from 'react';
import { TrendingUp, BarChart3, PieChart, Target, Lightbulb, Plus } from 'lucide-react';
import { StockCategory, MarketData } from './types';
import StockList from './components/StockList';
import AnalysisEditor from './components/AnalysisEditor';
import { mockData } from './data/mockData';
import './App.css';

const tabs = [
  { id: 'trending', name: 'Trending Today', icon: TrendingUp, color: 'text-red-500' },
  { id: 'largecap', name: 'Large Cap', icon: BarChart3, color: 'text-blue-500' },
  { id: 'midcap', name: 'Mid Cap', icon: PieChart, color: 'text-green-500' },
  { id: 'smallcap', name: 'Small Cap', icon: Target, color: 'text-purple-500' },
  { id: 'ideas', name: 'Investment Ideas', icon: Lightbulb, color: 'text-yellow-500' },
];

function App() {
  const [activeTab, setActiveTab] = useState<StockCategory>('trending');
  const [marketData, setMarketData] = useState<MarketData>(mockData);
  const [showAnalysisEditor, setShowAnalysisEditor] = useState(false);
  const [editingStockId, setEditingStockId] = useState<string | null>(null);

  const handleAddAnalysis = (stockId: string) => {
    setEditingStockId(stockId);
    setShowAnalysisEditor(true);
  };

  const handleCloseEditor = () => {
    setShowAnalysisEditor(false);
    setEditingStockId(null);
  };

  const handleSaveAnalysis = (stockId: string, analysisData: any) => {
    // Here you would typically save to a backend
    console.log('Saving analysis for stock:', stockId, analysisData);
    setShowAnalysisEditor(false);
    setEditingStockId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-primary-600" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-semibold text-gray-900">
                  Stock Analysis Hub
                </h1>
                <p className="text-sm text-gray-600">
                  Daily insights on trending stocks
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowAnalysisEditor(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>New Analysis</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const stockCount = marketData[tab.id as StockCategory].length;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as StockCategory)}
                  className={`
                    flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                    ${isActive 
                      ? 'border-primary-500 text-primary-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-primary-600' : tab.color}`} />
                  <span>{tab.name}</span>
                  <span className={`
                    px-2 py-1 text-xs rounded-full
                    ${isActive 
                      ? 'bg-primary-100 text-primary-600' 
                      : 'bg-gray-100 text-gray-600'
                    }
                  `}>
                    {stockCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {tabs.find(tab => tab.id === activeTab)?.name}
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            {activeTab === 'trending' && 'Stocks making headlines today with detailed analysis'}
            {activeTab === 'largecap' && 'Blue-chip stocks with market cap > $10B'}
            {activeTab === 'midcap' && 'Growth stocks with market cap $2B - $10B'}
            {activeTab === 'smallcap' && 'Emerging stocks with market cap < $2B'}
            {activeTab === 'ideas' && 'Curated investment opportunities and themes'}
          </p>
        </div>

        <StockList 
          stocks={marketData[activeTab]} 
          onAddAnalysis={handleAddAnalysis}
          category={activeTab}
        />
      </main>

      {/* Analysis Editor Modal */}
      {showAnalysisEditor && (
        <AnalysisEditor
          stockId={editingStockId}
          onClose={handleCloseEditor}
          onSave={handleSaveAnalysis}
        />
      )}
    </div>
  );
}

export default App;
