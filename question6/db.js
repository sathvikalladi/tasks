import pg from "pg";

console.log("Database Name from Env:", process.env.DB_DATABASE);

const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

try {
    await db.connect();
    console.log("Successfully connected to database.");
} catch (err) {
    console.error("Failed to connect to database, ", err.message);
    process.exit(1);
}
// what is process

export default db;
// what does default do
