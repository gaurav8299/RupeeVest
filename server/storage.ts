import { 
  type User, 
  type InsertUser, 
  type BlogPost, 
  type InsertBlogPost,
  type FinanceAdvice,
  type InsertFinanceAdvice,
  type StockAnalysis,
  type InsertStockAnalysis,
  type BudgetPlan,
  type InsertBudgetPlan,
  type Newsletter,
  type InsertNewsletter,
  users,
  blogPosts,
  financeAdvice,
  stockAnalysis,
  budgetPlans,
  newsletter,
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, desc, and, or, like } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Blog operations
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
  getFeaturedBlogPosts(): Promise<BlogPost[]>;
  getBlogPostsByCategory(category: string): Promise<BlogPost[]>;
  searchBlogPosts(query: string): Promise<BlogPost[]>;
  
  // Finance advice operations
  createFinanceAdvice(advice: InsertFinanceAdvice): Promise<FinanceAdvice>;
  getFinanceAdviceByUserId(userId: string): Promise<FinanceAdvice[]>;
  
  // Stock analysis operations
  createStockAnalysis(analysis: InsertStockAnalysis): Promise<StockAnalysis>;
  getStockAnalysis(symbol: string): Promise<StockAnalysis | undefined>;
  getAllStockAnalyses(): Promise<StockAnalysis[]>;
  
  // Budget plan operations
  createBudgetPlan(plan: InsertBudgetPlan): Promise<BudgetPlan>;
  getBudgetPlansByUserId(userId: string): Promise<BudgetPlan[]>;
  
  // Newsletter operations
  subscribeToNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterSubscribers(): Promise<Newsletter[]>;
  unsubscribeFromNewsletter(email: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private blogPosts: Map<string, BlogPost> = new Map();
  private financeAdvices: Map<string, FinanceAdvice> = new Map();
  private stockAnalyses: Map<string, StockAnalysis> = new Map();
  private budgetPlans: Map<string, BudgetPlan> = new Map();
  private newsletters: Map<string, Newsletter> = new Map();

  constructor() {
    this.seedInitialData();
  }

  private seedInitialData() {
    // Create admin user
    const adminUser: User = {
      id: randomUUID(),
      username: "admin",
      email: "admin@financeai.com",
      password: "admin123",
      isAdmin: true,
      createdAt: new Date(),
    };
    this.users.set(adminUser.id, adminUser);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      isAdmin: insertUser.isAdmin || false,
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.published)
      .sort((a, b) => (b.createdAt ? new Date(b.createdAt).getTime() : 0) - (a.createdAt ? new Date(a.createdAt).getTime() : 0));
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const post: BlogPost = {
      ...insertPost,
      id,
      featured: insertPost.featured ?? false,
      tags: insertPost.tags ?? [],
      author: insertPost.author ?? "AI Assistant",
      published: insertPost.published ?? true,
      readTime: insertPost.readTime ?? 5,
      seoTitle: insertPost.seoTitle ?? insertPost.title,
      seoDescription: insertPost.seoDescription ?? insertPost.excerpt,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async updateBlogPost(id: string, updateData: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existingPost = this.blogPosts.get(id);
    if (!existingPost) return undefined;

    const updatedPost: BlogPost = {
      ...existingPost,
      ...updateData,
      updatedAt: new Date(),
    };
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  async getFeaturedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.featured && post.published)
      .sort((a, b) => (b.createdAt ? new Date(b.createdAt).getTime() : 0) - (a.createdAt ? new Date(a.createdAt).getTime() : 0))
      .slice(0, 3);
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.category === category && post.published)
      .sort((a, b) => (b.createdAt ? new Date(b.createdAt).getTime() : 0) - (a.createdAt ? new Date(a.createdAt).getTime() : 0));
  }

  async searchBlogPosts(query: string): Promise<BlogPost[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.blogPosts.values())
      .filter(post => 
        post.published && (
          post.title.toLowerCase().includes(lowercaseQuery) ||
          post.excerpt.toLowerCase().includes(lowercaseQuery) ||
          post.content.toLowerCase().includes(lowercaseQuery) ||
          post.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
        )
      )
      .sort((a, b) => (b.createdAt ? new Date(b.createdAt).getTime() : 0) - (a.createdAt ? new Date(a.createdAt).getTime() : 0));
  }

  async createFinanceAdvice(insertAdvice: InsertFinanceAdvice): Promise<FinanceAdvice> {
    const id = randomUUID();
    const advice: FinanceAdvice = {
      ...insertAdvice,
      id,
      userId: insertAdvice.userId ?? null,
      investmentPlan: insertAdvice.investmentPlan ?? null,
      createdAt: new Date(),
    };
    this.financeAdvices.set(id, advice);
    return advice;
  }

  async getFinanceAdviceByUserId(userId: string): Promise<FinanceAdvice[]> {
    return Array.from(this.financeAdvices.values())
      .filter(advice => advice.userId === userId)
      .sort((a, b) => (b.createdAt ? new Date(b.createdAt).getTime() : 0) - (a.createdAt ? new Date(a.createdAt).getTime() : 0));
  }

  async createStockAnalysis(insertAnalysis: InsertStockAnalysis): Promise<StockAnalysis> {
    const id = randomUUID();
    const analysis: StockAnalysis = {
      ...insertAnalysis,
      id,
      targetPrice: insertAnalysis.targetPrice ?? null,
      createdAt: new Date(),
    };
    this.stockAnalyses.set(id, analysis);
    return analysis;
  }

  async getStockAnalysis(symbol: string): Promise<StockAnalysis | undefined> {
    return Array.from(this.stockAnalyses.values())
      .find(analysis => analysis.symbol.toLowerCase() === symbol.toLowerCase());
  }

  async getAllStockAnalyses(): Promise<StockAnalysis[]> {
    return Array.from(this.stockAnalyses.values())
      .sort((a, b) => (b.createdAt ? new Date(b.createdAt).getTime() : 0) - (a.createdAt ? new Date(a.createdAt).getTime() : 0));
  }

  async createBudgetPlan(insertPlan: InsertBudgetPlan): Promise<BudgetPlan> {
    const id = randomUUID();
    const plan: BudgetPlan = {
      ...insertPlan,
      id,
      userId: insertPlan.userId ?? null,
      chartData: insertPlan.chartData ?? null,
      createdAt: new Date(),
    };
    this.budgetPlans.set(id, plan);
    return plan;
  }

  async getBudgetPlansByUserId(userId: string): Promise<BudgetPlan[]> {
    return Array.from(this.budgetPlans.values())
      .filter(plan => plan.userId === userId)
      .sort((a, b) => (b.createdAt ? new Date(b.createdAt).getTime() : 0) - (a.createdAt ? new Date(a.createdAt).getTime() : 0));
  }

  async subscribeToNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const id = randomUUID();
    const newsletter: Newsletter = {
      ...insertNewsletter,
      id,
      subscribed: insertNewsletter.subscribed ?? true,
      createdAt: new Date(),
    };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  async getNewsletterSubscribers(): Promise<Newsletter[]> {
    return Array.from(this.newsletters.values())
      .filter(subscriber => subscriber.subscribed);
  }

  async unsubscribeFromNewsletter(email: string): Promise<boolean> {
    const subscriber = Array.from(this.newsletters.values())
      .find(sub => sub.email === email);
    
    if (subscriber) {
      subscriber.subscribed = false;
      this.newsletters.set(subscriber.id, subscriber);
      return true;
    }
    return false;
  }
}

