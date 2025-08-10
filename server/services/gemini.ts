import { GoogleGenAI } from "@google/genai";
import type { FinanceAdviceRequest, StockAnalysisRequest, BudgetPlanRequest } from "@shared/schema";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY || "" 
});

export interface GeneratedBlogContent {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export interface GeneratedFinanceAdvice {
  advice: string;
  investmentPlan: {
    emergency: string;
    shortTerm: string;
    longTerm: string;
    taxSaving: string;
  };
}

export interface GeneratedStockAnalysis {
  analysis: string;
  recommendation: "BUY" | "SELL" | "HOLD";
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  targetPrice: number;
}

export interface GeneratedBudgetPlan {
  recommendations: string;
  chartData: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor: string[];
    }>;
  };
}

export async function generateBlogPost(topic: string, category: string): Promise<GeneratedBlogContent> {
  try {
    const prompt = `Write a comprehensive finance blog post for Indian investors about "${topic}" in the ${category} category. 

Requirements:
- Write in a clear, engaging style suitable for beginners to intermediate investors
- Include specific examples relevant to the Indian market (NSE, BSE, Indian companies, INR amounts)
- Mention relevant Indian financial instruments (SIP, ELSS, PPF, EPF, etc.)
- Include practical tips and actionable advice
- Use proper financial terminology but explain complex concepts
- Structure with clear headings and sections
- Length should be 800-1200 words

Format the response as JSON with the following structure:
{
  "title": "SEO-optimized title (max 60 characters)",
  "excerpt": "Brief summary (150-200 characters)",
  "content": "Full HTML-formatted blog content with proper headings and paragraphs",
  "tags": ["array", "of", "relevant", "tags"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            title: { type: "string" },
            excerpt: { type: "string" },
            content: { type: "string" },
            tags: { 
              type: "array", 
              items: { type: "string" } 
            }
          },
          required: ["title", "excerpt", "content", "tags"]
        }
      },
      contents: prompt
    });

    const rawJson = response.text;
    if (!rawJson) {
      throw new Error("Empty response from AI model");
    }

    const result: GeneratedBlogContent = JSON.parse(rawJson);
    return result;
  } catch (error) {
    console.error("Blog generation error:", error);
    throw new Error("Failed to generate blog content");
  }
}

export async function generateFinanceAdvice(request: FinanceAdviceRequest): Promise<GeneratedFinanceAdvice> {
  try {
    const { income, expenses, savingsGoal, riskTolerance } = request;
    const monthlySavings = income - expenses;

    const prompt = `As a financial advisor for Indian investors, provide personalized advice based on these details:

Monthly Income: ₹${income}
Monthly Expenses: ₹${expenses}
Monthly Savings: ₹${monthlySavings}
Savings Goal: ₹${savingsGoal}
Risk Tolerance: ${riskTolerance}

Provide comprehensive advice covering:
1. Emergency fund planning (3-6 months expenses)
2. Tax-saving investments (80C, ELSS, PPF)
3. Short-term investment options (1-3 years)
4. Long-term wealth creation (5+ years)
5. Specific mutual fund categories and SIP amounts
6. Asset allocation based on risk tolerance

Focus on Indian financial instruments and provide specific actionable recommendations with amounts in INR.

Format as JSON:
{
  "advice": "Detailed personalized advice (500-800 words)",
  "investmentPlan": {
    "emergency": "Emergency fund recommendation",
    "shortTerm": "Short-term investment strategy",
    "longTerm": "Long-term investment strategy", 
    "taxSaving": "Tax saving recommendations"
  }
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            advice: { type: "string" },
            investmentPlan: {
              type: "object",
              properties: {
                emergency: { type: "string" },
                shortTerm: { type: "string" },
                longTerm: { type: "string" },
                taxSaving: { type: "string" }
              },
              required: ["emergency", "shortTerm", "longTerm", "taxSaving"]
            }
          },
          required: ["advice", "investmentPlan"]
        }
      },
      contents: prompt
    });

    const rawJson = response.text;
    if (!rawJson) {
      throw new Error("Empty response from AI model");
    }

    const result: GeneratedFinanceAdvice = JSON.parse(rawJson);
    return result;
  } catch (error) {
    console.error("Finance advice generation error:", error);
    throw new Error("Failed to generate finance advice");
  }
}

