import { getProducts } from '@/lib/db';
import { getTranslations } from 'next-intl/server';
import ProductCard from '@/components/ProductCard';
import ShopFilters from '@/components/ShopFilters';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronDown } from 'lucide-react';

export default async function ShopPage({
    searchParams,
    params: { locale }
}: {
    searchParams: { category?: string; sort?: string };
    params: { locale: string };
}) {
    const t = await getTranslations('HomePage');
    const allProducts = await getProducts();
    const { category, sort } = searchParams;

    let filteredProducts = allProducts;
    if (category) {
        filteredProducts = filteredProducts.filter(
            (p) => p.category[locale as 'fr' | 'ar']?.toLowerCase() === category.toLowerCase()
        );
    }

    // Extract unique categories from products based on current locale
    const uniqueCategories = Array.from(new Set(allProducts.map(p => p.category[locale as 'fr' | 'ar']))).filter(Boolean);

    return (
        <main className="min-h-screen bg-background">

            {/* Shop Hero / Header */}
            <div className="pt-32 pb-16 bg-background border-b border-primary/5 relative overflow-hidden">
                {/* Simple Texture */}
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#C6A87C 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}></div>

                <div className="container mx-auto px-6 text-center space-y-4 relative z-10">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Boutique Officielle</span>
                    <h1 className="text-5xl md:text-7xl font-serif text-foreground">
                        {category ? category : 'COLLECTION'}
                    </h1>
                    <div className="w-24 h-1 bg-primary/20 mx-auto mt-4 rounded-full" />
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Sidebar - Fixed Width */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <ShopFilters availableCategories={uniqueCategories} />
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-100">
                            <p className="text-sm text-muted">
                                <span className="font-bold text-foreground">{filteredProducts.length}</span> Résultats
                            </p>

                            {/* Sort Dropdown Visual */}
                            <div className="relative group cursor-pointer flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                                <span>Trier par</span>
                                <ChevronDown className="w-4 h-4" />
                                {/* Dropdown Menu (Hover) */}
                                <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                                    <button className="block w-full text-left px-4 py-2 hover:bg-neutral-50 text-xs uppercase tracking-widest">Nouveautés</button>
                                    <button className="block w-full text-left px-4 py-2 hover:bg-neutral-50 text-xs uppercase tracking-widest">Prix Croissant</button>
                                    <button className="block w-full text-left px-4 py-2 hover:bg-neutral-50 text-xs uppercase tracking-widest">Prix Décroissant</button>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-32 text-center bg-neutral-50 rounded-2xl">
                                <h3 className="text-2xl font-serif text-foreground mb-2">Oups !</h3>
                                <p className="text-muted">Aucun produit ne correspond à votre recherche.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
