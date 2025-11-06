import pkg from "pg";
const { Pool } = pkg;

const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

// Log the connection string with password masked for debugging
console.log(
    "PostgreSQL Connection:",
    connectionString.replace(/:([^@]+)@/, ":****@"),
);

export const pgPool = new Pool({ connectionString });

// Add error handler for connection issues
pgPool.on("error", (err) => {
    console.error("Unexpected error on idle PostgreSQL client", err);
});
