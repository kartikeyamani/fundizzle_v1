import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Plus } from "lucide-react"

export default function DocumentsPage() {
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
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Documents</h1>
              <p className="text-gray-600">Manage your grant application documents</p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Document
            </Button>
          </div>

          <div className="text-center py-16">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4">No Documents Yet</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Once you start applying for grants, your application documents will appear here. We'll help you generate
              and organize all the paperwork you need.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/profile">
                <Button variant="outline">Complete Profile</Button>
              </Link>
              <Link href="/grants">
                <Button className="bg-purple-600 hover:bg-purple-700">Find Grants</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
