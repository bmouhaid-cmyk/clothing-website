'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Marquee() {
    const t = useTranslations('HomePage');

    // Repeating text for the infinite scroll
    const text = "NEW COLLECTION • SUMMER 2026 • LUXURY FABRICS • HANDMADE IN MOROCCO • ";

    return (
        <div className="bg-foreground text-background py-3 overflow-hidden flex relative z-40">
            <motion.div
                className="whitespace-nowrap flex gap-4 text-sm font-bold tracking-[0.2em] uppercase"
                animate={{ x: [0, -1000] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 20,
                }}
            >
                {/* Repeat enough times to fill screen + buffer */}
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
            </motion.div>
        </div>
    );
}
