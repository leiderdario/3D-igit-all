import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '3Digit-All Factory | Superintelligent Digital Factory Transformations',
  description: 'Premium Colombian enterprise software company specialized in 3D solutions, digital twins, AI-accelerated software and digital transformation.',
  keywords: '3D solutions, digital twins, AI software, digital transformation, Colombia, enterprise software',
  authors: [{ name: '3Digit-All Factory' }],
  openGraph: {
    title: '3Digit-All Factory | Digital Factory Transformations',
    description: 'Premium Colombian enterprise software company specialized in 3D solutions, digital twins, AI-accelerated software and digital transformation.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
