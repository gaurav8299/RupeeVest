import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, TrendingUp, Calculator, CheckCircle } from "lucide-react";

const tools = [
  {
    icon: UserCheck,
    title: "Personal Finance Advisor",
    description: "Input your income, expenses, and goals. Get a personalized AI-generated saving and investment strategy tailored for Indian markets.",
    features: [
      "Personalized investment plans",
      "Tax optimization strategies", 
      "Emergency fund planning"
    ],
    buttonText: "Get AI Advice",
    buttonClass: "bg-navy-600 hover:bg-navy-700",
    bgGradient: "from-blue-50 to-indigo-100"
  },
  {
    icon: TrendingUp,
    title: "Smart Stock Analyzer",
    description: "Get AI-powered analysis of Indian stocks and mutual funds with real-time data from NSE/BSE, simplified for beginners.",
    features: [
      "Real-time NSE/BSE data",
      "AI-generated stock summaries",
      "Risk assessment reports"
    ],
    buttonText: "Analyze Stocks",
    buttonClass: "bg-green-600 hover:bg-green-700",
    bgGradient: "from-green-50 to-emerald-100"
  },
  {
    icon: Calculator,
    title: "Interactive Budget Planner",
    description: "Create beautiful budget charts with AI-powered saving tips and expense optimization recommendations.",
    features: [
      "Interactive expense tracking",
      "AI-powered saving tips",
      "Visual budget analysis"
    ],
    buttonText: "Plan Budget",
    buttonClass: "bg-amber-600 hover:bg-amber-700",
    bgGradient: "from-amber-50 to-orange-100"
  }
];

export default function AIToolsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Powerful <span className="text-navy-600">AI-Driven</span> Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leverage cutting-edge artificial intelligence to make smarter financial decisions, plan your budget, and maximize your investments.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <Card 
                key={tool.title}
                className={`card-hover bg-gradient-to-br ${tool.bgGradient} border-0 shadow-lg animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className={`w-16 h-16 bg-gradient-to-r ${tool.buttonClass.replace('bg-', 'from-').replace(' hover:bg-', ' to-')} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="text-white h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{tool.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-base">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {tool.features.map((feature) => (
                      <div key={feature} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="text-green-500 mr-2 h-4 w-4 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Link href="/ai-tools">
                    <Button className={`w-full ${tool.buttonClass} text-white font-semibold py-3 transition-all duration-200 transform hover:scale-105`}>
                      {tool.buttonText}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
