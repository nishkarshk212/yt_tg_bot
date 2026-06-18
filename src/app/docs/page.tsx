"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Book, Code, Terminal, CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function Documentation() {
  const [activeTab, setActiveTab] = useState("getting-started")
  const [codeLanguage, setCodeLanguage] = useState("curl")

  const codeExamples = {
    curl: `curl -X GET "https://api.youtube-platform.com/api/v1/search?q=telegram+music+bot&limit=10" \\
  -H "x-api-key: YOUR_API_KEY"`,
    javascript: `const response = await fetch('https://api.youtube-platform.com/api/v1/search?q=telegram+music+bot&limit=10', {
  headers: {
    'x-api-key': 'YOUR_API_KEY'
  }
});
const data = await response.json();`,
    python: `import requests

response = requests.get(
    'https://api.youtube-platform.com/api/v1/search',
    params={'q': 'telegram music bot', 'limit': 10},
    headers={'x-api-key': 'YOUR_API_KEY'}
)
data = response.json()`,
    nodejs: `const axios = require('axios');

const response = await axios.get('https://api.youtube-platform.com/api/v1/search', {
  params: { q: 'telegram music bot', limit: 10 },
  headers: { 'x-api-key': 'YOUR_API_KEY' }
});
console.log(response.data);`,
    php: `$response = file_get_contents(
    'https://api.youtube-platform.com/api/v1/search?q=telegram+music+bot&limit=10',
    false,
    stream_context_create([
        'http' => [
            'method' => 'GET',
            'header' => 'x-api-key: YOUR_API_KEY'
        ]
    ])
);
$data = json_decode($response, true);`
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <section className="py-8 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Documentation
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Comprehensive guide to using the YouTube API Platform
            </p>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Navigation */}
            <aside className="w-64 flex-shrink-0 hidden lg:block">
              <nav className="sticky top-8 space-y-2">
                <button
                  onClick={() => setActiveTab("getting-started")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "getting-started"
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  Getting Started
                </button>
                <button
                  onClick={() => setActiveTab("authentication")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "authentication"
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  Authentication
                </button>
                <button
                  onClick={() => setActiveTab("endpoints")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "endpoints"
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  API Endpoints
                </button>
                <button
                  onClick={() => setActiveTab("rate-limits")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "rate-limits"
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  Rate Limits
                </button>
                <button
                  onClick={() => setActiveTab("errors")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "errors"
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  Error Codes
                </button>
                <button
                  onClick={() => setActiveTab("telegram")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "telegram"
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  Telegram Integration
                </button>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              {/* Getting Started */}
              {activeTab === "getting-started" && (
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Book className="h-5 w-5" />
                        Getting Started
                      </CardTitle>
                      <CardDescription>
                        Learn how to get started with the YouTube API Platform
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">1. Create an Account</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Sign up for a free account at <Link href="/register" className="text-blue-600 hover:underline">youtube-api.com/register</Link>
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">2. Generate an API Key</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Go to your dashboard and create a new API key. Keep this key secure as it provides access to your account.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">3. Make Your First Request</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Use your API key to make requests to any endpoint. Here's an example:
                        </p>
                        <div className="space-y-2">
                          <div className="flex gap-2 mb-2">
                            {["curl", "javascript", "python", "nodejs", "php"].map((lang) => (
                              <Button
                                key={lang}
                                variant={codeLanguage === lang ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCodeLanguage(lang)}
                              >
                                {lang}
                              </Button>
                            ))}
                          </div>
                          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{codeExamples[codeLanguage as keyof typeof codeExamples]}</code>
                          </pre>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Authentication */}
              {activeTab === "authentication" && (
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        Authentication
                      </CardTitle>
                      <CardDescription>
                        How to authenticate your API requests
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">API Key Authentication</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          All API requests require an API key in the header:
                        </p>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
                          <code>x-api-key: YOUR_API_KEY</code>
                        </pre>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">JWT Token Authentication</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          For dashboard and admin operations, use JWT tokens:
                        </p>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
                          <code>Authorization: Bearer YOUR_JWT_TOKEN</code>
                        </pre>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Security Best Practices</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                          <li>Never expose your API key in client-side code</li>
                          <li>Use environment variables to store API keys</li>
                          <li>Rotate your API keys regularly</li>
                          <li>Use HTTPS for all API requests</li>
                          <li>Implement proper error handling for authentication failures</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* API Endpoints */}
              {activeTab === "endpoints" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        API Endpoints
                      </CardTitle>
                      <CardDescription>
                        Complete list of available API endpoints
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <EndpointCard
                          method="GET"
                          path="/api/v1/search"
                          description="Search YouTube videos"
                          params={[
                            { name: "q", type: "string", required: true, description: "Search query" },
                            { name: "limit", type: "integer", required: false, description: "Number of results (default: 10)" }
                          ]}
                        />
                        <EndpointCard
                          method="GET"
                          path="/api/v1/videos/:videoId"
                          description="Get video details and metadata"
                          params={[
                            { name: "videoId", type: "string", required: true, description: "YouTube video ID" }
                          ]}
                        />
                        <EndpointCard
                          method="GET"
                          path="/api/v1/videos/:videoId/stream"
                          description="Get stream URL for video"
                          params={[
                            { name: "videoId", type: "string", required: true, description: "YouTube video ID" },
                            { name: "quality", type: "string", required: false, description: "Video quality (default: highest)" }
                          ]}
                        />
                        <EndpointCard
                          method="GET"
                          path="/api/v1/playlists/:playlistId"
                          description="Get playlist information"
                          params={[
                            { name: "playlistId", type: "string", required: true, description: "YouTube playlist ID" }
                          ]}
                        />
                        <EndpointCard
                          method="GET"
                          path="/api/v1/videos/:videoId/thumbnail"
                          description="Get video thumbnail URL"
                          params={[
                            { name: "videoId", type: "string", required: true, description: "YouTube video ID" },
                            { name: "quality", type: "string", required: false, description: "Thumbnail quality (default: maxresdefault)" }
                          ]}
                        />
                        <EndpointCard
                          method="GET"
                          path="/api/v1/videos/:videoId/related"
                          description="Get related videos"
                          params={[
                            { name: "videoId", type: "string", required: true, description: "YouTube video ID" },
                            { name: "limit", type: "integer", required: false, description: "Number of results (default: 10)" }
                          ]}
                        />
                        <EndpointCard
                          method="GET"
                          path="/api/v1/videos/:videoId/comments"
                          description="Get video comments"
                          params={[
                            { name: "videoId", type: "string", required: true, description: "YouTube video ID" },
                            { name: "limit", type: "integer", required: false, description: "Number of comments (default: 20)" }
                          ]}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Rate Limits */}
              {activeTab === "rate-limits" && (
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Terminal className="h-5 w-5" />
                        Rate Limits
                      </CardTitle>
                      <CardDescription>
                        Understanding API rate limits and quotas
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Rate Limit by Plan</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-gray-200 dark:border-gray-800">
                                <th className="text-left py-3 px-4">Plan</th>
                                <th className="text-left py-3 px-4">Requests/Minute</th>
                                <th className="text-left py-3 px-4">Requests/Month</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-gray-200 dark:border-gray-800">
                                <td className="py-3 px-4">Free</td>
                                <td className="py-3 px-4">10</td>
                                <td className="py-3 px-4">100</td>
                              </tr>
                              <tr className="border-b border-gray-200 dark:border-gray-800">
                                <td className="py-3 px-4">Pro</td>
                                <td className="py-3 px-4">60</td>
                                <td className="py-3 px-4">10,000</td>
                              </tr>
                              <tr>
                                <td className="py-3 px-4">Enterprise</td>
                                <td className="py-3 px-4">200</td>
                                <td className="py-3 px-4">Unlimited</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Rate Limit Headers</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Each API response includes rate limit information in the headers:
                        </p>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                          <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">X-RateLimit-Limit</code> - Your rate limit</li>
                          <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">X-RateLimit-Remaining</code> - Requests remaining</li>
                          <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">X-RateLimit-Reset</code> - Unix timestamp when limit resets</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Handling Rate Limits</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          When you exceed your rate limit, you'll receive a 429 status code. Implement exponential backoff:
                        </p>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{`// Example: Exponential backoff
async function makeRequestWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.status === 429) {
        const waitTime = Math.pow(2, i) * 1000;
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
    }
  }
}`}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Error Codes */}
              {activeTab === "errors" && (
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5" />
                        Error Codes
                      </CardTitle>
                      <CardDescription>
                        Common error codes and how to handle them
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <ErrorCard
                          code="200"
                          status="OK"
                          description="Request successful"
                          color="green"
                        />
                        <ErrorCard
                          code="400"
                          status="Bad Request"
                          description="Invalid request parameters"
                          color="red"
                        />
                        <ErrorCard
                          code="401"
                          status="Unauthorized"
                          description="Invalid or missing API key"
                          color="red"
                        />
                        <ErrorCard
                          code="403"
                          status="Forbidden"
                          description="API key doesn't have permission"
                          color="red"
                        />
                        <ErrorCard
                          code="404"
                          status="Not Found"
                          description="Resource not found"
                          color="red"
                        />
                        <ErrorCard
                          code="429"
                          status="Too Many Requests"
                          description="Rate limit exceeded"
                          color="yellow"
                        />
                        <ErrorCard
                          code="500"
                          status="Internal Server Error"
                          description="Server error, try again later"
                          color="red"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Error Response Format</h3>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{`{
  "error": {
    "message": "Invalid or missing API key",
    "statusCode": 401
  }
}`}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Telegram Integration */}
              {activeTab === "telegram" && (
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Terminal className="h-5 w-5" />
                        Telegram Bot Integration
                      </CardTitle>
                      <CardDescription>
                        Step-by-step guide for integrating with Telegram music bots
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Prerequisites</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                          <li>Node.js installed on your server</li>
                          <li>Telegram bot token from @BotFather</li>
                          <li>API key from YouTube API Platform</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Installation</h3>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
                          <code>npm install node-telegram-bot-api axios</code>
                        </pre>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Basic Bot Setup</h3>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{`const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const API_KEY = process.env.YOUTUBE_API_KEY;

bot.onText(/\/search (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const query = match[1];
  
  try {
    const response = await axios.get('https://api.youtube-platform.com/api/v1/search', {
      params: { q: query, limit: 5 },
      headers: { 'x-api-key': API_KEY }
    });
    
    const videos = response.data.data;
    videos.forEach(video => {
      bot.sendMessage(chatId, 
        \`🎬 \${video.title}\\n\` +
        \`👁️ \${video.viewCount} views\\n\` +
        \`🔗 https://youtube.com/watch?v=\${video.id}\`
      );
    });
  } catch (error) {
    bot.sendMessage(chatId, 'Sorry, something went wrong.');
  }
});

console.log('Bot is running...');`}</code>
                        </pre>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Advanced Features</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                          <li>Inline keyboard for video selection</li>
                          <li>Audio streaming with ytdl-core</li>
                          <li>Playlist support</li>
                          <li>Caching for faster responses</li>
                          <li>User preferences and favorites</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  )
}

function EndpointCard({ method, path, description, params }: any) {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className={`px-2 py-1 rounded text-xs font-bold ${
          method === 'GET' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
          method === 'POST' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
          method === 'DELETE' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
          'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
        }`}>
          {method}
        </span>
        <code className="text-sm">{path}</code>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{description}</p>
      {params && params.length > 0 && (
        <div className="text-sm">
          <p className="font-medium mb-1">Parameters:</p>
          <ul className="space-y-1">
            {params.map((param: any, idx: number) => (
              <li key={idx} className="text-gray-600 dark:text-gray-400">
                <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">{param.name}</code>
                <span className="text-xs ml-1">({param.type}){param.required ? ' required' : ' optional'}</span>
                <span className="text-xs ml-2">- {param.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function ErrorCard({ code, status, description, color }: any) {
  const colorClasses = {
    green: 'border-green-500 bg-green-50 dark:bg-green-900/20',
    red: 'border-red-500 bg-red-50 dark:bg-red-900/20',
    yellow: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
  }

  return (
    <div className={`border-l-4 p-4 ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg">{code}</span>
        <span className="font-medium">{status}</span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
    </div>
  )
}
