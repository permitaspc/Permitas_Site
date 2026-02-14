// app/api/keystatic/[[...params]]/route.tsx
import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../keystatic.config";

// FIX: This forces the API to skip Vercel's Data Cache and fetch fresh GitHub data.
export const dynamic = "force-dynamic";

console.log("[Keystatic API] Initializing route handler...");

export const { POST, GET } = makeRouteHandler({
  config,
});
