import fs from 'fs/promises';
import path from 'path';
import { Product } from './types';

const dataPath = path.join(process.cwd(), 'data/products.json');

export async function getProducts(): Promise<Product[]> {
    try {
        const data = await fs.readFile(dataPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading products:", error);
        return [];
    }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
    const products = await getProducts();
    return products.find(p => p.slug === slug);
}

export async function saveProducts(products: Product[]): Promise<void> {
    await fs.writeFile(dataPath, JSON.stringify(products, null, 2));
}

export async function addProduct(product: Product): Promise<void> {
    const products = await getProducts();
    products.push(product);
    await saveProducts(products);
}

export async function updateProduct(updatedProduct: Product): Promise<void> {
    const products = await getProducts();
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
        products[index] = updatedProduct;
        await saveProducts(products);
    }
}

export async function deleteProduct(id: string): Promise<void> {
    let products = await getProducts();
    products = products.filter(p => p.id !== id);
    await saveProducts(products);
}
