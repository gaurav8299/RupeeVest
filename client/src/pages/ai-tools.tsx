import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import LoadingSpinner from "@/components/loading-spinner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Calculator, TrendingUp, UserCheck } from "lucide-react";
import type { FinanceAdviceRequest, StockAnalysisRequest, BudgetPlanRequest } from "@shared/schema";

export default function AITools() {
  const { toast } = useToast();
  
  // Finance Advisor State
  const [financeForm, setFinanceForm] = useState<FinanceAdviceRequest>({
    income: 0,
    expenses: 0,
    savingsGoal: 0,
    riskTolerance: "medium",
  });

  // Stock Analysis State
  const [stockForm, setStockForm] = useState<StockAnalysisRequest>({
    symbol: "",
    companyName: "",
  });

  // Budget Plan State
  const [budgetForm, setBudgetForm] = useState<BudgetPlanRequest>({
    monthlyIncome: 0,
    expenses: {},
    savingsTarget: 0,
  });

  // Mutations
  const financeAdviceMutation = useMutation({
    mutationFn: async (data: FinanceAdviceRequest) => {
      const response = await apiRequest("POST", "/api/ai/finance-advice", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your personalized finance advice has been generated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate finance advice. Please try again.",
        variant: "destructive",
      });
    },
  });

  const stockAnalysisMutation = useMutation({
    mutationFn: async (data: StockAnalysisRequest) => {
      const response = await apiRequest("POST", "/api/ai/stock-analysis", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Stock analysis has been generated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate stock analysis. Please try again.",
        variant: "destructive",
      });
    },
  });

  const budgetPlanMutation = useMutation({
    mutationFn: async (data: BudgetPlanRequest) => {
      const response = await apiRequest("POST", "/api/ai/budget-plan", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your budget plan has been generated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate budget plan. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFinanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    financeAdviceMutation.mutate(financeForm);
  };

  const handleStockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    stockAnalysisMutation.mutate(stockForm);
  };

  const handleBudgetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    budgetPlanMutation.mutate(budgetForm);
  };

  return (
    <>
      <Navigation />
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              AI-Powered <span className="text-navy-600">Financial Tools</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get personalized financial advice, stock analysis, and budget planning powered by artificial intelligence
            </p>
          </div>

          {/* Tools Tabs */}
          <Tabs defaultValue="finance-advisor" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="finance-advisor" className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                Finance Advisor
              </TabsTrigger>
              <TabsTrigger value="stock-analysis" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Stock Analysis
              </TabsTrigger>
              <TabsTrigger value="budget-planner" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Budget Planner
              </TabsTrigger>
            </TabsList>

            {/* Finance Advisor */}
            <TabsContent value="finance-advisor">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-navy-600" />
                    Personal Finance Advisor
                  </CardTitle>
                  <CardDescription>
                    Get AI-generated personalized savings and investment plans based on your financial situation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFinanceSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="income">Monthly Income (₹)</Label>
                        <Input
                          id="income"
                          type="number"
                          value={financeForm.income || ""}
                          onChange={(e) => setFinanceForm({...financeForm, income: Number(e.target.value)})}
                          placeholder="50000"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expenses">Monthly Expenses (₹)</Label>
                        <Input
                          id="expenses"
                          type="number"
                          value={financeForm.expenses || ""}
                          onChange={(e) => setFinanceForm({...financeForm, expenses: Number(e.target.value)})}
                          placeholder="30000"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="savingsGoal">Savings Goal (₹)</Label>
                        <Input
                          id="savingsGoal"
                          type="number"
                          value={financeForm.savingsGoal || ""}
                          onChange={(e) => setFinanceForm({...financeForm, savingsGoal: Number(e.target.value)})}
                          placeholder="1000000"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                        <Select value={financeForm.riskTolerance} onValueChange={(value: "low" | "medium" | "high") => setFinanceForm({...financeForm, riskTolerance: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low - Conservative</SelectItem>
                            <SelectItem value="medium">Medium - Balanced</SelectItem>
                            <SelectItem value="high">High - Aggressive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-navy-600 hover:bg-navy-700" disabled={financeAdviceMutation.isPending}>
                      {financeAdviceMutation.isPending ? <LoadingSpinner /> : "Get AI Advice"}
                    </Button>
                  </form>

                  {financeAdviceMutation.data && (
                    <div className="mt-8 p-6 bg-navy-50 rounded-lg animate-slide-up">
                      <h3 className="text-lg font-semibold text-navy-900 mb-4">Your Personalized Finance Plan</h3>
                      <div className="prose prose-sm max-w-none">
                        <p className="text-navy-800 whitespace-pre-wrap">{financeAdviceMutation.data.advice}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Stock Analysis */}
            <TabsContent value="stock-analysis">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Smart Stock Analyzer
                  </CardTitle>
                  <CardDescription>
                    Get AI-powered analysis of Indian stocks with real-time data and investment recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleStockSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="symbol">Stock Symbol</Label>
                        <Input
                          id="symbol"
                          value={stockForm.symbol}
                          onChange={(e) => setStockForm({...stockForm, symbol: e.target.value.toUpperCase()})}
                          placeholder="RELIANCE"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                          id="companyName"
                          value={stockForm.companyName}
                          onChange={(e) => setStockForm({...stockForm, companyName: e.target.value})}
                          placeholder="Reliance Industries Ltd"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={stockAnalysisMutation.isPending}>
                      {stockAnalysisMutation.isPending ? <LoadingSpinner /> : "Analyze Stock"}
                    </Button>
                  </form>

                  {stockAnalysisMutation.data && (
                    <div className="mt-8 p-6 bg-green-50 rounded-lg animate-slide-up">
                      <h3 className="text-lg font-semibold text-green-900 mb-4">Stock Analysis Report</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-green-700">Current Price</p>
                          <p className="text-xl font-bold text-green-900">₹{stockAnalysisMutation.data.currentPrice}</p>
                        </div>
                        <div>
                          <p className="text-sm text-green-700">Recommendation</p>
                          <p className="text-lg font-semibold text-green-900">{stockAnalysisMutation.data.recommendation}</p>
                        </div>
                      </div>
                      <div className="prose prose-sm max-w-none">
                        <p className="text-green-800 whitespace-pre-wrap">{stockAnalysisMutation.data.analysis}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Budget Planner */}
            <TabsContent value="budget-planner">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-amber-600" />
                    Interactive Budget Planner
                  </CardTitle>
                  <CardDescription>
                    Create a smart budget plan with AI-powered recommendations and visual charts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBudgetSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                      <Input
                        id="monthlyIncome"
                        type="number"
                        value={budgetForm.monthlyIncome || ""}
                        onChange={(e) => setBudgetForm({...budgetForm, monthlyIncome: Number(e.target.value)})}
                        placeholder="75000"
                        required
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <Label>Monthly Expenses</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {["rent", "food", "transportation", "utilities", "entertainment", "others"].map((category) => (
                          <div key={category} className="space-y-2">
                            <Label htmlFor={category} className="capitalize">{category} (₹)</Label>
                            <Input
                              id={category}
                              type="number"
                              value={budgetForm.expenses[category] || ""}
                              onChange={(e) => setBudgetForm({
                                ...budgetForm, 
                                expenses: {...budgetForm.expenses, [category]: Number(e.target.value)}
                              })}
                              placeholder="0"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="savingsTarget">Savings Target (₹)</Label>
                      <Input
                        id="savingsTarget"
                        type="number"
                        value={budgetForm.savingsTarget || ""}
                        onChange={(e) => setBudgetForm({...budgetForm, savingsTarget: Number(e.target.value)})}
                        placeholder="20000"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" disabled={budgetPlanMutation.isPending}>
                      {budgetPlanMutation.isPending ? <LoadingSpinner /> : "Generate Budget Plan"}
                    </Button>
                  </form>

                  {budgetPlanMutation.data && (
                    <div className="mt-8 p-6 bg-amber-50 rounded-lg animate-slide-up">
                      <h3 className="text-lg font-semibold text-amber-900 mb-4">Your Budget Plan</h3>
                      <div className="prose prose-sm max-w-none">
                        <p className="text-amber-800 whitespace-pre-wrap">{budgetPlanMutation.data.recommendations}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}
