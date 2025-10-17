import Navbar from './components/layout/navbar';
import './globals.css';
import FlowbiteSetup from './components/FlowbiteSetup';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ViewTransitions } from 'next-view-transitions';
import { JournalProvider } from './contexts/JournalContext';

export const viewport = {
  title: 'mnemo',
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
    <ViewTransitions>
      <html lang="en">
        <body>
          <Navbar />
          <div className='m-10'>
            <TooltipProvider>
              <JournalProvider>
                {children}
              </JournalProvider>
            </TooltipProvider>
          </div>
          <FlowbiteSetup />
        </body>
      </html>
    </ViewTransitions>
  );
}
