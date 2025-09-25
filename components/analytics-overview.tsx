"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, MessageCircle, Clock, Target } from "lucide-react"

export function AnalyticsOverview() {
  const metrics = [
    {
      title: "Taxa de Conversão",
      value: "23.4%",
      change: "+2.1%",
      trend: "up",
      icon: Target,
      description: "Últimos 30 dias",
    },
    {
      title: "Engajamento Médio",
      value: "87.2%",
      change: "+5.3%",
      trend: "up",
      icon: MessageCircle,
      description: "Por conversa",
    },
    {
      title: "Tempo de Resposta",
      value: "1.2s",
      change: "-0.3s",
      trend: "up",
      icon: Clock,
      description: "Média geral",
    },
    {
      title: "Usuários Ativos",
      value: "12,847",
      change: "-1.2%",
      trend: "down",
      icon: Users,
      description: "Últimas 24h",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{metric.value}</div>
            <div className="flex items-center space-x-2 text-xs">
              <Badge
                variant={metric.trend === "up" ? "default" : "destructive"}
                className="flex items-center space-x-1"
              >
                {metric.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span>{metric.change}</span>
              </Badge>
              <span className="text-muted-foreground">{metric.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
