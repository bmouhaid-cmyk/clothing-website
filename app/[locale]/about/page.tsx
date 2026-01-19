import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Leaf, Award, Heart } from 'lucide-react';

export default async function AboutPage({
    params: { locale },
}: {
    params: { locale: string };
}) {
    setRequestLocale(locale);

    // Fallback content if translation keys aren't ready
    const content = {
        fr: {
            title: "Notre Histoire",
            subtitle: "L'élégance intemporelle, inspirée par la tradition et conçue pour la femme moderne.",
            mission: "Chez MABOX, nous croyons que la mode est une forme d'expression de soi. Notre mission est de créer des pièces uniques qui marient le raffinement de la haute couture traditionnelle avec le confort du prêt-à-porter contemporain.",
            values: [
                {
                    title: "Qualité Supérieure",
                    desc: "Nous sélectionnons rigoureusement nos tissus pour garantir un toucher soyeux et une durabilité exceptionnelle.",
                    icon: Award
                },
                {
                    title: "Savoir-Faire",
                    desc: "Chaque pièce est le fruit d'un travail artisanal minutieux, respectant les techniques de confection traditionnelles.",
                    icon: Heart
                },
                {
                    title: "Éthique",
                    desc: "Nous nous engageons dans une démarche de mode responsable, valorisant le travail humain et limitant notre impact.",
                    icon: Leaf
                }
            ],
            craftTitle: "L'Art du Détail",
            craftDesc: "De la coupe à la couture, chaque étape de la fabrication est contrôlée pour assurer une finition parfaite. Nos créations ne sont pas de simples vêtements, ce sont des pièces d'exception pensées pour sublimer votre allure au quotidien."
        },
        ar: {
            title: "قصتنا",
            subtitle: "أناقة خالدة، مستوحاة من التقاليد ومصممة للمرأة العصرية.",
            mission: "في MABOX، نؤمن أن الموضة هي وسيلة للتعبير عن الذات. مهمتنا هي ابتكار قطع فريدة تمزج بين رقي الأزياء التقليدية وراحة الملابس الجاهزة المعاصرة.",
            values: [
                {
                    title: "جودة عالية",
                    desc: "نختار أقمشتنا بعناية لضمان ملمس حريري ومتانة استثنائية لمظهر يدوم طويلاً.",
                    icon: Award
                },
                {
                    title: "حرفية متقنة",
                    desc: "كل قطعة هي ثمرة عمل حرفي دقيق، يحترم تقنيات الخياطة الأصيلة والتفاصيل الدقيقة.",
                    icon: Heart
                },
                {
                    title: "أخلاقيات",
                    desc: "نلتزم بنهج أزياء مسؤول، نقدر العمل الإنساني ونحرص على تقديم الأفضل لعملائنا.",
                    icon: Leaf
                }
            ],
            craftTitle: "فن التفاصيل",
            craftDesc: "من القص إلى الخياطة، تتم مراقبة كل مرحلة من مراحل التصنيع لضمان تشطيب مثالي. إبداعاتنا ليست مجرد ملابس، بل هي قطع استثنائية مصممة لتعزيز أناقتك اليومية."
        }
    };

    const t = content[locale as 'fr' | 'ar'] || content.fr;

    return (
        <main className="min-h-screen bg-[#FDFBF7] pt-24 pb-20">
            {/* Hero Section */}
            <section className="container mx-auto px-6 mb-24">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 text-center md:text-left">
                    <div className="md:w-1/2 space-y-6">
                        <span className="text-primary uppercase tracking-[0.2em] text-sm font-bold">Mabox Fashion</span>
                        <h1 className="text-4xl md:text-6xl font-serif text-foreground leading-tight">
                            {t.title}
                        </h1>
                        <p className="text-lg text-neutral-600 font-light leading-relaxed">
                            {t.mission}
                        </p>
                    </div>
                    <div className="md:w-1/2 relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl skew-y-3 md:skew-y-0 md:hover:-translate-y-2 transition-transform duration-700">
                        <Image
                            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop"
                            alt="Fashion Story"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-white py-24 mb-24">
                <div className="container mx-auto px-6">
                    <p className="text-center text-xs font-bold text-muted uppercase tracking-widest mb-4">Nos Valeurs</p>
                    <h2 className="text-3xl font-serif text-center text-foreground mb-16">{t.subtitle}</h2>

                    <div className="grid md:grid-cols-3 gap-12">
                        {t.values.map((value, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center space-y-4 group">
                                <div className="w-16 h-16 rounded-full bg-[#faefe0] flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <value.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-serif text-foreground">{value.title}</h3>
                                <p className="text-neutral-500 font-light leading-relaxed max-w-xs">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Craftsmanship Section */}
            <section className="container mx-auto px-6">
                <div className="relative rounded-3xl overflow-hidden bg-foreground text-[#FDFBF7]">
                    <div className="absolute inset-0 opacity-40">
                        <Image
                            src="https://images.unsplash.com/photo-1620799140408-ed53dd9e8e95?q=80&w=2000&auto=format&fit=crop"
                            alt="Fabric texture"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="relative z-10 py-24 px-8 md:px-24 text-center md:text-left flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 space-y-6">
                            <h2 className="text-3xl md:text-5xl font-serif leading-tight">{t.craftTitle}</h2>
                            <p className="text-white/80 text-lg font-light leading-relaxed">
                                {t.craftDesc}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
