import { Router, type Router as ExpressRouter } from "express";
import { envelope } from "../../data.js";

export const fraudRouter: ExpressRouter = Router();

fraudRouter.get("/", (_request, response) => {
  response.json(
    envelope([
      {
        missionSessionId: "session_demo_003",
        score: 72,
        severity: "high",
        reason: "reused device fingerprint and missing proof chain"
      }
    ])
  );
});
