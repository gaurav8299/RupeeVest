import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LoadingSpinner from "@/components/loading-spinner";
import { TrendingUp, TrendingDown, Circle } from "lucide-react";

interface MarketData {
  nifty: { value: number; change: number; changePercent: number };
  sensex: { value: number; change: number; changePercent: number };
  bankNifty: { value: number; change: number; changePercent: number };
}

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function MarketOverview() {
  const { data: marketData, isLoading: marketLoading } = useQuery<MarketData>({
    queryKey: ["/api/market/indices"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: topGainers, isLoading: gainersLoading } = useQuery<Stock[]>({
    queryKey: ["/api/market/top-gainers"],
    refetchInterval: 30000,
  });

  const formatChange = (change: number, changePercent: number) => {
    const isPositive = change >= 0;
    return (
      <div className={`text-right ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        <p className="text-lg font-bold">
          {isPositive ? '+' : ''}₹{Math.abs(change).toFixed(2)}
        </p>
        <p className="text-sm font-medium">
          {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
        </p>
      </div>
    );
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Live <span className="text-navy-600">Market Data</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with real-time Indian market data, AI-generated insights, and personalized stock recommendations.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Market Indices */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg card-hover animate-fade-in">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">Market Overview</CardTitle>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Circle className="w-2 h-2 fill-current mr-2" />
                    Market Open
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {marketLoading ? (
                  <div className="flex justify-center py-8">
                    <LoadingSpinner size="lg" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {marketData && (
                      <>
                        <div className="p-4 bg-gradient-to-r from-navy-50 to-blue-50 rounded-xl">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">NIFTY 50</h4>
                              <p className="text-3xl font-bold text-navy-600">
                                {marketData.nifty.value.toFixed(2)}
                              </p>
                            </div>
                            {formatChange(marketData.nifty.change, marketData.nifty.changePercent)}
                          </div>
                        </div>
                        
                        <div className="p-4 bg-gradient-to-r from-gold-50 to-yellow-50 rounded-xl">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">SENSEX</h4>
                              <p className="text-3xl font-bold text-gold-600">
                                {marketData.sensex.value.toFixed(2)}
                              </p>
                            </div>
                            {formatChange(marketData.sensex.change, marketData.sensex.changePercent)}
                          </div>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">BANK NIFTY</h4>
                              <p className="text-3xl font-bold text-purple-600">
                                {marketData.bankNifty.value.toFixed(2)}
                              </p>
                            </div>
                            {formatChange(marketData.bankNifty.change, marketData.bankNifty.changePercent)}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Top Gainers */}
          <div>
            <Card className="shadow-lg card-hover animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <TrendingUp className="text-green-500 mr-2 h-5 w-5" />
                  Top Gainers Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                {gainersLoading ? (
                  <div className="flex justify-center py-8">
                    <LoadingSpinner />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {topGainers?.map((stock, index) => (
                      <div 
                        key={stock.symbol} 
                        className="flex justify-between items-center p-3 border-l-4 border-green-500 bg-green-50 rounded-lg transition-all duration-200 hover:bg-green-100"
                      >
                        <div>
                          <p className="font-semibold text-gray-900">{stock.symbol}</p>
                          <p className="text-sm text-gray-600">{stock.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">₹{stock.price.toFixed(2)}</p>
                          <p className="text-green-500 text-sm font-medium">
                            +₹{stock.change.toFixed(2)} (+{stock.changePercent.toFixed(2)}%)
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
