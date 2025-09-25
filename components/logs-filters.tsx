"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Filter, RefreshCw } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export function LogsFilters() {
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [selectedLevels, setSelectedLevels] = useState<string[]>(["info", "warning", "error"])
  const [selectedInstances, setSelectedInstances] = useState<string[]>([])

  const logLevels = [
    { id: "info", label: "Info", color: "text-primary" },
    { id: "success", label: "Sucesso", color: "text-success" },
    { id: "warning", label: "Aviso", color: "text-warning" },
    { id: "error", label: "Erro", color: "text-destructive" },
  ]

  const instances = [
    { id: "inst_001", name: "Instância Principal" },
    { id: "inst_002", name: "Instância Backup" },
    { id: "inst_003", name: "Instância Teste" },
    { id: "inst_004", name: "Instância Nova" },
  ]

  const handleLevelChange = (levelId: string, checked: boolean) => {
    if (checked) {
      setSelectedLevels([...selectedLevels, levelId])
    } else {
      setSelectedLevels(selectedLevels.filter((id) => id !== levelId))
    }
  }

  const handleInstanceChange = (instanceId: string, checked: boolean) => {
    if (checked) {
      setSelectedInstances([...selectedInstances, instanceId])
    } else {
      setSelectedInstances(selectedInstances.filter((id) => id !== instanceId))
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Buscar</Label>
          <Input placeholder="Buscar nos logs..." />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Período</Label>
          <div className="grid grid-cols-2 gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? format(dateFrom, "dd/MM", { locale: ptBR }) : "De"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateTo ? format(dateTo, "dd/MM", { locale: ptBR }) : "Até"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Nível do Log</Label>
          <div className="space-y-2">
            {logLevels.map((level) => (
              <div key={level.id} className="flex items-center space-x-2">
                <Checkbox
                  id={level.id}
                  checked={selectedLevels.includes(level.id)}
                  onCheckedChange={(checked) => handleLevelChange(level.id, checked as boolean)}
                />
                <Label htmlFor={level.id} className={`text-sm ${level.color}`}>
                  {level.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Instâncias</Label>
          <div className="space-y-2">
            {instances.map((instance) => (
              <div key={instance.id} className="flex items-center space-x-2">
                <Checkbox
                  id={instance.id}
                  checked={selectedInstances.includes(instance.id)}
                  onCheckedChange={(checked) => handleInstanceChange(instance.id, checked as boolean)}
                />
                <Label htmlFor={instance.id} className="text-sm">
                  {instance.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Ação</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Todas as ações" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as ações</SelectItem>
              <SelectItem value="message_sent">Mensagem Enviada</SelectItem>
              <SelectItem value="message_failed">Mensagem Falhada</SelectItem>
              <SelectItem value="instance_connected">Instância Conectada</SelectItem>
              <SelectItem value="instance_disconnected">Instância Desconectada</SelectItem>
              <SelectItem value="heating_started">Aquecimento Iniciado</SelectItem>
              <SelectItem value="heating_completed">Aquecimento Concluído</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex space-x-2">
          <Button className="flex-1">Aplicar Filtros</Button>
          <Button variant="outline" size="icon">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
