"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Settings, Save } from "lucide-react"

export function HeatingSettings() {
  const [settings, setSettings] = useState({
    messagesPerMinute: [45],
    intervalBetweenMessages: [2],
    maxMessagesPerSession: 500,
    autoRestart: true,
    randomizeInterval: true,
    workingHours: "business",
  })

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Configurações de Aquecimento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Mensagens por Minuto</Label>
          <div className="px-3">
            <Slider
              value={settings.messagesPerMinute}
              onValueChange={(value) => setSettings({ ...settings, messagesPerMinute: value })}
              max={100}
              min={10}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>10</span>
              <span className="font-medium">{settings.messagesPerMinute[0]}/min</span>
              <span>100</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Intervalo entre Mensagens (segundos)</Label>
          <div className="px-3">
            <Slider
              value={settings.intervalBetweenMessages}
              onValueChange={(value) => setSettings({ ...settings, intervalBetweenMessages: value })}
              max={10}
              min={1}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1s</span>
              <span className="font-medium">{settings.intervalBetweenMessages[0]}s</span>
              <span>10s</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="max-messages" className="text-sm font-medium">
            Máximo de Mensagens por Sessão
          </Label>
          <Input
            id="max-messages"
            type="number"
            value={settings.maxMessagesPerSession}
            onChange={(e) => setSettings({ ...settings, maxMessagesPerSession: Number.parseInt(e.target.value) })}
            min={100}
            max={2000}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Horário de Funcionamento</Label>
          <Select
            value={settings.workingHours}
            onValueChange={(value) => setSettings({ ...settings, workingHours: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24 Horas</SelectItem>
              <SelectItem value="business">Horário Comercial (8h-18h)</SelectItem>
              <SelectItem value="extended">Horário Estendido (6h-22h)</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Reinício Automático</Label>
              <p className="text-xs text-muted-foreground">Reiniciar automaticamente após falhas</p>
            </div>
            <Switch
              checked={settings.autoRestart}
              onCheckedChange={(checked) => setSettings({ ...settings, autoRestart: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Randomizar Intervalos</Label>
              <p className="text-xs text-muted-foreground">Adicionar variação nos intervalos</p>
            </div>
            <Switch
              checked={settings.randomizeInterval}
              onCheckedChange={(checked) => setSettings({ ...settings, randomizeInterval: checked })}
            />
          </div>
        </div>

        <Button className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Salvar Configurações
        </Button>
      </CardContent>
    </Card>
  )
}
