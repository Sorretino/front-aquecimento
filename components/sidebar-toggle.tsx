"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useSidebar } from "./sidebar-provider"

export function SidebarToggle() {
  const { toggle } = useSidebar()

  return (
    <Button variant="ghost" size="sm" onClick={toggle} className="text-muted-foreground hover:text-foreground">
      <Menu className="h-5 w-5" />
    </Button>
  )
}
