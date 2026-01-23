import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Israel Njagih | Vancouver Photographer',
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
  authors: [{ name: 'Israel Njagih' }],
  openGraph: {
    title: 'Israel Njagih | Vancouver Photographer',
    description: 'Capturing authentic moments in Vancouver. Sports, events, and the stories in between.',
    type: 'website',
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Israel Njagih | Vancouver Photographer',
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
