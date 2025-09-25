"use client"

import type React from "react"
import { useSidebar } from "@/components/sidebar-provider"
import { cn } from "@/lib/utils"

interface LayoutContentProps {
  children: React.ReactNode
}

export function LayoutContent({ children }: LayoutContentProps) {
  const { isOpen } = useSidebar()

  return (
    <div
      className={cn(
        "flex-1 flex flex-col overflow-hidden transition-all duration-200",
        isOpen ? "md:ml-0" : "md:ml-16",
      )}
    >
      {children}
    </div>
  )
}
