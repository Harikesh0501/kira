import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    // Define filepath for waitlist.json in the project root directory
    const filePath = path.join(process.cwd(), 'waitlist.json');

    let currentData = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      try {
        currentData = JSON.parse(fileContent);
      } catch (e) {
        // If file content is empty or invalid JSON, reset to empty array
        currentData = [];
      }
    }

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

    // Write data back to file
    fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2), 'utf8');

    return NextResponse.json({ success: true, message: 'Subscription saved successfully' });
  } catch (error) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'waitlist.json');
    let currentData = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      try {
        currentData = JSON.parse(fileContent);
      } catch (e) {
        currentData = [];
      }
    }
    // Return count of subscribers
    return NextResponse.json({ success: true, count: currentData.length });
  } catch (error) {
    console.error('Waitlist API GET Error:', error);
    return NextResponse.json({ success: false, count: 0 });
  }
}
