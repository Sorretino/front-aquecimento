"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Save, Zap, Database, MessageSquare, BarChart3, Globe, TestTube } from "lucide-react"

const integrations = [
  {
    id: "webhook",
    name: "Webhook",
    description: "Enviar dados para sistemas externos",
    icon: Zap,
    enabled: true,
    status: "connected",
  },
  {
    id: "database",
    name: "Banco de Dados Externo",
    description: "Sincronizar com banco de dados externo",
    icon: Database,
    enabled: false,
    status: "disconnected",
  },
  {
    id: "telegram",
    name: "Telegram Bot",
    description: "Notificações via Telegram",
    icon: MessageSquare,
    enabled: true,
    status: "connected",
  },
  {
    id: "analytics",
    name: "Google Analytics",
    description: "Rastreamento de eventos",
    icon: BarChart3,
    enabled: false,
    status: "disconnected",
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Automação com milhares de apps",
    icon: Globe,
    enabled: false,
    status: "disconnected",
  },
]

export function IntegrationSettings() {
  const [settings, setSettings] = useState({
    webhook: {
      url: "https://api.example.com/webhook",
      secret: "webhook_secret_key",
      events: ["message_sent", "heating_completed", "instance_offline"],
    },
    telegram: {
      botToken: "123456789:ABCdefGHIjklMNOpqrsTUVwxyz",
      chatId: "-1001234567890",
    },
    database: {
      host: "",
      port: "5432",
      database: "",
      username: "",
      password: "",
    },
    analytics: {
      trackingId: "",
      enabled: false,
    },
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-success/10 text-success border-success/20"
      case "disconnected":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "testing":
        return "bg-warning/10 text-warning border-warning/20"
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "connected":
        return "Conectado"
      case "disconnected":
        return "Desconectado"
      case "testing":
        return "Testando"
      default:
        return "Desconhecido"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground">Integrações Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map((integration) => (
              <div
                key={integration.id}
                className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <integration.icon className="w-6 h-6 text-primary" />
                    <div>
                      <h4 className="text-sm font-medium text-foreground">{integration.name}</h4>
                      <p className="text-xs text-muted-foreground">{integration.description}</p>
                    </div>
                  </div>
                  <Switch checked={integration.enabled} onCheckedChange={() => {}} />
                </div>
                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(integration.status)}>{getStatusText(integration.status)}</Badge>
                  <Button variant="outline" size="sm">
                    Configurar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Configuração do Webhook
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url" className="text-sm font-medium">
              URL do Webhook
            </Label>
            <Input
              id="webhook-url"
              type="url"
              value={settings.webhook.url}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  webhook: { ...settings.webhook, url: e.target.value },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhook-secret" className="text-sm font-medium">
              Chave Secreta
            </Label>
            <Input
              id="webhook-secret"
              type="password"
              value={settings.webhook.secret}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  webhook: { ...settings.webhook, secret: e.target.value },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Eventos para Enviar</Label>
            <div className="flex flex-wrap gap-2">
              {[
                "message_sent",
                "message_failed",
                "heating_started",
                "heating_completed",
                "instance_offline",
                "error_threshold",
              ].map((event) => (
                <Badge
                  key={event}
                  variant={settings.webhook.events.includes(event) ? "default" : "outline"}
                  className="cursor-pointer"
                >
                  {event.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </Badge>
              ))}
            </div>
          </div>

          <Button variant="outline" className="w-full bg-transparent">
            <TestTube className="w-4 h-4 mr-2" />
            Testar Webhook
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Configuração do Telegram
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bot-token" className="text-sm font-medium">
              Token do Bot
            </Label>
            <Input
              id="bot-token"
              type="password"
              value={settings.telegram.botToken}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  telegram: { ...settings.telegram, botToken: e.target.value },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="chat-id" className="text-sm font-medium">
              Chat ID
            </Label>
            <Input
              id="chat-id"
              value={settings.telegram.chatId}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  telegram: { ...settings.telegram, chatId: e.target.value },
                })
              }
            />
          </div>

          <Button variant="outline" className="w-full bg-transparent">
            <TestTube className="w-4 h-4 mr-2" />
            Testar Telegram
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Banco de Dados Externo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="db-host" className="text-sm font-medium">
                Host
              </Label>
              <Input
                id="db-host"
                value={settings.database.host}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    database: { ...settings.database, host: e.target.value },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="db-port" className="text-sm font-medium">
                Porta
              </Label>
              <Input
                id="db-port"
                value={settings.database.port}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    database: { ...settings.database, port: e.target.value },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="db-name" className="text-sm font-medium">
                Nome do Banco
              </Label>
              <Input
                id="db-name"
                value={settings.database.database}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    database: { ...settings.database, database: e.target.value },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="db-username" className="text-sm font-medium">
                Usuário
              </Label>
              <Input
                id="db-username"
                value={settings.database.username}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    database: { ...settings.database, username: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="db-password" className="text-sm font-medium">
              Senha
            </Label>
            <Input
              id="db-password"
              type="password"
              value={settings.database.password}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  database: { ...settings.database, password: e.target.value },
                })
              }
            />
          </div>

          <Button variant="outline" className="w-full bg-transparent">
            <TestTube className="w-4 h-4 mr-2" />
            Testar Conexão
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  )
}
