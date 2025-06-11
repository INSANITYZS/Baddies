import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Pages | Authentication",
  description: "Baddies Authentication",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://app.injuries.lu/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}
