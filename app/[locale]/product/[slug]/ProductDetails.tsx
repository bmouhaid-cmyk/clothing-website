'use client';

import { Product } from '@/lib/types';
import { useState } from 'react';
import { Heart, Truck, Ruler, Share2 } from 'lucide-react';
import SizeGuideModal from '@/components/SizeGuideModal';
import { useCart } from '@/context/CartContext';
import { useTranslations } from 'next-intl';

interface ProductDetailsProps {
    product: Product;
    description: string;
    name: string;
    locale: 'fr' | 'ar';
}

export default function ProductDetails({ product, description, name, locale }: ProductDetailsProps) {
    const t = useTranslations('ProductDetails');
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
    const { addItem } = useCart();

    const sizes = ['XS', 'S', 'M', 'L', 'XL'];

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert(t('select_size_error'));
            return;
        }

        addItem(product, selectedSize);
    };

    return (
        <>
            <div className="space-y-8 flex flex-col h-full justify-between pb-8">
                <div className="space-y-6">
                    {/* Header */}
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-5xl font-serif text-foreground uppercase leading-tight tracking-wide">{name}</h1>
                        <div className="flex items-center justify-between">
                            <p className="text-xl md:text-2xl font-light text-muted">{product.price} MAD</p>
                            <button className="text-muted hover:text-red-500 transition-colors">
                                <Heart className="w-6 h-6" />
                            </button>
                        </div>
                        <p className="text-xs text-muted uppercase tracking-widest pt-2">{t('ref')}: {product.id.substring(0, 8)}</p>
                    </div>

                    {/* Description */}
                    <div className="text-sm text-neutral-600 leading-relaxed font-light">
                        <p>{description}</p>
                    </div>

                    {/* Size Selector */}
                    <div className="space-y-3">
                        <div className="flex justify-between text-xs uppercase tracking-widest font-bold text-foreground">
                            <span>{t('size_label')}</span>
                            <button
                                onClick={() => setIsSizeGuideOpen(true)}
                                className="flex items-center gap-1 text-muted hover:text-foreground transition-colors"
                            >
                                <Ruler className="w-3 h-3" /> {t('size_guide')}
                            </button>
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                            {sizes.map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`h-12 flex items-center justify-center border text-sm transition-all duration-200 ${selectedSize === size
                                        ? 'border-foreground bg-foreground text-background font-bold'
                                        : 'border-neutral-200 text-neutral-600 hover:border-foreground'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Meta Info */}
                    <div className="text-xs space-y-2 text-muted border-t border-neutral-100 pt-4">
                        <p className="flex items-center gap-2">
                            <Truck className="w-4 h-4 rtl:flip" /> {t('delivery_info')}
                        </p>
                        <p className="ps-6">{t('returns_info')}</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-4 pt-6">
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-foreground text-background py-4 text-sm font-bold uppercase tracking-[0.2em] hover:bg-primary transition-colors duration-300"
                    >
                        {t('add_to_cart')}
                    </button>
                    <div className="text-center">
                        <button className="text-xs uppercase tracking-widest text-muted hover:text-foreground flex items-center justify-center gap-2 mx-auto">
                            <Share2 className="w-4 h-4 rtl:flip" /> {t('share')}
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
        </>
    );
}
