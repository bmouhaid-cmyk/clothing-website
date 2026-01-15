import ContactForm from '@/components/ContactForm';
import { Mail, MessageCircle, MapPin, Clock, Phone } from 'lucide-react';
import Image from 'next/image';
import { unstable_setRequestLocale } from 'next-intl/server';

export default async function ContactPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    unstable_setRequestLocale(locale);

    const content = {
        fr: {
            title: "Contactez-Nous",
            subtitle: "Nous sommes à votre écoute pour toute question ou demande particulière.",
            infoTitle: "Nos Coordonnées",
            labels: {
                name: "Nom complet",
                email: "Adresse e-mail",
                message: "Votre message",
                send: "ENVOYER LE MESSAGE",
                sending: "ENVOI...",
                sent: "MESSAGE ENVOYÉ",
                error: "Erreur"
            }
        },
        ar: {
            title: "تواصل معنا",
            subtitle: "نحن في خدمتكم لأي استفسار أو طلب خاص.",
            infoTitle: "معلومات الاتصال",
            labels: {
                name: "الاسم الكامل",
                email: "البريد الإلكتروني",
                message: "رسالتك",
                send: "إرسال الرسالة",
                sending: "جاري الإرسال...",
                sent: "تم الإرسال",
                error: "خطأ"
            }
        }
    };

    const t = content[locale as 'fr' | 'ar'] || content.fr;

    return (
        <main className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4 md:p-8 pt-24 md:pt-32">
            <div className="w-full max-w-7xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[800px]">
                {/* Left Panel - Dark & Luxurious */}
                <div className="lg:w-2/5 bg-foreground relative text-[#FDFBF7] p-12 flex flex-col justify-between">
                    {/* Background Texture/Image Overlay */}
                    <div className="absolute inset-0 opacity-20">
                        <Image
                            src="https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?q=80&w=1000&auto=format&fit=crop"
                            alt="Luxury Texture"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="relative z-10 space-y-8">
                        <div>
                            <span className="text-primary uppercase tracking-[0.2em] text-xs font-bold mb-4 block">Mabox Assistance</span>
                            <h1 className="text-4xl md:text-5xl font-serif leading-tight">{t.infoTitle}</h1>
                            <p className="text-white/70 mt-4 font-light leading-relaxed">
                                {t.subtitle}
                            </p>
                        </div>

                        <div className="space-y-8 mt-12">
                            <a href="https://wa.me/212600000000" className="flex items-center gap-6 group">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                                    <MessageCircle className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-primary uppercase tracking-widest font-bold mb-1">WhatsApp</p>
                                    <p className="font-serif text-xl md:text-2xl text-white group-hover:translate-x-2 transition-transform">+212 6 00 00 00 00</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-6 group">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-primary uppercase tracking-widest font-bold mb-1">Showroom</p>
                                    <p className="font-serif text-xl text-white">Casablanca, Maroc</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-primary uppercase tracking-widest font-bold mb-1">Horaires</p>
                                    <p className="font-serif text-lg text-white">Lundi - Samedi : 9h - 18h</p>
                                </div>
                            </div>

                            <a href="mailto:contact@mabox.ma" className="flex items-center gap-6 group">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                                    <Mail className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-primary uppercase tracking-widest font-bold mb-1">Email</p>
                                    <p className="font-serif text-xl text-white group-hover:translate-x-2 transition-transform">contact@mabox.ma</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Decorative Bottom */}
                    <div className="relative z-10 pt-12">
                        <div className="h-px w-24 bg-primary/50"></div>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className="lg:w-3/5 bg-white p-12 md:p-20 flex flex-col justify-center">
                    <div className="max-w-md w-full mx-auto">
                        <h2 className="text-3xl font-serif text-foreground mb-8 text-center lg:text-left">{t.title}</h2>
                        <ContactForm labels={t.labels} />
                    </div>
                </div>
            </div>
        </main>
    );
}
