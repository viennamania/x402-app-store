import { loadAdminApiEnv } from "@repo/config";
import { connectToMongo } from "@repo/db";
import { createApp } from "./app.js";

const env = loadAdminApiEnv();
const app = createApp();

void connectToMongo(env.MONGODB_URI)
  .then(() => {
    console.log("[admin-api] Mongo connection ready");
  })
  .catch((error) => {
    console.warn("[admin-api] Mongo connection skipped", error);
  });

app.listen(env.ADMIN_API_PORT, () => {
  console.log(`[admin-api] listening on :${env.ADMIN_API_PORT}`);
});
