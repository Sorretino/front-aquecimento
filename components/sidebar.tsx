"use client"

import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  Activity,
  FileText,
  Zap,
  Users,
  TrendingUp,
  FileBarChart,
  Bot,
  Shield,
  Webhook,
  Database,
  X,
} from "lucide-react"
import Link from "next/link"
import { useSidebar } from "./sidebar-provider"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Instâncias", href: "/dashboard/instances", icon: Users },
  { name: "Aquecimento", href: "/dashboard/heating", icon: Zap },
  { name: "Mensagens", href: "/dashboard/messages", icon: MessageSquare },
  { name: "Logs", href: "/dashboard/logs", icon: FileText },
  { name: "Analytics", href: "/dashboard/analytics", icon: TrendingUp },
  { name: "Relatórios", href: "/dashboard/reports", icon: FileBarChart },
  { name: "Automação", href: "/dashboard/automation", icon: Bot },
  { name: "Webhooks", href: "/dashboard/webhooks", icon: Webhook },
  { name: "Backup", href: "/dashboard/backup", icon: Database },
  { name: "Segurança", href: "/dashboard/security", icon: Shield },
  { name: "Monitoramento", href: "/dashboard/monitoring", icon: Activity },
  { name: "Configurações", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const { isOpen, close } = useSidebar()
  const pathname = usePathname()

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={close} />}

      <div
        className={cn(
          "fixed md:relative inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-16",
        )}
      >
        <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary-foreground" />
            </div>
            <span
              className={cn(
                "text-lg font-semibold text-sidebar-foreground transition-opacity duration-200",
                !isOpen && "md:opacity-0 md:w-0 md:overflow-hidden",
              )}
            >
              WhatsApp Heat
            </span>
          </div>

          <Button variant="ghost" size="sm" className="ml-auto md:hidden" onClick={close}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    if (window.innerWidth < 768) close()
                  }}
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full text-sidebar-foreground hover:text-sidebar-primary-foreground hover:bg-sidebar-accent transition-all duration-200",
                      isOpen ? "justify-start" : "md:justify-center md:px-2",
                      isActive && "bg-sidebar-accent text-sidebar-primary-foreground",
                    )}
                  >
                    <item.icon className={cn("h-4 w-4", isOpen ? "mr-3" : "md:mr-0")} />
                    <span
                      className={cn(
                        "transition-opacity duration-200",
                        !isOpen && "md:opacity-0 md:w-0 md:overflow-hidden",
                      )}
                    >
                      {item.name}
                    </span>
                  </Button>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </>
  )
}
