import { Router, type Router as ExpressRouter } from "express";
import { apps, envelope } from "../../data.js";

export const appsRouter: ExpressRouter = Router();

appsRouter.get("/", (_request, response) => {
  response.json(envelope(apps));
});
