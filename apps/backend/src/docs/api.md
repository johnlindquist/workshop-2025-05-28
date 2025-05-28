# Backend API Documentation

This document describes the REST API endpoints available in the backend service.

## Base URL

```
http://localhost:3333/api
```

## Common Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "data": "...",
  "timestamp": "2025-05-28T11:30:00.000Z"
}
```

### Error Response
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "statusCode": 400
  },
  "timestamp": "2025-05-28T11:30:00.000Z",
  "path": "/api/endpoint",
  "method": "GET"
}
```

## Endpoints

### 1. Health Check

**GET** `/api`

Returns a simple health check message.

#### Response
```json
{
  "message": "Welcome to backend!"
}
```

---

### 2. Topics

**GET** `/api/topics`

Returns a list of all available topics.

#### Response
```json
[
  {
    "name": "React",
    "href": "#",
    "imgSrc": "https://placehold.co/40x40/cccccc/969696?text=R"
  },
  {
    "name": "Next.js",
    "href": "#",
    "imgSrc": "https://placehold.co/40x40/cccccc/969696?text=N"
  }
]
```

#### Response Fields
- `name` (string): The topic name
- `href` (string): Link to the topic page
- `imgSrc` (string): URL to the topic image

---

### 3. Feed Items

**GET** `/api/feed`

Returns paginated feed items with optional sorting.

#### Query Parameters
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 6)
- `sort` (string, optional): Sort criteria. Options:
  - `created_at` (default): Sort by creation date (newest first)
  - `popular`: Sort by popularity score
  - `rating`: Sort by rating
  - `most_watched`: Sort by watch count

#### Example Request
```
GET /api/feed?page=1&limit=3&sort=popular
```

#### Response
```json
{
  "items": [
    {
      "type": "article",
      "title": "AI Dev Essentials #7: Microsoft's AI Blitz",
      "author": "John Lindquist",
      "authorImg": "https://placehold.co/32x32/cccccc/969696?text=JL",
      "imgSrc": "https://placehold.co/150x150/cccccc/969696?text=AI",
      "href": "#",
      "isLarge": true,
      "created_at": "2025-05-28T10:00:00Z",
      "popularity": 95,
      "rating": 4.8,
      "watch_count": 1250
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 3,
    "total": 6,
    "totalPages": 2
  }
}
```

#### Response Fields
- `items` (array): Array of feed items
  - `type` (string): Item type ("article" or "lesson")
  - `title` (string): Item title
  - `author` (string): Author name
  - `authorImg` (string): Author image URL
  - `imgSrc` (string): Item image URL
  - `href` (string): Link to the item
  - `isLarge` (boolean): Whether to display as large item
  - `created_at` (string): ISO date string
  - `popularity` (number): Popularity score (0-100)
  - `rating` (number): Rating (0-5)
  - `watch_count` (number): Number of views/watches
- `pagination` (object): Pagination metadata
  - `page` (number): Current page
  - `limit` (number): Items per page
  - `total` (number): Total number of items
  - `totalPages` (number): Total number of pages

---

### 4. Search

**GET** `/api/search`

Search through topics and feed items.

#### Query Parameters
- `q` (string, required): Search query

#### Example Request
```
GET /api/search?q=TypeScript
```

#### Response
```json
[
  {
    "type": "topic",
    "item": {
      "name": "TypeScript",
      "href": "#",
      "imgSrc": "https://placehold.co/40x40/cccccc/969696?text=TS"
    },
    "score": 100
  },
  {
    "type": "feed",
    "item": {
      "type": "lesson",
      "title": "Advanced TypeScript Patterns",
      "author": "John Lindquist",
      "authorImg": "https://placehold.co/32x32/cccccc/969696?text=JL",
      "imgSrc": "https://placehold.co/85x85/cccccc/969696?text=TS",
      "href": "#",
      "created_at": "2025-05-27T14:30:00Z",
      "popularity": 87,
      "rating": 4.6,
      "watch_count": 980
    },
    "score": 80
  }
]
```

#### Response Fields
- Array of search results, sorted by relevance score (highest first)
- `type` (string): Result type ("topic" or "feed")
- `item` (object): The matched item (Topic or FeedItem)
- `score` (number): Relevance score (0-100)

#### Error Responses
- `400 Bad Request`: Missing or empty query parameter
  ```json
  {
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Query parameter \"q\" is required and cannot be empty",
      "statusCode": 400
    },
    "timestamp": "2025-05-28T11:30:00.000Z",
    "path": "/api/search",
    "method": "GET"
  }
  ```

---

## Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Request validation failed |
| `ROUTE_NOT_FOUND` | Requested endpoint does not exist |
| `INTERNAL_ERROR` | Server internal error |
| `INVALID_FORMAT` | Invalid data format |
| `UNAUTHORIZED` | Authentication required |

## Rate Limiting

Currently, no rate limiting is implemented. This may be added in future versions.

## CORS

CORS is enabled for the frontend URL (`http://localhost:4200` by default). This can be configured via the `FRONTEND_URL` environment variable.

## Logging

All requests and responses are logged. Log level can be controlled via the `LOG_LEVEL` environment variable:
- `error`: Only errors
- `warn`: Warnings and errors
- `info`: General information, warnings, and errors (default)
- `debug`: Detailed debugging information 