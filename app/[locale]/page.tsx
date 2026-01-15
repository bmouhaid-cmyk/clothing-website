import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import CategorySection from '@/components/CategorySection';
import Marquee from '@/components/Marquee';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import TrendingSlider from '@/components/TrendingSlider';
import SpotlightSection from '@/components/SpotlightSection'; // New Section
import TrustSection from '@/components/TrustSection';
import DynamicCategorySections from '@/components/DynamicCategorySections';
import { getProducts } from '@/lib/db';
import { setRequestLocale } from 'next-intl/server';

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const products = await getProducts(); // Fetch once, pass to children

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Hero />
      <Marquee />
      <TrendingSlider products={products} />
      <SpotlightSection />
      <ProductGrid products={products} />
      <DynamicCategorySections products={products} />
      <CategorySection />
      <TrustSection />
      <Newsletter />
      <Footer />
    </main>
  );
}
