
"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function HeatmapAnalysis() {
  const heatmapData = [
    { hour: "00", mon: 12, tue: 8, wed: 15, thu: 10, fri: 18, sat: 25, sun: 20 },
    { hour: "01", mon: 8, tue: 5, wed: 12, thu: 7, fri: 14, sat: 22, sun: 18 },
    { hour: "02", mon: 5, tue: 3, wed: 8, thu: 4, fri: 10, sat: 18, sun: 15 },
    { hour: "03", mon: 3, tue: 2, wed: 5, thu: 2, fri: 7, sat: 15, sun: 12 },
    { hour: "04", mon: 2, tue: 1, wed: 3, thu: 1, fri: 5, sat: 12, sun: 10 },
    { hour: "05", mon: 4, tue: 3, wed: 6, thu: 3, fri: 8, sat: 15, sun: 12 },
    { hour: "06", mon: 15, tue: 12, wed: 18, thu: 14, fri: 22, sat: 20, sun: 18 },
    { hour: "07", mon: 35, tue: 32, wed: 38, thu: 34, fri: 42, sat: 25, sun: 22 },
    { hour: "08", mon: 55, tue: 52, wed: 58, thu: 54, fri: 62, sat: 30, sun: 28 },
    { hour: "09", mon: 75, tue: 72, wed: 78, thu: 74, fri: 82, sat: 35, sun: 32 },
    { hour: "10", mon: 85, tue: 82, wed: 88, thu: 84, fri: 92, sat: 40, sun: 38 },
    { hour: "11", mon: 90, tue: 87, wed: 93, thu: 89, fri: 97, sat: 45, sun: 42 },
    { hour: "12", mon: 95, tue: 92, wed: 98, thu: 94, fri: 100, sat: 50, sun: 48 },
    { hour: "13", mon: 88, tue: 85, wed: 91, thu: 87, fri: 95, sat: 48, sun: 45 },
    { hour: "14", mon: 82, tue: 79, wed: 85, thu: 81, fri: 89, sat: 45, sun: 42 },
    { hour: "15", mon: 78, tue: 75, wed: 81, thu: 77, fri: 85, sat: 42, sun: 40 },
    { hour: "16", mon: 72, tue: 69, wed: 75, thu: 71, fri: 79, sat: 38, sun: 36 },
    { hour: "17", mon: 65, tue: 62, wed: 68, thu: 64, fri: 72, sat: 35, sun: 32 },
    { hour: "18", mon: 58, tue: 55, wed: 61, thu: 57, fri: 65, sat: 32, sun: 30 },
    { hour: "19", mon: 45, tue: 42, wed: 48, thu: 44, fri: 52, sat: 28, sun: 26 },
    { hour: "20", mon: 35, tue: 32, wed: 38, thu: 34, fri: 42, sat: 25, sun: 22 },
    { hour: "21", mon: 28, tue: 25, wed: 31, thu: 27, fri: 35, sat: 22, sun: 20 },
    { hour: "22", mon: 22, tue: 19, wed: 25, thu: 21, fri: 29, sat: 18, sun: 16 },
    { hour: "23", mon: 18, tue: 15, wed: 21, thu: 17, fri: 25, sat: 15, sun: 13 },
  ]

  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
  const dayNames = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]

  const getIntensityColor = (value: number) => {
    if (value === 0) return "bg-gray-800"
    if (value <= 20) return "bg-blue-900"
    if (value <= 40) return "bg-blue-700"
    if (value <= 60) return "bg-blue-500"
    if (value <= 80) return "bg-blue-400"
    return "bg-blue-300"
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Mapa de Calor - Atividade</CardTitle>
        <CardDescription className="text-muted-foreground">
          Análise de atividade por hora e dia da semana
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-8 gap-1 text-xs">
            <div></div>
            {dayNames.map((day) => (
              <div key={day} className="text-center text-muted-foreground font-medium">
                {day}
              </div>
            ))}
          </div>

          {heatmapData.map((row) => (
            <div key={row.hour} className="grid grid-cols-8 gap-1">
              <div className="text-xs text-muted-foreground font-medium w-8">{row.hour}:00</div>
              {days.map((day) => (
                <div
                  key={day}
                  className={`h-4 w-full rounded-sm ${getIntensityColor(row[day as keyof typeof row] as number)}`}
                  title={`${dayNames[days.indexOf(day)]} ${row.hour}:00 - ${row[day as keyof typeof row]} mensagens`}
                />
              ))}
            </div>
          ))}

          <div className="flex items-center justify-between text-xs text-muted-foreground mt-4">
            <span>Menos ativo</span>
            <div className="flex space-x-1">
              <div className="h-3 w-3 rounded-sm bg-gray-800"></div>
              <div className="h-3 w-3 rounded-sm bg-blue-900"></div>
              <div className="h-3 w-3 rounded-sm bg-blue-700"></div>
              <div className="h-3 w-3 rounded-sm bg-blue-500"></div>
              <div className="h-3 w-3 rounded-sm bg-blue-400"></div>
              <div className="h-3 w-3 rounded-sm bg-blue-300"></div>
            </div>
            <span>Mais ativo</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
