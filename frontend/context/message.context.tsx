'use client';

import { message } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';
import { createContext, ReactNode, useContext } from 'react';

type MessageContextType = {
  messageApi: MessageInstance;
};

const messageContext = createContext<MessageContextType | null>(null);

export function MessageProvider({ children }: { children: ReactNode }) {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <messageContext.Provider value={{ messageApi }}>
      {contextHolder}
      {children}
    </messageContext.Provider>
  );
}

export function useMessage() {
  const context = useContext(messageContext);

  if (!context) {
    throw new Error(
      'useMessage solo puede ser usado dentro de MessageProvider'
    );
  }

  const { messageApi } = context;
  return messageApi;
}
