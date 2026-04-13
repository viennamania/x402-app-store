import { loadAdminApiEnv } from "@repo/config";
import { connectToMongo } from "@repo/db";
import app from "./server.js";

const env = loadAdminApiEnv();

void connectToMongo(env.MONGODB_URI, {
  dbName: env.MONGODB_DB_NAME
})
  .then(() => {
    console.log("[admin-api] Mongo connection ready");
  })
  .catch((error) => {
    console.warn("[admin-api] Mongo connection skipped", error);
  });

if (!process.env.VERCEL) {
  app.listen(env.ADMIN_API_PORT, () => {
    console.log(`[admin-api] listening on :${env.ADMIN_API_PORT}`);
  });
}

export default app;
