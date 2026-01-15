import { checkAuth } from '@/app/actions/auth';
import { getProducts } from '@/lib/db';
import AdminLogin from '@/components/AdminLogin';
import AdminDashboard from '@/components/AdminDashboard';
import { setRequestLocale } from 'next-intl/server';



export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const isAuthenticated = await checkAuth();
    const products = await getProducts();

    if (!isAuthenticated) {
        return <AdminLogin />;
    }

    return <AdminDashboard products={products} />;
}
