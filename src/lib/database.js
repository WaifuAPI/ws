import { MongoClient } from "mongodb";
import { DATABASE } from "../config.js";
import {
  sendNotificationToUser,
  sendGlobalNotification,
} from "./notifications.js";

/**
 * Connects to MongoDB and sets up change streams for notifications.
 * Listens for inserts in the global and user notifications collections
 * and sends notifications accordingly.
 */
export const connectToMongoDB = async () => {
  try {
    const client = new MongoClient(DATABASE.URI);
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(DATABASE.NAME);
    const globalNotifCollection = db.collection(DATABASE.COLLECTIONS.GLOBAL);
    const userNotifCollection = db.collection(DATABASE.COLLECTIONS.USER);

    globalNotifCollection
      .watch()
      .on("change", ({ operationType, fullDocument }) => {
        if (operationType === "insert") {
          sendGlobalNotification(fullDocument);
        }
      });

    userNotifCollection
      .watch()
      .on("change", ({ operationType, fullDocument }) => {
        if (operationType === "insert") {
          sendNotificationToUser(fullDocument.userId.toString(), fullDocument);
        }
      });
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};
