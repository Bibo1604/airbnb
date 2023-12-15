import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/navbar/Header'
import Categories from '@/components/Categories'

export const metadata: Metadata = {
  title: 'Airbnb | Vacation Rentals, cabins, beach houses, & more',
  description: 'Vacation Rentals, cabins, beach houses, & more',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* header */}
        <Header />

        {/* Categories */}
        <Categories/>
        
        {children}
      </body>
    </html>
  )
}
