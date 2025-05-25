
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function OrcidImportPage() {
  const [orcidId, setOrcidId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleImport = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/import-orcid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orcidId }),
      })
      
      if (!response.ok) throw new Error('Import failed')
      
      router.push('/profile')
    } catch (error) {
      console.error('Import error:', error)
      alert('Failed to import ORCID profile')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Import ORCID Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                placeholder="Enter your ORCID ID"
                value={orcidId}
                onChange={(e) => setOrcidId(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleImport}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Importing..." : "Import Profile"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
