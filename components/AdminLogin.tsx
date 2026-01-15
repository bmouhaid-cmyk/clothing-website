'use client';

import { login } from '@/app/actions/auth';
import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';

export default function AdminLogin() {
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        const result = await login(formData);
        if (result.success) {
            router.refresh(); // Refresh to trigger server re-render and show dashboard
        } else {
            setError(result.message || 'Error');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
            <h1 className="text-3xl font-serif">Admin Login</h1>
            <form action={handleSubmit} className="flex flex-col gap-4 w-full max-w-xs">
                <input
                    type="password"
                    name="pin"
                    placeholder="Enter PIN"
                    className="border border-neutral-300 p-2 rounded text-center text-lg"
                    required
                />
                <button type="submit" className="bg-primary text-white py-2 rounded font-medium hover:bg-opacity-90">
                    Unlock
                </button>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </form>
        </div>
    );
}
