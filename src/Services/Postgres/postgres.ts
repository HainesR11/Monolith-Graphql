import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
  host: "localhost",
  database: "devnotion_dev",
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  port: 1209,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

export default pool;
