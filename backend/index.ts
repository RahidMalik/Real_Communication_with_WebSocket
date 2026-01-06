import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from "cors";
import dotenv from 'dotenv';
import { pool } from './config/db';
import Messagesrouter from './router/messages.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 1. HTTP Server Banaya
const httpServer = createServer(app);

// 2. Socket.io ko attach kiya
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173", // Frontend URL
        methods: ["GET", "POST"],
        credentials: true,
    }
});

// 3. Socket Connection Logic
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // Message aane par kya karna hai
    socket.on("send_message", async (data) => {
        console.log("Message Aaya:", data);
        try {
            const { username, content } = data;

            const queryText = "INSERT INTO messages (username, content) VALUES ($1, $2) RETURNING *";
            const values = [username, content];

            const result = await pool.query(queryText, values);

            io.emit("receive_message", result.rows[0]);
        } catch (error) {
            console.error("Error saving message:", error);
        }
    });


    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

// 4. API Route (Messages load karne ke liye)
app.use('/api/messages', Messagesrouter)

// Database Connection Test
pool.connect((err, client, release) => {
    if (err) {
        return console.error('❌ Database connect nahi ho saka:', err.stack);
    }
    console.log('✅ Database Connection Successful!');
    release(); // Connection ko wapas pool mein bhej dein
});

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});