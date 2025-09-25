// import { DashboardHeader } from "@/components/dashboard-header"
// import { InstancesOverview } from "@/components/instances-overview"
// import { MetricsGrid } from "@/components/metrics-grid"
// import { RealtimeCharts } from "@/components/realtime-charts"

// export default function Dashboard() {
//   return (
//     <>
//       <DashboardHeader />
//       <main className="flex-1 overflow-y-auto p-6 space-y-6">
//         <InstancesOverview />
//         <MetricsGrid />
//         <RealtimeCharts />
//       </main>
//     </>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

import { DashboardHeader } from "@/components/dashboard-header"
import { InstancesOverview } from "@/components/instances-overview"
import { MetricsGrid } from "@/components/metrics-grid"
import { RealtimeCharts } from "@/components/realtime-charts"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
export default function Dashboard() {
  // const [user, setUser] = useState<any>(null)
  // const router = useRouter()
const { user, isHydrated }:any = useAuth()
  // useEffect(() => {
  //   const token = localStorage.getItem("token")
  //   if (!token) {
  //     router.push("/auth")
  //     return
  //   }

  //   axios
  //     .get("https://multatendiment-aquecimento.ybrsom.easypanel.host/auth/me", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => setUser(res.data.user))
  //     .catch(() => {
  //       localStorage.removeItem("token")
  //       router.push("/auth")
  //     })
  // }, [router])

  // if (!user) return <p className="p-6">Carregando...</p>
if (!isHydrated) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 bg-muted rounded animate-pulse mb-2"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-2/3"></div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-4 bg-muted rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-muted rounded animate-pulse w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* <DashboardHeader /> */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <InstancesOverview />
        <MetricsGrid />
        <RealtimeCharts />
      </main>
    </>
  )
}
