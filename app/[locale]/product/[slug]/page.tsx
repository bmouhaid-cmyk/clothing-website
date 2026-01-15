import { getProductBySlug } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar'; // Reuse standard navbar
import Footer from '@/components/Footer';
import { Product } from '@/lib/types';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ProductDetails from './ProductDetails'; // Client component for interactivity
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function ProductPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
    const { slug, locale } = await params;
    setRequestLocale(locale);
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    // Ensure description is properly typed (it might be missing in some mock data, so fallback)
    const description = product.description?.[locale as 'fr' | 'ar'] ||
        (locale === 'fr' ? "Description non disponible." : "الوصف غير متوفر.");

    const name = product.name[locale as 'fr' | 'ar'];

    return (
        <main className="min-h-screen bg-[#FDFBF7]">

            <div className="pt-24 lg:pt-32 pb-20">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

                    {/* Left: Image Gallery (Scrollable) */}
                    <div className="w-full lg:w-[65%] flex flex-col gap-4 px-0 md:px-6">
                        {/* Back Button (Mobile Only) */}
                        <div className="lg:hidden px-6 mb-4">
                            <Link href="/shop" className="flex items-center gap-2 text-sm uppercase tracking-widest text-muted">
                                <ArrowLeft className="w-4 h-4" /> Retour
                            </Link>
                        </div>

                        {product.images.map((img, idx) => (
                            <div key={idx} className="relative w-full aspect-[3/4] md:aspect-[4/5] bg-secondary/10">
                                <Image
                                    src={img}
                                    alt={`${name} - View ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={idx === 0}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Right: Sticky Details Panel */}
                    <div className="w-full lg:w-[35%] px-6 lg:pr-12 relative">
                        <div className="lg:sticky lg:top-32 lg:h-[calc(100vh-160px)] flex flex-col">
                            <ProductDetails product={product} locale={locale as 'fr' | 'ar'} description={description} name={name} />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
