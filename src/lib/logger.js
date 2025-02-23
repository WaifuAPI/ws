import chalk from "chalk";
import { Webhook, MessageBuilder } from "discord-webhook-node";
import { WEBSOCKET } from "../config.js";

// Replace with your actual webhook URL
const hook = new Webhook(WEBSOCKET.LOGGER);

const sendToWebhook = (level, message) => {
  const embed = new MessageBuilder()
    .setTitle(`[${level.toUpperCase()}]`)
    .setDescription(message)
    .setColor(
      level === "success"
        ? "#00ff00"
        : level === "info"
        ? "#0099ff"
        : level === "warn"
        ? "#ffff00"
        : level === "error"
        ? "#ff0000"
        : "#808080"
    )
    .setTimestamp();

  hook.send(embed).catch((err) => console.error("Webhook Error:", err));
};

export const logger = {
  success: (message, ...args) => {
    console.log(
      chalk.green(`[SUCCESS] [${new Date().toISOString()}]`),
      message,
      ...args
    );
    sendToWebhook("success", message);
  },
  info: (message, ...args) => {
    console.log(
      chalk.blue(`[INFO] [${new Date().toISOString()}]`),
      message,
      ...args
    );
    sendToWebhook("info", message);
  },
  warn: (message, ...args) => {
    console.warn(
      chalk.yellow(`[WARN] [${new Date().toISOString()}]`),
      message,
      ...args
    );
    sendToWebhook("warn", message);
  },
  error: (message, ...args) => {
    console.error(
      chalk.red(`[ERROR] [${new Date().toISOString()}]`),
      message,
      ...args
    );
    sendToWebhook("error", message);
  },
  debug: (message, ...args) => {
    console.debug(
      chalk.gray(`[DEBUG] [${new Date().toISOString()}]`),
      message,
      ...args
    );
    sendToWebhook("debug", message);
  },
};
