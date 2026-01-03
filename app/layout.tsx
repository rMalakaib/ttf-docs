import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "CSV Ingress Documentation - Token Transparency Portal",
  description: "Interactive tools to test and validate CSV data for the Token Transparency Portal",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
