import cors from "cors";
import express, { type Express } from "express";
import { authRouter } from "./modules/auth/auth.routes.js";
import { appsRouter } from "./modules/apps/apps.routes.js";
import { campaignsRouter } from "./modules/campaigns/campaigns.routes.js";
import { fraudRouter } from "./modules/fraud/fraud.routes.js";
import { missionsRouter } from "./modules/missions/missions.routes.js";
import { rewardsRouter } from "./modules/rewards/rewards.routes.js";
import { walletRouter } from "./modules/wallet/wallet.routes.js";
import { withdrawalsRouter } from "./modules/withdrawals/withdrawals.routes.js";

export function createApp(): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/health", (_request, response) => {
    response.json({
      status: "ok",
      service: "admin-api"
    });
  });

  app.use("/auth/session", authRouter);
  app.use("/apps", appsRouter);
  app.use("/missions", missionsRouter);
  app.use("/campaigns", campaignsRouter);
  app.use("/rewards", rewardsRouter);
  app.use("/wallet", walletRouter);
  app.use("/withdrawals", withdrawalsRouter);
  app.use("/fraud/review", fraudRouter);

  return app;
}
