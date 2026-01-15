'use client';

import { Product } from '@/lib/types';
import { Link } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Heart } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
    product: Product;
}

import { useCart } from '@/context/CartContext';
import { useState } from 'react';

// ... imports

export default function ProductCard({ product }: ProductCardProps) {
    const t = useTranslations('Product');
    const locale = useLocale() as 'fr' | 'ar';
    const name = product.name[locale];
    const { addItem } = useCart();

    const [showSizes, setShowSizes] = useState(false);

    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    const handleAddToCart = (size: string) => {
        addItem(product, size);
        setShowSizes(false);
        // Optional: Show toast or feedback
    };

    return (
        <div className="group relative">
            {/* Image Container */}
            <Link href={`/product/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary/10 mb-4 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                {product.isNew && (
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-medium tracking-widest uppercase rounded-full z-20 shadow-sm text-foreground">
                        {t('new')}
                    </span>
                )}

                <button className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white transition-all text-neutral-600 hover:text-red-400">
                    <Heart className="w-4 h-4" />
                </button>

                <Image
                    src={product.images[0]}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Quick Add Overlay */}
                <div
                    className="absolute inset-x-4 bottom-4 z-20"
                    onClick={(e) => e.preventDefault()} // Prevent link navigation when clicking overlay area
                >
                    <div className={`transition-transform duration-300 ${showSizes ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'}`}>
                        {!showSizes ? (
                            <button
                                onClick={() => setShowSizes(true)}
                                className="w-full bg-white/95 backdrop-blur-md text-foreground py-3 text-xs font-bold uppercase tracking-widest rounded-full shadow-lg hover:bg-white transition-colors flex items-center justify-center gap-2"
                            >
                                Ajouter
                            </button>
                        ) : (
                            <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg p-3 grid grid-cols-3 gap-2 animate-in slide-in-from-bottom-2">
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => handleAddToCart(size)}
                                        className="text-[10px] font-bold py-2 rounded bg-neutral-100 hover:bg-primary hover:text-white transition-colors uppercase"
                                    >
                                        {size}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setShowSizes(false)}
                                    className="col-span-3 text-[10px] text-muted hover:text-foreground mt-1"
                                >
                                    Annuler
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </Link>

            {/* Info */}
            <div className="text-center space-y-1 px-2">
                <Link href={`/product/${product.slug}`}>
                    <h3 className="text-base font-serif text-foreground group-hover:text-primary transition-colors line-clamp-1">{name}</h3>
                </Link>
                <p className="text-sm font-medium text-muted">{product.price} DH</p>
            </div>
        </div>
    );
}
