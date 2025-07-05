export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  sector: string;
  analysis: StockAnalysis;
}

export interface StockAnalysis {
  id: string;
  stockId: string;
  title: string;
  content: string;
  whyTrending: string;
  financialHealth: FinancialHealth;
  valuation: Valuation;
  redFlags: string[];
  youtubeVideoId?: string;
  author: string;
  publishedDate: string;
  lastUpdated: string;
  tags: string[];
  recommendation: 'BUY' | 'HOLD' | 'SELL';
  targetPrice: number;
  stopLoss: number;
}

export interface FinancialHealth {
  revenueGrowth: number;
  profitMargin: number;
  debtToEquity: number;
  currentRatio: number;
  roe: number;
  roa: number;
  score: number; // 1-10
  summary: string;
}

export interface Valuation {
  pe: number;
  pb: number;
  ps: number;
  pegRatio: number;
  evEbitda: number;
  fairValue: number;
  discount: number;
  summary: string;
}

export interface TabData {
  id: string;
  name: string;
  count: number;
  stocks: Stock[];
}

export type StockCategory = 'trending' | 'largecap' | 'midcap' | 'smallcap' | 'ideas';

export interface MarketData {
  trending: Stock[];
  largecap: Stock[];
  midcap: Stock[];
  smallcap: Stock[];
  ideas: Stock[];
}

export interface AnalysisFormData {
  title: string;
  content: string;
  whyTrending: string;
  financialHealthSummary: string;
  valuationSummary: string;
  redFlags: string[];
  youtubeVideoId: string;
  recommendation: 'BUY' | 'HOLD' | 'SELL';
  targetPrice: number;
  stopLoss: number;
  tags: string[];
}