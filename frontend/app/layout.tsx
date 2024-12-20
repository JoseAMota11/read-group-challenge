import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { MessageProvider } from '@/context/message.context';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Biblioteca Personal',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-100`}
      >
        <AntdRegistry>
          <MessageProvider>{children}</MessageProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
