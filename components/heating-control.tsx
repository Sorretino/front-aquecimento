"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, Square, Zap, Users, Clock, MessageSquare } from "lucide-react"

const instances = [
  { id: "inst_001", name: "Instância Principal", status: "heating", progress: 75 },
  { id: "inst_002", name: "Instância Backup", status: "online", progress: 100 },
  { id: "inst_003", name: "Instância Teste", status: "offline", progress: 0 },
  { id: "inst_004", name: "Instância Nova", status: "ready", progress: 0 },
]

export function HeatingControl() {
  const [selectedInstance, setSelectedInstance] = useState("inst_001")
  const [isHeating, setIsHeating] = useState(true)

  const currentInstance = instances.find((i) => i.id === selectedInstance)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-success/10 text-success border-success/20"
      case "heating":
        return "bg-warning/10 text-warning border-warning/20"
      case "offline":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "ready":
        return "bg-primary/10 text-primary border-primary/20"
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20"
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
      case "ready":
        return "Pronto"
      default:
        return "Desconhecido"
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
          <Zap className="w-5 h-5 mr-2" />
          Controle de Aquecimento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Selecionar Instância</label>
            <Select value={selectedInstance} onValueChange={setSelectedInstance}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {instances.map((instance) => (
                  <SelectItem key={instance.id} value={instance.id}>
                    <div className="flex items-center space-x-2">
                      <span>{instance.name}</span>
                      <Badge className={getStatusColor(instance.status)} variant="outline">
                        {getStatusText(instance.status)}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {currentInstance && (
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Status Atual</div>
              <Badge className={getStatusColor(currentInstance.status)}>{getStatusText(currentInstance.status)}</Badge>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-muted/20 rounded-lg p-4 text-center">
            <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold text-foreground">1,250</div>
            <div className="text-sm text-muted-foreground">Mensagens Enviadas</div>
          </div>
          <div className="bg-muted/20 rounded-lg p-4 text-center">
            <MessageSquare className="w-6 h-6 mx-auto mb-2 text-success" />
            <div className="text-2xl font-bold text-foreground">98.5%</div>
            <div className="text-sm text-muted-foreground">Taxa de Sucesso</div>
          </div>
          <div className="bg-muted/20 rounded-lg p-4 text-center">
            <Clock className="w-6 h-6 mx-auto mb-2 text-warning" />
            <div className="text-2xl font-bold text-foreground">2h 15m</div>
            <div className="text-sm text-muted-foreground">Tempo Restante</div>
          </div>
          <div className="bg-muted/20 rounded-lg p-4 text-center">
            <Zap className="w-6 h-6 mx-auto mb-2 text-chart-1" />
            <div className="text-2xl font-bold text-foreground">45/min</div>
            <div className="text-sm text-muted-foreground">Velocidade</div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4 pt-4 border-t border-border">
          <Button
            size="lg"
            onClick={() => setIsHeating(!isHeating)}
            className={isHeating ? "bg-destructive hover:bg-destructive/90" : "bg-success hover:bg-success/90"}
          >
            {isHeating ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Pausar Aquecimento
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Iniciar Aquecimento
              </>
            )}
          </Button>

          <Button variant="outline" size="lg">
            <Square className="w-5 h-5 mr-2" />
            Parar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
