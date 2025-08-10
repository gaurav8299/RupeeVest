import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import AIToolsSection from "@/components/ai-tools-section";
import MarketOverview from "@/components/market-overview";
import BlogSection from "@/components/blog-section";
import Newsletter from "@/components/newsletter";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <AIToolsSection />
      <MarketOverview />
      <BlogSection />
      <Newsletter />
      <Footer />
    </>
  );
}
