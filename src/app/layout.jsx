import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';

import '../styles/globals.css';

export const metadata = {
  title: 'Booksy App',
  description: 'An app to check out the latest books!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/B-Logo.png" type="image/x-icon" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Header />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
