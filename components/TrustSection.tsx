'use client';

import { Truck, RotateCcw, ShieldCheck, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function TrustSection() {
    const t = useTranslations('Trust');

    const features = [
        { icon: Truck, title: t('delivery.title'), desc: t('delivery.desc'), delay: 0 },
        { icon: RotateCcw, title: t('returns.title'), desc: t('returns.desc'), delay: 0.1 },
        { icon: ShieldCheck, title: t('payment.title'), desc: t('payment.desc'), delay: 0.2 },
        { icon: Sun, title: t('support.title'), desc: t('support.desc'), delay: 0.3 },
    ];

    return (
        <section className="py-24 bg-background border-y border-primary/5 relative overflow-hidden">
            {/* Decorative Background Blur */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/20 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center space-y-5 group cursor-default">
                            <div className="relative">
                                <div className="absolute inset-0 bg-secondary/30 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 ease-out" />
                                <div className="relative p-5 rounded-full border border-primary/20 bg-background text-primary group-hover:text-foreground group-hover:border-primary transition-colors duration-300">
                                    <feature.icon className="w-8 h-8" strokeWidth={1.2} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-serif text-xl text-foreground font-medium tracking-wide group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                                <p className="text-sm text-muted font-light leading-relaxed max-w-[200px] mx-auto">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
