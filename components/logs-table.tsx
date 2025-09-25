"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Eye, Download, RefreshCw } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const logs = [
  {
    id: "log_001",
    timestamp: new Date("2024-01-22T15:30:25"),
    level: "success",
    instance: "Instância Principal",
    action: "message_sent",
    message: "Mensagem enviada com sucesso para +55 11 99999-1234",
    details: {
      recipient: "+55 11 99999-1234",
      messageId: "msg_12345",
      responseTime: "1.2s",
      template: "Saudação Inicial",
    },
  },
  {
    id: "log_002",
    timestamp: new Date("2024-01-22T15:29:45"),
    level: "error",
    instance: "Instância Backup",
    action: "message_failed",
    message: "Falha ao enviar mensagem: Número inválido",
    details: {
      recipient: "+55 11 invalid",
      error: "Invalid phone number format",
      retryCount: 3,
      template: "Check-in",
    },
  },
  {
    id: "log_003",
    timestamp: new Date("2024-01-22T15:29:12"),
    level: "info",
    instance: "Instância Principal",
    action: "heating_progress",
    message: "Progresso do aquecimento: 75% concluído",
    details: {
      progress: 75,
      messagesCount: 1250,
      estimatedCompletion: "16:45",
      phase: "Aquecimento Médio",
    },
  },
  {
    id: "log_004",
    timestamp: new Date("2024-01-22T15:28:33"),
    level: "warning",
    instance: "Instância Teste",
    action: "instance_disconnected",
    message: "Instância desconectada inesperadamente",
    details: {
      reason: "Connection timeout",
      lastActivity: "15:25:10",
      reconnectAttempts: 2,
      status: "Attempting reconnection",
    },
  },
  {
    id: "log_005",
    timestamp: new Date("2024-01-22T15:27:58"),
    level: "success",
    instance: "Instância Nova",
    action: "heating_started",
    message: "Aquecimento iniciado com configurações padrão",
    details: {
      messagesPerMinute: 45,
      maxMessages: 500,
      template: "Múltiplos templates",
      estimatedDuration: "4.2h",
    },
  },
]

const getLevelColor = (level: string) => {
  switch (level) {
    case "success":
      return "bg-success/10 text-success border-success/20"
    case "info":
      return "bg-primary/10 text-primary border-primary/20"
    case "warning":
      return "bg-warning/10 text-warning border-warning/20"
    case "error":
      return "bg-destructive/10 text-destructive border-destructive/20"
    default:
      return "bg-muted/10 text-muted-foreground border-muted/20"
  }
}

const getLevelText = (level: string) => {
  switch (level) {
    case "success":
      return "Sucesso"
    case "info":
      return "Info"
    case "warning":
      return "Aviso"
    case "error":
      return "Erro"
    default:
      return "Desconhecido"
  }
}

const getActionText = (action: string) => {
  switch (action) {
    case "message_sent":
      return "Mensagem Enviada"
    case "message_failed":
      return "Mensagem Falhada"
    case "instance_connected":
      return "Instância Conectada"
    case "instance_disconnected":
      return "Instância Desconectada"
    case "heating_started":
      return "Aquecimento Iniciado"
    case "heating_progress":
      return "Progresso Aquecimento"
    case "heating_completed":
      return "Aquecimento Concluído"
    default:
      return action
  }
}

export function LogsTable() {
  const [selectedLog, setSelectedLog] = useState<(typeof logs)[0] | null>(null)

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-card-foreground">Logs Recentes</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Nível</TableHead>
                <TableHead>Instância</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>Mensagem</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium text-foreground">
                        {format(log.timestamp, "HH:mm:ss", { locale: ptBR })}
                      </div>
                      <div className="text-muted-foreground">
                        {format(log.timestamp, "dd/MM/yyyy", { locale: ptBR })}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getLevelColor(log.level)}>{getLevelText(log.level)}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-foreground">{log.instance}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{getActionText(log.action)}</span>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-md">
                      <p className="text-sm text-foreground truncate">{log.message}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedLog(log)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Detalhes do Log</DialogTitle>
                          <DialogDescription>
                            {format(log.timestamp, "dd/MM/yyyy 'às' HH:mm:ss", { locale: ptBR })}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Nível</label>
                              <div className="mt-1">
                                <Badge className={getLevelColor(log.level)}>{getLevelText(log.level)}</Badge>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Instância</label>
                              <p className="text-sm text-foreground mt-1">{log.instance}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Ação</label>
                              <p className="text-sm text-foreground mt-1">{getActionText(log.action)}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">ID do Log</label>
                              <p className="text-sm text-foreground mt-1 font-mono">{log.id}</p>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Mensagem</label>
                            <p className="text-sm text-foreground mt-1">{log.message}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Detalhes</label>
                            <div className="mt-1 bg-muted/20 rounded-lg p-3">
                              <pre className="text-xs text-foreground whitespace-pre-wrap">
                                {JSON.stringify(log.details, null, 2)}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
