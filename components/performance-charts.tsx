"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

const performanceData = [
  { time: "00:00", messages: 120, success: 118, errors: 2 },
  { time: "04:00", messages: 89, success: 87, errors: 2 },
  { time: "08:00", messages: 245, success: 240, errors: 5 },
  { time: "12:00", messages: 378, success: 370, errors: 8 },
  { time: "16:00", messages: 456, success: 445, errors: 11 },
  { time: "20:00", messages: 234, success: 230, errors: 4 },
]

export function PerformanceCharts() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Performance das Mensagens</CardTitle>
        <CardDescription className="text-muted-foreground">
          Análise de envio e taxa de sucesso nas últimas 24 horas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#F9FAFB",
              }}
            />
            <Area type="monotone" dataKey="messages" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
            <Area type="monotone" dataKey="success" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
            <Area type="monotone" dataKey="errors" stackId="3" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
