
import { NextResponse } from "next/server";
import OpenAI from 'openai';
import { connectToDatabase } from '@/app/lib/mongodb';
import { Profile } from '@/app/models/Profile';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY.trim(),
});

const ORCID_API_BASE = 'https://pub.orcid.org/v3.0';

export async function POST(request: Request) {
  try {
    const { orcidId } = await request.json();

    // Fetch ORCID profile
    const response = await fetch(`${ORCID_API_BASE}/${orcidId}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch ORCID profile');
    }

    const orcidData = await response.json();

    // Process with OpenAI
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Extract structured profile information from ORCID data."
        },
        {
          role: "user",
          content: `Extract profile information from this ORCID data and return as JSON with these fields: firstName, lastName, title, email, affiliations, publications. Here's the data:\n\n${JSON.stringify(orcidData)}`
        }
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const profileData = JSON.parse(aiResponse.choices[0].message.content);

    // Save to database
    await connectToDatabase();
    
    const profile = await Profile.findOneAndUpdate(
      { email: profileData.email },
      { 
        $set: {
          name: `${profileData.firstName} ${profileData.lastName}`,
          orcidJson: profileData,
          updatedAt: new Date()
        },
        $setOnInsert: { createdAt: new Date() }
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, profile });
  } catch (error: any) {
    console.error("ORCID import error:", error);
    return NextResponse.json(
      { error: `Failed to import ORCID profile: ${error.message}` },
      { status: 500 }
    );
  }
}
