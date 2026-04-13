import { NextResponse } from "next/server";
import { z } from "zod";
import { defaultLocale, localeCookieName, locales } from "@/lib/i18n";

const localeSchema = z.object({
  locale: z.enum(locales).default(defaultLocale)
});

export async function POST(request: Request) {
  const payload = localeSchema.parse(await request.json());
  const response = NextResponse.json({ ok: true, locale: payload.locale });

  response.cookies.set({
    name: localeCookieName,
    value: payload.locale,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax"
  });

  return response;
}
