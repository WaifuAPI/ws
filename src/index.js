import http from "http";
import { WebSocketServer } from "ws";
import { WEBSOCKET } from "./config.js";
import { connectToMongoDB } from "./lib/database.js";
import { handleConnection } from "./core/ws.js";

/**
 * Creates an HTTP server that responds with "Upgrade Required" for non-WebSocket requests.
 * @param {http.IncomingMessage} _ - The incoming request (unused).
 * @param {http.ServerResponse} res - The response object.
 */
const server = http.createServer((_, res) => {
  res.writeHead(426, { "Content-Type": "text/plain" });
  res.end("Upgrade Required");
});

/**
 * WebSocket server instance attached to the HTTP server.
 * @type {WebSocketServer}
 */
const wss = new WebSocketServer({ server });

/**
 * Handles incoming WebSocket connections.
 * @event WebSocketServer#connection
 * @param {import("ws").WebSocket} socket - The connected WebSocket instance.
 * @param {http.IncomingMessage} request - The HTTP request that initiated the connection.
 */
wss.on("connection", handleConnection);

/**
 * Establishes a connection to the MongoDB database.
 * Logs an error if the connection fails.
 */
connectToMongoDB().catch(console.error);

/**
 * Starts the HTTP server and listens on the specified port and host.
 * @param {number} port - The port to listen on.
 * @param {string} host - The host address.
 * @listens http.Server#listening
 */
server.listen(WEBSOCKET.PORT, "0.0.0.0", () => {
  console.log("WebSocket server running on ws://0.0.0.0:5000");
});
