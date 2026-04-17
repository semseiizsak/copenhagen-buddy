import OpenAI from 'openai';
import { NextRequest } from 'next/server';
import { buildSystemPrompt } from '@/lib/itinerary';

const client = new OpenAI();

export async function POST(req: NextRequest) {
  const { messages, currentDayIndex } = await req.json();

  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'OPENAI_API_KEY not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const systemPrompt = buildSystemPrompt(currentDayIndex ?? 0);

  const stream = await client.chat.completions.create({
    model: 'gpt-4o',
    max_tokens: 1024,
    stream: true,
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages,
    ],
  });

  const encoder = new TextEncoder();

  return new Response(
    new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? '';
            if (text) {
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ text })}\n\n`
                )
              );
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        } catch {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: 'Stream error' })}\n\n`
            )
          );
        } finally {
          controller.close();
        }
      },
    }),
    {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    }
  );
}
