'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { Product } from '@/lib/types';

interface TrendingSliderProps {
    products: Product[];
}

export default function TrendingSlider({ products = [] }: TrendingSliderProps) {
    const t = useTranslations('HomePage.trending');
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });

    // Horizontal scroll effect based on vertical scroll
    // Reduced drag distance since we might have fewer collections initially
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

    const locale = useLocale() as 'fr' | 'ar';
    // Extract unique collections from products
    const collectionsMap = new Map();

    products.forEach(p => {
        const collectionName = p.collection?.[locale];
        if (collectionName && !collectionsMap.has(collectionName)) {
            collectionsMap.set(collectionName, {
                id: collectionName,
                key: collectionName,
                image: p.images[0],
                label: collectionName,
                isDynamic: true
            });
        }
    });

    const dynamicCollections = Array.from(collectionsMap.values());

    // Fallback to defaults if no dynamic collections
    const displayCollections = dynamicCollections.length > 0 ? dynamicCollections : [
        { id: '1', key: 'summer_breeze', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2000&auto=format&fit=crop', label: 'Summer Breeze' },
        { id: '2', key: 'evening_elegance', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=2000&auto=format&fit=crop', label: 'Evening Elegance' },
        { id: '3', key: 'modest_chic', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop', label: 'Modest Chic' },
        { id: '4', key: 'urban_silk', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop', label: 'Urban Silk' },
    ];

    if (displayCollections.length === 0) {
        return <div ref={targetRef} className="hidden" />;
    }

    return (
        <section ref={targetRef} className="py-24 bg-background overflow-hidden relative">
            <div className="container mx-auto px-6 mb-12 flex items-end justify-between">
                <div>
                    <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-2">{t('title')}</h2>
                    <p className="text-muted text-lg tracking-wide">{t('subtitle')}</p>
                </div>
                <div className="hidden md:block w-32 h-[1px] bg-foreground/20"></div>
            </div>

            <div className="h-[500px] md:h-[600px] flex items-center">
                <motion.div style={{ x }} className="flex gap-8 px-6 w-max">
                    {displayCollections.map((col) => (
                        <Link key={col.id} href={col.isDynamic ? `/shop?collection=${col.label}` : '/shop'} className="group relative w-[300px] md:w-[400px] h-[450px] md:h-[550px] overflow-hidden rounded-md cursor-pointer block">
                            <Image
                                src={col.image}
                                alt={col.label}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-8 left-8 text-white">
                                <h3 className="text-3xl font-serif mb-2">{col.isDynamic ? col.label : t(`collections.${col.key}`)}</h3>
                                <span className="text-sm uppercase tracking-widest border-b border-white/50 pb-1 group-hover:border-white transition-colors">{t('explore')}</span>
                            </div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

