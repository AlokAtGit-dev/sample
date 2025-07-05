import { MarketData, Stock, StockAnalysis } from '../types';

const generateMockAnalysis = (stockId: string, symbol: string): StockAnalysis => ({
  id: `analysis-${stockId}`,
  stockId,
  title: `${symbol} Analysis: Strong Growth Potential`,
  content: `
    <div class="analysis-content">
      <h3>Executive Summary</h3>
      <p>Our analysis of ${symbol} reveals a compelling investment opportunity with strong fundamentals and positive market momentum.</p>
      
      <h3>Key Highlights</h3>
      <ul>
        <li>Strong revenue growth trajectory</li>
        <li>Expanding market share in key segments</li>
        <li>Solid balance sheet with manageable debt levels</li>
        <li>Experienced management team with clear vision</li>
      </ul>
      
      <h3>Investment Thesis</h3>
      <p>The company is well-positioned to capitalize on emerging market trends and deliver sustainable growth.</p>
    </div>
  `,
  whyTrending: `${symbol} is trending due to better-than-expected quarterly results, strong guidance, and positive analyst upgrades. The stock has seen increased institutional interest and volume.`,
  financialHealth: {
    revenueGrowth: 15.2,
    profitMargin: 12.5,
    debtToEquity: 0.45,
    currentRatio: 2.1,
    roe: 18.3,
    roa: 8.7,
    score: 8,
    summary: 'Strong financial position with healthy growth metrics and manageable leverage.'
  },
  valuation: {
    pe: 22.5,
    pb: 2.8,
    ps: 3.2,
    pegRatio: 1.2,
    evEbitda: 15.8,
    fairValue: 145.0,
    discount: 12.5,
    summary: 'Stock appears undervalued based on DCF analysis and peer comparison.'
  },
  redFlags: [
    'Increasing competition in core markets',
    'Regulatory risks in key jurisdictions',
    'Dependence on major customers'
  ],
  youtubeVideoId: 'dQw4w9WgXcQ',
  author: 'Stock Analysis Team',
  publishedDate: '2024-12-20',
  lastUpdated: '2024-12-20',
  tags: ['growth', 'technology', 'undervalued'],
  recommendation: 'BUY',
  targetPrice: 145.0,
  stopLoss: 110.0
});

const trendingStocks: Stock[] = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 195.89,
    change: 2.45,
    changePercent: 1.27,
    volume: 45678900,
    marketCap: '$3.0T',
    sector: 'Technology',
    analysis: generateMockAnalysis('1', 'AAPL')
  },
  {
    id: '2',
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 875.32,
    change: 15.67,
    changePercent: 1.82,
    volume: 28945600,
    marketCap: '$2.2T',
    sector: 'Technology',
    analysis: generateMockAnalysis('2', 'NVDA')
  },
  {
    id: '3',
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 408.83,
    change: -8.92,
    changePercent: -2.14,
    volume: 89654300,
    marketCap: '$1.3T',
    sector: 'Consumer Discretionary',
    analysis: generateMockAnalysis('3', 'TSLA')
  },
  {
    id: '4',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 415.26,
    change: 5.89,
    changePercent: 1.44,
    volume: 23456700,
    marketCap: '$3.1T',
    sector: 'Technology',
    analysis: generateMockAnalysis('4', 'MSFT')
  },
  {
    id: '5',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 175.84,
    change: 3.21,
    changePercent: 1.86,
    volume: 19876500,
    marketCap: '$2.1T',
    sector: 'Communication Services',
    analysis: generateMockAnalysis('5', 'GOOGL')
  }
];

