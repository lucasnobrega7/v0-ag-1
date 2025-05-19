import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"

export default function HomePage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your AI Agent Platform</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Create, customize, and deploy AI agents powered by large language models. Connect them to your knowledge base
          and integrate with your favorite tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Create Agents</CardTitle>
            <CardDescription>Build AI assistants tailored to your specific needs</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Create custom AI agents with specific instructions, knowledge, and capabilities. Choose from various
              models like GPT-4, Claude, and more.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/agents" className="w-full">
              <Button className="w-full">Get Started</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Knowledge Base</CardTitle>
            <CardDescription>Connect your agents to your data and documents</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Upload documents, connect databases, and create knowledge bases for your agents. Enable them to provide
              accurate, up-to-date information.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/datastores" className="w-full">
              <Button className="w-full">Explore</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Connect with your favorite tools and platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Integrate your agents with WhatsApp, Telegram, Zendesk, and more. Deploy them where your customers and
              team already are.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/integrations" className="w-full">
              <Button className="w-full">Connect</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="text-center">
        <Link href="/dashboard">
          <Button size="lg">Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}
