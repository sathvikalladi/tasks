import pg from "pg";
const { Pool } = pg;

const db = new Pool({
    user: "sathvikalladi",
    host: "localhost",
    database: "school",
    password: "",
    port: 5432,
});

export default db;
