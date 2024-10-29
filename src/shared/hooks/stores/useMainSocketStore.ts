import { create } from "zustand";

export const useMainSocketStore = create<
  Socket.SocketStore<Socket.MainServerMessageDto>
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
