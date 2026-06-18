import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { ArrowRight, Sparkles, Bug, Zap } from "lucide-react"

export default function Changelog() {
  const changes = [
    {
      version: "2.0.0",
      date: "2024-01-20",
      type: "major",
      changes: [
        { type: "feature", text: "Added playlist support with full metadata" },
        { type: "feature", text: "New endpoint for video comments" },
        { type: "feature", text: "Improved search algorithm with better relevance" },
        { type: "improvement", text: "Reduced API response time by 40%" },
        { type: "improvement", text: "Enhanced error messages for better debugging" },
      ]
    },
    {
      version: "1.5.0",
      date: "2024-01-10",
      type: "minor",
      changes: [
        { type: "feature", text: "Added related videos endpoint" },
        { type: "feature", text: "New thumbnail quality options" },
        { type: "improvement", text: "Increased rate limits for Pro plan" },
        { type: "fix", text: "Fixed issue with special characters in search queries" },
      ]
    },
    {
      version: "1.4.0",
      date: "2024-01-05",
      type: "minor",
      changes: [
        { type: "feature", text: "Added webhook support for real-time updates" },
        { type: "feature", text: "New analytics dashboard for users" },
        { type: "improvement", text: "Better caching strategy for faster responses" },
        { type: "fix", text: "Fixed authentication token expiration issue" },
      ]
    },
    {
      version: "1.3.0",
      date: "2023-12-20",
      type: "minor",
      changes: [
        { type: "feature", text: "Added SDK for Python" },
        { type: "feature", text: "New API key management features" },
        { type: "improvement", text: "Improved documentation with more examples" },
        { type: "fix", text: "Fixed rate limiting edge cases" },
      ]
    },
    {
      version: "1.2.0",
      date: "2023-12-10",
      type: "minor",
      changes: [
        { type: "feature", text: "Added SDK for Node.js" },
        { type: "feature", text: "Stream URL quality selection" },
        { type: "improvement", text: "Enhanced security with API key rotation" },
        { type: "fix", text: "Fixed video duration parsing" },
      ]
    },
    {
      version: "1.1.0",
      date: "2023-12-01",
      type: "minor",
      changes: [
        { type: "feature", text: "Added SDK for JavaScript" },
        { type: "feature", text: "New search filters and sorting options" },
        { type: "improvement", text: "Better error handling and logging" },
        { type: "fix", text: "Fixed thumbnail URL generation" },
      ]
    },
    {
      version: "1.0.0",
      date: "2023-11-15",
      type: "major",
      changes: [
        { type: "feature", text: "Initial release of YouTube API Platform" },
        { type: "feature", text: "Video search endpoint" },
        { type: "feature", text: "Video details and metadata" },
        { type: "feature", text: "Stream URL generation" },
        { type: "feature", text: "Thumbnail extraction" },
        { type: "feature", text: "API key authentication" },
        { type: "feature", text: "Rate limiting" },
        { type: "feature", text: "User dashboard" },
        { type: "feature", text: "Documentation" },
      ]
    },
  ]

  const getChangeIcon = (type: string) => {
    switch (type) {
      case "feature":
        return <Sparkles className="h-4 w-4 text-blue-500" />
      case "improvement":
        return <Zap className="h-4 w-4 text-yellow-500" />
      case "fix":
        return <Bug className="h-4 w-4 text-red-500" />
      default:
        return <ArrowRight className="h-4 w-4" />
    }
  }

  const getVersionBadge = (type: string) => {
    switch (type) {
      case "major":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
      case "minor":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
      case "patch":
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Changelog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Track the latest updates and improvements to the YouTube API Platform
            </p>
          </div>

          <div className="space-y-8">
            {changes.map((release, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getVersionBadge(release.type)}`}>
                        {release.version}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{release.date}</span>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      release.type === "major" ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" :
                      release.type === "minor" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" :
                      "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    }`}>
                      {release.type.charAt(0).toUpperCase() + release.type.slice(1)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {release.changes.map((change, changeIndex) => (
                      <li key={changeIndex} className="flex items-start gap-3">
                        <span className="mt-0.5">{getChangeIcon(change.type)}</span>
                        <span className="text-gray-700 dark:text-gray-300">{change.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Subscribe Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Stay Updated</CardTitle>
              <CardDescription>Subscribe to receive notifications about new releases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800"
                />
                <Button>Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