export async function generateStockAnalysis(request: StockAnalysisRequest): Promise<GeneratedStockAnalysis> {
  try {
    const { symbol, companyName } = request;

    const prompt = `As a stock analyst specializing in Indian markets, provide analysis for:

Company: ${companyName}
Stock Symbol: ${symbol}

Provide analysis covering:
1. Business fundamentals and competitive position
2. Financial health and key metrics
3. Growth prospects and industry trends
4. Risk factors and challenges
5. Valuation assessment
6. Investment recommendation (BUY/SELL/HOLD)
7. Risk level assessment (LOW/MEDIUM/HIGH)
8. Target price range

Focus on factors relevant to Indian stock market and retail investors. Be objective and balanced.

Format as JSON:
{
  "analysis": "Comprehensive stock analysis (400-600 words)",
  "recommendation": "BUY, SELL, or HOLD",
  "riskLevel": "LOW, MEDIUM, or HIGH",
  "targetPrice": estimated_target_price_in_rupees
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            analysis: { type: "string" },
            recommendation: { 
              type: "string", 
              enum: ["BUY", "SELL", "HOLD"] 
            },
            riskLevel: { 
              type: "string", 
              enum: ["LOW", "MEDIUM", "HIGH"] 
            },
            targetPrice: { type: "number" }
          },
          required: ["analysis", "recommendation", "riskLevel", "targetPrice"]
        }
      },
      contents: prompt
    });

    const rawJson = response.text;
    if (!rawJson) {
      throw new Error("Empty response from AI model");
    }

    const result: GeneratedStockAnalysis = JSON.parse(rawJson);
    return result;
  } catch (error) {
    console.error("Stock analysis generation error:", error);
    throw new Error("Failed to generate stock analysis");
  }
}

export async function generateBudgetPlan(request: BudgetPlanRequest): Promise<GeneratedBudgetPlan> {
  try {
    const { monthlyIncome, expenses, savingsTarget } = request;
    const totalExpenses = Object.values(expenses).reduce((sum, amount) => sum + amount, 0);
    const currentSavings = monthlyIncome - totalExpenses;

    const prompt = `As a financial planner, create a budget plan for an Indian household:

Monthly Income: ₹${monthlyIncome}
Current Expenses: ₹${totalExpenses}
Expense Breakdown: ${JSON.stringify(expenses)}
Current Savings: ₹${currentSavings}
Savings Target: ₹${savingsTarget}

Provide:
1. Analysis of current spending patterns
2. Recommendations to optimize expenses
3. Strategies to achieve savings target
4. Specific tips for Indian households
5. Emergency fund planning
6. Investment recommendations for surplus

Format as JSON:
{
  "recommendations": "Detailed budget recommendations (400-600 words)",
  "chartData": {
    "labels": ["Rent", "Food", "Transportation", "Utilities", "Entertainment", "Others", "Savings"],
    "datasets": [{
      "label": "Monthly Budget (₹)",
      "data": [expense_amounts_and_target_savings],
      "backgroundColor": ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444", "#6B7280", "#059669"]
    }]
  }
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            recommendations: { type: "string" },
            chartData: {
              type: "object",
              properties: {
                labels: { 
                  type: "array", 
                  items: { type: "string" } 
                },
                datasets: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      label: { type: "string" },
                      data: { 
                        type: "array", 
                        items: { type: "number" } 
                      },
                      backgroundColor: {
                        type: "array",
                        items: { type: "string" }
                      }
                    },
                    required: ["label", "data", "backgroundColor"]
                  }
                }
              },
              required: ["labels", "datasets"]
            }
          },
          required: ["recommendations", "chartData"]
        }
      },
      contents: prompt
    });

    const rawJson = response.text;
    if (!rawJson) {
      throw new Error("Empty response from AI model");
    }

    const result: GeneratedBudgetPlan = JSON.parse(rawJson);
    return result;
  } catch (error) {
    console.error("Budget plan generation error:", error);
    throw new Error("Failed to generate budget plan");
  }
}
