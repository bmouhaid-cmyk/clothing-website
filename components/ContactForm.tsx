'use client';

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ContactFormProps {
    labels: {
        name: string;
        email: string;
        message: string;
        send: string;
        sending: string;
        sent: string;
        error: string;
    };
}

export default function ContactForm({ labels }: ContactFormProps) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1500));

        setStatus('success');
        // Reset after showing success
        setTimeout(() => setStatus('idle'), 3000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group relative z-0 w-full mb-6">
                <input
                    type="text"
                    name="name"
                    className="block py-3 px-0 w-full text-sm text-foreground bg-transparent border-0 border-b-2 border-neutral-200 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-colors"
                    placeholder=" "
                    required
                />
                <label className="peer-focus:font-medium absolute text-sm text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    {labels.name}
                </label>
            </div>

            <div className="group relative z-0 w-full mb-6">
                <input
                    type="email"
                    name="email"
                    className="block py-3 px-0 w-full text-sm text-foreground bg-transparent border-0 border-b-2 border-neutral-200 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-colors"
                    placeholder=" "
                    required
                />
                <label className="peer-focus:font-medium absolute text-sm text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    {labels.email}
                </label>
            </div>

            <div className="group relative z-0 w-full mb-6">
                <textarea
                    name="message"
                    rows={4}
                    className="block py-3 px-0 w-full text-sm text-foreground bg-transparent border-0 border-b-2 border-neutral-200 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-colors resize-none"
                    placeholder=" "
                    required
                ></textarea>
                <label className="peer-focus:font-medium absolute text-sm text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    {labels.message}
                </label>
            </div>

            <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="w-full md:w-auto bg-foreground text-background font-bold uppercase tracking-widest text-xs px-10 py-4 hover:bg-primary transition-colors disabled:opacity-70 flex items-center justify-center gap-2 group"
            >
                {status === 'loading' ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> {labels.sending}</>
                ) : status === 'success' ? (
                    labels.sent
                ) : (
                    <>{labels.send} <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                )}
            </button>
        </form>
    );
}
