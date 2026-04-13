import { Router, type Router as ExpressRouter } from "express";
import { envelope, walletSummary } from "../../data.js";

export const walletRouter: ExpressRouter = Router();

walletRouter.get("/balance/:userId", (request, response) => {
  response.json(
    envelope({
      userId: request.params.userId,
      summary: walletSummary
    })
  );
});
