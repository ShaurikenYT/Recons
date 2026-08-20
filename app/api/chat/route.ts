import { generateText } from 'ai'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    if (!message || message.length > 1000) {
      return NextResponse.json({ error: 'Please send a message under 1,000 characters.' }, { status: 400 })
    }

    const { text } = await generateText({
      model: 'google/gemini-3.1-flash-lite',
      system: `You are Redwyre's concise, thoughtful website assistant. Redwyre is a data and AI consultancy helping ambitious businesses with sales insights, dashboards, AI workflow automation, revenue strategy, data audits, and growth systems. Answer questions about Redwyre and its services clearly. If someone wants to work together, suggest booking the free growth audit. Never invent client names, pricing, timelines, or guarantees. Keep answers under 120 words.`,
      prompt: message,
    })

    return NextResponse.json({ text })
  } catch {
    return NextResponse.json({ error: 'The assistant is temporarily unavailable. Please email hello@redwyre.in.' }, { status: 500 })
  }
}
