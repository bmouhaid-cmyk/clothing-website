import type { Metadata } from "next";
import { Playfair_Display, Outfit, Amiri, Cairo } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
// import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/routing';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import Navbar from '@/components/Navbar';

import messagesFr from '@/messages/fr.json';
import messagesAr from '@/messages/ar.json';

// Latin Fonts
const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// Arabic Fonts
const amiri = Amiri({
  variable: "--font-serif", // Reuse same variable so 'font-serif' works
  subsets: ["arabic"],
  weight: ['400', '700'],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-sans", // Reuse same variable so 'font-sans' works
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: '%s | Mabox Luxury',
    default: 'Mabox Luxury - Élégance & Raffinement',
  },
  description: "Découvrez notre collection exclusive de vêtements pour femmes. Robes de soirée, ensembles chics et mode orientale moderne.",
  keywords: ["mode femme", "luxe", "caftan", "robe soirée", "maroc", "fashion"],
  openGraph: {
    type: 'website',
    locale: 'fr_MA',
    url: 'https://mabox.ma',
    siteName: 'Mabox Luxury',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mabox Luxury Collection',
      },
    ],
  },
};

import { getProducts } from '@/lib/db';

// ... (other imports)

// ... (other imports)

// ... (other imports)

// Start of Dynamic Routing Strategy
export const dynamic = 'force-dynamic';

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {

  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Static message loading to guarantee Webpack bundling
  let messages;
  if (locale === 'ar') {
    messages = messagesAr;
  } else {
    messages = messagesFr;
  }

  const products = await getProducts();
  const uniqueCategories = Array.from(new Set(products.map(p => p.category[locale as 'fr' | 'ar']))).filter(Boolean);

  // Choose fonts based on locale
  const isArabic = locale === 'ar';
  const serifFont = isArabic ? amiri.variable : playfair.variable;
  const sansFont = isArabic ? cairo.variable : outfit.variable;

  return (
    <html lang={locale} dir={isArabic ? 'rtl' : 'ltr'} className="light" style={{ colorScheme: 'light' }} suppressHydrationWarning>
      <body
        className={`${serifFont} ${sansFont} antialiased bg-background text-foreground font-sans`}
      >
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <Navbar availableCategories={uniqueCategories} />
            {children}
            <CartDrawer />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
