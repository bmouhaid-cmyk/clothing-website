'use client';

import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export default function CartDrawer() {
    const { isCartOpen, closeCart, items, removeItem, updateQuantity, subtotal } = useCart();
    const t = useTranslations('Cart');
    const locale = useLocale() as 'fr' | 'ar';

    const handleCheckout = () => {
        const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
        const date = new Date().toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'ar-MA');

        // Build items list string
        const itemsList = items.map(item =>
            `- ${item.name[locale]} (Size: ${item.selectedSize}) x${item.quantity} : ${item.price * item.quantity} DH`
        ).join('%0A');

        // Build final message
        const message = locale === 'fr'
            ? `*NOUVELLE COMMANDE - MABOX* %0A%0A` +
            `*Référence:* #${orderId}%0A` +
            `*Date:* ${date}%0A%0A` +
            `*ARTICLES:*%0A${itemsList}%0A%0A` +
            `*TOTAL:* ${subtotal} MAD%0A%0A` +
            `------------------%0A` +
            `Je souhaite confirmer ma commande. Paiement à la livraison (Cash on Delivery).%0A` +
            `Merci de me confirmer la disponibilité.`
            : `*طلب جديد - MABOX* %0A%0A` +
            `*رقم الطلب:* #${orderId}%0A` +
            `*التاريخ:* ${date}%0A%0A` +
            `*السلة:*%0A${itemsList}%0A%0A` +
            `*المجموع:* ${subtotal} درهم%0A%0A` +
            `------------------%0A` +
            `أود تأكيد طلبي. الدفع عند الاستلام.%0A` +
            `المرجو تأكيد التوافر.`;

        const url = `https://wa.me/212600000000?text=${message}`; // Note: Message is already URL-safe due to %0A but full encode is safer

        // Using window.open with fully encoded URI component for safety
        window.open(`https://wa.me/212600000000?text=${encodeURIComponent(decodeURIComponent(message))}`, '_blank');
    };

    const isRtl = locale === 'ar';
    const slideInitial = isRtl ? { x: '-100%' } : { x: '100%' };
    const slideExit = isRtl ? { x: '-100%' } : { x: '100%' };
    const positionClass = isRtl ? 'left-0' : 'right-0';

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={slideInitial}
                        animate={{ x: 0 }}
                        exit={slideExit}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className={`fixed top-0 ${positionClass} h-full w-full md:w-[450px] bg-white shadow-2xl z-[101] flex flex-col`}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-xl font-serif font-bold text-foreground">
                                {locale === 'fr' ? 'Mon Panier' : 'سلة المشتريات'} ({items.length})
                            </h2>
                            <button
                                onClick={closeCart}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-muted"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-muted">
                                        <ShoppingBag className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-medium text-foreground">
                                        {locale === 'fr' ? 'Votre panier est vide' : 'سلة مشترياتك فارغة'}
                                    </h3>
                                    <button onClick={closeCart} className="text-sm border-b border-foreground pb-0.5 hover:text-primary hover:border-primary transition-colors">
                                        {locale === 'fr' ? 'Continuer vos achats' : 'تابع التسوق'}
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                                        {/* Image */}
                                        <div className="relative w-20 aspect-[3/4] bg-neutral-100 rounded-md overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.images[0]}
                                                alt={item.name[locale]}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-serif text-sm w-[90%] text-foreground leading-tight">{item.name[locale]}</h4>
                                                    <p className="text-xs text-muted mt-1 uppercase tracking-wider">{typeof item.category === 'object' ? item.category[locale] : item.category} - {item.selectedSize}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id, item.selectedSize)}
                                                    className="text-neutral-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center border border-neutral-200 rounded-lg">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                                                        className="px-3 py-1 text-muted hover:text-foreground"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                                                        className="px-3 py-1 text-muted hover:text-foreground"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <p className="text-sm font-bold text-foreground">
                                                    {item.price * item.quantity} DH
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer / Checkout */}
                        {items.length > 0 && (
                            <div className="border-t border-gray-100 p-6 bg-[#FDFBF7]">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm text-muted">
                                        {locale === 'fr' ? 'Sous-total' : 'المجموع الفرعي'}
                                    </span>
                                    <span className="text-lg font-bold font-serif text-foreground">
                                        {subtotal} DH
                                    </span>
                                </div>
                                <p className="text-xs text-muted mb-6">
                                    {locale === 'fr' ? 'Taxes et frais de livraison calculés lors du paiement.' : 'الضرائب ورسوم التوصيل تحسب عند الدفع.'}
                                </p>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-foreground text-background py-4 uppercase tracking-[0.15em] text-sm font-bold hover:bg-primary transition-colors rounded-none"
                                >
                                    {locale === 'fr' ? 'Passer à la caisse' : 'الدفع'}
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
