'use client';

import { Link } from '@/i18n/navigation';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('Footer');

    return (
        <footer className="bg-foreground text-background py-16">
            <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12">
                {/* Brand */}
                <div className="space-y-6">
                    <Link href="/" className="text-3xl font-serif font-bold tracking-widest text-primary">
                        MABOX
                    </Link>
                    <p className="text-sm opacity-60 leading-relaxed">
                        {t('about')}
                    </p>
                </div>

                {/* Links 1 */}
                <div>
                    <h3 className="font-serif text-lg mb-6">{t('collections')}</h3>
                    <ul className="space-y-4 text-sm opacity-80">
                        <li><Link href="/shop" className="hover:text-primary transition-colors">{t('new')}</Link></li>
                        <li><Link href="/shop?cat=robes" className="hover:text-primary transition-colors">{t('robes')}</Link></li>
                        <li><Link href="/shop?cat=sets" className="hover:text-primary transition-colors">{t('sets')}</Link></li>
                        <li><Link href="/shop?cat=sale" className="hover:text-primary transition-colors">{t('sale')}</Link></li>
                    </ul>
                </div>

                {/* Links 2 */}
                <div>
                    <h3 className="font-serif text-lg mb-6">{t('help')}</h3>
                    <ul className="space-y-4 text-sm opacity-80">
                        <li><Link href="/contact" className="hover:text-primary transition-colors">{t('contact')}</Link></li>
                        <li><Link href="/shipping" className="hover:text-primary transition-colors">{t('shipping')}</Link></li>
                        <li><Link href="/returns" className="hover:text-primary transition-colors">{t('returns')}</Link></li>
                        <li><Link href="/faq" className="hover:text-primary transition-colors">{t('faq')}</Link></li>
                    </ul>
                </div>

                {/* Socials */}
                <div>
                    <h3 className="font-serif text-lg mb-6">{t('follow')}</h3>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all group">
                            <Instagram className="w-5 h-5 group-hover:text-white" />
                        </a>
                        <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all group">
                            <Facebook className="w-5 h-5 group-hover:text-white" />
                        </a>
                        <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all group">
                            <Twitter className="w-5 h-5 group-hover:text-white" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center text-xs opacity-40 uppercase tracking-widest">
                {t('copyright')}
            </div>
        </footer>
    );
}
