import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import './reset.css'

const font = Noto_Sans_KR({ subsets: ['latin']})

export const metadata = {
  title: 'JWorld',
  description: 'Jinwook',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={font.className}>{children}</body>
    </html>
  )
}
