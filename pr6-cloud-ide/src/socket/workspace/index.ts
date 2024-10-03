import { io } from "socket.io-client";

console.log(import.meta.env.VITE_SERVER_URL);

const workspaceSocket = io(import.meta.env.VITE_SERVER_URL);

export default workspaceSocket;
