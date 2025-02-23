# 🌐 Waifu.it WebSocket Server

Real-time WebSocket server for **Waifu.it**, enabling seamless communication between the website and services. 🚀💬

## 📌 Features

- 🔄 Real-time updates for connected clients
- 🔐 Secure environment with `.env` support
- 🗄️ MongoDB integration for persistent data
- ⚡ Optimized WebSocket handling using `ws`

## 🛠️ Setup

### 1️⃣ Clone the Repository

```sh
git clone git@github.com:<your-username>/websocket.git
cd websocket
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory and add:

```
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

### 4️⃣ Start the Server

**Development Mode:**

```sh
npm run dev
```

**Production Mode:**

```sh
npm start
```

## 📜 Scripts

| Command        | Description                         |
| -------------- | ----------------------------------- |
| `npm run dev`  | Start server with **nodemon**       |
| `npm start`    | Start server in **production**      |
| `npm run lint` | Lint the codebase (if ESLint added) |

## 📡 WebSocket Usage

- Clients can connect via `ws://localhost:3000` (or your deployed URL).
- Listen for messages and send real-time updates.

## 🏗️ Built With

- **Node.js** – JavaScript runtime
- **ws** – Lightweight WebSocket library
- **MongoDB** – Database integration
- **dotenv** – Environment variable management

---

💖 **Waifu.it** - Bringing anime magic to real-time! 🌸
