import { Router, type Router as ExpressRouter } from "express";
import { adminOverview, envelope, rewardLedger } from "../../data.js";

export const rewardsRouter: ExpressRouter = Router();

rewardsRouter.get("/", (_request, response) => {
  response.json(
    envelope({
      overview: adminOverview,
      ledger: rewardLedger
    })
  );
});
