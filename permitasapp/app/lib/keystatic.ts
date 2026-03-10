import { createReader } from "@keystatic/core/reader";
import { createGitHubReader } from "@keystatic/core/reader/github";
import keystaticConfig from "../../keystatic.config";

const isProduction = process.env.NODE_ENV === "production";

// FIX: Robustly handle the Env Var.
// It strips "https://github.com/" if present, removes spaces, and ensures we get "owner/repo".
const cleanRepo = (process.env.NEXT_PUBLIC_GITHUB_REPO || "")
  .replace("https://github.com/", "")
  .replace("http://github.com/", "")
  .trim();

// Fallback to avoid TS errors during build if env is missing
const repo = (cleanRepo || "username/repo") as `${string}/${string}`;

// Retrieve the Vercel deployment branch, if any
const branch =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.VERCEL_GIT_COMMIT_REF;

export const reader = isProduction
  ? createGitHubReader(keystaticConfig, {
      repo: repo,
      ref: branch || undefined,
      token: process.env.GITHUB_TOKEN,
    })
  : createReader(process.cwd(), keystaticConfig);
