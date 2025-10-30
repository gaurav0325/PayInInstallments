import './globals.css'
import Link from 'next/link'
import { ToastContainer } from '@/components/Toasts'

export const metadata = {
  title: 'Test Airlines Instalments Playground',
  description: 'Demonstration of airline instalment payment models'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#dc2626" />
      </head>
      <body>
        <header className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-wide">Test Airlines</span>
              <span className="text-white/80 text-sm hidden sm:inline">Pay in Instalments · Simulation</span>
            </div>
            <nav className="hidden md:flex gap-4 text-sm">
              <Link href="/" className="hover:underline px-2 py-1">Home</Link>
            </nav>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 min-h-screen">{children}</main>
        <ToastContainer />
      </body>
    </html>
  )
}