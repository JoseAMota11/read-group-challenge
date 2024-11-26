'use client';

import { useMessage } from '@/context/message.context';
import { removeToken } from '@/utils/cookies-handlers';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import ThemeSwitcher from './theme-switcher';

function Navbar() {
  const router = useRouter();
  const messageApi = useMessage();

  const handleLogout = () => {
    removeToken();
    router.push('/login');

    messageApi.info('Cierre de sesión satisfactorio.');
  };

  return (
    <nav className="bg-white flex items-center justify-between p-4 rounded-md shadow-md dark:bg-neutral-800">
      <header>
        <h1 className="font-semibold text-lg">Biblioteca Personal</h1>
      </header>
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <Button
          danger
          type="primary"
          className="w-[100px]"
          onClick={handleLogout}
        >
          Cerrar sesión
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
