"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts"

const messageData = [
  { time: "00:00", messages: 120, success: 118, errors: 2 },
  { time: "02:00", messages: 150, success: 147, errors: 3 },
  { time: "04:00", messages: 180, success: 176, errors: 4 },
  { time: "06:00", messages: 220, success: 215, errors: 5 },
  { time: "08:00", messages: 280, success: 275, errors: 5 },
  { time: "10:00", messages: 350, success: 343, errors: 7 },
  { time: "12:00", messages: 420, success: 412, errors: 8 },
  { time: "14:00", messages: 380, success: 374, errors: 6 },
  { time: "16:00", messages: 450, success: 442, errors: 8 },
  { time: "18:00", messages: 520, success: 510, errors: 10 },
  { time: "20:00", messages: 480, success: 472, errors: 8 },
  { time: "22:00", messages: 320, success: 315, errors: 5 },
]

const performanceData = [
  { time: "00:00", responseTime: 1.2, throughput: 45 },
  { time: "02:00", responseTime: 1.1, throughput: 52 },
  { time: "04:00", responseTime: 1.3, throughput: 48 },
  { time: "06:00", responseTime: 1.0, throughput: 58 },
  { time: "08:00", responseTime: 1.4, throughput: 62 },
  { time: "10:00", responseTime: 1.2, throughput: 68 },
  { time: "12:00", responseTime: 1.1, throughput: 72 },
  { time: "14:00", responseTime: 1.3, throughput: 65 },
  { time: "16:00", responseTime: 1.0, throughput: 75 },
  { time: "18:00", responseTime: 1.2, throughput: 78 },
  { time: "20:00", responseTime: 1.1, throughput: 70 },
  { time: "22:00", responseTime: 1.3, throughput: 55 },
]

export function RealtimeCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base font-medium text-card-foreground">Envio de Mensagens</CardTitle>
          <div className="flex space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-chart-1 rounded-full mr-2"></div>
              <span className="text-muted-foreground">Total</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-chart-2 rounded-full mr-2"></div>
              <span className="text-muted-foreground">Sucesso</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-chart-4 rounded-full mr-2"></div>
              <span className="text-muted-foreground">Erros</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={messageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Area
                type="monotone"
                dataKey="messages"
                stackId="1"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="success"
                stackId="2"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="errors"
                stackId="3"
                stroke="hsl(var(--chart-4))"
                fill="hsl(var(--chart-4))"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base font-medium text-card-foreground">Performance do Sistema</CardTitle>
          <div className="flex space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-chart-3 rounded-full mr-2"></div>
              <span className="text-muted-foreground">Tempo Resposta (s)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-chart-5 rounded-full mr-2"></div>
              <span className="text-muted-foreground">Throughput (/min)</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Line
                type="monotone"
                dataKey="responseTime"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="throughput"
                stroke="hsl(var(--chart-5))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-5))", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
