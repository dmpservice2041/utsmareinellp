import Hero from "@/components/home/Hero";
import FeaturesIntro from "@/components/home/FeaturesIntro";
import Services from "@/components/home/Services";
import ProductHighlights from "@/components/home/ProductHighlights";
import BlogPreview from "@/components/home/BlogPreview";
import FAQ from "@/components/home/FAQ";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturesIntro />
      <Services />
      <ProductHighlights />
      <BlogPreview />
      <FAQ />
    </main>
  );
}
