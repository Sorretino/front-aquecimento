import { DashboardHeader } from "@/components/dashboard-header"
import { LogsTable } from "@/components/logs-table"
import { LogsFilters } from "@/components/logs-filters"
import { LogsStats } from "@/components/logs-stats"

export default function LogsPage() {
  return (
    <>
      {/* <DashboardHeader /> */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Logs do Sistema</h1>
        </div>
        <LogsStats />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <LogsFilters />
          </div>
          <div className="lg:col-span-3">
            <LogsTable />
          </div>
        </div>
      </main>
    </>
  )
}
