/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import cors from 'cors';
import * as path from 'path';
import { Topic } from './types/topic';
import { logger } from './utils/logger';

const app = express();

// CORS middleware configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200',
  credentials: true
}));

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Topics data (matching frontend hardcoded data)
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

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

// Topics API endpoint
app.get('/api/topics', (req, res) => {
  logger.info(`Topics API endpoint called, returning ${topicsData.length} topics`);
  res.json(topicsData);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  logger.info(`Server listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
