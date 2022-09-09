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
    created_at?: { date: string };
    updated_at?: { date: string };
}