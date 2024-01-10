import './globals.css';

import { Roboto } from 'next/font/google';
import cn from 'classnames';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={cn('min-h-svh bg-background font-sans antialiased', roboto.className)}>
        {children}
      </body>
    </html>
  );
}
