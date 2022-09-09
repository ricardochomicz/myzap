export interface Category {
    id?: number;
    name: string;
    active?: boolean;
    slug?: string;
    created_at?: { date: string };
    updated_at?: { date: string };
}