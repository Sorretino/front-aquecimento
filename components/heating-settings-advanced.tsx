"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Save, Zap, Clock, Target, AlertTriangle } from "lucide-react"

export function HeatingSettingsAdvanced() {
  const [settings, setSettings] = useState({
    globalMessagesPerMinute: [45],
    globalInterval: [2],
    maxConcurrentInstances: 4,
    retryAttempts: 3,
    retryDelay: 5,
    enableSmartThrottling: true,
    throttlingThreshold: 85,
    enableFailsafe: true,
    failsafeErrorRate: 10,
    workingHours: {
      enabled: true,
      start: "08:00",
      end: "18:00",
      timezone: "America/Sao_Paulo",
    },
    weekendMode: false,
    customSchedule: "",
    enableWarmup: true,
    warmupDuration: 30,
    cooldownPeriod: 15,
  })

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Configurações Globais de Aquecimento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Mensagens por Minuto (Global)</Label>
              <div className="px-3">
                <Slider
                  value={settings.globalMessagesPerMinute}
                  onValueChange={(value) => setSettings({ ...settings, globalMessagesPerMinute: value })}
                  max={200}
                  min={10}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>10</span>
                  <span className="font-medium">{settings.globalMessagesPerMinute[0]}/min</span>
                  <span>200</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="max-instances" className="text-sm font-medium">
                  Máximo de Instâncias Simultâneas
                </Label>
                <Input
                  id="max-instances"
                  type="number"
                  value={settings.maxConcurrentInstances}
                  onChange={(e) =>
                    setSettings({ ...settings, maxConcurrentInstances: Number.parseInt(e.target.value) })
                  }
                  min={1}
                  max={10}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="retry-attempts" className="text-sm font-medium">
                  Tentativas de Reenvio
                </Label>
                <Input
                  id="retry-attempts"
                  type="number"
                  value={settings.retryAttempts}
                  onChange={(e) => setSettings({ ...settings, retryAttempts: Number.parseInt(e.target.value) })}
                  min={0}
                  max={10}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Controles Inteligentes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Throttling Inteligente</Label>
              <p className="text-xs text-muted-foreground">Reduz velocidade automaticamente em caso de alta carga</p>
            </div>
            <Switch
              checked={settings.enableSmartThrottling}
              onCheckedChange={(checked) => setSettings({ ...settings, enableSmartThrottling: checked })}
            />
          </div>

          {settings.enableSmartThrottling && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Limite para Throttling (%)</Label>
              <div className="px-3">
                <Slider
                  value={[settings.throttlingThreshold]}
                  onValueChange={(value) => setSettings({ ...settings, throttlingThreshold: value[0] })}
                  max={100}
                  min={50}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>50%</span>
                  <span className="font-medium">{settings.throttlingThreshold}%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Sistema de Segurança</Label>
              <p className="text-xs text-muted-foreground">Para automaticamente em caso de muitos erros</p>
            </div>
            <Switch
              checked={settings.enableFailsafe}
              onCheckedChange={(checked) => setSettings({ ...settings, enableFailsafe: checked })}
            />
          </div>

          {settings.enableFailsafe && (
            <div className="space-y-2">
              <Label htmlFor="failsafe-rate" className="text-sm font-medium">
                Taxa de Erro para Parada (%)
              </Label>
              <Input
                id="failsafe-rate"
                type="number"
                value={settings.failsafeErrorRate}
                onChange={(e) => setSettings({ ...settings, failsafeErrorRate: Number.parseInt(e.target.value) })}
                min={5}
                max={50}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Horários e Agendamento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Horário de Funcionamento</Label>
              <p className="text-xs text-muted-foreground">Limitar aquecimento a horários específicos</p>
            </div>
            <Switch
              checked={settings.workingHours.enabled}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  workingHours: { ...settings.workingHours, enabled: checked },
                })
              }
            />
          </div>

          {settings.workingHours.enabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-time" className="text-sm font-medium">
                  Horário de Início
                </Label>
                <Input
                  id="start-time"
                  type="time"
                  value={settings.workingHours.start}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      workingHours: { ...settings.workingHours, start: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-time" className="text-sm font-medium">
                  Horário de Término
                </Label>
                <Input
                  id="end-time"
                  type="time"
                  value={settings.workingHours.end}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      workingHours: { ...settings.workingHours, end: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Modo Fim de Semana</Label>
              <p className="text-xs text-muted-foreground">Configurações especiais para sábado e domingo</p>
            </div>
            <Switch
              checked={settings.weekendMode}
              onCheckedChange={(checked) => setSettings({ ...settings, weekendMode: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="custom-schedule" className="text-sm font-medium">
              Agendamento Personalizado
            </Label>
            <Textarea
              id="custom-schedule"
              placeholder="Ex: Segunda-Feira: 08:00-12:00, 14:00-18:00"
              value={settings.customSchedule}
              onChange={(e) => setSettings({ ...settings, customSchedule: e.target.value })}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Configurações Avançadas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Período de Aquecimento</Label>
              <p className="text-xs text-muted-foreground">Iniciar gradualmente antes do aquecimento principal</p>
            </div>
            <Switch
              checked={settings.enableWarmup}
              onCheckedChange={(checked) => setSettings({ ...settings, enableWarmup: checked })}
            />
          </div>

          {settings.enableWarmup && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="warmup-duration" className="text-sm font-medium">
                  Duração do Aquecimento (min)
                </Label>
                <Input
                  id="warmup-duration"
                  type="number"
                  value={settings.warmupDuration}
                  onChange={(e) => setSettings({ ...settings, warmupDuration: Number.parseInt(e.target.value) })}
                  min={10}
                  max={120}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cooldown-period" className="text-sm font-medium">
                  Período de Resfriamento (min)
                </Label>
                <Input
                  id="cooldown-period"
                  type="number"
                  value={settings.cooldownPeriod}
                  onChange={(e) => setSettings({ ...settings, cooldownPeriod: Number.parseInt(e.target.value) })}
                  min={5}
                  max={60}
                />
              </div>
            </div>
          )}

          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-warning">Atenção</h4>
                <p className="text-xs text-warning/80 mt-1">
                  Configurações muito agressivas podem resultar em bloqueios. Recomendamos testar com valores
                  conservadores primeiro.
                </p>
              </div>
            </div>
          </div>
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
