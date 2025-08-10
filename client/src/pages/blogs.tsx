import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BlogCard from "@/components/blog-card";
import LoadingSpinner from "@/components/loading-spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import type { BlogPost } from "@shared/schema";

const categories = [
  { value: "all", label: "All" },
  { value: "stocks", label: "Stocks" },
  { value: "mutual-funds", label: "Mutual Funds" },
  { value: "budgeting", label: "Budgeting" },
  { value: "crypto", label: "Crypto" },
  { value: "tax-planning", label: "Tax Planning" },
];

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: blogs, isLoading } = useQuery<BlogPost[]>({
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Navigation />
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              AI-Generated <span className="text-navy-600">Finance Insights</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest market trends, investment strategies, and financial tips powered by artificial intelligence
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <form onSubmit={handleSearch} className="flex-1">
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
            </form>
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
          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs?.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}

          {blogs && blogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
