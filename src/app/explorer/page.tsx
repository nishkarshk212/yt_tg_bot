"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navigation } from "@/components/navigation"
import { Play, Copy, CheckCircle, XCircle } from "lucide-react"

export default function Explorer() {
  const [apiKey, setApiKey] = useState("")
  const [endpoint, setEndpoint] = useState("/api/v1/search")
  const [method, setMethod] = useState("GET")
  const [params, setParams] = useState("q=telegram+music+bot&limit=5")
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const endpoints = [
    { path: "/api/v1/search", method: "GET", description: "Search YouTube videos" },
    { path: "/api/v1/videos/:videoId", method: "GET", description: "Get video details" },
    { path: "/api/v1/videos/:videoId/stream", method: "GET", description: "Get stream URL" },
    { path: "/api/v1/playlists/:playlistId", method: "GET", description: "Get playlist info" },
    { path: "/api/v1/videos/:videoId/thumbnail", method: "GET", description: "Get thumbnail" },
    { path: "/api/v1/videos/:videoId/related", method: "GET", description: "Get related videos" },
    { path: "/api/v1/videos/:videoId/comments", method: "GET", description: "Get comments" },
  ]

  const handleTest = async () => {
    setLoading(true)
    setResponse(null)

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      const url = new URL(`${baseUrl}${endpoint}`)
      
      // Parse params
      const paramPairs = params.split('&').filter(Boolean)
      paramPairs.forEach(pair => {
        const [key, value] = pair.split('=')
        if (key && value) {
          url.searchParams.append(key, value)
        }
      })

      const response = await fetch(url.toString(), {
        method,
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      setResponse({
        status: response.status,
        statusText: response.statusText,
        data,
      })
    } catch (error: any) {
      setResponse({
        status: 'Error',
        statusText: error.message,
        data: null,
      })
    } finally {
      setLoading(false)
    }
  }

  const copyResponse = () => {
    navigator.clipboard.writeText(JSON.stringify(response?.data, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <section className="py-8 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              API Explorer
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Test API endpoints directly from your browser
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Request Builder */}
            <Card>
              <CardHeader>
                <CardTitle>Request Builder</CardTitle>
                <CardDescription>Configure your API request</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder="Enter your API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endpoint">Endpoint</Label>
                  <select
                    id="endpoint"
                    value={endpoint}
                    onChange={(e) => setEndpoint(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800"
                  >
                    {endpoints.map((ep) => (
                      <option key={ep.path} value={ep.path}>
                        {ep.method} {ep.path} - {ep.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="method">Method</Label>
                  <select
                    id="method"
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="params">Query Parameters</Label>
                  <Input
                    id="params"
                    placeholder="key1=value1&key2=value2"
                    value={params}
                    onChange={(e) => setParams(e.target.value)}
                  />
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Format: key=value&key2=value2
                  </p>
                </div>

                <Button onClick={handleTest} disabled={loading || !apiKey} className="w-full">
                  {loading ? (
                    "Sending Request..."
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Send Request
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Response Viewer */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Response</CardTitle>
                    <CardDescription>API response data</CardDescription>
                  </div>
                  {response && (
                    <Button variant="ghost" size="sm" onClick={copyResponse}>
                      {copied ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {response ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-sm font-bold ${
                        response.status >= 200 && response.status < 300
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                      }`}>
                        {response.status}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {response.statusText}
                      </span>
                    </div>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm max-h-96">
                      <code>{JSON.stringify(response.data, null, 2)}</code>
                    </pre>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-600 dark:text-gray-400">
                    <Play className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Send a request to see the response</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Examples */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Quick Examples</CardTitle>
              <CardDescription>Common API request examples</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ExampleCard
                  title="Search for videos"
                  endpoint="/api/v1/search"
                  params="q=python+tutorial&limit=10"
                />
                <ExampleCard
                  title="Get video details"
                  endpoint="/api/v1/videos/dQw4w9WgXcQ"
                  params=""
                />
                <ExampleCard
                  title="Get stream URL"
                  endpoint="/api/v1/videos/dQw4w9WgXcQ/stream"
                  params="quality=highest"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

function ExampleCard({ title, endpoint, params }: any) {
  const loadExample = () => {
    // This would populate the form with the example data
    console.log("Loading example:", { endpoint, params })
  }

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-800">
      <div>
        <p className="font-medium">{title}</p>
        <code className="text-sm text-gray-600 dark:text-gray-400">
          GET {endpoint}{params ? `?${params}` : ""}
        </code>
      </div>
      <Button variant="outline" size="sm" onClick={loadExample}>
        Load Example
      </Button>
    </div>
  )
}
