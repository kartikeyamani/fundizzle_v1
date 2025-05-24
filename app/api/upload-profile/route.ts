
import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const pdfFile = formData.get('pdf') as File
    
    if (!pdfFile) {
      return NextResponse.json({ error: "No PDF file provided" }, { status: 400 })
    }

    const arrayBuffer = await pdfFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64PDF = buffer.toString('base64')

    const prompt = `Extract structured profile information from this LinkedIn PDF export.
    Return a JSON object with: name, headline, summary, experience, education, skills, and certifications.
    Format dates as YYYY-MM.`

    const { text } = await generateText({
      model: openai("gpt-4-vision-preview"),
      prompt,
      temperature: 0.2,
      maxTokens: 4000,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: `data:application/pdf;base64,${base64PDF}`,
              },
            },
          ],
        },
      ],
    })

    return NextResponse.json({ profileData: JSON.parse(text) })
  } catch (error: any) {
    console.error("Profile extraction error:", error)
    return NextResponse.json(
      { error: `Failed to extract profile: ${error.message}` },
      { status: 500 }
    )
  }
}
