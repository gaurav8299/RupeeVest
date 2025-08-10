import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import type { BlogPost } from "@shared/schema";

interface BlogCardProps {
  blog: BlogPost;
}

const categoryColors: Record<string, string> = {
  stocks: "bg-blue-100 text-blue-800",
  "mutual-funds": "bg-green-100 text-green-800",
  budgeting: "bg-orange-100 text-orange-800",
  crypto: "bg-yellow-100 text-yellow-800",
  "tax-planning": "bg-purple-100 text-purple-800",
  investment: "bg-indigo-100 text-indigo-800",
};

const stockImages = [
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  "https://images.unsplash.com/photo-1554224154-26032ffc0d07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
];

export default function BlogCard({ blog }: BlogCardProps) {
  const categoryColor = categoryColors[blog.category] || "bg-gray-100 text-gray-800";
  const randomImage = stockImages[Math.floor(Math.random() * stockImages.length)];

  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover transition-all duration-300">
      <div className="relative">
        <img
          src={randomImage}
          alt={blog.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <Badge className={categoryColor}>
            {blog.category.charAt(0).toUpperCase() + blog.category.slice(1).replace('-', ' ')}
          </Badge>
        </div>
        {blog.featured && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-gold-500 text-white">Featured</Badge>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
          <span className="px-2 py-1 bg-navy-100 text-navy-700 rounded-full font-medium">
            AI Generated
          </span>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Today'}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-navy-600 transition-colors">
          <Link href={`/blogs/${blog.slug}`} className="block">
            {blog.title}
          </Link>
        </h3>

        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
          {blog.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{blog.readTime} min read</span>
            </div>
          </div>
          
          <Link href={`/blogs/${blog.slug}`}>
            <button className="flex items-center gap-1 text-navy-600 hover:text-navy-700 font-medium text-sm transition-colors group">
              Read More
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
}
