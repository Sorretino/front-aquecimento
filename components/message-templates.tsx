"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Plus, Edit, Trash2 } from "lucide-react"

const templates = [
  {
    id: 1,
    name: "Saudação Inicial",
    message: "Olá! Como você está hoje?",
    category: "greeting",
    usage: 45,
  },
  {
    id: 2,
    name: "Pergunta Casual",
    message: "Você viu as novidades de hoje?",
    category: "casual",
    usage: 32,
  },
  {
    id: 3,
    name: "Compartilhamento",
    message: "Achei isso interessante e pensei em você!",
    category: "sharing",
    usage: 28,
  },
  {
    id: 4,
    name: "Check-in",
    message: "Tudo bem por aí?",
    category: "checkin",
    usage: 38,
  },
]

const getCategoryColor = (category: string) => {
  switch (category) {
    case "greeting":
      return "bg-success/10 text-success border-success/20"
    case "casual":
      return "bg-primary/10 text-primary border-primary/20"
    case "sharing":
      return "bg-warning/10 text-warning border-warning/20"
    case "checkin":
      return "bg-chart-5/10 text-chart-5 border-chart-5/20"
    default:
      return "bg-muted/10 text-muted-foreground border-muted/20"
  }
}

const getCategoryName = (category: string) => {
  switch (category) {
    case "greeting":
      return "Saudação"
    case "casual":
      return "Casual"
    case "sharing":
      return "Compartilhamento"
    case "checkin":
      return "Check-in"
    default:
      return "Outros"
  }
}

export function MessageTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Templates de Mensagens
          </CardTitle>
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Novo
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          <div className="space-y-3">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedTemplate === template.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-foreground">{template.name}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge className={getCategoryColor(template.category)} variant="outline">
                      {getCategoryName(template.category)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{template.usage} usos</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{template.message}</p>
              </div>
            ))}
          </div>
        </ScrollArea>

        {selectedTemplate && (
          <div className="mt-4 pt-4 border-t border-border space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-foreground">Editar Template</h4>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="text-destructive bg-transparent">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Textarea
              placeholder="Digite sua mensagem..."
              value={templates.find((t) => t.id === selectedTemplate)?.message || ""}
              className="min-h-[80px]"
            />
            <Button size="sm" className="w-full">
              Salvar Alterações
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
