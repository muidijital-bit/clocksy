import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;

  // kuaför panel: sadece business_owner girebilir
  if (path.startsWith("/kuafor/panel")) {
    if (!user) {
      return NextResponse.redirect(new URL("/kuafor/giris", request.url));
    }
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    if (profile?.role !== "business_owner") {
      return NextResponse.redirect(new URL("/kuafor/giris", request.url));
    }
  }

  // Müşteri sayfaları: giriş zorunlu
  if (path.startsWith("/randevularim")) {
    if (!user) {
      return NextResponse.redirect(new URL("/giris?geri=" + encodeURIComponent(path), request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/kuafor/panel/:path*", "/randevularim/:path*"],
};
