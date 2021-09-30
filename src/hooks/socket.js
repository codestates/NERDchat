import { io } from "socket.io-client";
const ENDPOINT = process.env.REACT_APP_ENDPOINT;
const socket = io(`${ENDPOINT}/users`, {
  autoConnect: false,
});

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
