import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.POSTGRES_CONNECTION_STRING?.replace(
    "<POSTGRES_USERNAME>",
    `${process.env.POSTGRES_USERNAME}`
  ).replace("<POSTGRES_PASSWORD>", `${process.env.POSTGRES_PASSWORD}`),
}).connect();

pool.on("connect", () => {
  console.log("connected to the db");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

module.exports = pool;
