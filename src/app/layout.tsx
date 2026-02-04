import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';

const SITE_URL = 'https://njagihstudios.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Njagih Studios | Israel Njagih — Vancouver Photographer',
    template: '%s | Njagih Studios',
  },
  description:
    "Hey, I'm Israel. A Vancouver-based photographer capturing authentic moments in sports, community events, and everyday life. Let's create something real together.",
  keywords: [
    'Vancouver photographer',
    'sports photography Vancouver',
    'event photography Vancouver',
    'wedding photographer Vancouver',
    'corporate photography Vancouver',
    'portrait photography',
    'community photographer',
    'lifestyle photography',
    'authentic photography',
    'Njagih Studios',
    'Israel Njagih',
    'Vancouver BC photographer',
    'festival photography',
  ],
  authors: [{ name: 'Israel Njagih', url: SITE_URL }],
  creator: 'Israel Njagih',
  publisher: 'Njagih Studios',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Njagih Studios | Israel Njagih — Vancouver Photographer | Sports, Events & Weddings',
    description:
      "Israel Njagih is a Vancouver-based photographer specializing in sports, events, weddings, and corporate photography. Authentic moments, real connections — let's create something together.",
    type: 'website',
    locale: 'en_CA',
    url: SITE_URL,
    siteName: 'Njagih Studios',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Njagih Studios - Vancouver Photography',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Njagih Studios | Israel Njagih — Vancouver Photographer | Sports, Events & Weddings',
    description:
      "Israel Njagih is a Vancouver-based photographer specializing in sports, events, weddings, and corporate photography. Authentic moments, real connections — let's create something together.",
    images: ['/og-image.jpg'],
    creator: '@njagih_studios',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'geo.region': 'CA-BC',
    'geo.placename': 'Vancouver',
    'geo.position': '49.2827;-123.1207',
    ICBM: '49.2827, -123.1207',
  },
};

export const viewport: Viewport = {
  themeColor: '#FAFBFC',
  width: 'device-width',
  initialScale: 1,
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Israel Njagih',
  jobTitle: 'Photographer',
  description:
    'Vancouver-based photographer specializing in sports, events, weddings, and community photography. Creating authentic imagery rooted in connection and trust.',
  url: SITE_URL,
  image: `${SITE_URL}/israel.jpg`,
  sameAs: ['https://instagram.com/njagih_studios'],
  knowsAbout: [
    'Sports Photography',
    'Event Photography',
    'Wedding Photography',
    'Corporate Photography',
    'Portrait Photography',
    'Lifestyle Photography',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Vancouver',
    addressRegion: 'BC',
    addressCountry: 'CA',
  },
  email: 'israel.njagih@gmail.com',
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Njagih Studios',
  url: SITE_URL,
  description:
    'Professional photography services in Vancouver, BC. Specializing in sports, events, weddings, and corporate photography.',
  publisher: {
    '@type': 'Person',
    name: 'Israel Njagih',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: 'Njagih Studios',
  description:
    'Professional photography studio in Vancouver specializing in sports, events, weddings, and corporate photography.',
  url: SITE_URL,
  image: `${SITE_URL}/israel.jpg`,
  email: 'israel.njagih@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Vancouver',
    addressRegion: 'BC',
    addressCountry: 'CA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 49.2827,
    longitude: -123.1207,
  },
  priceRange: '$$',
  sameAs: ['https://instagram.com/njagih_studios'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Services',
      item: `${SITE_URL}/services`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Portfolio',
      item: `${SITE_URL}/portfolio`,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Q9EQKP0VD3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Q9EQKP0VD3');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body className="antialiased">
        {children}

        {/* Hidden structured content for AI crawlers and screen readers */}
        <div className="sr-only">
          <h2>About Njagih Studios</h2>
          <p>
            Njagih Studios is a professional photography business operated by Israel Njagih,
            based in Vancouver, British Columbia, Canada. Israel is a photographer who specializes
            in sports photography, event photography, wedding photography, corporate photography,
            portrait photography, and lifestyle photography.
          </p>
          <h3>Services Offered</h3>
          <ul>
            <li>
              Wedding Photography: Full wedding day coverage, engagement sessions, documentary-style
              candid moments, guided couple and family portraits, ceremony and reception coverage,
              detail and atmosphere shots, online gallery for viewing and downloads.
            </li>
            <li>
              Festival and Sports Photography: Full event-day coverage, action and candid photography,
              crowd and atmosphere shots, key moments and highlights, performer and athlete coverage,
              team and group photos, social-media-ready images.
            </li>
            <li>
              Corporate Photography: Corporate event coverage, conferences and networking events,
              professional headshots for individuals and teams, executive and leadership portraits,
              brand and workplace lifestyle imagery, speaker, panel and awards coverage, office and
              workspace photography, images for websites, marketing and social media.
            </li>
          </ul>
          <h3>Location</h3>
          <p>Vancouver, BC, Canada. Coordinates: 49.2827 N, 123.1207 W.</p>
          <h3>Contact</h3>
          <p>Email: israel.njagih@gmail.com</p>
          <p>Instagram: @njagih_studios (https://instagram.com/njagih_studios)</p>
          <p>Website: https://njagihstudios.com</p>
          <h3>About Israel Njagih</h3>
          <p>
            Israel Njagih is a Vancouver-based photographer who believes strong images start with
            presence and trust. He takes a calm, thoughtful approach to every shoot, creating an
            environment where people feel comfortable and moments unfold naturally. By focusing on
            real connection and honest interaction, he delivers imagery that feels authentic,
            intentional, and lasting. With over 3 years of experience, 70+ events covered, and
            50+ happy clients, Israel is available for bookings and projects.
          </p>
        </div>
      </body>
    </html>
  );
}
