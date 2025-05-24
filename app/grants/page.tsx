import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, Filter } from "lucide-react"

export default function GrantsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-purple-600">Fundizzle</h1>
          </Link>
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Grants</h1>
            <p className="text-gray-600">Discover funding opportunities that match your research</p>
          </div>

          <div className="flex gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search grants by keyword, agency, or topic..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">Grant Search Coming Soon</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We're building an intelligent grant matching system that will help you discover funding opportunities
              tailored to your research profile and interests.
            </p>
            <Link href="/profile">
              <Button className="bg-purple-600 hover:bg-purple-700">Complete Your Profile First</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
