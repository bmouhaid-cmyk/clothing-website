import { checkAuth } from '@/app/actions/auth';
import { getProducts } from '@/lib/db';
import AdminLogin from '@/components/AdminLogin';
import AdminDashboard from '@/components/AdminDashboard';
import { unstable_setRequestLocale } from 'next-intl/server';



export default async function AdminPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    const isAuthenticated = await checkAuth();
    const products = await getProducts();

    if (!isAuthenticated) {
        return <AdminLogin />;
    }

    return <AdminDashboard products={products} />;
}
