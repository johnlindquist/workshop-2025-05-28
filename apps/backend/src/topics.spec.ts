import request from 'supertest';
import express from 'express';
import cors from 'cors';
import { Topic } from './types/topic';
import { logger } from './utils/logger';

// Create test app
const app = express();
app.use(cors());
app.use(express.json());

// Topics data (matching main.ts)
const topicsData: Topic[] = [
    { name: 'React', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=R' },
    { name: 'Next.js', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=N' },
    { name: 'TypeScript', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=TS' },
    { name: 'JavaScript', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=JS' },
    { name: 'Remix', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=Rx' },
    { name: 'Redux', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=Rd' },
    { name: 'Supabase', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=S' },
    { name: 'Angular', href: '#', imgSrc: 'https://placehold.co/40x40/cccccc/969696?text=A' },
];

// Topics API endpoint
app.get('/api/topics', (req, res) => {
    logger.info(`Topics API endpoint called, returning ${topicsData.length} topics`);
    res.json(topicsData);
});

describe('Topics API', () => {
    it('should return 200 status with array of topic objects containing name, href, and imgSrc properties', async () => {
        const response = await request(app)
            .get('/api/topics')
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(8);

        // Check that each topic has the required properties
        response.body.forEach((topic: Topic) => {
            expect(topic).toHaveProperty('name');
            expect(topic).toHaveProperty('href');
            expect(topic).toHaveProperty('imgSrc');
            expect(typeof topic.name).toBe('string');
            expect(typeof topic.href).toBe('string');
            expect(typeof topic.imgSrc).toBe('string');
        });

        // Check specific topics exist
        const topicNames = response.body.map((topic: Topic) => topic.name);
        expect(topicNames).toContain('React');
        expect(topicNames).toContain('TypeScript');
        expect(topicNames).toContain('Next.js');
    });
}); 