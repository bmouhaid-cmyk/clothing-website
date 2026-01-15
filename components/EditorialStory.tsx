'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function EditorialStory() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

                {/* Abstract Image Composition */}
                <div className="relative h-[600px] w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="absolute left-0 top-0 w-3/4 h-3/4 z-10"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2000&auto=format&fit=crop"
                            alt="Fashion Story"
                            fill
                            className="object-cover rounded-sm shadow-xl"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="absolute right-0 bottom-0 w-2/3 h-2/3 z-0 grayscale"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1509319117193-518da72772dc?q=80&w=2000&auto=format&fit=crop"
                            alt="Fashion Detail"
                            fill
                            className="object-cover rounded-sm"
                        />
                    </motion.div>
                </div>

                {/* Text Content */}
                <div className="space-y-8">
                    <span className="text-xs font-bold tracking-[0.3em] text-muted uppercase">L'Histoire</span>
                    <h2 className="text-4xl md:text-6xl font-serif text-foreground leading-tight">
                        L'Élégance <br /> <span className="italic text-primary">Redéfinie</span>
                    </h2>
                    <p className="text-lg text-neutral-600 font-light leading-relaxed">
                        MABOX incarne une vision moderne de la féminité. Des silhouettes fluides aux détails exquis, chaque pièce est conçue pour célébrer votre individualité avec audace et sophistication.
                    </p>
                    <div className="pt-4">
                        <button className="px-8 py-3 border border-foreground text-foreground uppercase tracking-widest text-sm hover:bg-foreground hover:text-white transition-colors duration-300">
                            Notre Philosophie
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
