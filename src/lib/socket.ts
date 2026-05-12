import { io } from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_BASE_URL_WITHOUT_API);