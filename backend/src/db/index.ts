const { config } = require('dotenv');
const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');

// Load environment variables
config({ path: '.env' });  // or specify another path if necessary

// Ensure DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Initialize Postgres client and Drizzle ORM
const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client);

module.exports = { db };
