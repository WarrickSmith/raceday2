import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import SideNav from '@/components/shared/sidenav'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Raceday 2',
  description:
    'A comprehensive racing information system that provides real-time data on race meetings, races, and runners.',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col h-screen md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-52 bg-secondary">
              <SideNav />
            </div>
            <div className="grow p-6 md:overflow-y-auto ">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
