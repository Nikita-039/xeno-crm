import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { goal } = await req.json();
    console.log('🔥 Gemini Goal:', goal);

    const apiKey = process.env.GEMINI_API_KEY;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Generate 3 short promotional messages (max 25 words each) for this goal: "${goal}". Return as a numbered list.`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log('🧠 Gemini Raw Response:', JSON.stringify(data, null, 2));

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    const variants = text
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => line.replace(/^\d+[\.\)]\s*/, '').trim());

    console.log('✅ Final Gemini Messages:', variants);

    return NextResponse.json({ messages: variants });
  } catch (err) {
    console.error('❌ Gemini error:', err.message || err);
    return NextResponse.json({ error: 'Failed to generate messages with Gemini' }, { status: 500 });
  }
}



