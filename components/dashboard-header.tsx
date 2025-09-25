"use client"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MoreHorizontal, RefreshCw ,LogOut, Settings, User, ChevronsUpDown } from "lucide-react"
import { SidebarToggle } from "./sidebar-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

 console.log("[v0] DashboardHeader: Mostrando conteúdo completo")

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

export function DashboardHeader() {
   const { user, logout, loading, isHydrated } = useAuth()
   console.log("[v0] DashboardHeader: Renderizando - loading:", loading, "isHydrated:", isHydrated, "user:", user?.name)
  return (
    <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <SidebarToggle />
        <h1 className="text-xl font-semibold text-foreground">Dashboard de Aquecimento</h1>
        <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
          Sistema Online
        </Badge>
      </div>

      <div className="flex items-center space-x-3">
        <Select defaultValue="12h">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1h">Última 1h</SelectItem>
            <SelectItem value="6h">Últimas 6h</SelectItem>
            <SelectItem value="12h">Últimas 12h</SelectItem>
            <SelectItem value="24h">Últimas 24h</SelectItem>
            <SelectItem value="7d">Últimos 7 dias</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm">
          <Calendar className="w-4 h-4 mr-2" />
          Período
        </Button>

        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4" />
        </Button>

        <Button variant="outline" size="sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>

         <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger >
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      

      </div>
    </header>
  )
}

// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { LogOut, Settings, User } from "lucide-react"
// import { useState } from "react"

// export function DashboardHeader() {
//   const { user, logout, loading, isHydrated } = useAuth()
//   const [isOpen, setIsOpen] = useState(false)

//   console.log("[v0] DashboardHeader: Renderizando - loading:", loading, "isHydrated:", isHydrated, "user:", user?.name)

//   if (!isHydrated || loading) {
//     console.log("[v0] DashboardHeader: Mostrando skeleton")
//     return (
//       <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="flex h-14 items-center px-6">
//           <div className="flex items-center space-x-4">
//             <h2 className="text-lg font-semibold">Dashboard</h2>
//           </div>
//           <div className="ml-auto flex items-center space-x-4">
//             <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
//           </div>
//         </div>
//       </header>
//     )
//   }

//   console.log("[v0] DashboardHeader: Mostrando conteúdo completo")

//   const getInitials = (name: string) => {
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2)
//   }

//   return (
//     <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="flex h-14 items-center px-6">
//         <div className="flex items-center space-x-4">
//           <h2 className="text-lg font-semibold">Dashboard</h2>
//         </div>

//         <div className="ml-auto flex items-center space-x-4">
//           {/* Teste simples primeiro */}
//           <DropdownMenu >
//             <DropdownMenuTrigger >
//               <Button
//                 variant="ghost"
//                 className="relative h-8 w-8 rounded-full"
//                 onClick={() => {
//                   console.log("[v0] DropdownMenu: Clique detectado no trigger")
//                   setIsOpen(!isOpen)
//                 }}
//               >
//                 <Avatar className="h-8 w-8">
//                   <AvatarFallback>{user?.name ? user.name: "fefe"}</AvatarFallback>
//                 </Avatar>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56 z-[9999]" align="end" side="bottom" sideOffset={5}>
//               <DropdownMenuLabel className="font-normal">
//                 <div className="flex flex-col space-y-1">
//                   <p className="text-sm font-medium leading-none">{user?.name || "Usuário"}</p>
//                   <p className="text-xs leading-none text-muted-foreground">{user?.email || "email@exemplo.com"}</p>
//                 </div>
//               </DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={() => console.log("[v0] Perfil clicado")}>
//                 <User className="mr-2 h-4 w-4" />
//                 <span>Perfil</span>
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => console.log("[v0] Configurações clicado")}>
//                 <Settings className="mr-2 h-4 w-4" />
//                 <span>Configurações</span>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem
//                 onClick={() => {
//                   console.log("[v0] DropdownMenu: Logout clicado")
//                   logout()
//                 }}
//               >
//                 <LogOut className="mr-2 h-4 w-4" />
//                 <span>Sair</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </header>
//   )
// }
