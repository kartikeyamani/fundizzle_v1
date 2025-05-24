
import { NextResponse } from "next/server";
import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OpenAI API key is not configured in environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY.trim(),
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const pdfFile = formData.get('pdf') as File;
    
    if (!pdfFile) {
      return NextResponse.json({ error: "No PDF file provided" }, { status: 400 });
    }

    console.log("Processing PDF file:", pdfFile.name, "Size:", pdfFile.size);

    const arrayBuffer = await pdfFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64PDF = buffer.toString('base64');

    console.log("Making OpenAI API request...");
    
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-0125",
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

    if (!response.choices[0]?.message?.content) {
      throw new Error("No content in OpenAI response");
    }

    console.log("OpenAI Response:", response.choices[0].message.content);

    const profileData = JSON.parse(response.choices[0].message.content);
    return NextResponse.json({ profileData });
  } catch (error: any) {
    console.error("Profile extraction error:", error.message);
    console.error("Full error:", error);
    return NextResponse.json(
      { error: `Failed to extract profile: ${error.message}` },
      { status: 500 }
    );
  }
}
