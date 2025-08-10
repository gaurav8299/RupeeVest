import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import LoadingSpinner from "@/components/loading-spinner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { PlusCircle, Bot, Users, TrendingUp } from "lucide-react";
import type { BlogPost } from "@shared/schema";

const blogTopics = [
  "Indian Stock Market Analysis",
  "Mutual Fund Investment Strategies",
  "Personal Budgeting Tips",
  "Tax Saving Investments",
  "Cryptocurrency in India",
  "SIP vs Lump Sum Investment",
  "ELSS Funds Guide",
  "Emergency Fund Planning",
  "Portfolio Diversification",
  "Market Volatility Management"
];

const categories = [
  "stocks",
  "mutual-funds", 
  "budgeting",
  "crypto",
  "tax-planning",
  "investment"
];

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [generateForm, setGenerateForm] = useState({
    topic: "",
    category: "",
  });

  const { data: blogs, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blogs"],
  });

  const { data: newsletterCount } = useQuery<number>({
    queryKey: ["/api/newsletter/count"],
    queryFn: async () => {
      // Mock data for now
      return 1250;
    },
  });

  const generateBlogMutation = useMutation({
    mutationFn: async (data: { topic: string; category: string }) => {
      const response = await apiRequest("POST", "/api/ai/generate-blog", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "New blog post has been generated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/blogs"] });
      setGenerateForm({ topic: "", category: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate blog post. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleGenerateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!generateForm.topic || !generateForm.category) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    generateBlogMutation.mutate(generateForm);
  };

  const handleQuickGenerate = (topic: string) => {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    generateBlogMutation.mutate({ topic, category: randomCategory });
  };

  return (
    <>
      <Navigation />
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Admin <span className="text-navy-600">Dashboard</span>
            </h1>
            <p className="text-xl text-gray-600">
              Manage AI-generated content and monitor platform performance
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="animate-fade-in">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Blog Posts</CardTitle>
                <Bot className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{blogs?.length || 0}</div>
                <p className="text-xs text-muted-foreground">AI-generated articles</p>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Newsletter Subscribers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{newsletterCount || 0}</div>
                <p className="text-xs text-muted-foreground">Active subscriptions</p>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Content Generation</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98%</div>
                <p className="text-xs text-muted-foreground">AI success rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="generate">Generate Content</TabsTrigger>
              <TabsTrigger value="manage">Manage Posts</TabsTrigger>
            </TabsList>

            {/* Generate Content */}
            <TabsContent value="generate">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Custom Generation */}
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-navy-600" />
                      Generate New Blog Post
                    </CardTitle>
                    <CardDescription>
                      Create AI-generated finance content on any topic
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleGenerateBlog} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="topic">Blog Topic</Label>
                        <Input
                          id="topic"
                          value={generateForm.topic}
                          onChange={(e) => setGenerateForm({...generateForm, topic: e.target.value})}
                          placeholder="e.g., Best mutual funds for beginners in 2024"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={generateForm.category} onValueChange={(value) => setGenerateForm({...generateForm, category: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-navy-600 hover:bg-navy-700" 
                        disabled={generateBlogMutation.isPending}
                      >
                        {generateBlogMutation.isPending ? <LoadingSpinner /> : "Generate Blog Post"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Quick Generation */}
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle>Quick Generate</CardTitle>
                    <CardDescription>
                      Generate content from popular finance topics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {blogTopics.map((topic) => (
                        <Button
                          key={topic}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start h-auto py-3 px-4 text-left"
                          onClick={() => handleQuickGenerate(topic)}
                          disabled={generateBlogMutation.isPending}
                        >
                          <div>
                            <p className="font-medium">{topic}</p>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Manage Posts */}
            <TabsContent value="manage">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Published Blog Posts</CardTitle>
                  <CardDescription>
                    Manage your AI-generated content library
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <LoadingSpinner size="lg" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {blogs?.map((blog) => (
                        <div key={blog.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{blog.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">{blog.excerpt}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary">{blog.category}</Badge>
                              <span className="text-xs text-gray-500">
                                {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Today'}
                              </span>
                              <span className="text-xs text-gray-500">
                                {blog.readTime} min read
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {blog.featured && (
                              <Badge className="bg-gold-500 text-white">Featured</Badge>
                            )}
                            <Badge variant={blog.published ? "default" : "secondary"}>
                              {blog.published ? "Published" : "Draft"}
                            </Badge>
                          </div>
                        </div>
                      ))}
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
