import { Router, type Router as ExpressRouter } from "express";
import { createWalletLinkCommand } from "@repo/blockchain";
import type { WalletLinkRequestDto } from "@repo/types";
import { z } from "zod";
import { envelope } from "../../data.js";

const walletLinkSchema = z.object({
  walletAddress: z.string().min(8),
  provider: z.literal("thirdweb")
});

export const authRouter: ExpressRouter = Router();

authRouter.get("/", (_request, response) => {
  response.json(
    envelope({
      userId: "user_demo",
      authProvider: "thirdweb",
      linkedWallets: ["0x3Ae9...A1D9"],
      role: "member"
    })
  );
});

authRouter.post("/wallet-link", (request, response) => {
  const payload = walletLinkSchema.parse(request.body) as WalletLinkRequestDto;

  response.status(202).json(
    envelope({
      accepted: true,
      command: createWalletLinkCommand("user_demo", payload)
    })
  );
});
