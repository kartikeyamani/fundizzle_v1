import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key is required for LinkedIn profile import" }, { status: 500 })
    }

    const { pdfText } = await request.json()

    if (!pdfText || typeof pdfText !== "string") {
      return NextResponse.json({ error: "Invalid PDF text provided" }, { status: 400 })
    }

    console.log("Sending request to OpenAI...")

    // Create a detailed prompt for OpenAI with improved instructions
    const prompt = `
  Extract structured information from this LinkedIn profile PDF export text. 
  Return ONLY a JSON object with the following structure:
  
  {
    "name": "Full Name",
    "headline": "Professional Headline",
    "location": "Location",
    "email": "Email address if present",
    "phone": "Phone number if present",
    "education": [
      {
        "degree": "Degree Name",
        "institution": "Institution Name",
        "fieldOfStudy": "Field of Study",
        "startDate": "YYYY-MM",
        "endDate": "YYYY-MM or empty string if current",
        "description": "Description of studies, thesis, etc."
      }
    ],
    "experience": [
      {
        "title": "Job Title",
        "company": "Company Name",
        "location": "Job Location",
        "startDate": "YYYY-MM",
        "endDate": "YYYY-MM or empty string if current",
        "description": "Job description"
      }
    ],
    "skills": ["Skill 1", "Skill 2", "Skill 3", ...],
    "certifications": [
      {
        "name": "Certification Name",
        "issuer": "Issuing Organization",
        "date": "Issue Date (YYYY-MM)"
      }
    ],
    "languages": [
      {
        "language": "Language Name",
        "proficiency": "Proficiency Level"
      }
    ]
  }
  
  IMPORTANT INSTRUCTIONS: 
  1. For all dates, use YYYY-MM format (e.g., "2020-01" for January 2020)
  2. Make sure to extract the email address if present
  3. EXTRACT PHONE NUMBER if present in any format (e.g., +1-123-456-7890, (123) 456-7890, etc.)
  4. For current positions or education, use an empty string for endDate
  5. Extract as much detail as possible for each section
  
  SKILLS EXTRACTION - VERY IMPORTANT:
  1. Thoroughly scan the ENTIRE document for skills, not just the Skills section
  2. Look for skills mentioned in job descriptions, summaries, and project sections
  3. Include both technical skills (programming languages, tools, platforms) and soft skills
  4. Extract ALL skills mentioned, even if there are many of them
  5. Look for skill endorsements and include those skills
  6. Include skills that might be formatted in tables or bullet points
  7. Pay special attention to sections titled "Skills", "Expertise", "Competencies", or similar
  
  Here's the LinkedIn profile text:
  ${pdfText.substring(0, 15000)} // Limit text length to avoid token limits
  
  Return ONLY the JSON object, nothing else.
  `

    try {
      // Use AI SDK to generate text
      const { text } = await generateText({
        model: openai("gpt-3.5-turbo"),
        prompt: prompt,
        temperature: 0.2,
        maxTokens: 4000,
      })

      console.log("Received response from OpenAI")
      console.log("Raw OpenAI response:", text)

      // Try to parse the JSON
      try {
        // Clean up the response text to ensure it's valid JSON
        let jsonText = text.trim()

        // Remove markdown code block syntax if present
        jsonText = jsonText.replace(/```(json|javascript|js)?/g, "").replace(/```$/g, "")

        // Find the first { and the last } to extract just the JSON object
        const startIndex = jsonText.indexOf("{")
        const endIndex = jsonText.lastIndexOf("}")

        if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
          jsonText = jsonText.substring(startIndex, endIndex + 1)
        }

        console.log("Cleaned JSON text:", jsonText)

        const profileData = JSON.parse(jsonText)
        console.log("Successfully parsed profile data")

        // Return both the raw response and the parsed data
        return NextResponse.json({
          profileData,
          rawResponse: text,
          cleanedJson: jsonText,
        })
      } catch (jsonError) {
        console.error("JSON parsing error:", jsonError)
        console.log("Response text:", text.substring(0, 200) + "...")
        return NextResponse.json(
          {
            error: "Failed to parse profile data from OpenAI response",
            rawResponse: text,
          },
          { status: 500 },
        )
      }
    } catch (aiError) {
      console.error("OpenAI API error:", aiError)
      return NextResponse.json({ error: "Failed to process with OpenAI API" }, { status: 500 })
    }
  } catch (error: any) {
    console.error("Profile extraction error:", error)

    // Check for specific error types
    if (error.name === "AbortError") {
      return NextResponse.json({ error: "Request was aborted. Please try again." }, { status: 408 })
    }

    return NextResponse.json(
      { error: `Failed to extract profile: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}
