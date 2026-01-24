import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Njagih Studios | Vancouver Photographer',
  description:
    'Hey, I\'m Israel. A Vancouver-based photographer capturing authentic moments in sports, community events, and everyday life. Let\'s create something real together.',
  keywords: [
    'Vancouver photographer',
    'sports photography',
    'event photography',
    'portrait photography',
    'community photographer',
    'lifestyle photography',
    'authentic photography',
  ],
  authors: [{ name: 'Njagih Studios' }],
  openGraph: {
    title: 'Njagih Studios | Vancouver Photographer',
    description: 'Capturing authentic moments in Vancouver. Sports, events, and the stories in between.',
    type: 'website',
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Njagih Studios | Vancouver Photographer',
    description: 'Capturing authentic moments in Vancouver.',
  },
};

export const viewport: Viewport = {
  themeColor: '#FAFBFC',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
