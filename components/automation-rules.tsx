import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2 } from "lucide-react"

export function AutomationRules() {
  const rules = [
    {
      id: 1,
      name: "Auto-resposta Noturna",
      description: "Resposta automática fora do horário comercial",
      status: "active",
      trigger: "Horário",
      action: "Enviar mensagem",
      lastRun: "2 min atrás",
    },
    {
      id: 2,
      name: "Aquecimento Inteligente",
      description: "Inicia aquecimento quando instância fica inativa",
      status: "active",
      trigger: "Inatividade",
      action: "Iniciar aquecimento",
      lastRun: "15 min atrás",
    },
    {
      id: 3,
      name: "Alerta de Erro",
      description: "Notifica quando taxa de erro excede 5%",
      status: "paused",
      trigger: "Taxa de erro",
      action: "Enviar alerta",
      lastRun: "1 hora atrás",
    },
  ]

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground">Regras de Automação</CardTitle>
            <CardDescription className="text-muted-foreground">Gerencie regras automáticas do sistema</CardDescription>
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Nova Regra
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rules.map((rule) => (
            <div key={rule.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-medium text-foreground">{rule.name}</h4>
                  <Badge variant={rule.status === "active" ? "default" : "secondary"}>
                    {rule.status === "active" ? "Ativa" : "Pausada"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{rule.description}</p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>Gatilho: {rule.trigger}</span>
                  <span>Ação: {rule.action}</span>
                  <span>Última execução: {rule.lastRun}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch checked={rule.status === "active"} />
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
