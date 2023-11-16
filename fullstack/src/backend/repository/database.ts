import { Kysely, PostgresDialect } from "kysely";
import pg from "pg";

import type { Database } from "./types";

const { Pool } = pg;

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOSTNAME,
    user: process.env.PG_USER,
    port: Number(process.env.PG_PORT),
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
