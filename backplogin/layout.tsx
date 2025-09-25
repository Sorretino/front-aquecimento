// "use client"
// import type React from "react"
// import type { Metadata } from "next"
// import { GeistSans } from "geist/font/sans"
// import { GeistMono } from "geist/font/mono"
// import { Analytics } from "@vercel/analytics/next"
// import { Suspense } from "react"
// import { AuthProvider } from "@/lib/auth-context"

// import { SidebarProvider } from "@/components/sidebar-provider"
// import { Sidebar } from "@/components/sidebar"
// import { LayoutContent } from "@/components/layout-content"
// import "../../globals.css"
// import { Toaster } from "react-hot-toast"

// // export const metadata: Metadata = {
// //   title: "WhatsApp Heating System",
// //   description: "Sistema profissional de aquecimento WhatsApp",
// //   generator: "v0.app",
// // }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="pt-BR" className="dark">
//       <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
//         <Suspense fallback={<div>Loading...</div>}>
//           <SidebarProvider>
//             <div className="flex h-screen bg-background">
//               <Sidebar />
//               <LayoutContent>
//                  <AuthProvider>{children}</AuthProvider>
//                 </LayoutContent>
//             </div>
//              <Toaster />
//           </SidebarProvider>
//           <Analytics />
//         </Suspense>
//       </body>
//     </html>
//   )
// }

"use client" // adicionando use client para permitir hooks

import type React from "react"
import { DashboardHeader } from "@/components/dashboard-header"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
       
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}