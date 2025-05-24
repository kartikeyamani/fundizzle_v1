import { CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { Zap, FileText, Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/logo"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Logo width={150} height={40} />
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/profile" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Profile
            </Link>
            <Link href="/grants" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Find Grants
            </Link>
            <Link href="/documents" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Documents
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="border-purple-600 text-purple-600 hover:bg-purple-50">
              Log In
            </Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Find grants that <span className="text-purple-600">actually fit</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Fundizzle helps researchers discover relevant funding opportunities and generate application documents
            automatically.
          </p>
          <Link href="/profile">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="text-center border-purple-100 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 mb-2">
                <User className="h-6 w-6" />
              </div>
              <CardTitle>Build Profile</CardTitle>
              <CardDescription>
                Create your researcher profile with your background, skills, and interests
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                Our AI analyzes your publications, research interests, and experience to create a profile that actually
                represents what you do. No more keyword stuffing.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/profile">
                <Button variant="ghost" size="sm" className="text-purple-600">
                  Learn More
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="text-center border-purple-100 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-green-600 mb-2">
                <Search className="h-6 w-6" />
              </div>
              <CardTitle>Find Grants</CardTitle>
              <CardDescription>
                Discover funding opportunities that match your research profile and expertise
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                Our matching algorithm learns from your feedback to continuously improve recommendations. No more wading
                through irrelevant opportunities.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/grants">
                <Button variant="ghost" size="sm" className="text-purple-600">
                  Learn More
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="text-center border-purple-100 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-blue-600 mb-2">
                <FileText className="h-6 w-6" />
              </div>
              <CardTitle>Generate Docs</CardTitle>
              <CardDescription>Automatically create application documents and track your submissions</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                Automatically create conflict of interest forms, current and pending support documents, and other
                application materials that would normally make you want to quit academia.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/documents">
                <Button variant="ghost" size="sm" className="text-purple-600">
                  Learn More
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-sm text-purple-600 mb-4">
            <Zap className="mr-1 h-3 w-3" />
            <span>Simple and Effective</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Stop wasting time on grant searches</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Traditional grant databases are overwhelming and hard to navigate. Fundizzle uses smart matching to show you
            only the opportunities that are relevant to your research.
          </p>
        </div>
      </main>

      <footer className="border-t bg-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Logo width={150} height={40} />
            </div>
            <div className="flex gap-6 text-sm text-gray-600">
              <Link href="/about" className="hover:text-purple-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-purple-600 transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="hover:text-purple-600 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-purple-600 transition-colors">
                Terms
              </Link>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
            © 2024 Fundizzle. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
