import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array(),
  author: text("author").default("AI Assistant"),
  featured: boolean("featured").default(false),
  published: boolean("published").default(true),
  readTime: integer("read_time").default(5),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const financeAdvice = pgTable("finance_advice", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  income: integer("income").notNull(),
  expenses: integer("expenses").notNull(),
  savingsGoal: integer("savings_goal").notNull(),
  riskTolerance: text("risk_tolerance").notNull(),
  advice: text("advice").notNull(),
  investmentPlan: jsonb("investment_plan"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const stockAnalysis = pgTable("stock_analysis", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  symbol: text("symbol").notNull(),
  companyName: text("company_name").notNull(),
  currentPrice: integer("current_price").notNull(),
  analysis: text("analysis").notNull(),
  recommendation: text("recommendation").notNull(),
  riskLevel: text("risk_level").notNull(),
  targetPrice: integer("target_price"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const budgetPlans = pgTable("budget_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  monthlyIncome: integer("monthly_income").notNull(),
  expenses: jsonb("expenses").notNull(),
  savingsTarget: integer("savings_target").notNull(),
  recommendations: text("recommendations").notNull(),
  chartData: jsonb("chart_data"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const newsletter = pgTable("newsletter", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  subscribed: boolean("subscribed").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFinanceAdviceSchema = createInsertSchema(financeAdvice).omit({
  id: true,
  createdAt: true,
});

export const insertStockAnalysisSchema = createInsertSchema(stockAnalysis).omit({
  id: true,
  createdAt: true,
});

export const insertBudgetPlanSchema = createInsertSchema(budgetPlans).omit({
  id: true,
  createdAt: true,
});

export const insertNewsletterSchema = createInsertSchema(newsletter).omit({
  id: true,
  createdAt: true,
});

export const financeAdviceRequestSchema = z.object({
  income: z.number().min(0),
  expenses: z.number().min(0),
  savingsGoal: z.number().min(0),
  riskTolerance: z.enum(["low", "medium", "high"]),
});

export const stockAnalysisRequestSchema = z.object({
  symbol: z.string().min(1),
  companyName: z.string().min(1),
});

export const budgetPlanRequestSchema = z.object({
  monthlyIncome: z.number().min(0),
  expenses: z.record(z.string(), z.number()),
  savingsTarget: z.number().min(0),
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type FinanceAdvice = typeof financeAdvice.$inferSelect;
export type InsertFinanceAdvice = z.infer<typeof insertFinanceAdviceSchema>;
export type StockAnalysis = typeof stockAnalysis.$inferSelect;
export type InsertStockAnalysis = z.infer<typeof insertStockAnalysisSchema>;
export type BudgetPlan = typeof budgetPlans.$inferSelect;
export type InsertBudgetPlan = z.infer<typeof insertBudgetPlanSchema>;
export type Newsletter = typeof newsletter.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;

export type FinanceAdviceRequest = z.infer<typeof financeAdviceRequestSchema>;
export type StockAnalysisRequest = z.infer<typeof stockAnalysisRequestSchema>;
export type BudgetPlanRequest = z.infer<typeof budgetPlanRequestSchema>;
