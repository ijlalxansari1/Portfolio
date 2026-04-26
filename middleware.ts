import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // ── CYBER SECURITY HEADERS ──
  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY');
  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');
  // Referrer policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Content Security Policy (Basic)
  // Note: Adjust according to your external assets (Unsplash, Google Fonts, etc.)
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "img-src 'self' data: https://images.unsplash.com https://picsum.photos https://dataden.vercel.app; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "connect-src 'self' https://generativelanguage.googleapis.com https://api.github.com;"
  );

  return response;
}

export const config = {
  matcher: '/admin/:path*',
};
