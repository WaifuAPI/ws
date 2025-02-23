/**
 * A map to store connected WebSocket clients by user ID.
 * @constant
 * @type {Map<string, WebSocket>}
 */
export const clients = new Map();

/**
 * Handles a new WebSocket connection.
 * @param {WebSocket} ws - The WebSocket connection instance.
 * @param {IncomingMessage} req - The HTTP request that initiated the WebSocket connection.
 */
export const handleConnection = (ws, req) => {
  const userId = new URL(
    req.url,
    `http://${req.headers.host}`
  ).searchParams.get("uid");

  if (userId) {
    console.log(`User ${userId} connected`);
    clients.set(userId, ws);
  }

  ws.on("message", (message) => console.log("Received:", message));

  ws.on("close", () => {
    if (userId) clients.delete(userId);
    console.log(`User ${userId} disconnected`);
  });
};
