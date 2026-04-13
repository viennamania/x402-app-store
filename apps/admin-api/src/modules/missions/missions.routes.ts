import { Router, type Router as ExpressRouter } from "express";
import { envelope, missions } from "../../data.js";

export const missionsRouter: ExpressRouter = Router();

missionsRouter.get("/", (_request, response) => {
  response.json(envelope(missions));
});
