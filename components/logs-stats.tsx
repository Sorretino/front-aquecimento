import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, CheckCircle, AlertTriangle, XCircle, Clock, Activity } from "lucide-react"

const stats = [
  {
    title: "Total de Logs",
    value: "15,847",
    change: "+1,234",
    changeType: "neutral",
    icon: FileText,
    description: "Últimas 24h",
  },
  {
    title: "Sucessos",
    value: "14,892",
    change: "+1,156",
    changeType: "positive",
    icon: CheckCircle,
    description: "94.0% do total",
  },
  {
    title: "Avisos",
    value: "723",
    change: "+67",
    changeType: "warning",
    icon: AlertTriangle,
    description: "4.6% do total",
  },
  {
    title: "Erros",
    value: "232",
    change: "+11",
    changeType: "negative",
    icon: XCircle,
    description: "1.4% do total",
  },
  {
    title: "Logs por Minuto",
    value: "45.2",
    change: "+2.1",
    changeType: "positive",
    icon: Activity,
    description: "Média atual",
  },
  {
    title: "Tempo Médio Resposta",
    value: "1.2s",
    change: "-0.1s",
    changeType: "positive",
    icon: Clock,
    description: "Últimas 12h",
  },
]

export function LogsStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
            <div className="flex items-center space-x-2 text-xs">
              <span
                className={`font-medium ${
                  stat.changeType === "positive"
                    ? "text-success"
                    : stat.changeType === "negative"
                      ? "text-destructive"
                      : stat.changeType === "warning"
                        ? "text-warning"
                        : "text-muted-foreground"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-muted-foreground">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
