import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';

function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <div className="*:text-red-500 *:text-sm flex items-center gap-2">
      <ExclamationCircleOutlined />
      <span>{children}</span>
    </div>
  );
}

export default ErrorMessage;
