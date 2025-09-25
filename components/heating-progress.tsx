"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { Activity, TrendingUp, Clock, Target } from "lucide-react"

const progressData = [
  { time: "14:00", messages: 0, success: 0 },
  { time: "14:15", messages: 45, success: 44 },
  { time: "14:30", messages: 120, success: 118 },
  { time: "14:45", messages: 200, success: 196 },
  { time: "15:00", messages: 290, success: 285 },
  { time: "15:15", messages: 380, success: 374 },
  { time: "15:30", messages: 470, success: 463 },
  { time: "15:45", messages: 560, success: 551 },
  { time: "16:00", messages: 650, success: 640 },
]

const phases = [
  { name: "Fase 1: Inicialização", progress: 100, status: "completed" },
  { name: "Fase 2: Aquecimento Lento", progress: 100, status: "completed" },
  { name: "Fase 3: Aquecimento Médio", progress: 75, status: "active" },
  { name: "Fase 4: Aquecimento Rápido", progress: 0, status: "pending" },
  { name: "Fase 5: Finalização", progress: 0, status: "pending" },
]

export function HeatingProgress() {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Progresso do Aquecimento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {phases.map((phase, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{phase.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{phase.progress}%</span>
                    <Badge
                      variant="outline"
                      className={
                        phase.status === "completed"
                          ? "bg-success/10 text-success border-success/20"
                          : phase.status === "active"
                            ? "bg-warning/10 text-warning border-warning/20"
                            : "bg-muted/10 text-muted-foreground border-muted/20"
                      }
                    >
                      {phase.status === "completed" ? "Concluído" : phase.status === "active" ? "Ativo" : "Pendente"}
                    </Badge>
                  </div>
                </div>
                <Progress value={phase.progress} className="h-2" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-success" />
              <div className="text-2xl font-bold text-foreground">75%</div>
              <div className="text-sm text-muted-foreground">Progresso Geral</div>
            </div>
            <div className="text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-warning" />
              <div className="text-2xl font-bold text-foreground">2h 15m</div>
              <div className="text-sm text-muted-foreground">Tempo Restante</div>
            </div>
            <div className="text-center">
              <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-foreground">18:45</div>
              <div className="text-sm text-muted-foreground">Conclusão Estimada</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground">Gráfico de Progresso</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
              <Line
                type="monotone"
                dataKey="messages"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
                name="Mensagens Enviadas"
              />
              <Line
                type="monotone"
                dataKey="success"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 4 }}
                name="Mensagens com Sucesso"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
