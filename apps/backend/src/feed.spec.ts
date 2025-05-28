import request from 'supertest';
import express from 'express';
import cors from 'cors';
import { FeedItem, FeedResponse } from './types/feed';
import { logger } from './utils/logger';

// Create test app
const app = express();
app.use(cors());
app.use(express.json());

// Helper function for placeholder images
const placeholderImg = (width: number, height: number, text = '', bgColor = 'cccccc', textColor = '969696') => {
    return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
};

// Feed data (matching main.ts)
const feedData: FeedItem[] = [
    {
        type: 'article',
        title: "AI Dev Essentials #7: Microsoft's AI Blitz, Google's NotebookLM Shines & New Coding Agents",
        author: 'John Lindquist',
        authorImg: placeholderImg(32, 32, 'JL'),
        imgSrc: placeholderImg(150, 150, 'AI'),
        href: '#',
        isLarge: true,
        created_at: '2025-05-28T10:00:00Z',
        popularity: 95,
        rating: 4.8,
        watch_count: 1250,
    },
    {
        type: 'lesson',
        title: 'Local AI Code Reviews with the CodeRabbit Extension in Cursor',
        author: 'John Lindquist',
        authorImg: placeholderImg(32, 32, 'JL'),
        imgSrc: placeholderImg(85, 85, 'CR'),
        href: '#',
        created_at: '2025-05-27T14:30:00Z',
        popularity: 87,
        rating: 4.6,
        watch_count: 980,
    },
    {
        type: 'lesson',
        title: 'Create a Simple GitHub Issue Search MCP Server using Cursor',
        author: 'Ákos Kőműves',
        authorImg: placeholderImg(32, 32, 'AK'),
        imgSrc: placeholderImg(85, 85, 'GH'),
        href: '#',
        created_at: '2025-05-26T09:15:00Z',
        popularity: 78,
        rating: 4.5,
        watch_count: 756,
    },
    {
        type: 'article',
        title: 'AI Dev Essentials #6: Cursor 0.50, Zed, Cloudflare & AI Workflows',
        author: 'John Lindquist',
        authorImg: placeholderImg(32, 32, 'JL'),
        imgSrc: placeholderImg(85, 85, 'AI6'),
        href: '#',
        created_at: '2025-05-25T16:45:00Z',
        popularity: 92,
        rating: 4.7,
        watch_count: 1100,
    },
    {
        type: 'lesson',
        title: 'Automatically Improve Cursor Rules Using Custom Prompts',
        author: 'John Lindquist',
        authorImg: placeholderImg(32, 32, 'JL'),
        imgSrc: placeholderImg(85, 85, 'CR'),
        href: '#',
        created_at: '2025-05-24T11:20:00Z',
        popularity: 83,
        rating: 4.4,
        watch_count: 890,
    },
    {
        type: 'lesson',
        title: 'Clean up Legacy Functions for Testability in Cursor (0.50+) with cmd+k',
        author: 'John Lindquist',
        authorImg: placeholderImg(32, 32, 'JL'),
        imgSrc: placeholderImg(85, 85, 'CMD'),
        href: '#',
        created_at: '2025-05-23T13:10:00Z',
        popularity: 75,
        rating: 4.3,
        watch_count: 654,
    },
];

// Feed API endpoint with pagination and sorting
app.get('/api/feed', (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 6;
    const sort = req.query.sort as string || 'created_at';

    // Sort the data based on the sort parameter
    let sortedData = [...feedData];
    switch (sort) {
        case 'popular':
            sortedData.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
            break;
        case 'rating':
            sortedData.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
        case 'most_watched':
            sortedData.sort((a, b) => (b.watch_count || 0) - (a.watch_count || 0));
            break;
        case 'created_at':
        default:
            sortedData.sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
            break;
    }

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = sortedData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(sortedData.length / limit);

    const response: FeedResponse = {
        items: paginatedItems,
        pagination: {
            page,
            limit,
            total: sortedData.length,
            totalPages,
        },
    };

    logger.info(`Feed API endpoint called with page=${page}, limit=${limit}, sort=${sort}, returning ${paginatedItems.length} items`);
    res.json(response);
});

describe('Feed API', () => {
    it('should return paginated feed items with metadata', async () => {
        const response = await request(app)
            .get('/api/feed')
            .expect(200);

        expect(response.body).toHaveProperty('items');
        expect(response.body).toHaveProperty('pagination');
        expect(Array.isArray(response.body.items)).toBe(true);
        expect(response.body.items.length).toBeLessThanOrEqual(6); // default limit

        // Check pagination metadata
        expect(response.body.pagination).toHaveProperty('page');
        expect(response.body.pagination).toHaveProperty('limit');
        expect(response.body.pagination).toHaveProperty('total');
        expect(response.body.pagination).toHaveProperty('totalPages');

        // Check that each feed item has the required properties
        response.body.items.forEach((item: FeedItem) => {
            expect(item).toHaveProperty('type');
            expect(item).toHaveProperty('title');
            expect(item).toHaveProperty('author');
            expect(item).toHaveProperty('authorImg');
            expect(item).toHaveProperty('imgSrc');
            expect(item).toHaveProperty('href');
        });
    });

    it('should return items sorted by popularity when sort=popular', async () => {
        const response = await request(app)
            .get('/api/feed?sort=popular')
            .expect(200);

        expect(response.body.items.length).toBeGreaterThan(0);

        // Check that items are sorted by popularity (descending)
        for (let i = 0; i < response.body.items.length - 1; i++) {
            const current = response.body.items[i];
            const next = response.body.items[i + 1];
            expect(current.popularity).toBeGreaterThanOrEqual(next.popularity);
        }
    });

    it('should respect pagination parameters', async () => {
        const response = await request(app)
            .get('/api/feed?page=1&limit=3')
            .expect(200);

        expect(response.body.items.length).toBe(3);
        expect(response.body.pagination.page).toBe(1);
        expect(response.body.pagination.limit).toBe(3);
        expect(response.body.pagination.total).toBe(6);
        expect(response.body.pagination.totalPages).toBe(2);
    });
}); 