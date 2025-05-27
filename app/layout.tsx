import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MovieVault - 電影數據庫',
  description: '探索、搜尋並收藏你喜愛的電影',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='zh-TW'>
      <body className={inter.className}>
        <header className='bg-primary text-white px-4 py-2 flex justify-between items-center sticky top-0 z-10'>
          <Link href='/' className='text-2xl font-bold'>
            MovieVault
          </Link>
          <Link href='/watchlist'>
            <Image
              src='/images/bookmark.svg'
              alt='bookmark'
              width={30}
              height={30}
              className='invert'
            />
          </Link>
        </header>
        {children}
      </body>
    </html>
  )
}
