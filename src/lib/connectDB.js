/**
 * @file connectDB.js
 * @description MongoDB connection utility with client caching for Next.js environments.
 */

import { MongoClient, ServerApiVersion } from "mongodb";

// --- Configuration ---
const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

if (!uri) throw new Error("Please define MONGO_URI in .env");
if (!dbName) throw new Error("Please define DB_NAME in .env");

/**
 * Collection constants for typed reference across the app.
 */
export const collections = {
  sendSalami: "sendSalami",
};

/**
 * Global caching to prevent connection leaks during Next.js hot reloads.
 * This pattern is recommended by the official MongoDB Next.js documentation.
 */
let client;
let clientPromise;

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!globalThis._mongoClient) {
    client = new MongoClient(uri, options);
    globalThis._mongoClient = client.connect();
  }
  clientPromise = globalThis._mongoClient;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

/**
 * Main database connection helper.
 * @returns {Promise<import('mongodb').Db>}
 */
export async function connectDB() {
  try {
    const clientInstance = await clientPromise;
    return clientInstance.db(dbName);
  } catch (error) {
    console.error("Critical: MongoDB connection failed:", error);
    throw error;
  }
}

export default clientPromise;