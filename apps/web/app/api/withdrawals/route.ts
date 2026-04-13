import { NextResponse } from "next/server";
import { z } from "zod";
import { proxyAdminApi } from "@/lib/admin-api";

const withdrawalSchema = z.object({
  userId: z.string().min(1),
  walletAddress: z.string().min(8),
  amount: z.number().positive(),
  currency: z.literal("USDT")
});

export async function POST(request: Request) {
  try {
    const payload = withdrawalSchema.parse(await request.json());
    const response = await proxyAdminApi("/withdrawals", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    const body = await response.json();
    return NextResponse.json(body, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      {
        error: "withdrawal-request-failed",
        detail: error instanceof Error ? error.message : "unknown"
      },
      { status: 502 }
    );
  }
}
