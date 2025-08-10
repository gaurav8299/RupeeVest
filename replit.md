# FinanceAI - AI-Powered Investment & Budgeting Platform

## Overview

FinanceAI is a comprehensive financial platform designed specifically for Indian investors, combining AI-powered insights with practical financial tools. The platform offers personalized investment advice, automated blog content generation, stock analysis, budget planning, and real-time market data visualization. Built as a full-stack web application, it serves both end users seeking financial guidance and administrators managing content and AI-generated insights.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with pages for home, blogs, AI tools, and admin
- **UI Framework**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: TanStack React Query for server state management and data fetching
- **Form Handling**: React Hook Form with Zod validation schemas

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **API Design**: RESTful API with endpoints for blogs, AI tools, market data, and newsletter subscriptions
- **Database ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **AI Integration**: Google Gemini AI for generating financial content, advice, and analysis

### Data Storage Solutions
- **Primary Database**: PostgreSQL with the following main entities:
  - Users (authentication and profile data)
  - Blog posts (AI-generated financial content)
  - Finance advice (personalized investment recommendations)
  - Stock analysis (AI-powered market insights)
  - Budget plans (expense tracking and recommendations)
  - Newsletter subscriptions

### Authentication & Authorization
- Session-based authentication system
- Role-based access control with admin privileges for content management
- User profile management with personalized financial data storage

### AI-Powered Features
- **Content Generation**: Automated blog post creation on financial topics relevant to Indian markets
- **Personal Finance Advisor**: Customized investment strategies based on user income, expenses, and risk tolerance
- **Stock Analysis**: AI-generated insights on Indian stocks (NSE/BSE) with buy/sell/hold recommendations
- **Budget Planning**: Interactive expense tracking with AI-powered optimization suggestions

## External Dependencies

### Third-Party Services
- **Google Gemini AI**: Primary AI service for content generation and financial analysis
- **Neon Database**: Serverless PostgreSQL hosting platform
- **Replit**: Development environment with integrated deployment

### Key Libraries & Frameworks
- **Frontend**: React, TanStack React Query, Wouter, Radix UI, Tailwind CSS
- **Backend**: Express.js, Drizzle ORM with PostgreSQL adapter
- **AI Integration**: Google Generative AI SDK
- **Development Tools**: Vite, TypeScript, ESBuild for production builds
- **UI Components**: Complete shadcn/ui component library for consistent design system

### Market Data Integration
- Real-time Indian stock market data (NSE/BSE)
- Portfolio tracking and performance analytics
- Interactive charts and financial visualizations

### Newsletter & Communication
- Email subscription management for financial insights
- Automated market digest generation and distribution