'use client';

import { useTranslations } from 'next-intl';

export default function Newsletter() {
    const t = useTranslations('Newsletter');

    return (
        <section className="bg-secondary/30 py-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-2xl font-serif text-black mb-4">{t('title')}</h2>
                <p className="text-sm text-neutral-500 mb-8 max-w-lg mx-auto">
                    {t('desc')}
                </p>

                <form className="max-w-md mx-auto flex border-b border-black pb-2">
                    <input
                        type="email"
                        placeholder={t('placeholder')}
                        className="flex-1 bg-transparent outline-none placeholder-neutral-400 text-sm"
                    />
                    <button className="text-xs font-bold uppercase tracking-widest hover:text-neutral-600">
                        {t('button')}
                    </button>
                </form>
                <p className="text-[10px] text-neutral-400 mt-4">
                    {t('disclaimer')}
                </p>
            </div>
        </section>
    );
}
