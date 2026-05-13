import { NextResponse } from 'next/server';

// Basic rate limiting map (IP -> timestamp)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const lastRequest = rateLimitMap.get(ip);

    if (lastRequest && now - lastRequest < RATE_LIMIT_WINDOW) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute.' },
        { status: 429 }
      );
    }

    const { name, email, subject, message } = await req.json();

    // 1. Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 2. Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // 3. Sanitization (basic)
    const sanitizedName = name.replace(/[<>]/g, '');
    const sanitizedMessage = message.replace(/[<>]/g, '');

    // Update rate limit
    rateLimitMap.set(ip, now);

    // TODO: Integrate with an email provider (Resend, SendGrid, etc.)
    // For now, we simulate a successful send.
    console.log(`Contact form submission: ${sanitizedName} (${email}) - ${sanitizedMessage}`);

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
