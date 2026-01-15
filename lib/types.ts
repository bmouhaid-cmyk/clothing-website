export interface Product {
    id: string;
    name: {
        fr: string;
        ar: string;
    };
    price: number;
    description: {
        fr: string;
        ar: string;
    };
    category: {
        fr: string;
        ar: string;
    };
    slug: string;
    images: string[];
    isNew?: boolean;
    tags?: {
        fr: string[];
        ar: string[];
    };
    collection?: {
        fr: string;
        ar: string;
    };
}
