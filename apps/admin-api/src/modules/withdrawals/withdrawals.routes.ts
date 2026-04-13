import { Router, type Router as ExpressRouter } from "express";
import { buildWithdrawalHoldEntries } from "@repo/ledger";
import type { WithdrawalRequestDto } from "@repo/types";
import { z } from "zod";
import { envelope } from "../../data.js";

const withdrawalRequestSchema = z.object({
  userId: z.string().min(1),
  walletAddress: z.string().min(8),
  amount: z.number().positive(),
  currency: z.literal("USDT")
});

export const withdrawalsRouter: ExpressRouter = Router();

withdrawalsRouter.post("/", (request, response) => {
  const payload = withdrawalRequestSchema.parse(
    request.body
  ) as WithdrawalRequestDto;

  response.status(202).json(
    envelope({
      accepted: true,
      stages: ["verification", "submission", "confirmation"],
      holdEntries: buildWithdrawalHoldEntries(payload)
    })
  );
});
