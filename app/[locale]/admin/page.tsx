import { checkAuth } from '@/app/actions/auth';
import { getProducts } from '@/lib/db';
import AdminLogin from '@/components/AdminLogin';

import AdminDashboard from '@/components/AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage({ params: { locale } }: { params: { locale: string } }) {
    const isAuthenticated = await checkAuth();
    const products = await getProducts();

    if (!isAuthenticated) {
        return <AdminLogin />;
    }

    return <AdminDashboard products={products} />;
}
