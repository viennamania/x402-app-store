import { NextResponse } from "next/server";
import { z } from "zod";
import { proxyAdminApi } from "@/lib/admin-api";

const walletLinkSchema = z.object({
  walletAddress: z.string().min(8),
  provider: z.literal("thirdweb")
});

export async function POST(request: Request) {
  try {
    const payload = walletLinkSchema.parse(await request.json());
    const response = await proxyAdminApi("/auth/session/wallet-link", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    const body = await response.json();
    return NextResponse.json(body, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      {
        error: "wallet-link-unavailable",
        detail: error instanceof Error ? error.message : "unknown"
      },
      { status: 502 }
    );
  }
}
