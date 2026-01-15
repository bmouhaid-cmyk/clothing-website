'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/lib/types';

export interface CartItem extends Product {
    selectedSize: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product, size: string) => void;
    removeItem: (itemId: string, size: string) => void;
    updateQuantity: (itemId: string, size: string, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    subtotal: number;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        setIsMounted(true);
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('cart', JSON.stringify(items));
        }
    }, [items, isMounted]);

    const addItem = (product: Product, size: string) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id && item.selectedSize === size);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id && item.selectedSize === size
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, selectedSize: size, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeItem = (itemId: string, size: string) => {
        setItems((prev) => prev.filter((item) => !(item.id === itemId && item.selectedSize === size)));
    };

    const updateQuantity = (itemId: string, size: string, quantity: number) => {
        if (quantity < 1) {
            removeItem(itemId, size);
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item.id === itemId && item.selectedSize === size ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setItems([]);

    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                cartCount,
                subtotal,
                isCartOpen,
                openCart,
                closeCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
