"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function ConversionMetrics() {
  const conversions = [
    { stage: "Mensagem Enviada", count: 1247, percentage: 100, color: "bg-blue-500" },
    { stage: "Mensagem Lida", count: 1089, percentage: 87.3, color: "bg-green-500" },
    { stage: "Resposta Recebida", count: 456, percentage: 36.6, color: "bg-yellow-500" },
    { stage: "Conversão Final", count: 123, percentage: 9.9, color: "bg-purple-500" },
  ]

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Funil de Conversão</CardTitle>
        <CardDescription className="text-muted-foreground">Análise do funil de conversão das campanhas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {conversions.map((conversion, index) => (
          <div key={conversion.stage} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{conversion.stage}</span>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  {conversion.count.toLocaleString()}
                </Badge>
                <span className="text-sm text-muted-foreground">{conversion.percentage}%</span>
              </div>
            </div>
            <Progress value={conversion.percentage} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
