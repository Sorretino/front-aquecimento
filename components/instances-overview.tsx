import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Smartphone, Zap, CheckCircle, AlertCircle, XCircle, Play, Pause, Settings } from "lucide-react"

const instances = [
  {
    id: "inst_001",
    name: "Instância Principal",
    phone: "+55 11 99999-0001",
    status: "heating",
    progress: 75,
    messagesCount: 1250,
    successRate: 98.5,
    lastActivity: "2 min atrás",
  },
  {
    id: "inst_002",
    name: "Instância Backup",
    phone: "+55 11 99999-0002",
    status: "online",
    progress: 100,
    messagesCount: 2100,
    successRate: 99.2,
    lastActivity: "30 seg atrás",
  },
  {
    id: "inst_003",
    name: "Instância Teste",
    phone: "+55 11 99999-0003",
    status: "offline",
    progress: 0,
    messagesCount: 0,
    successRate: 0,
    lastActivity: "1h atrás",
  },
  {
    id: "inst_004",
    name: "Instância Nova",
    phone: "+55 11 99999-0004",
    status: "heating",
    progress: 25,
    messagesCount: 320,
    successRate: 97.8,
    lastActivity: "5 min atrás",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "bg-success/10 text-success border-success/20"
    case "heating":
      return "bg-warning/10 text-warning border-warning/20"
    case "offline":
      return "bg-destructive/10 text-destructive border-destructive/20"
    default:
      return "bg-muted/10 text-muted-foreground border-muted/20"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "online":
      return <CheckCircle className="w-4 h-4" />
    case "heating":
      return <Zap className="w-4 h-4" />
    case "offline":
      return <XCircle className="w-4 h-4" />
    default:
      return <AlertCircle className="w-4 h-4" />
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "online":
      return "Online"
    case "heating":
      return "Aquecendo"
    case "offline":
      return "Offline"
    default:
      return "Desconhecido"
  }
}

export function InstancesOverview() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Instâncias WhatsApp</h2>
        <Button size="sm">
          <Smartphone className="w-4 h-4 mr-2" />
          Nova Instância
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {instances.map((instance) => (
          <Card key={instance.id} className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-card-foreground">{instance.name}</CardTitle>
                <Badge className={getStatusColor(instance.status)}>
                  {getStatusIcon(instance.status)}
                  <span className="ml-1">{getStatusText(instance.status)}</span>
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{instance.phone}</p>
            </CardHeader>

            <CardContent className="space-y-3">
              {instance.status === "heating" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="text-foreground font-medium">{instance.progress}%</span>
                  </div>
                  <Progress value={instance.progress} className="h-2" />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-muted-foreground">Mensagens</p>
                  <p className="font-medium text-foreground">{instance.messagesCount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Taxa Sucesso</p>
                  <p className="font-medium text-foreground">{instance.successRate}%</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground">{instance.lastActivity}</span>
                <div className="flex space-x-1">
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    {instance.status === "online" ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  </Button>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <Settings className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
