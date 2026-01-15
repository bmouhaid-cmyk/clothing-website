import { Product } from './types';
import productsData from '@/data/products.json';

// In ephemeral environments (like Vercel), we must use the static data.
// We can simulate an in-memory store for the session, but it won't persist across restarts.
let products: Product[] = [...(productsData as unknown as Product[])];

export async function getProducts(): Promise<Product[]> {
    return products;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
    return products.find(p => p.slug === slug);
}

export async function saveProducts(updatedProducts: Product[]): Promise<void> {
    // Update the in-memory store
    products = updatedProducts;
    console.warn("Write operation ignored in production/Vercel environment (Ephemeral File System). Changes will reset on redeploy.");
}

export async function addProduct(product: Product): Promise<void> {
    products.push(product);
    await saveProducts(products);
}

export async function updateProduct(updatedProduct: Product): Promise<void> {
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
        products[index] = updatedProduct;
        await saveProducts(products);
    }
}

export async function deleteProduct(id: string): Promise<void> {
    products = products.filter(p => p.id !== id);
    await saveProducts(products);
}
