'use client';

import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SizeGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
}

import { useLocale } from 'next-intl';

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
    const locale = useLocale();

    if (!isOpen) return null;

    const t = {
        fr: {
            title: "Guide des Tailles",
            headers: ["Taille", "EU", "US", "Poitrine (cm)", "Taille (cm)", "Hanches (cm)"],
            noteLabel: "Note :",
            note: "Si vous êtes entre deux tailles, nous vous recommandons de prendre la taille supérieure pour plus de confort."
        },
        ar: {
            title: "دليل القياسات",
            headers: ["المقياس", "EU", "US", "الصدر (cm)", "الخصر (cm)", "الوركين (cm)"],
            noteLabel: "ملاحظة:",
            note: "إذا كنت محتارة بين مقاسين، ننصحك باختيار المقاس الأكبر لراحة أفضل."
        }
    };

    const content = locale === 'ar' ? t.ar : t.fr;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-background w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h3 className="text-xl font-serif text-foreground">{content.title}</h3>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X className="w-5 h-5 text-muted" />
                        </button>
                    </div>

                    {/* Table Container */}
                    <div className="p-6 md:p-8 overflow-x-auto">
                        <table className="w-full text-sm text-start">
                            <thead className="bg-[#FDFBF7] text-xs uppercase tracking-wider text-muted font-bold">
                                <tr>
                                    {content.headers.map((header, idx) => (
                                        <th key={idx} className="px-6 py-4 text-start">{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-foreground">XS</td>
                                    <td className="px-6 py-4">34</td>
                                    <td className="px-6 py-4">2</td>
                                    <td className="px-6 py-4 text-start" dir="ltr">80-84</td>
                                    <td className="px-6 py-4 text-start" dir="ltr">60-64</td>
                                    <td className="px-6 py-4 text-start" dir="ltr">86-90</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-foreground">S</td>
                                    <td className="px-6 py-4">36</td>
                                    <td className="px-6 py-4">4</td>
                                    <td className="px-6 py-4 text-start" dir="ltr">84-88</td>
                                    <td className="px-6 py-4 text-start" dir="ltr">64-68</td>
                                    <td className="px-6 py-4 text-start" dir="ltr">90-94</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-foreground">M</td>
                                    <td className="px-6 py-4">38</td>
                                    <td className="px-6 py-4">6</td>
                                    <td className="px-6 py-4 text-start" dir="ltr">88-92</td>
                                    <td className="px-6 py-4 text-start" dir="ltr">68-72</td>
                                    <td className="px-6 py-4 text-start" dir="ltr">94-98</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-foreground">L</td>
                                    <td className="px-6 py-4">40</td>
                                    <td className="px-6 py-4">8</td>
                                    <td className="px-6 py-4 text-start" dir="ltr">92-96</td>
                                    <td className="px-6 py-4 text-start" dir="ltr">72-76</td>
                                    <td className="px-6 py-4 text-start" dir="ltr">98-102</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-foreground">XL</td>
                                    <td className="px-6 py-4">42</td>
                                    <td className="px-6 py-4">10</td>
                                    <td className="px-6 py-4 text-start" dir="ltr">96-100</td>
                                    <td className="px-6 py-4 text-start" dir="ltr">76-80</td>
                                    <td className="px-6 py-4 text-start" dir="ltr">102-106</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="mt-6 p-4 bg-orange-50 border border-orange-100 rounded-lg text-xs text-orange-800">
                            <span className="font-bold">{content.noteLabel}</span> {content.note}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
