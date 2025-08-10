# FinanceAI - AI-Powered Investment & Budgeting Platform

![FinanceAI](https://img.shields.io/badge/FinanceAI-AI%20Powered-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-18+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)

A comprehensive financial platform designed specifically for Indian investors, combining AI-powered insights with practical financial tools. Built with React, TypeScript, and Google Gemini AI.

## Screenshot
<img width="1913" height="932" alt="Screenshot 2025-08-10 222216" src="https://github.com/user-attachments/assets/92f8a3fa-2c45-48b5-a21c-e5e242b7783a" />
<img width="1912" height="926" alt="Screenshot 2025-08-10 222631" src="https://github.com/user-attachments/assets/51f5ebf9-f6d9-48cb-bfba-2644f80527d0" />
<img width="1915" height="923" alt="Screenshot 2025-08-10 222734" src="https://github.com/user-attachments/assets/cbfb75a5-954e-4429-b02e-63ec9a5f6260" />




## ✨ Features

- **AI-Generated Finance Blogs**: Automated content creation on Indian market trends and investment strategies
- **Personal Finance Advisor**: Customized investment recommendations based on income, expenses, and risk tolerance
- **Stock Analysis**: AI-powered insights on Indian stocks (NSE/BSE) with buy/sell/hold recommendations
- **Interactive Budget Planner**: Expense tracking with AI-powered optimization suggestions
- **Real-time Market Data**: Live Indian market indices (NIFTY 50, SENSEX, Bank NIFTY)
- **Beautiful UI**: Navy blue and gold theme with smooth animations
- **Responsive Design**: Works perfectly on desktop and mobile devices

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **TanStack React Query** for data fetching
- **Wouter** for routing
- **Framer Motion** for animations

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **Google Gemini AI** for content generation
- **In-memory storage** for development
- **RESTful API** design

### AI Integration
- **Google Gemini 2.5 Flash** for content generation
- **Google Gemini 2.5 Pro** for complex analysis
- Financial content optimization for Indian markets

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/financeai.git
   cd financeai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   NODE_ENV=development
   PORT=5000
   ```

4. **Get your Gemini API Key**
   - Go to [Google AI Studio](https://aistudio.google.com/)
   - Create a new API key
   - Add it to your `.env` file

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:5000
   ```

## 🛠️ Development Scripts

```bash
# Start development server (frontend + backend)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Lint code
npm run lint
```

## 📁 Project Structure

```
financeai/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   └── App.tsx        # Main app component
│   └── index.html         # HTML template
├── server/                # Backend Express app
│   ├── services/          # Business logic
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data storage layer
├── shared/               # Shared types and schemas
│   └── schema.ts        # Database schemas
└── README.md
```

## 🌐 API Endpoints

### Blog Management
- `GET /api/blogs` - Get all published blogs
- `GET /api/blogs/featured` - Get featured blogs
- `POST /api/blogs/generate` - Generate new blog with AI
- `GET /api/blogs/:slug` - Get specific blog post

### AI Tools
- `POST /api/ai/personal-finance-advice` - Get personalized investment advice
- `POST /api/ai/stock-analysis` - Analyze specific stocks
- `POST /api/ai/budget-plan` - Create budget recommendations

### Market Data
- `GET /api/market/indices` - Get Indian market indices (NIFTY, SENSEX, Bank NIFTY)
- `GET /api/market/top-gainers` - Get top performing stocks

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter

## 🎨 Design System

The platform uses a carefully crafted design system optimized for financial content:

- **Primary Colors**: Navy Blue (#1e3a8a) for trust and professionalism
- **Accent Colors**: Gold (#f59e0b) for highlights and CTAs
- **Typography**: Inter font family for excellent readability
- **Animations**: Subtle fade-ins and slide-ups for smooth user experience

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini AI API key | Yes |
| `NODE_ENV` | Environment (development/production) | No |
| `PORT` | Server port (default: 5000) | No |

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure serverless functions for API routes

### Railway/Render
1. Connect your GitHub repository
2. Set environment variables
3. Deploy with automatic builds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

- [ ] User authentication and profiles
- [ ] Portfolio tracking and analytics
- [ ] Email newsletter automation
- [ ] Mobile app (React Native)
- [ ] Advanced AI recommendations
- [ ] Integration with Indian brokers (Zerodha, Groww, etc.)
- [ ] Real-time notifications
- [ ] Social features and community

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: gauravrajput3005@gmail.com

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful content generation
- **shadcn/ui** for beautiful React components  
- **Tailwind CSS** for utility-first styling
- **Indian Financial Markets** for inspiration and data

---

Made with ❤️ for Indian investors by the Gaurav Rajput
