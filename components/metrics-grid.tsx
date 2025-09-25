import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, TrendingUp, Clock, Target, Users, Zap, CheckCircle, AlertTriangle } from "lucide-react"

const metrics = [
  {
    title: "Mensagens Enviadas",
    value: "12,847",
    change: "+12.5%",
    changeType: "positive",
    icon: MessageSquare,
    description: "Últimas 24h",
  },
  {
    title: "Taxa de Sucesso",
    value: "98.7%",
    change: "+0.3%",
    changeType: "positive",
    icon: CheckCircle,
    description: "Média geral",
  },
  {
    title: "Instâncias Ativas",
    value: "3/4",
    change: "0",
    changeType: "neutral",
    icon: Users,
    description: "1 offline",
  },
  {
    title: "Tempo Médio Resposta",
    value: "1.2s",
    change: "-0.1s",
    changeType: "positive",
    icon: Clock,
    description: "Últimas 12h",
  },
  {
    title: "Aquecimento Ativo",
    value: "2",
    change: "+1",
    changeType: "neutral",
    icon: Zap,
    description: "Em progresso",
  },
  {
    title: "Erros Detectados",
    value: "23",
    change: "+5",
    changeType: "negative",
    icon: AlertTriangle,
    description: "Últimas 6h",
  },
  {
    title: "Velocidade Envio",
    value: "45/min",
    change: "+3/min",
    changeType: "positive",
    icon: TrendingUp,
    description: "Média atual",
  },
  {
    title: "Meta Diária",
    value: "85%",
    change: "+5%",
    changeType: "positive",
    icon: Target,
    description: "15,000 mensagens",
  },
]

export function MetricsGrid() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Métricas em Tempo Real</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{metric.value}</div>
              <div className="flex items-center space-x-2 text-xs">
                <span
                  className={`font-medium ${
                    metric.changeType === "positive"
                      ? "text-success"
                      : metric.changeType === "negative"
                        ? "text-destructive"
                        : "text-muted-foreground"
                  }`}
                >
                  {metric.change}
                </span>
                <span className="text-muted-foreground">{metric.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
