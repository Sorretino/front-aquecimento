import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Plus, Settings } from "lucide-react"

export function WorkflowBuilder() {
  const workflows = [
    {
      id: 1,
      name: "Onboarding Automático",
      steps: ["Mensagem de boas-vindas", "Enviar tutorial", "Agendar follow-up"],
      status: "active",
      executions: 234,
    },
    {
      id: 2,
      name: "Recuperação de Carrinho",
      steps: ["Detectar abandono", "Aguardar 1 hora", "Enviar lembrete"],
      status: "draft",
      executions: 0,
    },
  ]

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground">Construtor de Workflows</CardTitle>
            <CardDescription className="text-muted-foreground">
              Crie fluxos automatizados personalizados
            </CardDescription>
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Novo Workflow
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {workflows.map((workflow) => (
            <div key={workflow.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium text-foreground">{workflow.name}</h4>
                  <Badge variant={workflow.status === "active" ? "default" : "secondary"}>
                    {workflow.status === "active" ? "Ativo" : "Rascunho"}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">{workflow.executions} execuções</span>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2 overflow-x-auto">
                {workflow.steps.map((step, index) => (
                  <div key={index} className="flex items-center space-x-2 flex-shrink-0">
                    <div className="bg-primary/10 border border-primary/20 rounded-lg px-3 py-2 text-sm text-foreground whitespace-nowrap">
                      {step}
                    </div>
                    {index < workflow.steps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
