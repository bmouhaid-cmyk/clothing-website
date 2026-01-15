'use client';

import { createProduct, removeProduct } from '@/app/actions/product';
import { logout } from '@/app/actions/auth';
import { Product } from '@/lib/types';
import { useState } from 'react';
import { Product as ProductType } from '@/lib/types';
import { useTranslations } from 'next-intl';
import { LogOut } from 'lucide-react';

interface AdminDashboardProps {
    products: ProductType[];
}

export default function AdminDashboard({ products }: AdminDashboardProps) {
    const t = useTranslations('Admin');
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        name_fr: '',
        name_ar: '',
        price: '',
        category_fr: '',
        category_ar: '',
        collection_fr: '',
        collection_ar: '',
        tags_fr: '',
        tags_ar: '',
        description_fr: '',
        description_ar: '',
        images: ''
    });

    // Reset form
    const resetForm = () => {
        setFormData({
            id: '',
            name_fr: '',
            name_ar: '',
            price: '',
            category_fr: '',
            category_ar: '',
            collection_fr: '',
            collection_ar: '',
            tags_fr: '',
            tags_ar: '',
            description_fr: '',
            description_ar: '',
            images: ''
        });
        setIsEditing(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        let result;
        if (isEditing) {
            // Import dynamically or assume it's available via props/import? It's imported at top... wait, I need to add import for updateProductAction
            const { updateProductAction } = await import('@/app/actions/product');
            result = await updateProductAction(null, data);
        } else {
            result = await createProduct(null, data);
        }

        if (result.success) {
            setMessage(isEditing ? 'Produit modifié!' : 'Produit ajouté!');
            resetForm();
        } else {
            setMessage('Erreur: ' + result.message);
        }
    };

    const handleEdit = (p: ProductType) => {
        setIsEditing(true);
        setFormData({
            id: p.id,
            name_fr: p.name.fr,
            name_ar: p.name.ar,
            price: p.price.toString(),
            category_fr: p.category.fr,
            category_ar: p.category.ar,
            collection_fr: p.collection?.fr || '',
            collection_ar: p.collection?.ar || '',
            tags_fr: p.tags?.fr.join(', ') || '',
            tags_ar: p.tags?.ar.join(', ') || '',
            description_fr: p.description.fr,
            description_ar: p.description.ar,
            images: p.images.join(', ')
        });
        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure?')) {
            await removeProduct(id);
        }
    };

    return (
        <div className="container mx-auto pt-32 pb-10 px-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-serif">{t('title')}</h1>
                <button
                    onClick={() => logout()}
                    className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-4 py-2 rounded-lg transition-colors text-sm font-medium uppercase tracking-wider"
                >
                    <LogOut className="w-4 h-4 rtl:flip" /> {t('logout')}
                </button>
            </div>

            {message && <div className="bg-green-100 text-green-800 p-4 rounded mb-6 text-center">{message}</div>}

            <div className="grid lg:grid-cols-2 gap-12">
                {/* ADD/EDIT PRODUCT FORM */}
                <div className="bg-white p-8 shadow-xl rounded-2xl border border-neutral-100">
                    <h2 className="text-2xl font-serif mb-6">{isEditing ? 'Modifier le produit' : 'Ajouter un produit'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="hidden" name="id" value={formData.id} />
                        <div className="grid grid-cols-2 gap-4">
                            <input name="name_fr" value={formData.name_fr} onChange={handleInputChange} placeholder="Nom (FR)" className="border p-2 rounded" required />
                            <input name="name_ar" value={formData.name_ar} onChange={handleInputChange} placeholder="الاسم (AR)" className="border p-2 rounded text-right" required />
                        </div>
                        <input name="price" type="number" value={formData.price} onChange={handleInputChange} placeholder="Prix (DH)" className="border p-2 rounded w-full" required />
                        <div className="grid grid-cols-2 gap-4">
                            <input name="category_fr" value={formData.category_fr} onChange={handleInputChange} placeholder="Catégorie (FR) (ex: Robes)" className="border p-2 rounded w-full" required />
                            <input name="category_ar" value={formData.category_ar} onChange={handleInputChange} placeholder="الفئة (AR) (مثال: فساتين)" className="border p-2 rounded w-full text-right" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input name="collection_fr" value={formData.collection_fr} onChange={handleInputChange} placeholder="Collection (FR) (ex: Summer)" className="border p-2 rounded w-full" />
                            <input name="collection_ar" value={formData.collection_ar} onChange={handleInputChange} placeholder="المجموعة (AR) (مثال: صيف)" className="border p-2 rounded w-full text-right" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input name="tags_fr" value={formData.tags_fr} onChange={handleInputChange} placeholder="Tags (FR) (ex: new, sale)" className="border p-2 rounded w-full" />
                            <input name="tags_ar" value={formData.tags_ar} onChange={handleInputChange} placeholder="الوسوم (AR) (مثال: جديد, تخفيض)" className="border p-2 rounded w-full text-right" />
                        </div>
                        <textarea name="description_fr" value={formData.description_fr} onChange={handleInputChange} placeholder="Description (FR)" className="border p-2 rounded w-full" required />
                        <textarea name="description_ar" value={formData.description_ar} onChange={handleInputChange} placeholder="الوصف (AR)" className="border p-2 rounded w-full text-right" required />
                        <textarea name="images" value={formData.images} onChange={handleInputChange} placeholder="Image URLs (comma separated)" className="border p-2 rounded w-full h-24 font-mono text-xs" required />

                        <div className="flex gap-4">
                            <button type="submit" className="flex-1 bg-primary text-white py-3 rounded-lg font-bold hover:bg-opacity-90">
                                {isEditing ? 'Mettre à jour' : 'Ajouter le produit'}
                            </button>
                            {isEditing && (
                                <button type="button" onClick={resetForm} className="px-6 py-3 bg-neutral-100 rounded-lg font-medium hover:bg-neutral-200">
                                    Annuler
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* PRODUCTS LIST */}
                <div className="bg-white p-8 shadow-xl rounded-2xl border border-neutral-100 h-fit">
                    <h2 className="text-2xl font-serif mb-6">Produits existants</h2>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto">
                        {products.map(p => (
                            <div key={p.id} className="flex items-center justify-between border-b pb-4">
                                <div className="flex items-center gap-4">
                                    <img src={p.images[0]} className="w-12 h-12 rounded object-cover" />
                                    <div>
                                        <p className="font-bold">{p.name.fr}</p>
                                        <p className="text-xs text-muted font-bold text-right">{p.name.ar}</p>
                                        {p.collection?.fr && <span className="text-xs text-primary font-bold uppercase tracking-wider block mb-0.5">{p.collection.fr} / {p.collection.ar}</span>}
                                        <p className="text-sm text-muted">{p.price} DH</p>
                                        <div className="flex flex-col gap-1 mt-1">
                                            {p.tags?.fr && p.tags.fr.length > 0 && (
                                                <div className="flex gap-1 flex-wrap">
                                                    {p.tags.fr.map(tag => (
                                                        <span key={tag} className="text-[10px] bg-neutral-100 px-1 py-0.5 rounded border border-neutral-200 text-neutral-600 uppercase tracking-wide">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => handleEdit(p)}
                                        className="text-primary hover:text-primary/80 text-sm font-medium"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        ))}
                        {products.length === 0 && <p className="text-muted text-center">Aucun produit.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
