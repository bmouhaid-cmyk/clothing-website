'use server';

import { cookies } from 'next/headers';
import { redirect } from '@/i18n/routing';

const ADMIN_PIN = '1234'; // Simple PIN for demo

export async function login(formData: FormData) {
    const pin = formData.get('pin');

    if (pin === ADMIN_PIN) {
        const cookieStore = await cookies();
        cookieStore.set('admin_session', 'true', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        return { success: true };
    }

    return { success: false, message: 'Invalid PIN' };
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    redirect({ href: '/admin', locale: 'fr' });
}

export async function checkAuth() {
    const cookieStore = await cookies();
    return cookieStore.has('admin_session');
}
