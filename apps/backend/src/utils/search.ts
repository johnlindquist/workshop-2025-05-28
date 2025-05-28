import { Topic } from '../types/topic';
import { FeedItem } from '../types/feed';

export interface SearchResult {
    type: 'topic' | 'feed';
    item: Topic | FeedItem;
    score: number;
}

/**
 * Simple fuzzy matching function that calculates a score based on:
 * - Exact matches get highest score
 * - Partial matches get medium score
 * - Case-insensitive matches get lower score
 */
export function fuzzyMatch(query: string, text: string): number {
    const queryLower = query.toLowerCase();
    const textLower = text.toLowerCase();

    // Exact match
    if (text === query) return 100;

    // Case-insensitive exact match
    if (textLower === queryLower) return 90;

    // Starts with query
    if (textLower.startsWith(queryLower)) return 80;

    // Contains query
    if (textLower.includes(queryLower)) return 60;

    // Character-by-character fuzzy matching
    let score = 0;
    let queryIndex = 0;

    for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
        if (textLower[i] === queryLower[queryIndex]) {
            score += 1;
            queryIndex++;
        }
    }

    // Return score based on how many characters matched
    if (queryIndex === queryLower.length) {
        return Math.max(20, (score / queryLower.length) * 40);
    }

    return 0;
}

/**
 * Search through topics based on name
 */
export function searchTopics(query: string, topics: Topic[]): SearchResult[] {
    const results: SearchResult[] = [];

    for (const topic of topics) {
        const score = fuzzyMatch(query, topic.name);
        if (score > 0) {
            results.push({
                type: 'topic',
                item: topic,
                score,
            });
        }
    }

    return results;
}

/**
 * Search through feed items based on title and author
 */
export function searchFeedItems(query: string, feedItems: FeedItem[]): SearchResult[] {
    const results: SearchResult[] = [];

    for (const item of feedItems) {
        const titleScore = fuzzyMatch(query, item.title);
        const authorScore = fuzzyMatch(query, item.author);
        const maxScore = Math.max(titleScore, authorScore);

        if (maxScore > 0) {
            results.push({
                type: 'feed',
                item,
                score: maxScore,
            });
        }
    }

    return results;
}

/**
 * Unified search function that searches both topics and feed items
 */
export function search(query: string, topics: Topic[], feedItems: FeedItem[]): SearchResult[] {
    const topicResults = searchTopics(query, topics);
    const feedResults = searchFeedItems(query, feedItems);

    // Combine and sort by score (highest first)
    const allResults = [...topicResults, ...feedResults];
    allResults.sort((a, b) => b.score - a.score);

    return allResults;
} 