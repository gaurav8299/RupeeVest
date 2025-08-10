import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertBlogPostSchema, 
  financeAdviceRequestSchema, 
  stockAnalysisRequestSchema, 
  budgetPlanRequestSchema, 
  insertNewsletterSchema 
} from "@shared/schema";
import { generateBlogPost, generateFinanceAdvice, generateStockAnalysis, generateBudgetPlan } from "./services/gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Blog routes
  app.get("/api/blogs", async (req, res) => {
    try {
      const { category, search, featured } = req.query;
      
      let posts;
      if (featured === 'true') {
        posts = await storage.getFeaturedBlogPosts();
      } else if (category) {
        posts = await storage.getBlogPostsByCategory(category as string);
      } else if (search) {
        posts = await storage.searchBlogPosts(search as string);
      } else {
        posts = await storage.getAllBlogPosts();
      }
      
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blogs/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blogs", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: "Invalid blog post data" });
    }
  });

  // AI Blog generation
  app.post("/api/ai/generate-blog", async (req, res) => {
    try {
      const { topic, category } = req.body;
      
      if (!topic || !category) {
        return res.status(400).json({ message: "Topic and category are required" });
      }

      const generatedContent = await generateBlogPost(topic, category);
      const slug = topic.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
      
      const blogPost = await storage.createBlogPost({
        title: generatedContent.title,
        slug: `${slug}-${Date.now()}`,
        excerpt: generatedContent.excerpt,
        content: generatedContent.content,
        category: category,
        tags: generatedContent.tags,
        author: "AI Assistant",
        featured: false,
        published: true,
        readTime: Math.ceil(generatedContent.content.length / 200),
        seoTitle: generatedContent.title,
        seoDescription: generatedContent.excerpt,
      });

      res.status(201).json(blogPost);
    } catch (error) {
      console.error("Blog generation error:", error);
      res.status(500).json({ message: "Failed to generate blog post" });
    }
  });

  // Finance advice
  app.post("/api/ai/finance-advice", async (req, res) => {
    try {
      const validatedData = financeAdviceRequestSchema.parse(req.body);
      const advice = await generateFinanceAdvice(validatedData);
      
      const financeAdvice = await storage.createFinanceAdvice({
        userId: null, // Anonymous for now
        income: validatedData.income,
        expenses: validatedData.expenses,
        savingsGoal: validatedData.savingsGoal,
        riskTolerance: validatedData.riskTolerance,
        advice: advice.advice,
        investmentPlan: advice.investmentPlan,
      });

      res.json(financeAdvice);
    } catch (error) {
      console.error("Finance advice error:", error);
      res.status(500).json({ message: "Failed to generate finance advice" });
    }
  });

  // Stock analysis
  app.post("/api/ai/stock-analysis", async (req, res) => {
    try {
      const validatedData = stockAnalysisRequestSchema.parse(req.body);
      
      // Check if we already have analysis for this stock
      const existingAnalysis = await storage.getStockAnalysis(validatedData.symbol);
      if (existingAnalysis) {
        return res.json(existingAnalysis);
      }

      const analysis = await generateStockAnalysis(validatedData);
      
      const stockAnalysis = await storage.createStockAnalysis({
        symbol: validatedData.symbol.toUpperCase(),
        companyName: validatedData.companyName,
        currentPrice: Math.floor(Math.random() * 1000) + 100, // Mock price for demo
        analysis: analysis.analysis,
        recommendation: analysis.recommendation,
        riskLevel: analysis.riskLevel,
        targetPrice: analysis.targetPrice,
      });

      res.json(stockAnalysis);
    } catch (error) {
      console.error("Stock analysis error:", error);
      res.status(500).json({ message: "Failed to generate stock analysis" });
    }
  });

  // Budget planning
  app.post("/api/ai/budget-plan", async (req, res) => {
    try {
      const validatedData = budgetPlanRequestSchema.parse(req.body);
      const plan = await generateBudgetPlan(validatedData);
      
      const budgetPlan = await storage.createBudgetPlan({
        userId: null, // Anonymous for now
        monthlyIncome: validatedData.monthlyIncome,
        expenses: validatedData.expenses,
        savingsTarget: validatedData.savingsTarget,
        recommendations: plan.recommendations,
        chartData: plan.chartData,
      });

      res.json(budgetPlan);
    } catch (error) {
      console.error("Budget planning error:", error);
      res.status(500).json({ message: "Failed to generate budget plan" });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      
      // Check if email already exists
      const existing = await storage.getNewsletterSubscribers();
      const alreadySubscribed = existing.find(sub => sub.email === validatedData.email);
      
      if (alreadySubscribed) {
        return res.status(400).json({ message: "Email already subscribed" });
      }

      const subscription = await storage.subscribeToNewsletter(validatedData);
      res.status(201).json({ message: "Successfully subscribed to newsletter" });
    } catch (error) {
      res.status(400).json({ message: "Invalid email address" });
    }
  });

  // Market data (mock data for demo)
  app.get("/api/market/indices", async (req, res) => {
    try {
      const marketData = {
        nifty: {
          value: 19745.25 + (Math.random() - 0.5) * 100,
          change: 125.30 + (Math.random() - 0.5) * 50,
          changePercent: 0.64 + (Math.random() - 0.5) * 0.5,
        },
        sensex: {
          value: 66382.10 + (Math.random() - 0.5) * 500,
          change: 421.85 + (Math.random() - 0.5) * 200,
          changePercent: 0.64 + (Math.random() - 0.5) * 0.5,
        },
        bankNifty: {
          value: 45234.75 + (Math.random() - 0.5) * 300,
          change: -78.25 + (Math.random() - 0.5) * 100,
          changePercent: -0.17 + (Math.random() - 0.5) * 0.3,
        }
      };
      
      res.json(marketData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch market data" });
    }
  });

  app.get("/api/market/top-gainers", async (req, res) => {
    try {
      const topGainers = [
        {
          symbol: "TATAMOTORS",
          name: "Tata Motors Ltd.",
          price: 785.40 + (Math.random() - 0.5) * 50,
          change: 47.20 + (Math.random() - 0.5) * 20,
          changePercent: 6.39 + (Math.random() - 0.5) * 2,
        },
        {
          symbol: "ADANIGREEN",
          name: "Adani Green Energy",
          price: 1234.60 + (Math.random() - 0.5) * 100,
          change: 65.80 + (Math.random() - 0.5) * 30,
          changePercent: 5.63 + (Math.random() - 0.5) * 2,
        },
        {
          symbol: "BHARTIARTL",
          name: "Bharti Airtel Ltd.",
          price: 987.30 + (Math.random() - 0.5) * 50,
          change: 42.15 + (Math.random() - 0.5) * 20,
          changePercent: 4.46 + (Math.random() - 0.5) * 1,
        }
      ];
      
      res.json(topGainers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch top gainers" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
