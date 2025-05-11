import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { goal } = await req.json();
    console.log('🔥 Cohere Goal:', goal);

    const apiKey = process.env.COHERE_API_KEY;

    const response = await fetch('https://api.cohere.ai/v1/generate', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'command', // default Cohere model
        prompt: `Generate 3 short promotional messages (under 25 words) for this goal: "${goal}". Return them as a numbered list.`,
        max_tokens: 100,
        temperature: 0.7,
        k: 0,
        stop_sequences: [],
        return_likelihoods: 'NONE'
      }),
    });

    const data = await response.json();
    console.log('🧠 Cohere Response:', JSON.stringify(data, null, 2));

    const generations = data.generations?.[0]?.text || '';
    const messages = generations
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^\d+[\.\)]\s*/, '').trim());

    console.log('✅ Final Messages:', messages);
    return NextResponse.json({ messages });
  } catch (err) {
    console.error('❌ Cohere error:', err.message || err);
    return NextResponse.json({ error: 'Failed to generate messages with Cohere' }, { status: 500 });
  }
}






