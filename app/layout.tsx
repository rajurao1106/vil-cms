import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'
import { AuthProvider } from '@/components/providers/AuthProvider' // ✅ Import this

export const metadata: Metadata = {
  title: {
    template: '%s | Vaswani Industries Limited',
    default: 'Vaswani Industries | Integrated Steel Manufacturer in India',
  },
  description: 'Vaswani Industries Limited is a leading integrated steel manufacturing company in Central India producing sponge iron, steel billets, rolling mill products, forgings, and casting.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {/* ✅ AuthProvider will now guard all routes globally */}
        <AuthProvider>
          {children}
        </AuthProvider>

        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#fff',
              color: '#1a2332',
              border: '1px solid #eef0f4',
              borderRadius: '10px',
              fontSize: '13px',
              padding: '10px 14px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            },
            success: { iconTheme: { primary: '#14B8A6', secondary: '#fff' } },
            error:   { iconTheme: { primary: '#dc2626', secondary: '#fff' } },
          }}
        />
      </body>
    </html>
  )
}