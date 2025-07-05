# Stock Analysis Hub

A modern, interactive web application for analyzing and tracking trending stocks with detailed financial insights, built with React, TypeScript, and Tailwind CSS.

## Features

### 🔥 Core Features
- **Multi-Tab Navigation**: Browse stocks by categories (Trending, Large Cap, Mid Cap, Small Cap, Investment Ideas)
- **Interactive Stock Cards**: View detailed stock information with price movements, volume, and market cap
- **Comprehensive Analysis**: Each stock includes detailed analysis with financial health scoring
- **YouTube Integration**: Embed analysis videos directly from YouTube
- **Real-time Data Display**: Beautiful charts and metrics visualization
- **Responsive Design**: Fully responsive interface that works on all devices

### 📊 Analysis Features
- **Why It's Trending**: Detailed explanations of market movements
- **Financial Health Scoring**: 10-point scoring system for financial stability
- **Valuation Metrics**: P/E ratios, P/B ratios, and other key valuation indicators
- **Red Flags**: Important risk factors and warning signs
- **Recommendations**: BUY/HOLD/SELL recommendations with target prices
- **Stop Loss Levels**: Risk management with suggested stop-loss prices

### ✏️ Content Management
- **Analysis Editor**: Rich text editor for creating and editing stock analyses
- **Multi-Tab Editor**: Organized editing interface (Basic Info, Analysis, Metrics, Preview)
- **Tag System**: Categorize stocks with custom tags
- **YouTube Integration**: Easy video embedding with URL parsing
- **Real-time Preview**: See how your analysis will look before publishing

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React icons
- **Charts**: Recharts for data visualization
- **UI Components**: Headless UI for accessible components
- **Build Tool**: Create React App

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stock-analysis-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (⚠️ irreversible)

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── StockCard.tsx    # Individual stock display component
│   ├── StockList.tsx    # Grid layout for stock cards
│   └── AnalysisEditor.tsx # Modal editor for creating analyses
├── data/
│   └── mockData.ts      # Sample stock data and analyses
├── types.ts             # TypeScript type definitions
├── App.tsx              # Main application component
├── App.css              # Custom styles and animations
├── index.tsx            # Application entry point
└── index.css            # Global styles and Tailwind imports
```

## Usage Guide

### Viewing Stocks
1. **Navigate Tabs**: Click on tab headers to switch between stock categories
2. **View Details**: Each stock card shows current price, change, volume, and market cap
3. **Expand Analysis**: Click "View Analysis" to see detailed financial insights
4. **Watch Videos**: Click "Watch Video" to view analysis videos on YouTube

### Creating Analysis
1. **Click "New Analysis"** in the header or **"Edit Analysis"** on any stock card
2. **Basic Info Tab**: Enter title, trending explanation, YouTube video, and tags
3. **Analysis Tab**: Write detailed analysis content and summaries
4. **Metrics Tab**: Set recommendation, target price, and stop loss
5. **Preview Tab**: Review your analysis before saving
6. **Save**: Click "Save Analysis" to publish

### Stock Categories

#### 🔥 Trending Today
- Stocks making headlines with significant price movements
- Focus on news-driven momentum and short-term opportunities

#### 📈 Large Cap
- Established companies with market cap > $10B
- Blue-chip stocks with stable performance and dividends

#### 🚀 Mid Cap
- Growth companies with market cap $2B - $10B
- Balance of growth potential and stability

#### 💎 Small Cap
- Emerging companies with market cap < $2B
- High growth potential with increased volatility

#### 💡 Investment Ideas
- Curated investment themes and opportunities
- Long-term strategic positions and sector plays

## Data Structure

### Stock Object
```typescript
interface Stock {
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
```

### Analysis Object
```typescript
interface StockAnalysis {
  id: string;
  title: string;
  content: string;
  whyTrending: string;
  financialHealth: FinancialHealth;
  valuation: Valuation;
  redFlags: string[];
  youtubeVideoId?: string;
  recommendation: 'BUY' | 'HOLD' | 'SELL';
  targetPrice: number;
  stopLoss: number;
  tags: string[];
}
```

## Customization

### Adding New Stocks
1. Edit `src/data/mockData.ts`
2. Add new stock objects to the appropriate category arrays
3. Use the `generateMockAnalysis` function for quick analysis generation

### Styling
- **Tailwind Classes**: Modify utility classes in components
- **Custom Styles**: Add custom CSS in `src/App.css`
- **Theme Colors**: Update color palette in `tailwind.config.js`

### Components
- **StockCard**: Customize individual stock display
- **StockList**: Modify grid layout and responsive behavior
- **AnalysisEditor**: Enhance the editing experience

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React community for the excellent ecosystem
- Tailwind CSS for the utility-first styling approach
- Lucide React for beautiful icons
- The open-source community for inspiration and tools

---

**Built with ❤️ for stock market enthusiasts and financial analysts**
