
import { NextResponse } from "next/server";
import OpenAI from 'openai';
import * as pdfjsLib from 'pdfjs-dist';

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

    // Convert File to ArrayBuffer
    const arrayBuffer = await pdfFile.arrayBuffer();
    
    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDoc = await loadingTask.promise;
    
    // Extract text from all pages
    let fullText = '';
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    console.log("Making OpenAI API request with extracted text...");
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that extracts structured information from LinkedIn profiles. Return only valid JSON."
        },
        {
          role: "user",
          content: `Extract the following information from this LinkedIn profile text and return as JSON with these fields: firstName, lastName, title, email, phone, summary. Here's the text:\n\n${fullText}`
        }
      ],
      temperature: 0.3,
      max_tokens: 1000,
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
