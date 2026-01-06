import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";


const socket: Socket = io("http://localhost:5000", {
    transports: ["websocket"], // Is se connection fast aur stable hota hai
    autoConnect: true,
});

export const useSocket = () => {
    // 1. Initial value boolean (socket.connected) 
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);


    useEffect(() => {
        // Jab connect ho jaye
        const onConnect = () => setIsConnected(true);
        const onDisconnect = () => setIsConnected(false);

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        // Cleanup: Memory leaks se bachne ke liye
        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, []);

    return { socket, isConnected };
};