const largecapStocks: Stock[] = [
  {
    id: '6',
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    price: 178.50,
    change: 2.85,
    changePercent: 1.62,
    volume: 34567800,
    marketCap: '$1.8T',
    sector: 'Consumer Discretionary',
    analysis: generateMockAnalysis('6', 'AMZN')
  },
  {
    id: '7',
    symbol: 'META',
    name: 'Meta Platforms, Inc.',
    price: 512.78,
    change: 8.94,
    changePercent: 1.77,
    volume: 15678900,
    marketCap: '$1.3T',
    sector: 'Communication Services',
    analysis: generateMockAnalysis('7', 'META')
  },
  {
    id: '8',
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    price: 224.15,
    change: 1.87,
    changePercent: 0.84,
    volume: 12345600,
    marketCap: '$650B',
    sector: 'Financial Services',
    analysis: generateMockAnalysis('8', 'JPM')
  }
];

const midcapStocks: Stock[] = [
  {
    id: '9',
    symbol: 'PLTR',
    name: 'Palantir Technologies Inc.',
    price: 68.50,
    change: 4.25,
    changePercent: 6.62,
    volume: 78901200,
    marketCap: '$150B',
    sector: 'Technology',
    analysis: generateMockAnalysis('9', 'PLTR')
  },
  {
    id: '10',
    symbol: 'SNOW',
    name: 'Snowflake Inc.',
    price: 165.40,
    change: 7.89,
    changePercent: 5.01,
    volume: 56789000,
    marketCap: '$55B',
    sector: 'Technology',
    analysis: generateMockAnalysis('10', 'SNOW')
  },
  {
    id: '11',
    symbol: 'RBLX',
    name: 'Roblox Corporation',
    price: 52.75,
    change: -2.15,
    changePercent: -3.92,
    volume: 34567800,
    marketCap: '$35B',
    sector: 'Communication Services',
    analysis: generateMockAnalysis('11', 'RBLX')
  }
];

const smallcapStocks: Stock[] = [
  {
    id: '12',
    symbol: 'UPST',
    name: 'Upstart Holdings, Inc.',
    price: 78.90,
    change: 12.45,
    changePercent: 18.73,
    volume: 23456700,
    marketCap: '$6.5B',
    sector: 'Financial Services',
    analysis: generateMockAnalysis('12', 'UPST')
  },
  {
    id: '13',
    symbol: 'SOFI',
    name: 'SoFi Technologies, Inc.',
    price: 15.67,
    change: 0.98,
    changePercent: 6.67,
    volume: 45678900,
    marketCap: '$15B',
    sector: 'Financial Services',
    analysis: generateMockAnalysis('13', 'SOFI')
  },
  {
    id: '14',
    symbol: 'RIVN',
    name: 'Rivian Automotive, Inc.',
    price: 14.32,
    change: -0.67,
    changePercent: -4.47,
    volume: 67890100,
    marketCap: '$13B',
    sector: 'Consumer Discretionary',
    analysis: generateMockAnalysis('14', 'RIVN')
  }
];

const investmentIdeas: Stock[] = [
  {
    id: '15',
    symbol: 'CRWD',
    name: 'CrowdStrike Holdings, Inc.',
    price: 298.45,
    change: 8.76,
    changePercent: 3.02,
    volume: 12345600,
    marketCap: '$72B',
    sector: 'Technology',
    analysis: generateMockAnalysis('15', 'CRWD')
  },
  {
    id: '16',
    symbol: 'SHOP',
    name: 'Shopify Inc.',
    price: 85.23,
    change: 2.34,
    changePercent: 2.83,
    volume: 23456700,
    marketCap: '$110B',
    sector: 'Technology',
    analysis: generateMockAnalysis('16', 'SHOP')
  },
  {
    id: '17',
    symbol: 'ZM',
    name: 'Zoom Video Communications, Inc.',
    price: 89.67,
    change: 1.98,
    changePercent: 2.26,
    volume: 34567800,
    marketCap: '$27B',
    sector: 'Communication Services',
    analysis: generateMockAnalysis('17', 'ZM')
  }
];

export const mockData: MarketData = {
  trending: trendingStocks,
  largecap: largecapStocks,
  midcap: midcapStocks,
  smallcap: smallcapStocks,
  ideas: investmentIdeas
};