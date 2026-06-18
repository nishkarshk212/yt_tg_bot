"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Users, Key, BarChart3, Settings, Shield, LogOut } from "lucide-react"

export default function AdminPanel() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      window.location.href = '/login'
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== 'ADMIN' && parsedUser.role !== 'SUPER_ADMIN') {
      window.location.href = '/dashboard'
      return
    }

    setUser(parsedUser)
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/v1/admin/analytics`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      
      if (response.ok) {
        const data = await response.json()
        setStats(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch stats')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="flex items-center justify-center py-20">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <section className="py-8 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Admin Panel
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage users, API keys, and platform settings
              </p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Admin Navigation */}
          <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeTab === "overview"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeTab === "users"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab("keys")}
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeTab === "keys"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              API Keys
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeTab === "settings"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Settings
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats?.overview?.totalUsers || 0}</div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {stats?.overview?.activeUsers || 0} active
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">API Keys</CardTitle>
                    <Key className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats?.overview?.totalApiKeys || 0}</div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {stats?.overview?.activeApiKeys || 0} active
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                    <BarChart3 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats?.overview?.totalRequests || 0}</div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      This month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Endpoints</CardTitle>
                    <Shield className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats?.overview?.uniqueEndpoints || 0}</div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Active endpoints
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Top Endpoints */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Endpoints</CardTitle>
                  <CardDescription>Most frequently used API endpoints</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats?.topEndpoints?.map((endpoint: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <code className="text-sm">{endpoint.endpoint}</code>
                        <span className="text-sm font-medium">{endpoint.count} requests</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage platform users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>User management interface</p>
                  <p className="text-sm">Connect to backend API for full functionality</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* API Keys Tab */}
          {activeTab === "keys" && (
            <Card>
              <CardHeader>
                <CardTitle>API Key Management</CardTitle>
                <CardDescription>View and manage all API keys</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                  <Key className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>API key management interface</p>
                  <p className="text-sm">Connect to backend API for full functionality</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure platform-wide settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Maintenance Mode</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Enable maintenance mode to temporarily disable the API for all users
                    </p>
                    <Button variant="outline">Toggle Maintenance Mode</Button>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Registration</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Control whether new users can register for accounts
                    </p>
                    <Button variant="outline">Toggle Registration</Button>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Announcement</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Set a platform-wide announcement that will be displayed to all users
                    </p>
                    <Button variant="outline">Set Announcement</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}
