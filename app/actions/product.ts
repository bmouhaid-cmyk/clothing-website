'use server';

import { addProduct, deleteProduct, getProducts, updateProduct } from '@/lib/db';
import { Product } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function createProduct(prevState: any, formData: FormData) {
    try {
        const formattedPrice = parseFloat(formData.get('price') as string);
        const images = (formData.get('images') as string).split(',').map(img => img.trim()).filter(Boolean);

        const tagsFr = (formData.get('tags_fr') as string || '').split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
        const tagsAr = (formData.get('tags_ar') as string || '').split(',').map(t => t.trim().toLowerCase()).filter(Boolean);

        const product: Product = {
            id: crypto.randomUUID(),
            name: {
                fr: formData.get('name_fr') as string,
                ar: formData.get('name_ar') as string,
            },
            price: isNaN(formattedPrice) ? 0 : formattedPrice,
            description: {
                fr: formData.get('description_fr') as string,
                ar: formData.get('description_ar') as string,
            },
            category: {
                fr: formData.get('category_fr') as string,
                ar: formData.get('category_ar') as string,
            },
            images: images,
            slug: (formData.get('name_fr') as string).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
            isNew: true,
            tags: {
                fr: tagsFr,
                ar: tagsAr
            },
            collection: {
                fr: formData.get('collection_fr') as string || '',
                ar: formData.get('collection_ar') as string || ''
            },
        };

        await addProduct(product);
        revalidatePath('/');
        revalidatePath('/admin');
        revalidatePath('/shop');
        return { success: true, message: 'Product added successfully' };
    } catch (error) {
        console.error("Failed to add product:", error);
        return { success: false, message: 'Failed to add product' };
    }
}

export async function removeProduct(id: string) {
    try {
        await deleteProduct(id);
        revalidatePath('/');
        revalidatePath('/admin');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to delete product' };
    }
}

export async function updateProductAction(prevState: any, formData: FormData) {
    try {
        const id = formData.get('id') as string;
        if (!id) return { success: false, message: 'Product ID required' };

        const formattedPrice = parseFloat(formData.get('price') as string);
        const images = (formData.get('images') as string).split(',').map(img => img.trim()).filter(Boolean);

        const tagsFr = (formData.get('tags_fr') as string || '').split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
        const tagsAr = (formData.get('tags_ar') as string || '').split(',').map(t => t.trim().toLowerCase()).filter(Boolean);

        const product: Product = {
            id: id,
            name: {
                fr: formData.get('name_fr') as string,
                ar: formData.get('name_ar') as string,
            },
            price: isNaN(formattedPrice) ? 0 : formattedPrice,
            description: {
                fr: formData.get('description_fr') as string,
                ar: formData.get('description_ar') as string,
            },
            category: {
                fr: formData.get('category_fr') as string,
                ar: formData.get('category_ar') as string,
            },
            images: images,
            slug: (formData.get('name_fr') as string).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
            isNew: Boolean(formData.get('isNew')), // Assuming we want to keep this or update it
            tags: {
                fr: tagsFr,
                ar: tagsAr
            },
            collection: {
                fr: formData.get('collection_fr') as string || '',
                ar: formData.get('collection_ar') as string || ''
            },
        };

        await updateProduct(product);
        revalidatePath('/');
        revalidatePath('/admin');
        revalidatePath('/shop');
        return { success: true, message: 'Product updated successfully' };
    } catch (error) {
        console.error("Failed to update product:", error);
        return { success: false, message: 'Failed to update product' };
    }
}
