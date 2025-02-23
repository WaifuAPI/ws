import dotenv from "dotenv";
dotenv.config();

/**
 * Parses the COLLECTIONS environment variable into an array.
 * Defaults to an empty array if not defined.
 * @type {string[]}
 */
const collections = process.env.COLLECTIONS?.split(",") || [];

/**
 * Database configuration object.
 * @constant
 * @type {Object}
 * @property {string} URI - The MongoDB connection URI.
 * @property {string} NAME - The MongoDB database name.
 * @property {Object} COLLECTIONS - Object containing collection names.
 * @property {string} COLLECTIONS.GLOBAL - The global notifications collection name.
 * @property {string} COLLECTIONS.USER - The user notifications collection name.
 */
export const DATABASE = {
  URI: process.env.MONGODB_URI,
  NAME: process.env.MONGODB_NAME,
  COLLECTIONS: {
    GLOBAL: collections[0] || "notifications",
    USER: collections[1] || "usernotifications",
  },
};

/**
 * WebSocket server configuration.
 * @constant
 * @type {Object}
 * @property {number} PORT - The port on which the WebSocket server runs.
 */
export const WEBSOCKET = {
  PORT: process.env.PORT || 5000,
  LOGGER: process.env.DISCORD_WEBHOOK,
};
