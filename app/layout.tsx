import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Liquid Staking Demo - Educational Platform',
  description: 'Educational demo for liquid staking mechanics - Not financial advice',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="gradient-bg min-h-screen">{children}</body>
    </html>
  )
}
