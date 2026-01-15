'use client';

import { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import { Link } from '@/i18n/navigation';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

interface ProductGridProps {
    products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
    const t = useTranslations('HomePage.product_grid');
    const locale = useLocale() as 'fr' | 'ar'; // Get current locale
    const [activeTab, setActiveTab] = useState<'all' | 'new' | 'best_sellers' | 'promotions'>('all');

    const filteredProducts = products.filter(product => {
        // Safe access to tags for current locale, fallback to empty array
        const pTags = product.tags?.[locale] || [];

        if (activeTab === 'all') return true;

        // Check "New"
        if (activeTab === 'new') {
            return product.isNew || pTags.includes('new') || pTags.includes('nouveau') || pTags.includes('جديد');
        }

        // Check "Best Sellers"
        if (activeTab === 'best_sellers') {
            return pTags.some(t => ['bestseller', 'best_seller', 'best_sellers', 'top', 'الأكثر مبيعا', 'مفضل'].includes(t));
        }

        // Check "Promotions"
        if (activeTab === 'promotions') {
            return pTags.some(t => ['promotion', 'promotions', 'sale', 'soldes', 'takhfid', 'تخفيض', 'عرض'].includes(t));
        }

        return false;
    });

    const tabs = [
        { id: 'all', label: t('tabs.all') },
        { id: 'new', label: t('tabs.new') },
        { id: 'best_sellers', label: t('tabs.best_sellers') },
        { id: 'promotions', label: t('tabs.promotions') },
    ] as const;

    return (
        <section className="py-16 md:py-24 bg-background container mx-auto px-4 md:px-0">
            <div className="flex flex-col items-center mb-12 space-y-6">
                <h2 className="text-3xl md:text-5xl font-serif text-foreground text-center">{t('title')}</h2>

                {/* Visual Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 border-b border-neutral-200 pb-4 w-full max-w-2xl px-4">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`text-sm font-medium uppercase tracking-widest transition-colors pb-4 -mb-4.5 border-b-2 ${activeTab === tab.id
                                ? 'text-foreground border-foreground font-bold'
                                : 'text-muted border-transparent hover:text-foreground'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-1 gap-y-10 md:gap-x-4 min-h-[400px]">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <div className="mt-16 text-center">
                <Link href="/shop" className="inline-block border-b border-black pb-1 text-sm uppercase tracking-widest hover:text-neutral-600 transition-colors">
                    {t('view_all')}
                </Link>
            </div>
        </section>
    );
}
