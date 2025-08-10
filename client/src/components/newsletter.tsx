import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Shield, TrendingUp, UserCheck, Smartphone } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/newsletter/subscribe", { email });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our weekly AI-powered market digest.",
      });
      setEmail("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    subscribeMutation.mutate(email);
  };

  const features = [
    {
      icon: TrendingUp,
      title: "Weekly Market Analysis",
      description: "AI-powered insights on Indian market trends"
    },
    {
      icon: UserCheck,
      title: "Personalized Advice",
      description: "Tailored investment strategies for your goals"
    },
    {
      icon: Smartphone,
      title: "Mobile Alerts",
      description: "Important market updates on your phone"
    }
  ];

  return (
    <section className="py-20 gradient-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-white animate-fade-in">
          <h2 className="text-4xl font-bold mb-6">Stay Ahead with AI-Powered Market Insights</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Get weekly AI-generated market digest, personalized investment recommendations, and exclusive insights delivered to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 text-gray-900 bg-white rounded-lg focus:ring-2 focus:ring-gold-400 focus:outline-none"
                required
              />
              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            <Button 
              type="submit" 
              className="gold-gradient hover:bg-gold-600 text-navy-800 px-6 py-3 font-semibold transition-all transform hover:scale-105"
              disabled={subscribeMutation.isPending}
            >
              {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          
          <p className="text-blue-200 text-sm mb-12 flex items-center justify-center">
            <Shield className="mr-2 h-4 w-4" />
            No spam. Unsubscribe anytime. Your data is protected.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={feature.title} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110">
                    <IconComponent className="text-2xl h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-blue-200 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
