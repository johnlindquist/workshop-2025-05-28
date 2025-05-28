export interface FeedItem {
    type: string;
    title: string;
    author: string;
    authorImg: string;
    imgSrc: string;
    href: string;
    isLarge?: boolean;
    created_at?: string;
    popularity?: number;
    rating?: number;
    watch_count?: number;
}

export interface FeedResponse {
    items: FeedItem[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
} 