import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Copy, Edit, Trash2, ExternalLink } from "lucide-react"

export function WebhooksList() {
  const webhooks = [
    {
      id: 1,
      name: "Notificações CRM",
      url: "https://api.exemplo.com/webhook/whatsapp",
      events: ["message.sent", "message.received"],
      status: "active",
      lastCall: "2 min atrás",
      success: 98.5,
    },
    {
      id: 2,
      name: "Analytics Dashboard",
      url: "https://analytics.exemplo.com/webhook",
      events: ["heating.started", "heating.completed"],
      status: "active",
      lastCall: "15 min atrás",
      success: 100,
    },
    {
      id: 3,
      name: "Sistema de Alertas",
      url: "https://alerts.exemplo.com/webhook",
      events: ["instance.offline", "error.occurred"],
      status: "inactive",
      lastCall: "2 horas atrás",
      success: 95.2,
    },
  ]

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground">Webhooks Configurados</CardTitle>
            <CardDescription className="text-muted-foreground">Gerencie integrações via webhook</CardDescription>
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {webhooks.map((webhook) => (
            <div key={webhook.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium text-foreground">{webhook.name}</h4>
                  <Badge variant={webhook.status === "active" ? "default" : "secondary"}>
                    {webhook.status === "active" ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch checked={webhook.status === "active"} />
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">URL:</span>
                  <code className="bg-muted px-2 py-1 rounded text-xs flex-1 truncate">{webhook.url}</code>
                  <Button variant="ghost" size="sm">
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">Eventos:</span>
                  <div className="flex flex-wrap gap-1">
                    {webhook.events.map((event) => (
                      <Badge key={event} variant="outline" className="text-xs">
                        {event}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Última chamada: {webhook.lastCall}</span>
                  <span>Taxa de sucesso: {webhook.success}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