// DatabaseStorage implementation using PostgreSQL
export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db
      .insert(blogPosts)
      .values(insertPost)
      .returning();
    return post;
  }

  async updateBlogPost(id: string, updateData: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [post] = await db
      .update(blogPosts)
      .set(updateData)
      .where(eq(blogPosts.id, id))
      .returning();
    return post || undefined;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getFeaturedBlogPosts(): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.featured, true), eq(blogPosts.published, true)))
      .orderBy(desc(blogPosts.createdAt))
      .limit(3);
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.category, category), eq(blogPosts.published, true)))
      .orderBy(desc(blogPosts.createdAt));
  }

  async searchBlogPosts(query: string): Promise<BlogPost[]> {
    const searchTerm = `%${query.toLowerCase()}%`;
    return await db
      .select()
      .from(blogPosts)
      .where(
        and(
          eq(blogPosts.published, true),
          or(
            like(blogPosts.title, searchTerm),
            like(blogPosts.content, searchTerm),
            like(blogPosts.excerpt, searchTerm)
          )
        )
      )
      .orderBy(desc(blogPosts.createdAt));
  }

  async createFinanceAdvice(insertAdvice: InsertFinanceAdvice): Promise<FinanceAdvice> {
    const [advice] = await db
      .insert(financeAdvice)
      .values(insertAdvice)
      .returning();
    return advice;
  }

  async getFinanceAdviceByUserId(userId: string): Promise<FinanceAdvice[]> {
    return await db
      .select()
      .from(financeAdvice)
      .where(eq(financeAdvice.userId, userId))
      .orderBy(desc(financeAdvice.createdAt));
  }

  async createStockAnalysis(insertAnalysis: InsertStockAnalysis): Promise<StockAnalysis> {
    const [analysis] = await db
      .insert(stockAnalysis)
      .values(insertAnalysis)
      .returning();
    return analysis;
  }

  async getStockAnalysis(symbol: string): Promise<StockAnalysis | undefined> {
    const [analysis] = await db
      .select()
      .from(stockAnalysis)
      .where(eq(stockAnalysis.symbol, symbol))
      .orderBy(desc(stockAnalysis.createdAt))
      .limit(1);
    return analysis || undefined;
  }

  async getAllStockAnalyses(): Promise<StockAnalysis[]> {
    return await db
      .select()
      .from(stockAnalysis)
      .orderBy(desc(stockAnalysis.createdAt));
  }

  async createBudgetPlan(insertPlan: InsertBudgetPlan): Promise<BudgetPlan> {
    const [plan] = await db
      .insert(budgetPlans)
      .values(insertPlan)
      .returning();
    return plan;
  }

  async getBudgetPlansByUserId(userId: string): Promise<BudgetPlan[]> {
    return await db
      .select()
      .from(budgetPlans)
      .where(eq(budgetPlans.userId, userId))
      .orderBy(desc(budgetPlans.createdAt));
  }

  async subscribeToNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const [newsletterRecord] = await db
      .insert(newsletter)
      .values(insertNewsletter)
      .returning();
    return newsletterRecord;
  }

  async getNewsletterSubscribers(): Promise<Newsletter[]> {
    return await db
      .select()
      .from(newsletter)
      .where(eq(newsletter.subscribed, true));
  }

  async unsubscribeFromNewsletter(email: string): Promise<boolean> {
    const result = await db
      .update(newsletter)
      .set({ subscribed: false })
      .where(eq(newsletter.email, email));
    return (result.rowCount ?? 0) > 0;
  }
}

// Use DatabaseStorage for production, MemStorage for development
export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
