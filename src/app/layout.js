import { Inter } from 'next/font/google'
import './globals.css'
import './reset.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'JWorld',
  description: 'Jinwook',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
