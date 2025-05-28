import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3333';

describe('API Integration Tests', () => {
    beforeAll(async () => {
        // Wait for server to be ready
        let retries = 10;
        while (retries > 0) {
            try {
                await axios.get(`${API_BASE_URL}/api`);
                break;
            } catch (error) {
                retries--;
                if (retries === 0) throw error;
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    });

    describe('Health Check', () => {
        it('should return welcome message', async () => {
            const res = await axios.get(`${API_BASE_URL}/api`);

            expect(res.status).toBe(200);
            expect(res.data).toEqual({ message: 'Welcome to backend!' });
        });
    });

    describe('Topics API', () => {
        it('should return array of topics', async () => {
            const res = await axios.get(`${API_BASE_URL}/api/topics`);

            expect(res.status).toBe(200);
            expect(Array.isArray(res.data)).toBe(true);
            expect(res.data.length).toBeGreaterThan(0);

            // Verify topic structure
            const topic = res.data[0];
            expect(topic).toHaveProperty('name');
            expect(topic).toHaveProperty('href');
            expect(topic).toHaveProperty('imgSrc');
            expect(typeof topic.name).toBe('string');
            expect(typeof topic.href).toBe('string');
            expect(typeof topic.imgSrc).toBe('string');
        });

        it('should return expected topics', async () => {
            const res = await axios.get(`${API_BASE_URL}/api/topics`);
            const topicNames = res.data.map((topic: any) => topic.name);

            expect(topicNames).toContain('React');
            expect(topicNames).toContain('Next.js');
            expect(topicNames).toContain('TypeScript');
            expect(topicNames).toContain('JavaScript');
        });
    });

    describe('Feed API', () => {
        it('should return paginated feed items with default parameters', async () => {
            const res = await axios.get(`${API_BASE_URL}/api/feed`);

            expect(res.status).toBe(200);
            expect(res.data).toHaveProperty('items');
            expect(res.data).toHaveProperty('pagination');
            expect(Array.isArray(res.data.items)).toBe(true);

            // Verify pagination structure
            const pagination = res.data.pagination;
            expect(pagination).toHaveProperty('page');
            expect(pagination).toHaveProperty('limit');
            expect(pagination).toHaveProperty('total');
            expect(pagination).toHaveProperty('totalPages');
            expect(pagination.page).toBe(1);
            expect(pagination.limit).toBe(6);
        });

        it('should return feed items with correct structure', async () => {
            const res = await axios.get(`${API_BASE_URL}/api/feed`);

            expect(res.data.items.length).toBeGreaterThan(0);

            const item = res.data.items[0];
            expect(item).toHaveProperty('type');
            expect(item).toHaveProperty('title');
            expect(item).toHaveProperty('author');
            expect(item).toHaveProperty('authorImg');
            expect(item).toHaveProperty('imgSrc');
            expect(item).toHaveProperty('href');
            expect(item).toHaveProperty('created_at');
            expect(item).toHaveProperty('popularity');
            expect(item).toHaveProperty('rating');
            expect(item).toHaveProperty('watch_count');

            expect(['article', 'lesson']).toContain(item.type);
            expect(typeof item.title).toBe('string');
            expect(typeof item.author).toBe('string');
        });

        it('should handle pagination parameters', async () => {
            const res = await axios.get(`${API_BASE_URL}/api/feed?page=1&limit=3`);

            expect(res.status).toBe(200);
            expect(res.data.items.length).toBeLessThanOrEqual(3);
            expect(res.data.pagination.page).toBe(1);
            expect(res.data.pagination.limit).toBe(3);
        });

        it('should sort by popularity', async () => {
            const res = await axios.get(`${API_BASE_URL}/api/feed?sort=popular`);

            expect(res.status).toBe(200);
            const items = res.data.items;

            // Verify items are sorted by popularity (descending)
            for (let i = 0; i < items.length - 1; i++) {
                expect(items[i].popularity).toBeGreaterThanOrEqual(items[i + 1].popularity);
            }
        });

        it('should sort by rating', async () => {
            const res = await axios.get(`${API_BASE_URL}/api/feed?sort=rating`);

            expect(res.status).toBe(200);
            const items = res.data.items;

            // Verify items are sorted by rating (descending)
            for (let i = 0; i < items.length - 1; i++) {
                expect(items[i].rating).toBeGreaterThanOrEqual(items[i + 1].rating);
            }
        });

        it('should sort by most watched', async () => {
            const res = await axios.get(`${API_BASE_URL}/api/feed?sort=most_watched`);

            expect(res.status).toBe(200);
            const items = res.data.items;

            // Verify items are sorted by watch_count (descending)
            for (let i = 0; i < items.length - 1; i++) {
                expect(items[i].watch_count).toBeGreaterThanOrEqual(items[i + 1].watch_count);
            }
        });
    });

    describe('Search API', () => {
        it('should return search results for valid query', async () => {
            const res = await axios.get(`${API_BASE_URL}/api/search?q=React`);

            expect(res.status).toBe(200);
            expect(Array.isArray(res.data)).toBe(true);
            expect(res.data.length).toBeGreaterThan(0);

            // Verify search result structure
            const result = res.data[0];
            expect(result).toHaveProperty('type');
            expect(result).toHaveProperty('item');
            expect(result).toHaveProperty('score');
            expect(['topic', 'feed']).toContain(result.type);
            expect(typeof result.score).toBe('number');
        });

        it('should search topics and feed items', async () => {
            const res = await axios.get(`${API_BASE_URL}/api/search?q=TypeScript`);

            expect(res.status).toBe(200);
            const types = res.data.map((result: any) => result.type);

            // Should find both topic and feed results
            expect(types).toContain('topic');
        });

        it('should return results sorted by score', async () => {
            const res = await axios.get(`${API_BASE_URL}/api/search?q=React`);

            expect(res.status).toBe(200);
            const results = res.data;

            // Verify results are sorted by score (descending)
            for (let i = 0; i < results.length - 1; i++) {
                expect(results[i].score).toBeGreaterThanOrEqual(results[i + 1].score);
            }
        });

        it('should return 400 for missing query parameter', async () => {
            try {
                await axios.get(`${API_BASE_URL}/api/search`);
                fail('Should have thrown an error');
            } catch (error: any) {
                expect(error.response.status).toBe(400);
                expect(error.response.data).toHaveProperty('error');
                expect(error.response.data.error.code).toBe('VALIDATION_ERROR');
            }
        });

        it('should return 400 for empty query parameter', async () => {
            try {
                await axios.get(`${API_BASE_URL}/api/search?q=`);
                fail('Should have thrown an error');
            } catch (error: any) {
                expect(error.response.status).toBe(400);
                expect(error.response.data).toHaveProperty('error');
            }
        });
    });

    describe('Error Handling', () => {
        it('should return 404 for non-existent routes', async () => {
            try {
                await axios.get(`${API_BASE_URL}/api/nonexistent`);
                fail('Should have thrown an error');
            } catch (error: any) {
                expect(error.response.status).toBe(404);
                expect(error.response.data).toHaveProperty('error');
                expect(error.response.data.error.code).toBe('ROUTE_NOT_FOUND');
                expect(error.response.data).toHaveProperty('timestamp');
                expect(error.response.data).toHaveProperty('path');
                expect(error.response.data).toHaveProperty('method');
            }
        });

        it('should include proper error structure', async () => {
            try {
                await axios.get(`${API_BASE_URL}/api/invalid-endpoint`);
                fail('Should have thrown an error');
            } catch (error: any) {
                const errorData = error.response.data;
                expect(errorData.error).toHaveProperty('code');
                expect(errorData.error).toHaveProperty('message');
                expect(errorData.error).toHaveProperty('statusCode');
                expect(typeof errorData.timestamp).toBe('string');
                expect(typeof errorData.path).toBe('string');
                expect(typeof errorData.method).toBe('string');
            }
        });
    });

    describe('CORS', () => {
        it('should include CORS headers', async () => {
            const res = await axios.get(`${API_BASE_URL}/api`);

            expect(res.headers).toHaveProperty('access-control-allow-origin');
        });
    });
}); 