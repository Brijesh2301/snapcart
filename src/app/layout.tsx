import React from "react";
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className="w-full min-h-screen bg-gradient-to-b from-green-100 to-white" 
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}