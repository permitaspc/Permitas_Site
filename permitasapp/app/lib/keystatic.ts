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

export const reader = isProduction
  ? createGitHubReader(keystaticConfig, {
      repo: repo,
      token: process.env.GITHUB_TOKEN,
    })
  : createReader(process.cwd(), keystaticConfig);
