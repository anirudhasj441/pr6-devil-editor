import { io } from "socket.io-client";

const workspaceSocket = io(import.meta.env.VITE_SERVER_URL, {
    autoConnect: false
});

export default workspaceSocket;
