// Example layout.js
'use client';

import { ThemeProvider } from '@nextui-org/react'; // Ensure this import is correct

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Translate</title>
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
