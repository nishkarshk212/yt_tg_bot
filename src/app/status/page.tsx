import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { CheckCircle, XCircle, Clock } from "lucide-react"

export default function Status() {
  const services = [
    { name: "API Server", status: "operational", uptime: "99.9%" },
    { name: "Database", status: "operational", uptime: "99.95%" },
    { name: "YouTube API Integration", status: "operational", uptime: "99.8%" },
    { name: "Authentication Service", status: "operational", uptime: "99.9%" },
    { name: "Rate Limiting Service", status: "operational", uptime: "99.9%" },
  ]

  const incidents = [
    {
      date: "2024-01-15",
      title: "Scheduled Maintenance",
      status: "resolved",
      description: "Database maintenance completed successfully. No downtime experienced."
    },
    {
      date: "2024-01-10",
      title: "API Latency Issues",
      status: "resolved",
      description: "Experienced increased latency for approximately 30 minutes. Issue resolved."
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-4 py-2 rounded-full mb-4">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">All Systems Operational</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              System Status
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Real-time status of YouTube API Platform services
            </p>
          </div>

          {/* Service Status */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Service Status</CardTitle>
              <CardDescription>Current status of all platform services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      {service.status === "operational" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : service.status === "degraded" ? (
                        <Clock className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span className="font-medium">{service.name}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${
                        service.status === "operational" ? "text-green-600 dark:text-green-400" :
                        service.status === "degraded" ? "text-yellow-600 dark:text-yellow-400" :
                        "text-red-600 dark:text-red-400"
                      }`}>
                        {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                      </span>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{service.uptime} uptime</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Incidents */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Recent Incidents</CardTitle>
              <CardDescription>Past incidents and their resolution status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incidents.map((incident, index) => (
                  <div key={index} className="p-4 border rounded-lg dark:border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{incident.date}</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        incident.status === "resolved" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" :
                        incident.status === "investigating" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300" :
                        "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                      }`}>
                        {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                      </span>
                    </div>
                    <h3 className="font-medium mb-1">{incident.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{incident.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Uptime Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Uptime Metrics (Last 90 Days)</CardTitle>
              <CardDescription>Platform availability over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg dark:border-gray-800">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">99.9%</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Overall Uptime</p>
                </div>
                <div className="text-center p-4 border rounded-lg dark:border-gray-800">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">0</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Outages</p>
                </div>
                <div className="text-center p-4 border rounded-lg dark:border-gray-800">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">&lt;1h</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Response Time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscribe to Updates */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to status updates via email or RSS
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline">Subscribe via Email</Button>
              <Button variant="outline">RSS Feed</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
