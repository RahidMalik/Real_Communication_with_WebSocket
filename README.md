# 💬 SpectreeChat - Real-Time Communication App

A full-stack, real-time chat application built with the **PERN Stack** (PostgreSQL, Express, React, Node.js) and **TypeScript**. This app features persistent messaging and live bi-directional communication using **WebSockets**.



## 🚀 Features
- **Real-Time Messaging:** Instant message delivery using Socket.io.
- **Persistent History:** All messages are stored in a PostgreSQL database.
- **Dynamic UI:** Responsive design with Tailwind CSS.
- **Auto-Scroll:** Chat window automatically scrolls to the latest message.
- **Connection Status:** Live indicator showing if the user is connected to the server.
- **Type Safety:** Shared interfaces between frontend and backend for robust code.

## 🛠️ Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS, Lucide React (Icons).
- **Backend:** Node.js, Express, TypeScript.
- **Real-Time:** Socket.io.
- **Database:** PostgreSQL with `pg` pool management.
- **Runtime:** Bun / Node.js.

## 🏗️ Architecture
The app uses a hybrid approach to data:
1. **REST API (HTTP GET):** Used to fetch the message history when the app first loads.
2. **WebSockets (WS):** Used for live communication. When a message is sent, it is simultaneously saved to the database and broadcasted to all connected clients.



## 🚥 Getting Started

### Prerequisites
- Node.js or Bun installed.
- PostgreSQL database running.

### Installation
1. **Clone the repo:**
   ```bash
   https://github.com/RahidMalik/Real_Communication_with_WebSocket
