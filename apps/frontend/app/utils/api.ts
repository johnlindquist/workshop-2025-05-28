import axios, { AxiosResponse } from 'axios';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3333';

// Create axios instance with default configuration
const apiClient = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
    (config) => {
        if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info' || process.env.NEXT_PUBLIC_LOG_LEVEL === 'debug') {
            console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`, {
                params: config.params,
                data: config.data,
            });
        }
        return config;
    },
    (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for logging and error handling
apiClient.interceptors.response.use(
    (response) => {
        if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info' || process.env.NEXT_PUBLIC_LOG_LEVEL === 'debug') {
            console.log(`API Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`, {
                data: response.data,
            });
        }
        return response;
    },
    (error) => {
        console.error('API Response Error:', {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            url: error.config?.url,
            method: error.config?.method,
        });
        return Promise.reject(error);
    }
);

// Type definitions
export interface Topic {
    name: string;
    href: string;
    imgSrc: string;
}

export interface FeedItem {
    type: 'article' | 'lesson';
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

export interface SearchResult {
    type: 'topic' | 'feed';
    item: Topic | FeedItem;
    score: number;
}

export interface ApiError {
    error: {
        code: string;
        message: string;
        statusCode: number;
    };
    timestamp: string;
    path: string;
    method: string;
}

// API Functions
export const api = {
    // Health check
    async healthCheck(): Promise<{ message: string }> {
        const response: AxiosResponse<{ message: string }> = await apiClient.get('/');
        return response.data;
    },

    // Topics API
    async getTopics(): Promise<Topic[]> {
        const response: AxiosResponse<Topic[]> = await apiClient.get('/topics');

        if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
            console.log(`INFO: Frontend successfully loaded topics from API`);
        }

        return response.data;
    },

    // Feed API
    async getFeed(params?: {
        page?: number;
        limit?: number;
        sort?: 'created_at' | 'popular' | 'rating' | 'most_watched';
    }): Promise<FeedResponse> {
        const response: AxiosResponse<FeedResponse> = await apiClient.get('/feed', {
            params,
        });

        if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
            console.log(`INFO: Frontend successfully loaded feed items from API`);
        }

        return response.data;
    },

    // Search API
    async search(query: string): Promise<SearchResult[]> {
        if (!query || query.trim() === '') {
            throw new Error('Search query is required');
        }

        const response: AxiosResponse<SearchResult[]> = await apiClient.get('/search', {
            params: { q: query.trim() },
        });

        if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
            console.log(`INFO: Frontend successfully performed search for "${query}"`);
        }

        return response.data;
    },
};

// Error handling utility
export function isApiError(error: any): error is { response: { data: ApiError } } {
    return error.response && error.response.data && error.response.data.error;
}

export function getErrorMessage(error: any): string {
    if (isApiError(error)) {
        return error.response.data.error.message;
    }
    if (error.message) {
        return error.message;
    }
    return 'An unexpected error occurred';
}

// Loading state management utility
export class LoadingState {
    private loadingStates: Map<string, boolean> = new Map();
    private listeners: Set<() => void> = new Set();

    setLoading(key: string, loading: boolean) {
        this.loadingStates.set(key, loading);
        this.notifyListeners();
    }

    isLoading(key: string): boolean {
        return this.loadingStates.get(key) || false;
    }

    isAnyLoading(): boolean {
        return Array.from(this.loadingStates.values()).some(loading => loading);
    }

    subscribe(listener: () => void) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    private notifyListeners() {
        this.listeners.forEach(listener => listener());
    }
}

export const loadingState = new LoadingState(); 