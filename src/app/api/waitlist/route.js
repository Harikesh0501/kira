import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const kvUrl = process.env.KV_REST_API_URL;
const kvToken = process.env.KV_REST_API_TOKEN;

async function getWaitlistData() {
  if (kvUrl && kvToken) {
    try {
      const res = await fetch(`${kvUrl}/get/waitlist:data`, {
        headers: { Authorization: `Bearer ${kvToken}` },
        cache: 'no-store'
      });
      const data = await res.json();
      return data.result ? JSON.parse(data.result) : [];
    } catch (e) {
      console.error('Vercel KV GET Error:', e);
      return [];
    }
  } else {
    const filePath = path.join(process.cwd(), 'waitlist.json');
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      try {
        return JSON.parse(fileContent);
      } catch (e) {
        return [];
      }
    }
    return [];
  }
}

async function saveWaitlistData(data) {
  if (kvUrl && kvToken) {
    try {
      await fetch(`${kvUrl}/set/waitlist:data`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${kvToken}` },
        body: JSON.stringify(data)
      });
      return true;
    } catch (e) {
      console.error('Vercel KV SET Error:', e);
      return false;
    }
  } else {
    const filePath = path.join(process.cwd(), 'waitlist.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  }
}

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    const currentData = await getWaitlistData();

    // Check if email is already subscribed
    const alreadyExists = currentData.some(entry => entry.email.toLowerCase() === email.toLowerCase());
    if (alreadyExists) {
      return NextResponse.json({ success: false, error: 'This email is already registered.' }, { status: 400 });
    }

    // Append new entry with ISO timestamp
    currentData.push({
      email: email.trim(),
      timestamp: new Date().toISOString()
    });

    // Save data
    await saveWaitlistData(currentData);

    // Send to Google Sheet if configured
    const googleSheetUrl = process.env.GOOGLE_SHEET_URL;
    if (googleSheetUrl) {
      try {
        await fetch(googleSheetUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim() })
        });
      } catch (sheetError) {
        console.error('Google Sheet Post Error:', sheetError);
      }
    }

    return NextResponse.json({ success: true, message: 'Subscription saved successfully' });
  } catch (error) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const currentData = await getWaitlistData();
    return NextResponse.json({ success: true, count: currentData.length });
  } catch (error) {
    console.error('Waitlist API GET Error:', error);
    return NextResponse.json({ success: false, count: 0 });
  }
}
