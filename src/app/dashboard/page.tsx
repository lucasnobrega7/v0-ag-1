import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import Link from "next/link"
import { BarChart, Users, MessageSquare, Zap } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Agents</CardDescription>
            <CardTitle className="text-3xl">12</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">+2 from last month</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Conversations</CardDescription>
            <CardTitle className="text-3xl">1,234</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">+15% from last month</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Users</CardDescription>
            <CardTitle className="text-3xl">342</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">+5% from last month</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Knowledge Base Size</CardDescription>
            <CardTitle className="text-3xl">2.4 GB</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">+0.3 GB from last month</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Link href="/agents/create">
              <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center">
                <Zap className="h-6 w-6 mb-2" />
                <span>Create Agent</span>
              </Button>
            </Link>
            <Link href="/datastores/create">
              <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center">
                <MessageSquare className="h-6 w-6 mb-2" />
                <span>New Knowledge Base</span>
              </Button>
            </Link>
            <Link href="/integrations">
              <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center">
                <Users className="h-6 w-6 mb-2" />
                <span>Add Integration</span>
              </Button>
            </Link>
            <Link href="/analytics">
              <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center">
                <BarChart className="h-6 w-6 mb-2" />
                <span>View Analytics</span>
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <div className="flex-1">
                  <p className="text-sm">New conversation with Customer Support Agent</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Updated Sales Agent configuration</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Added new document to Product Knowledge Base</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Connected WhatsApp integration</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Created new Marketing Agent</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
