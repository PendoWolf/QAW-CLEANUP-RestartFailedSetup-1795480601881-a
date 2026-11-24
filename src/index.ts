import * as pendo from "pendo-server-sdk";
import { createApp } from "./app.js";

pendo.init({
  apiKey: "e3486f58-baf1-4f8f-97d6-f5bd2b63e3d4",
  agentId: "iMg16rP9t90EqQEuYjAlyr7_edY",
  endpoint: "https://app.pendo-dev.pendo-dev.com",
  autoPatch: true,
});

const port = Number(process.env.PORT) || 3001;
const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:5173";

const server = createApp(corsOrigin).listen(port, () => {
  console.log(`Tripwise API on port ${port}, allowing ${corsOrigin}`);
});

// Send Pendo's buffered events before the process exits.
for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, async () => {
    server.close();
    await pendo.shutdown();
    process.exit(0);
  });
}
