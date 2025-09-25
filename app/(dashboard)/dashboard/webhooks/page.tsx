import { DashboardHeader } from "@/components/dashboard-header"
import { WebhooksList } from "@/components/webhooks-list"
import { WebhookLogs } from "@/components/webhook-logs"
import { WebhookSettings } from "@/components/webhook-settings"

export default function WebhooksPage() {
  return (
    <>
      {/* <DashboardHeader /> */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Webhooks</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WebhooksList />
          {/* <WebhookSettings /> */}
        </div>
        {/* <WebhookLogs /> */}
      </main>
    </>
  )
}
