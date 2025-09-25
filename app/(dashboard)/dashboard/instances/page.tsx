import { DashboardHeader } from "@/components/dashboard-header"
import { InstancesTable } from "@/components/instances-table"
import { InstancesStats } from "@/components/instances-stats"
import { AddInstanceDialog } from "@/components/add-instance-dialog"
import { AddInstanceCreateDialog } from "@/components/add-create-instance"

export default function InstancesPage() {
  return (
    <>
      {/* <DashboardHeader /> */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Gerenciar Instâncias</h1>
          <AddInstanceDialog />
          <AddInstanceCreateDialog/>
        </div>
        <InstancesStats />
        <InstancesTable />
      </main>
    </>
  )
}


// "use client"

// import React from "react"
// import { InstancesManager } from "@/components/heater/InstancesManager" // se separar em components

// export default function AquecimentoPage() {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Gerenciar Instâncias</h1>
//       <InstancesManager />
//     </div>
//   )
// }