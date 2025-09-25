import { DashboardHeader } from "@/components/dashboard-header"
import { AutomationRules } from "@/components/automation-rules"
import { WorkflowBuilder } from "@/components/workflow-builder"
import { ScheduledTasks } from "@/components/scheduled-tasks"
import { TriggerSettings } from "@/components/trigger-settings"

export default function AutomationPage() {
  return (
    <>
      {/* <DashboardHeader /> */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Automação Inteligente</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AutomationRules />
          {/* <TriggerSettings /> */}
        </div>
        <WorkflowBuilder />
        {/* <ScheduledTasks /> */}
      </main>
    </>
  )
}
