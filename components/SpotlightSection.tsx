'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function SpotlightSection() {
    const t = useTranslations('HomePage.spotlight');

    return (
        <section className="py-20 bg-background overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="relative rounded-2xl overflow-hidden h-[60vh] md:h-[70vh] flex items-center">
                    {/* Background Image */}
                    <Image
                        src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2600&auto=format&fit=crop"
                        alt={t('title')}
                        fill
                        className="object-cover object-center"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

                    {/* Content Content - Left Aligned */}
                    <div className="relative z-10 max-w-xl ltr:pl-8 ltr:md:pl-16 rtl:pr-8 rtl:md:pr-16 text-white space-y-6">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block px-3 py-1 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-sm"
                        >
                            {t('limited_offer')}
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl font-serif leading-none"
                        >
                            {t.rich('title', {
                                br: () => <br />
                            })}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-lg md:text-xl font-light text-white/90 max-w-sm"
                        >
                            {t('description')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <Link href="/shop" className="inline-block bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors rounded-full">
                                {t('cta')}
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
