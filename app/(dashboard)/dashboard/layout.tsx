

import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AuthProvider } from "@/lib/auth-context"

import { SidebarProvider } from "@/components/sidebar-provider"
import { Sidebar } from "@/components/sidebar"
import { LayoutContent } from "@/components/layout-content"
import "../../../app/globals.css"
import { Toaster } from "react-hot-toast"
import { DashboardHeader } from "@/components/dashboard-header"

// export const metadata: Metadata = {
//   title: "WhatsApp Heating System",
//   description: "Sistema profissional de aquecimento WhatsApp",
//   generator: "v0.app",
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
  <AuthProvider>
   
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar /> {/* Agora tem acesso ao useAuth */}
        <div className="flex flex-col flex-1 overflow-hidden">
    <DashboardHeader />
    <LayoutContent>
      {children}
    </LayoutContent>
  </div>
      </div>
      <Toaster />
    </SidebarProvider>
    <Analytics />
  </AuthProvider>
</Suspense>

      </body>
    </html>
  )
}