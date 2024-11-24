import { Button } from 'antd';
import React from 'react';

function Navbar() {
  return (
    <nav className="bg-white flex items-center justify-between p-4 rounded-md shadow-md">
      <header>
        <h1 className="font-semibold text-lg">Biblioteca Personal</h1>
      </header>
      <div className="*:w-[100px] flex gap-2">
        <Button>Iniciar sesión</Button>
        <Button type="primary">Registrase</Button>
      </div>
    </nav>
  );
}

export default Navbar;
