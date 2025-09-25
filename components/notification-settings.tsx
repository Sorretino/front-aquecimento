"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Bell, Mail, MessageSquare, Smartphone } from "lucide-react"

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    emailAddress: "admin@example.com",
    smsNotifications: false,
    phoneNumber: "",
    webhookNotifications: true,
    webhookUrl: "https://api.example.com/webhook",
    discordNotifications: false,
    discordWebhook: "",
    notificationTypes: {
      instanceOffline: true,
      heatingCompleted: true,
      errorThreshold: true,
      dailyReport: true,
      systemUpdates: false,
    },
    quietHours: {
      enabled: true,
      start: "22:00",
      end: "08:00",
    },
    frequency: "immediate",
  })

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Canais de Notificação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-xs text-muted-foreground">Receber notificações por email</p>
                </div>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
              />
            </div>

            {settings.emailNotifications && (
              <div className="ml-8 space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Endereço de Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.emailAddress}
                  onChange={(e) => setSettings({ ...settings, emailAddress: e.target.value })}
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-muted-foreground" />
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">SMS</Label>
                  <p className="text-xs text-muted-foreground">Receber notificações por SMS</p>
                </div>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
              />
            </div>

            {settings.smsNotifications && (
              <div className="ml-8 space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Número de Telefone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+55 11 99999-0000"
                  value={settings.phoneNumber}
                  onChange={(e) => setSettings({ ...settings, phoneNumber: e.target.value })}
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-muted-foreground" />
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Webhook</Label>
                  <p className="text-xs text-muted-foreground">Integração com sistemas externos</p>
                </div>
              </div>
              <Switch
                checked={settings.webhookNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, webhookNotifications: checked })}
              />
            </div>

            {settings.webhookNotifications && (
              <div className="ml-8 space-y-2">
                <Label htmlFor="webhook" className="text-sm font-medium">
                  URL do Webhook
                </Label>
                <Input
                  id="webhook"
                  type="url"
                  value={settings.webhookUrl}
                  onChange={(e) => setSettings({ ...settings, webhookUrl: e.target.value })}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground">Tipos de Notificação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(settings.notificationTypes).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">
                  {key === "instanceOffline" && "Instância Offline"}
                  {key === "heatingCompleted" && "Aquecimento Concluído"}
                  {key === "errorThreshold" && "Limite de Erros Atingido"}
                  {key === "dailyReport" && "Relatório Diário"}
                  {key === "systemUpdates" && "Atualizações do Sistema"}
                </Label>
                <p className="text-xs text-muted-foreground">
                  {key === "instanceOffline" && "Quando uma instância fica offline"}
                  {key === "heatingCompleted" && "Quando o aquecimento é finalizado"}
                  {key === "errorThreshold" && "Quando muitos erros são detectados"}
                  {key === "dailyReport" && "Resumo diário das atividades"}
                  {key === "systemUpdates" && "Notificações sobre atualizações"}
                </p>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notificationTypes: {
                      ...settings.notificationTypes,
                      [key]: checked,
                    },
                  })
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground">Configurações Avançadas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Frequência das Notificações</Label>
            <Select
              value={settings.frequency}
              onValueChange={(value) => setSettings({ ...settings, frequency: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Imediata</SelectItem>
                <SelectItem value="batched_5min">Agrupada (5 min)</SelectItem>
                <SelectItem value="batched_15min">Agrupada (15 min)</SelectItem>
                <SelectItem value="batched_1hour">Agrupada (1 hora)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Horário Silencioso</Label>
              <p className="text-xs text-muted-foreground">Não enviar notificações em horários específicos</p>
            </div>
            <Switch
              checked={settings.quietHours.enabled}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  quietHours: { ...settings.quietHours, enabled: checked },
                })
              }
            />
          </div>

          {settings.quietHours.enabled && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quiet-start" className="text-sm font-medium">
                  Início
                </Label>
                <Input
                  id="quiet-start"
                  type="time"
                  value={settings.quietHours.start}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      quietHours: { ...settings.quietHours, start: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quiet-end" className="text-sm font-medium">
                  Fim
                </Label>
                <Input
                  id="quiet-end"
                  type="time"
                  value={settings.quietHours.end}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      quietHours: { ...settings.quietHours, end: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          )}
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
