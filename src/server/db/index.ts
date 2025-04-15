import { neonConfig, Pool } from '@neondatabase/serverless';
import { drizzle } from "drizzle-orm/neon-serverless";

import { env } from "@/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: Pool | undefined;
};

// Enable connection pooling
neonConfig.fetchConnectionCache = true;

export const client =
  globalForDb.client ?? new Pool({ connectionString: env.DATABASE_URL });

if (env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle({client: client, schema: schema });


// import { drizzle } from 'drizzle-orm/postgres-js'
// import postgres from 'postgres'
// import * as schema from "./schema";

// const connectionString = process.env.DATABASE_URL

// // Disable prefetch as it is not supported for "Transaction" pool mode
// const client = postgres(connectionString, { prepare: false })
// const db = drizzle({client,schema});

// #######################################

// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";

// import { env } from "~/env";
// import * as schema from "./schema";

// /**
//  * Cache the database connection in development. This avoids creating a new connection on every HMR
//  * update.
//  */
// const globalForDb = globalThis as unknown as {
//   conn: postgres.Sql | undefined;
// };

// const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
// if (env.NODE_ENV !== "production") globalForDb.conn = conn;

// export const db = drizzle(conn, { schema });
