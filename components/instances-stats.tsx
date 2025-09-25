// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Users, Zap, CheckCircle, XCircle, TrendingUp, Clock } from "lucide-react"

// const stats = [
//   {
//     title: "Total de Instâncias",
//     value: "4",
//     description: "3 ativas, 1 offline",
//     icon: Users,
//     color: "text-primary",
//   },
//   {
//     title: "Em Aquecimento",
//     value: "2",
//     description: "Progresso médio: 50%",
//     icon: Zap,
//     color: "text-warning",
//   },
//   {
//     title: "Online",
//     value: "1",
//     description: "Funcionando normalmente",
//     icon: CheckCircle,
//     color: "text-success",
//   },
//   {
//     title: "Offline",
//     value: "1",
//     description: "Requer atenção",
//     icon: XCircle,
//     color: "text-destructive",
//   },
//   {
//     title: "Mensagens Hoje",
//     value: "3,670",
//     description: "+15% vs ontem",
//     icon: TrendingUp,
//     color: "text-success",
//   },
//   {
//     title: "Tempo Médio Aquecimento",
//     value: "4.2h",
//     description: "Por instância",
//     icon: Clock,
//     color: "text-muted-foreground",
//   },
// ]

// export function InstancesStats() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
//       {stats.map((stat, index) => (
//         <Card key={index} className="bg-card border-border">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
//             <stat.icon className={`h-4 w-4 ${stat.color}`} />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
//             <p className="text-xs text-muted-foreground">{stat.description}</p>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   )
// }
"use client"
import { getInstancesHeaterCount } from "@/actions/aquecimento/instance-heater-action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Zap, CheckCircle, XCircle, TrendingUp, Clock } from "lucide-react"
import { useEffect, useState } from "react";
//import { Instance } from "@/types" // supondo que você tenha um type

interface InstancesStatsProps {
  heaterMetric: any;
  status: string;
  instances: any[]
}

export function InstancesStats() {
const [instances, setInstances] = useState<InstancesStatsProps[]>([]);

      useEffect(() => {
     // fetchInstances();
      fetchInstancesHeater();
    }, []);
  
     const fetchInstancesHeater = async () => {
      try {
        const response = await getInstancesHeaterCount();
        if (response) {
          setInstances(response);
          //console.log("Instâncias encontradas:", response);
        } else {
          console.error("A resposta da API está vazia ou indefinida.");
        }
      } catch (error) {
        console.error("Erro ao buscar instâncias:", error);
      }
    };

  // Total de instâncias
  const totalInstances = instances.length

  // Em aquecimento (status === "heater")
  const heatingInstances = instances.filter(i => i.status === "heater")
  const heatingCount = heatingInstances.length
  const avgHeatingProgress = heatingInstances.length
    ? (heatingInstances.reduce((acc, i) => acc + (i.heaterMetric[0]?.responseRate || 0), 0) /
       heatingInstances.length).toFixed(1)
    : 0

  // Online (status === "online")
  const onlineCount = instances.filter(i => i.status === "online").length

  // Offline (status === "offline")
  const offlineCount = instances.filter(i => i.status === "offline").length

  // Mensagens hoje (somando sentCount)
  const totalMessagesToday = instances.reduce((acc, i) => acc + (i.heaterMetric[0]?.sentCount || 0), 0)

  // Tempo médio de aquecimento
  const avgHeatingTime = heatingInstances.length
    ? (heatingInstances.reduce((acc, i) => acc + (i.heaterMetric[0]?.heatingHours || 0), 0) / heatingInstances.length).toFixed(1)
    : 0

  const stats = [
    {
      title: "Total de Instâncias",
      value: totalInstances.toString(),
      description: `${onlineCount} ativas, ${offlineCount} offline`,
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Em Aquecimento",
      value: heatingCount.toString(),
      description: `Progresso médio: ${avgHeatingProgress}%`,
      icon: Zap,
      color: "text-warning",
    },
    {
      title: "Online",
      value: onlineCount.toString(),
      description: "Funcionando normalmente",
      icon: CheckCircle,
      color: "text-success",
    },
    {
      title: "Offline",
      value: offlineCount.toString(),
      description: "Requer atenção",
      icon: XCircle,
      color: "text-destructive",
    },
    {
      title: "Mensagens Hoje",
      value: totalMessagesToday.toLocaleString(),
      description: "+15% vs ontem",
      icon: TrendingUp,
      color: "text-success",
    },
    {
      title: "Tempo Médio Aquecimento",
      value: avgHeatingTime + "h",
      description: "Por instância",
      icon: Clock,
      color: "text-muted-foreground",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
