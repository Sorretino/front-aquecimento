
import { DashboardHeader } from "@/components/dashboard-header"
import { AnalyticsOverview } from "@/components/analytics-overview"
import { PerformanceCharts } from "@/components/performance-charts"
import { ConversionMetrics } from "@/components/conversion-metrics"
import { HeatmapAnalysis } from "@/components/heatmap-analysis"

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen bg-background">
    
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <DashboardHeader /> */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Analytics Avançado</h1>
          </div>
          <AnalyticsOverview />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PerformanceCharts />
            <ConversionMetrics />
          </div>
          <HeatmapAnalysis />
        </main>
      </div>
    </div>
  )
}


// import { DashboardHeader } from "@/components/dashboard-header"
// import { AnalyticsOverview } from "@/components/analytics-overview"
// import { PerformanceCharts } from "@/components/performance-charts"
// import { ConversionMetrics } from "@/components/conversion-metrics"
// import { HeatmapAnalysis } from "@/components/heatmap-analysis"

// export default function AnalyticsPage() {
//   return (
//     <>
//       <DashboardHeader />
//       <main className="flex-1 overflow-y-auto p-6 space-y-6">
//         <div className="flex items-center justify-between">
//           <h1 className="text-3xl font-bold text-foreground">Analytics Avançado</h1>
//         </div>
//         <AnalyticsOverview />
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <PerformanceCharts />
//           <ConversionMetrics />
//         </div>
//         <HeatmapAnalysis />
//       </main>
//     </>
//   )
// }
