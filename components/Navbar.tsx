'use client';

import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useCart } from '@/context/CartContext';

interface NavbarProps {
    availableCategories?: string[];
}

export default function Navbar({ availableCategories = [] }: NavbarProps) {
    const t = useTranslations('Nav');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const { cartCount, openCart } = useCart();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguage = () => {
        const newLocale = locale === 'fr' ? 'ar' : 'fr';
        router.replace(pathname, { locale: newLocale });
    };

    const navLinks = [
        { href: '/', label: t('home') },
        { href: '/shop', label: t('shop') },
        { href: '/about', label: t('about') },
        { href: '/contact', label: t('contact') },
    ];

    // Merge default known categories with dynamic ones to ensure key ones are present
    // or just rely on dynamic ones. Let's merge for better UX if DB is empty initially.
    // Actually, prompt says "show when i put cursor on boutique", implies dynamic ones.
    // Let's rely on passed props but maybe ensure capitalized.

    const uniqueCats = Array.from(new Set(availableCategories.map(c => c.charAt(0).toUpperCase() + c.slice(1))));

    return (
        <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-neutral-100/50 transition-all duration-300 py-4 shadow-sm">
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo - White when transparent (on dark hero), Dark when scrolled (on white) */}
                <Link
                    href="/"
                    className="text-2xl font-serif font-bold tracking-widest text-foreground transition-colors z-50"
                >
                    MABOX
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        if (link.href === '/shop') {
                            return (
                                <div key={link.href} className="relative group h-full flex items-center">
                                    <Link
                                        href={link.href}
                                        className="text-sm font-medium uppercase tracking-widest text-foreground/80 hover:text-primary transition-colors py-4 inline-block"
                                    >
                                        {link.label}
                                    </Link>

                                    {/* Mega Menu Dropdown */}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-[600px]">
                                        <div className="bg-white rounded-xl shadow-2xl border border-neutral-100 p-8 grid grid-cols-2 gap-8 relative overflow-hidden">
                                            {/* Decorative Background */}
                                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />

                                            {/* Categories List */}
                                            <div className="space-y-4 relative z-10">
                                                <h3 className="font-serif text-lg text-primary mb-2 border-b border-primary/20 pb-2">Collections</h3>
                                                {uniqueCats.length > 0 ? uniqueCats.slice(0, 5).map(cat => (
                                                    <Link key={cat} href={`/shop?category=${cat}`} className="block text-sm text-foreground hover:text-primary hover:translate-x-1 transition-all">
                                                        {cat}
                                                    </Link>
                                                )) : (
                                                    <p className="text-muted text-xs">Aucune collection</p>
                                                )}
                                                <Link href="/shop" className="block text-sm font-bold text-foreground mt-4 pt-4 border-t border-neutral-100">Tout Voir &rarr;</Link>
                                            </div>

                                            {/* Featured Image */}
                                            <div className="relative h-48 rounded-lg overflow-hidden group/image">
                                                <div className="absolute inset-0 bg-black/20 group-hover/image:bg-black/10 transition-colors z-10" />
                                                <img
                                                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop"
                                                    alt="New Arrivals"
                                                    className="object-cover w-full h-full transform group-hover/image:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute bottom-4 left-4 z-20 text-white">
                                                    <span className="text-xs font-bold uppercase tracking-wider mb-1 block">Nouveautés</span>
                                                    <span className="font-serif text-xl">Été 2026</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium uppercase tracking-widest text-foreground/80 hover:text-primary transition-colors"
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-6 z-50">
                    <button
                        onClick={toggleLanguage}
                        className="uppercase text-xs font-bold tracking-wider transition-colors text-foreground hover:text-primary"
                    >
                        {locale === 'fr' ? 'AR' : 'FR'}
                    </button>
                    <button onClick={openCart} className="relative group text-foreground hover:text-primary transition-colors">
                        <ShoppingBag className="w-5 h-5" />
                        <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                            {cartCount}
                        </span>
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={clsx("md:hidden z-50", scrolled ? "text-foreground" : "text-white")}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-0 left-0 w-full h-screen bg-background flex flex-col items-center justify-center gap-8 md:hidden shadow-xl"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-serif text-foreground hover:text-primary transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <button onClick={() => { toggleLanguage(); setMobileMenuOpen(false); }} className="text-lg uppercase font-bold text-muted mt-4">
                            {locale === 'fr' ? 'Arabic' : 'Français'}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
