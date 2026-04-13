import { Router, type Router as ExpressRouter } from "express";
import { campaigns, envelope } from "../../data.js";

export const campaignsRouter: ExpressRouter = Router();

campaignsRouter.get("/", (_request, response) => {
  response.json(envelope(campaigns));
});
