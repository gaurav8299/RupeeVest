import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BlogCard from "@/components/blog-card";
import LoadingSpinner from "@/components/loading-spinner";
import { Search } from "lucide-react";
import type { BlogPost } from "@shared/schema";

const categories = [
  { value: "all", label: "All" },
  { value: "stocks", label: "Stocks" },
  { value: "mutual-funds", label: "Mutual Funds" },
  { value: "budgeting", label: "Budgeting" },
  { value: "crypto", label: "Crypto" },
];

export default function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: featuredBlogs, isLoading: featuredLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blogs", "featured=true"],
    queryFn: async () => {
      const response = await fetch("/api/blogs?featured=true");
      if (!response.ok) throw new Error("Failed to fetch featured blogs");
      return response.json();
    },
  });

  const { data: blogs, isLoading: blogsLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blogs", selectedCategory === "all" ? undefined : selectedCategory, searchQuery || undefined],
    queryFn: async ({ queryKey }) => {
      const [, category, search] = queryKey;
      const params = new URLSearchParams();
      if (category) params.set("category", category as string);
      if (search) params.set("search", search as string);
      
      const response = await fetch(`/api/blogs?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch blogs");
      return response.json();
    },
  });

  const featuredBlog = featuredBlogs?.[0];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            AI-Generated <span className="text-navy-600">Finance Insights</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest market trends, investment strategies, and financial tips powered by artificial intelligence
          </p>
        </div>

        {/* Featured Blog */}
        {featuredBlog && (
          <div className="mb-12 animate-fade-in">
            <Card className="bg-gradient-to-r from-navy-600 to-navy-700 rounded-2xl overflow-hidden shadow-2xl card-hover">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <CardContent className="p-8 lg:p-12 text-white">
                  <div className="flex items-center mb-4">
                    <Badge className="bg-gold-500 text-white mr-3">Featured</Badge>
                    <span className="text-blue-200 text-sm">AI Generated • {featuredBlog.createdAt ? new Date(featuredBlog.createdAt).toLocaleDateString() : 'Today'}</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 leading-tight">{featuredBlog.title}</h3>
                  <p className="text-blue-100 mb-6 text-lg leading-relaxed">{featuredBlog.excerpt}</p>
                  <Link href={`/blogs/${featuredBlog.slug}`}>
                    <Button className="gold-gradient hover:bg-gold-600 text-navy-800 font-semibold transition-all transform hover:scale-105">
                      Read Full Analysis
                    </Button>
                  </Link>
                </CardContent>
                <div className="relative bg-navy-800/20 flex items-center justify-center p-8">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-gold-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-navy-800 text-2xl font-bold">AI</span>
                    </div>
                    <p className="text-blue-200 text-lg">Powered by Advanced AI Analysis</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Blog Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
                className={selectedCategory === category.value ? "bg-navy-600 hover:bg-navy-700" : ""}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        {blogsLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogs?.slice(0, 6).map((blog, index) => (
              <div key={blog.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        <div className="text-center">
          <Link href="/blogs">
            <Button className="bg-navy-600 hover:bg-navy-700 text-white px-8 py-3 font-semibold transition-all transform hover:scale-105">
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
