'use client';

import { useMessage } from '@/context/message.context';
import { removeToken } from '@/utils/cookies-handlers';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';

function Navbar() {
  const router = useRouter();
  const messageApi = useMessage();

  const handleLogout = () => {
    removeToken();
    router.push('/login');

    messageApi.info('Cierre de sesión satisfactorio.');
  };

  return (
    <nav className="bg-white flex items-center justify-between p-4 rounded-md shadow-md">
      <header>
        <h1 className="font-semibold text-lg">Biblioteca Personal</h1>
      </header>
      <div className="*:w-[100px] flex gap-2">
        <Button danger type="primary" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
