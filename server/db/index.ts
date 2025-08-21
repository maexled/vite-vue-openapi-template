import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export const initDbConnect = (env: { DB: D1Database }) =>
  drizzle(env.DB, { schema });
export type DrizzleD1Database = ReturnType<typeof initDbConnect>;
