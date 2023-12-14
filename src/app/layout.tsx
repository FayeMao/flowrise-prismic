import type { Metadata } from 'next'
import { Nunito, Nunito_Sans } from 'next/font/google'
import './globals.css'
import clsx from 'clsx'
import { createClient } from '@/prismicio';


const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  // Client is how to fetch data from prismic
  const page = await client.getSingle("settings");

  return {
    title: page.data.site_title || "Flowrise", // Fallback is there to know if something went wrong
    description: page.data.meta_description || "Flowrise is the relaxing app for you.", // Good practice, in case there is no content
    openGraph: {
      images: [page.data.og_image.url || ""],
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={clsx(nunito.variable, nunitoSans.variable)}>
      <body>
        {/* Wrap children in-between header and footer */}

        <header>Header!</header>
        {children}
        <footer>Footer!</footer>
        
        </body>
    </html>
  )
}
