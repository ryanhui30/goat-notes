import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Fetch wrapper with timeout support
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = 3000
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export async function middleware(request: NextRequest) {
  try {
    return await updateSession(request);
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({ name, value, ...options });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          request.cookies.set({ name, value: '', ...options });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  // Check auth routes
  const isAuthRoute = ['/login', '/sign-up'].includes(request.nextUrl.pathname);
  const { data: { user } } = await supabase.auth.getUser();

  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Handle noteId logic
  const { searchParams, pathname } = request.nextUrl;
  if (!searchParams.get('noteId') && pathname === '/' && user) {
    try {
      // Try to fetch newest note
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-newest-note?userId=${user.id}`;
      const res = await fetchWithTimeout(apiUrl);

      if (!res.ok) throw new Error('Failed to fetch note');

      const { newestNoteId } = await res.json();

      if (newestNoteId) {
        const url = request.nextUrl.clone();
        url.searchParams.set('noteId', newestNoteId);
        return NextResponse.redirect(url);
      } else {
        // Create new note if none exists
        const createRes = await fetchWithTimeout(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/create-new-note`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.id })
          }
        );

        if (!createRes.ok) throw new Error('Failed to create note');

        const { noteId } = await createRes.json();
        const url = request.nextUrl.clone();
        url.searchParams.set('noteId', noteId);
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.error('Note handling error:', error);
      // Continue with response even if note handling fails
      return response;
    }
  }

  return response;
}
