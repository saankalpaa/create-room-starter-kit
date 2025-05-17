import type { Metadata } from 'next';
import RootStyleRegistry from './registry';
import './globals.css';

export const metadata: Metadata = {
  title: 'Game Room Starter Kit',
  description: 'Create and join game rooms with real-time updates',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RootStyleRegistry>{children}</RootStyleRegistry>
      </body>
    </html>
  );
} 