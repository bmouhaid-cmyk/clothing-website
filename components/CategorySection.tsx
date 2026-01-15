'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function CategorySection() {
    const t = useTranslations('Categories');

    const categories = [
        {
            id: 'robes',
            label: t('robes'),
            image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=2000&auto=format&fit=crop',
            link: '/shop?category=Robes',
            gridClass: 'md:col-span-2 md:row-span-2 h-[600px]' // Dominant Item
        },
        {
            id: 'ensembles',
            label: t('ensembles'),
            image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop',
            link: '/shop?category=Ensembles',
            gridClass: 'md:col-span-1 h-[290px]'
        },
        {
            id: 'abayas',
            label: t('abayas'),
            image: 'https://images.unsplash.com/photo-1583846783214-7229a91b20ed?q=80&w=2000&auto=format&fit=crop',
            link: '/shop?category=Abayas',
            gridClass: 'md:col-span-1 h-[290px]'
        }
    ];

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Artistic Background Element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-16 flex flex-col md:flex-row items-end justify-between gap-6">
                    <div>
                        <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] pl-1">{t('label')}</span>
                        <h2 className="text-5xl md:text-7xl font-serif text-foreground mt-2 leading-[0.9]">
                            {t('title')}
                        </h2>
                    </div>
                    <Link href="/shop" className="group flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-muted hover:text-foreground transition-colors">
                        <span className="border-b border-transparent group-hover:border-foreground pb-1 transition-all">{t('explore_all')}</span>
                        <div className="bg-white p-2 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                            <ArrowUpRight className="w-4 h-4 rtl:rotate-180" />
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Main Organic Grid */}
                    {categories.map((cat, idx) => (
                        <Link key={cat.id} href={cat.link} className={`group relative block overflow-hidden rounded-2xl ${cat.gridClass}`}>
                            <Image
                                src={cat.image}
                                alt={cat.label}
                                fill
                                className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                            {/* Hover Reveal Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end items-start rtl:items-end">
                                <h3 className="text-3xl md:text-4xl font-serif text-white translate-y-0 group-hover:-translate-y-2 transition-transform duration-500 origin-left rtl:origin-right">
                                    {cat.label}
                                </h3>
                                <div className="h-[1px] w-12 bg-white/50 mt-4 group-hover:w-full transition-all duration-700 ease-out" />
                                <span className="text-white/80 text-xs font-bold uppercase tracking-widest mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                    {t('discover')}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
