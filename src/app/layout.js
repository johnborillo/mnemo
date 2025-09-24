import Navbar from './components/layout/navbar';
import './globals.css';

export const viewport = {
  title: 'My Next.js PWA',
  description: 'A sample PWA with App Router in JavaScript',
  themeColor: '#0070f3',
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/icons/icon-192x192.png', sizes: '192x192' },
    { rel: 'apple-touch-icon', url: '/icons/icon-192x192.png' }
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className='container m-10'>
          {children}
        </div>
      </body>
    </html>
  );
}
