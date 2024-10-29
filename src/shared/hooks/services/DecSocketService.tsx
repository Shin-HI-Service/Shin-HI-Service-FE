import { useDataStore, useDecSocketStore, useMainSocketStore } from "@/shared";

const URL = import.meta.env.VITE_DEC_SERVER_WS;

export const DecSocketService = () => {
  const clientId = useDataStore((state) => state.clientId);
  const encClientId = useDataStore((state) => state.encClientId);

  const setSocket = useDecSocketStore((state) => state.setSocket);
  const socket = useDecSocketStore((state) => state.socket);
  const addMessage = useDecSocketStore((state) => state.addMessage);

  const messages = useMainSocketStore((state) => state.messages);

  //const token = useDataStore((state) => state.token);

  const onOpen = (id: string) => {
    //create socket
    const newSocket = new WebSocket(`${URL}/${id}`);

    //setting socket
    newSocket.onmessage = (event: MessageEvent<string>) => {
      addMessage(JSON.parse(event.data));
    };

    newSocket.onopen = () => {
      //send id message
      if (newSocket.readyState === WebSocket.OPEN && clientId) {
        newSocket.send(
          JSON.stringify({
            mode: "ID",
            id: clientId,
          })
        );
      } else {
        console.log("There is something wrong with dec server socket");
        return;
      }
    };

    setSocket(newSocket);
  };

  const onClose = () => {
    socket?.close();
  };

  const sendMessage = (data: Socket.DecServerMessageDto) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data));
    } else console.log("There is something wrong with dec server socket");
  };

  const sendToken = () => {
    if (messages[0]) sendMessage(messages[0] as Socket.TokenDto);
  };

  return { onOpen, onClose, sendMessage, sendToken };
};
