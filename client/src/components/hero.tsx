import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp, Bot, Play } from "lucide-react";

export default function Hero() {
  const [portfolioValue, setPortfolioValue] = useState(245680);
  const [profit, setProfit] = useState(28456);

  useEffect(() => {
    const interval = setInterval(() => {
      setPortfolioValue(prev => prev + Math.floor(Math.random() * 100 - 50));
      setProfit(prev => prev + Math.floor(Math.random() * 50 - 25));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stocks = [
    { symbol: "RELIANCE", change: "+5.2%" },
    { symbol: "TCS", change: "+3.8%" },
    { symbol: "INFY", change: "-1.2%" },
  ];

  return (
    <section className="gradient-bg relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Smart <span className="text-gold-400">AI-Powered</span> Finance for Indians
            </h1>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              Get personalized investment advice, AI-generated market insights, and budgeting tools designed specifically for the Indian market. Start your financial journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button className="gold-gradient hover:bg-gold-600 text-navy-800 px-8 py-4 text-lg font-semibold transition-all transform hover:scale-105">
                <Bot className="mr-2 h-5 w-5" />
                Try AI Advisor
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-navy-900 px-8 py-4 text-lg font-semibold transition-all"
              >
                <Play className="mr-2 h-5 w-5" />
                View Market Data
              </Button>
            </div>
            <div className="flex items-center space-x-6 text-blue-100">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
                <span>50,000+ Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
                <span>4.8/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
                <span>Bank-level Security</span>
              </div>
            </div>
          </div>

          {/* Right Content - Portfolio Mockup */}
          <div className="relative animate-slide-up">
            <div className="bg-white rounded-2xl shadow-2xl p-6 animate-float">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Portfolio Overview</h3>
                <span className="text-green-500 text-sm font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12.5%
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-navy-900">₹{portfolioValue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Value</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500">₹{profit.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Profit</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {stocks.map((stock, index) => (
                  <div key={stock.symbol} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{stock.symbol}</span>
                    <span className={`font-medium ${
                      stock.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {stock.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gold-400 rounded-full flex items-center justify-center animate-bounce-soft">
              <span className="text-navy-800 text-xl font-bold">₹</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-bounce-soft" style={{animationDelay: '0.5s'}}>
              <TrendingUp className="text-white h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
