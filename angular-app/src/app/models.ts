export interface Category {
    id?: number;
    name: string;
    active?: boolean;
    slug?: string;
    created_at?: { date: string };
    updated_at?: { date: string };
}

export interface Product {
    id?: number;
    name: string;
    price: string;
    stock?: number;
    active?: boolean;
    slug?: string;
    description?: string;
    readonly created_at?: { date: string };
    readonly updated_at?: { date: string };
}

export interface ProductCategory {
    product: Product;
    categories: Array<Category>
}

export interface User {
    id?: number;
    name: string;
    email: string;
    password?: string;
    readonly created_at?: { date: string };
    readonly updated_at?: { date: string };
}