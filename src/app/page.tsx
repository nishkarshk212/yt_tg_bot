import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Search, Play, Shield, Zap, Code, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-6 text-5xl font-bold text-gray-900 dark:text-white sm:text-6xl">
            Professional YouTube API for
            <span className="text-blue-600"> Telegram Music Bots</span>
          </h1>
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Secure, scalable, and developer-friendly API platform. Search videos, get metadata, stream URLs, thumbnails, and more with ease.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-950">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-900 dark:text-white">
            Powerful Features
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Search className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Video Search</CardTitle>
                <CardDescription>
                  Search YouTube videos with advanced filters and get comprehensive results instantly.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Play className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Stream URLs</CardTitle>
                <CardDescription>
                  Get direct stream URLs in various qualities for seamless audio/video playback.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Secure API Keys</CardTitle>
                <CardDescription>
                  Industry-standard authentication with JWT and secure API key management.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>High Performance</CardTitle>
                <CardDescription>
                  Optimized for speed with caching, rate limiting, and efficient data fetching.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Code className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Developer Friendly</CardTitle>
                <CardDescription>
                  Comprehensive documentation with SDK examples in multiple languages.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Telegram Ready</CardTitle>
                <CardDescription>
                  Built specifically for Telegram music bots with optimized endpoints.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* API Endpoints Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-900 dark:text-white">
            Available Endpoints
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>GET /api/v1/search</CardTitle>
                <CardDescription>Search YouTube videos</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>GET /api/v1/videos/:id</CardTitle>
                <CardDescription>Get video details and metadata</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>GET /api/v1/videos/:id/stream</CardTitle>
                <CardDescription>Get stream URL for video</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>GET /api/v1/playlists/:id</CardTitle>
                <CardDescription>Get playlist information</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>GET /api/v1/videos/:id/thumbnail</CardTitle>
                <CardDescription>Get video thumbnail URL</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>GET /api/v1/videos/:id/related</CardTitle>
                <CardDescription>Get related videos</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-xl text-blue-100">
            Join thousands of developers using our API to power their Telegram music bots.
          </p>
          <Link href="/register">
            <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-gray-400">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">YouTube API</h3>
              <p className="text-sm">
                Professional API platform for Telegram music bots and developers.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
                <li><Link href="/status" className="hover:text-white">Status</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/docs" className="hover:text-white">API Reference</Link></li>
                <li><Link href="/docs/sdk" className="hover:text-white">SDKs</Link></li>
                <li><Link href="/changelog" className="hover:text-white">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/docs" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
            © 2024 YouTube API Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
