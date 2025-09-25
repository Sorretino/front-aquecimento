import { DashboardHeader } from "@/components/dashboard-header"
import  HeatingInstancesSettings  from "@/components/heater/heating-settings"
import { HeatingControl } from "@/components/heating-control"
import { HeatingProgress } from "@/components/heating-progress"
import { HeatingSettings } from "@/components/heating-settings"
import { MessageTemplates } from "@/components/message-templates"

export default function HeatingPage() {
  return (
    <>
      {/* <DashboardHeader /> */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Aquecimento WhatsApp</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
     
          <div className="lg:col-span-2 space-y-6">
            <HeatingControl />
             <HeatingInstancesSettings/>
            <HeatingProgress />
          </div>
          <div className="space-y-6">
            <HeatingSettings />
            <MessageTemplates />
              {/* <HeatingInstancesSettings/> */}
           
          </div>
        </div>
      </main>
    </>
  )
}
