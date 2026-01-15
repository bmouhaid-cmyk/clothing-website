'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Hero() {
    const t = useTranslations('HomePage');

    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-background">
            {/* Background Image - Full Screen */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2940&auto=format&fit=crop"
                    alt="Luxury Campaign"
                    fill
                    className="object-cover opacity-90"
                    priority
                />
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>

            <div className="container mx-auto px-6 relative z-10 h-full flex items-end pb-24 md:pb-32">
                <div className="max-w-3xl text-white space-y-8 rtl:text-right w-full">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-6xl md:text-8xl font-serif leading-none drop-shadow-lg"
                    >
                        {t('title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className="text-xl md:text-3xl font-light tracking-wide text-white/90 drop-shadow-md"
                    >
                        {t('subtitle')}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        className="pt-8"
                    >
                        <button className="bg-white text-black px-12 py-4 rounded-full text-sm font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-500 shadow-xl">
                            {t('cta')}
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
