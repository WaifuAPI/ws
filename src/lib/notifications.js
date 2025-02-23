import { clients } from "../core/ws.js";
import WebSocket from "ws";

/**
 * Sends a notification to a specific user via WebSocket.
 * @param {string} userId - The ID of the user to send the notification to.
 * @param {Object} notification - The notification object to be sent.
 */
export const sendNotificationToUser = (userId, notification) => {
  const client = clients.get(userId);
  if (client && client?.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(notification));
  }
};

/**
 * Sends a global notification to all connected WebSocket clients.
 * @param {Object} notification - The notification object to be sent.
 */
export const sendGlobalNotification = (notification) => {
  clients.forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(notification));
    }
  });
};
