import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

// 1. Create the reader using your specific config
export const reader = createReader(process.cwd(), keystaticConfig);

// 2. Export a helper type for your Collections
// This automatically infers the shape of your "projects", "team", etc.
export type Reader = typeof reader;
