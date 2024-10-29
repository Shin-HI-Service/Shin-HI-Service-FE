import { create } from "zustand";

export const useDecSocketStore = create<
  Socket.SocketStore<Socket.DecServerMessageDto>
>((set) => ({
  socket: undefined,
  messages: [],

  setSocket: (socket) => {
    set(() => ({
      socket: socket,
      messages: [],
    }));
  },

  addMessage: (message) => {
    set((state) => ({ messages: [...state.messages, message] }));
  },
}));
