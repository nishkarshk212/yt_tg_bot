# YouTube API Platform

A modern, scalable YouTube API platform designed specifically for Telegram music bots and public developers. Features a secure REST API, comprehensive documentation, user dashboard, admin panel, and more.

## Features

- **Secure REST API** with JWT authentication and API key management
- **YouTube Data Endpoints**: Search videos, get metadata, stream URLs, thumbnails, playlists, comments, and related content
- **User Dashboard**: API key management, usage statistics, and subscription management
- **Admin Panel**: User management, analytics, rate limits, and platform configuration
- **Comprehensive Documentation**: Interactive code examples in cURL, JavaScript, Python, Node.js, and PHP
- **Rate Limiting**: Configurable rate limits per plan
- **Dark/Light Mode**: Modern UI with theme toggle
- **API Explorer**: Test endpoints directly from the browser
- **Status Page**: Real-time system status and incident history
- **Changelog**: Track updates and new features

## Tech Stack

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **Lucide React** for icons
- **next-themes** for dark/light mode

### Backend
- **Express.js** for REST API
- **Prisma** with PostgreSQL for database
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-rate-limit** for rate limiting
- **Axios** for HTTP requests

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd youtube-api-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/youtube_api"
JWT_SECRET="your-secret-key"
YOUTUBE_API_KEY="your-youtube-api-key"
API_PORT=3001
FRONTEND_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

4. Set up the database:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. Seed the database (optional):
```bash
npx prisma db seed
```

### Running the Application

Start both the frontend and backend:

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run server
```

The frontend will be available at [http://localhost:3000](http://localhost:3000)
The API will be available at [http://localhost:3001](http://localhost:3001)

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/keys` - Create API key
- `DELETE /api/v1/auth/keys/:keyId` - Delete API key

### YouTube API
- `GET /api/v1/search` - Search YouTube videos
- `GET /api/v1/videos/:videoId` - Get video details
- `GET /api/v1/videos/:videoId/stream` - Get stream URL
- `GET /api/v1/playlists/:playlistId` - Get playlist details
- `GET /api/v1/videos/:videoId/thumbnail` - Get thumbnail
- `GET /api/v1/videos/:videoId/related` - Get related videos
- `GET /api/v1/videos/:videoId/comments` - Get comments

### Admin
- `GET /api/v1/admin/users` - Get all users
- `GET /api/v1/admin/analytics` - Get platform analytics
- `GET /api/v1/admin/settings` - Get admin settings
- `PATCH /api/v1/admin/settings` - Update admin settings

## Usage Example

### Using cURL
```bash
curl -X GET "http://localhost:3001/api/v1/search?q=telegram+music+bot&limit=10" \
  -H "x-api-key: YOUR_API_KEY"
```

### Using JavaScript
```javascript
const response = await fetch('http://localhost:3001/api/v1/search?q=telegram+music+bot&limit=10', {
  headers: {
    'x-api-key': 'YOUR_API_KEY'
  }
});
const data = await response.json();
```

### Using Python
```python
import requests

response = requests.get(
    'http://localhost:3001/api/v1/search',
    params={'q': 'telegram music bot', 'limit': 10},
    headers={'x-api-key': 'YOUR_API_KEY'}
)
data = response.json()
```

## Telegram Bot Integration

The platform includes comprehensive documentation for integrating with Telegram music bots. See the [Telegram Integration Guide](http://localhost:3000/docs) for step-by-step instructions.

## Project Structure

```
youtube-api-platform/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── dashboard/   # User dashboard
│   │   ├── docs/        # Documentation
│   │   ├── admin/       # Admin panel
│   │   └── ...
│   ├── components/      # React components
│   └── lib/            # Utility functions
├── server/             # Backend API
│   ├── routes/        # API routes
│   ├── middleware/    # Express middleware
│   └── services/      # Business logic
├── prisma/            # Database schema
└── public/            # Static assets
```

## Development

### Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run server` - Start Express API server
- `npm run lint` - Run ESLint

### Database Management

```bash
npx prisma studio          # Open Prisma Studio
npx prisma migrate dev     # Create migration
npx prisma migrate deploy  # Deploy migration
npx prisma generate        # Generate Prisma Client
```

## Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Backend (Railway/Render)

1. Deploy the Express server
2. Set up PostgreSQL database
3. Configure environment variables
4. Run migrations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on GitHub or contact support@youtube-api.com.
# yt_tg_bot
