
import { NextResponse } from "next/server";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const pdfFile = formData.get('pdf') as File;
    
    if (!pdfFile) {
      return NextResponse.json({ error: "No PDF file provided" }, { status: 400 });
    }

    const arrayBuffer = await pdfFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64PDF = buffer.toString('base64');

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract the following information from this LinkedIn PDF profile: full name, headline/title, email, phone, summary. Return as JSON with these fields: firstName, lastName, title, email, phone, summary"
            },
            {
              type: "image_url",
              image_url: {
                url: `data:application/pdf;base64,${base64PDF}`,
              },
            },
          ],
        },
      ],
      max_tokens: 4000,
    });

    const profileData = JSON.parse(response.choices[0].message.content || "{}");
    return NextResponse.json({ profileData });
  } catch (error: any) {
    console.error("Profile extraction error:", error);
    return NextResponse.json(
      { error: `Failed to extract profile: ${error.message}` },
      { status: 500 }
    );
  }
}
