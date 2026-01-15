'use client';

import { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';

interface DynamicCategorySectionsProps {
    products: Product[];
}

export default function DynamicCategorySections({ products }: DynamicCategorySectionsProps) {
    const locale = useLocale() as 'fr' | 'ar';
    // 1. Group products by category
    const productsByCategory = products.reduce((acc, product) => {
        const category = product.category?.[locale] || 'Uncategorized';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(product);
        return acc;
    }, {} as Record<string, Product[]>);

    // 2. Filter out categories with few products if desired, or just show all
    const categories = Object.keys(productsByCategory);

    return (
        <div className="space-y-16 py-16">
            {categories.map((category) => {
                const categoryProducts = productsByCategory[category];
                if (categoryProducts.length === 0) return null;

                return (
                    <section key={category} className="container mx-auto px-4 md:px-6">
                        <div className="flex items-end justify-between mb-8 border-b border-neutral-100 pb-4">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-2">Collection</h3>
                                <h2 className="text-3xl md:text-5xl font-serif text-foreground capitalize">{category}</h2>
                            </div>
                            <Link
                                href={`/shop?category=${category}`}
                                className="hidden md:inline-block text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors mb-2"
                            >
                                Voir tout
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {categoryProducts.slice(0, 4).map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        <div className="mt-8 text-center md:hidden">
                            <Link href={`/shop?category=${category}`} className="text-xs font-bold uppercase tracking-widest underline underline-offset-4">
                                Voir tout les produits
                            </Link>
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
