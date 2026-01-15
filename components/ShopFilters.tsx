'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { Minus, Plus, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

interface ShopFiltersProps {
    availableCategories: string[];
}

export default function ShopFilters({ availableCategories }: ShopFiltersProps) {
    const t = useTranslations('Categories');
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get('category');
    const [isPriceOpen, setIsPriceOpen] = useState(true);

    // Map known system categories to their translation keys
    const knownCategories: Record<string, string> = {
        'robes': 'robes',
        'ensembles': 'ensembles',
        'abayas': 'abayas',
        'sacs': 'accessoires',
        'accessoires': 'accessoires'
    };

    // Merge system known categories with any new ones found in DB
    // We normalize to lowercase for deduplication but keep original for display if needed
    const allCats = Array.from(new Set([
        'Robes', 'Ensembles', 'Abayas', ...availableCategories
    ]));

    const categories = [
        { id: 'all', label: 'Tout voir' },
        ...allCats.map(cat => {
            const lowerCat = cat.toLowerCase();
            const translationKey = knownCategories[lowerCat];
            const label = translationKey ? t(translationKey) : cat.charAt(0).toUpperCase() + cat.slice(1);
            return { id: cat, label };
        })
    ];

    const handleCategoryChange = (catId: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (catId === 'all') {
            params.delete('category');
        } else {
            params.set('category', catId);
        }
        router.push(`/shop?${params.toString()}`);
    };

    return (
        <div className="space-y-8 sticky top-24">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-foreground/10">
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Filtres</span>
            </div>

            {/* Categories */}
            <div>
                <h3 className="font-serif text-lg mb-4 text-foreground">Catégories</h3>
                <ul className="space-y-2">
                    {categories.map((cat) => (
                        <li key={cat.id}>
                            <button
                                onClick={() => handleCategoryChange(cat.id)}
                                className={`group flex items-center justify-between w-full text-sm transition-all duration-300 px-3 py-2 rounded-md ${(activeCategory === cat.id) || (cat.id === 'all' && !activeCategory)
                                    ? 'bg-white text-foreground font-bold tracking-wide shadow-sm border-l-2 border-primary'
                                    : 'text-muted hover:bg-white/50 hover:text-foreground'
                                    }`}
                            >
                                <span>{cat.label}</span>
                                {(activeCategory === cat.id || (cat.id === 'all' && !activeCategory)) && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-background" />
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Price - Collapsible */}
            <div className="pt-6 border-t border-foreground/5">
                <button
                    onClick={() => setIsPriceOpen(!isPriceOpen)}
                    className="flex items-center justify-between w-full font-serif text-lg mb-4 text-foreground"
                >
                    <span>Prix</span>
                    {isPriceOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>

                {isPriceOpen && (
                    <div className="bg-white/60 border border-primary/10 p-4 rounded-xl space-y-4">
                        <div className="flex items-center justify-between text-xs text-muted">
                            <span>100 DH</span>
                            <span>5000 DH</span>
                        </div>
                        {/* Fake Range Slider Visual */}
                        <div className="h-1 bg-neutral-200 rounded-full relative">
                            <div className="absolute left-0 right-1/2 top-0 bottom-0 bg-foreground rounded-full" />
                            <div className="absolute right-1/2 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-foreground rounded-full shadow-sm cursor-grab" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
