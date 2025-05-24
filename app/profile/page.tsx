"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Save, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ProfileData {
  firstName: string
  lastName: string
  email: string
  phone: string
  institution: string
  department: string
  title: string
  researchInterests: string
  summary: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    institution: "",
    department: "",
    title: "",
    researchInterests: "",
    summary: "",
  })

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const [isUploading, setIsUploading] = useState(false)
  
  const handleLinkedInUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.name.toLowerCase().endsWith('.pdf')) {
      alert("Please upload a PDF file");
      return;
    }
    
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('pdf', file);
      
      const response = await fetch('/api/upload-profile', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      // Update profile state with extracted data
      setProfile(prev => ({
        ...prev,
        firstName: data.profileData.firstName || '',
        lastName: data.profileData.lastName || '',
        email: data.profileData.email || '',
        phone: data.profileData.phone || '',
        title: data.profileData.title || '',
        summary: data.profileData.summary || '',
      }));
      
      alert("LinkedIn profile imported successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to import profile. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = () => {
    alert("Profile saved successfully!")
    console.log("Profile data:", profile)
  }

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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
            <p className="text-gray-600">Build your researcher profile to get better grant matches</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@university.edu"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Academic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="institution">Institution</Label>
                  <Input
                    id="institution"
                    value={profile.institution}
                    onChange={(e) => handleInputChange("institution", e.target.value)}
                    placeholder="University name"
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={profile.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                    placeholder="Department or school"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="title">Academic Title</Label>
                <Input
                  id="title"
                  value={profile.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g., Assistant Professor, Graduate Student, Postdoc"
                />
              </div>

              {/* Research Information */}
              <div>
                <Label htmlFor="researchInterests">Research Interests</Label>
                <Textarea
                  id="researchInterests"
                  value={profile.researchInterests}
                  onChange={(e) => handleInputChange("researchInterests", e.target.value)}
                  placeholder="Describe your research areas and interests"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                  id="summary"
                  value={profile.summary}
                  onChange={(e) => handleInputChange("summary", e.target.value)}
                  placeholder="Brief overview of your background and career goals"
                  rows={4}
                />
              </div>

              {/* Upload and Save Buttons */}
              <div className="flex justify-between pt-4">
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleLinkedInUpload}
                    className="hidden"
                    id="linkedin-pdf"
                  />
                  <label htmlFor="linkedin-pdf">
                    <Button
                      variant="outline"
                      className="cursor-pointer"
                      disabled={isUploading}
                    >
                      {isUploading ? "Importing..." : "Import LinkedIn PDF"}
                    </Button>
                  </label>
                </div>
                <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
