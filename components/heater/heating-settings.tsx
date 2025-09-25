// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Play, Pause, Square, Zap, Users, Clock, MessageSquare } from "lucide-react"

// const instances = [
//   { id: "inst_001", name: "Instância Principal", status: "heating", progress: 75 },
//   { id: "inst_002", name: "Instância Backup", status: "online", progress: 100 },
//   { id: "inst_003", name: "Instância Teste", status: "offline", progress: 0 },
//   { id: "inst_004", name: "Instância Nova", status: "ready", progress: 0 },
// ]

// export function HeatingInstancesSettings() {
//   const [selectedInstance, setSelectedInstance] = useState("inst_001")
//   const [isHeating, setIsHeating] = useState(true)

//   const currentInstance = instances.find((i) => i.id === selectedInstance)

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "online":
//         return "bg-success/10 text-success border-success/20"
//       case "heating":
//         return "bg-warning/10 text-warning border-warning/20"
//       case "offline":
//         return "bg-destructive/10 text-destructive border-destructive/20"
//       case "ready":
//         return "bg-primary/10 text-primary border-primary/20"
//       default:
//         return "bg-muted/10 text-muted-foreground border-muted/20"
//     }
//   }

//   const getStatusText = (status: string) => {
//     switch (status) {
//       case "online":
//         return "Online"
//       case "heating":
//         return "Aquecendo"
//       case "offline":
//         return "Offline"
//       case "ready":
//         return "Pronto"
//       default:
//         return "Desconhecido"
//     }
//   }

//   return (
//     <Card className="bg-card border-border">
//       <CardHeader>
//         <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
//           <Zap className="w-5 h-5 mr-2" />
//           Controle de Aquecimento
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-foreground">Selecionar Instância</label>
//             <Select value={selectedInstance} onValueChange={setSelectedInstance}>
//               <SelectTrigger className="w-64">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 {instances.map((instance) => (
//                   <SelectItem key={instance.id} value={instance.id}>
//                     <div className="flex items-center space-x-2">
//                       <span>{instance.name}</span>
//                       <Badge className={getStatusColor(instance.status)} variant="outline">
//                         {getStatusText(instance.status)}
//                       </Badge>
//                     </div>
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {currentInstance && (
//             <div className="text-right">
//               <div className="text-sm text-muted-foreground">Status Atual</div>
//               <Badge className={getStatusColor(currentInstance.status)}>{getStatusText(currentInstance.status)}</Badge>
//             </div>
//           )}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div className="bg-muted/20 rounded-lg p-4 text-center">
//             <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
//             <div className="text-2xl font-bold text-foreground">1,250</div>
//             <div className="text-sm text-muted-foreground">Mensagens Enviadas</div>
//           </div>
//           <div className="bg-muted/20 rounded-lg p-4 text-center">
//             <MessageSquare className="w-6 h-6 mx-auto mb-2 text-success" />
//             <div className="text-2xl font-bold text-foreground">98.5%</div>
//             <div className="text-sm text-muted-foreground">Taxa de Sucesso</div>
//           </div>
//           <div className="bg-muted/20 rounded-lg p-4 text-center">
//             <Clock className="w-6 h-6 mx-auto mb-2 text-warning" />
//             <div className="text-2xl font-bold text-foreground">2h 15m</div>
//             <div className="text-sm text-muted-foreground">Tempo Restante</div>
//           </div>
//           <div className="bg-muted/20 rounded-lg p-4 text-center">
//             <Zap className="w-6 h-6 mx-auto mb-2 text-chart-1" />
//             <div className="text-2xl font-bold text-foreground">45/min</div>
//             <div className="text-sm text-muted-foreground">Velocidade</div>
//           </div>
//         </div>

//         <div className="flex items-center justify-center space-x-4 pt-4 border-t border-border">
//           <Button
//             size="lg"
//             onClick={() => setIsHeating(!isHeating)}
//             className={isHeating ? "bg-destructive hover:bg-destructive/90" : "bg-success hover:bg-success/90"}
//           >
//             {isHeating ? (
//               <>
//                 <Pause className="w-5 h-5 mr-2" />
//                 Pausar Aquecimento
//               </>
//             ) : (
//               <>
//                 <Play className="w-5 h-5 mr-2" />
//                 Iniciar Aquecimento
//               </>
//             )}
//           </Button>

//           <Button variant="outline" size="lg">
//             <Square className="w-5 h-5 mr-2" />
//             Parar
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { getRunningStatus, getWhatsappInstances, startConversationAction, stopConversationAction } from "@/actions/aquecimento/aquecedores.action"
import { toast } from "react-hot-toast"
import { Zap, Play, Pause, Square } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface InstanceEvo {
  instanceId: string
  name: string
  phoneNumber: string
  connectionStatus: string
  profilePicUrl?: string
}

export default function InstanceSelector() {
  const [instances, setInstances] = useState<InstanceEvo[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [isHeating, setIsHeating] = useState(false)
  const [loading, setLoading] = useState(false)

 const apiUrl = `${process.env.NEXT_PUBLIC_MESSAGE_HEATER_API_URL}`
   const apiKey = `${process.env.NEXT_PUBLIC_HEATER_API_KEY}`

  const startHeating = async (selectedInstances: any[]) => {
    try {
      // const response = await fetch(`https://multatendiment-aquecimento.ybrsom.easypanel.host/warmup/start-conversation`, {
      //   method: "POST",
      //   // headers: {
      //   //   "Content-Type": "application/json",
      //   //   // Authorization: `Bearer ${apiKey}`,
      //   // },
      //   body: JSON.stringify({ selectedInstances }),
      // })
 const response  = await startConversationAction({ selectedInstances })

      if (!response) {
        throw new Error(`Erro na API: ${response.status}`)
      }

      return await response
    } catch (error) {
      console.error("Erro ao iniciar aquecimento:", error)
      throw error
    }
  }

  const stopHeating = async () => {
    try {

       const response  = await stopConversationAction()
      // const response = await fetch(`https://multatendiment-aquecimento.ybrsom.easypanel.host/warmup/stop-conversation`, {
      //   method: "POST",
      //   // headers: {
      //   //   "Content-Type": "application/json",
      //   //   Authorization: `Bearer ${apiKey}`,
      //   // },
      // })

      if (!response) {
        throw new Error(`Erro na API: ${response.status}`)
      }

      return await response
    } catch (error) {
      console.error("Erro ao parar aquecimento:", error)
      throw error
    }
  }

  const checkInitialStatus = async () => {
    try {
      console.log("[v0] Verificando status inicial...")
      const runningInstances = await getRunningStatus()
      console.log("[v0] Status da API:", runningInstances)

      if (!runningInstances) {
        console.log("[v0] Nenhuma instância rodando, definindo isHeating como false")
        setIsHeating(false)
        return
      }

      const runningArray = Array.isArray(runningInstances) ? runningInstances : [runningInstances]
      const anyRunning = runningArray.some((inst) => inst && inst.running === true)
      console.log("[v0] Alguma instância rodando?", anyRunning)
      setIsHeating(anyRunning)
    } catch (err) {
      console.error("Erro ao verificar status inicial:", err)
    }
  }

  useEffect(() => {
    const loadInstances = async () => {
      try {
        const data = await getWhatsappInstances(apiUrl, apiKey)
        const mapped = data.map((inst: any) => ({
          instanceId: inst.id,
          name: inst.name,
          phoneNumber: inst.ownerJid.split("@")[0],
          connectionStatus: inst.connectionStatus,
          profilePicUrl: inst.profilePicUrl,
        }))
        setInstances(mapped)
        await checkInitialStatus()
      } catch (err) {
        console.error(err)
        toast.error("Erro ao carregar instâncias")
      }
    }
    loadInstances()
  }, [apiUrl, apiKey])

  const toggleInstance = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  const handleToggle = async () => {
    console.log("[v0] handleToggle chamado, isHeating atual:", isHeating)

    if (!isHeating) {
      const selectedInstances = instances
        .filter((i) => selected.includes(i.instanceId))
        .map((i) => ({ instanceId: i.name, phoneNumber: i.phoneNumber }))

      if (selectedInstances.length === 0) {
        toast.error("Selecione ao menos uma instância!")
        return
      }
    }

    try {
      console.log("[v0] Iniciando toggle...")

      if (isHeating) {
        console.log("[v0] Parando aquecimento...")
        setIsHeating(false) // Muda o estado imediatamente

        await stopHeating()

        console.log("[v0] Aquecimento parado com sucesso")
        toast.success("Aquecimento parado!")
      } else {
        console.log("[v0] Iniciando aquecimento...")
        const selectedInstances = instances
          .filter((i) => selected.includes(i.instanceId))
          .map((i) => ({ instanceId: i.name, phoneNumber: i.phoneNumber }))

        setIsHeating(true) // Muda o estado imediatamente

        await startHeating(selectedInstances)

        console.log("[v0] Aquecimento iniciado com sucesso")
        toast.success("Aquecimento iniciado!")
      }
    } catch (err) {
      console.log("[v0] Erro no toggle, revertendo estado")
      setIsHeating(!isHeating) // Reverte o estado em caso de erro
      console.error("Erro no toggle:", err)
      toast.error("Erro ao alterar estado do aquecimento")
    }
  }

  const getStatusColor = (status?: string) => {
    if (status === "open") return "bg-green-500/10 text-green-500"
    if (status === "close") return "bg-red-500/10 text-red-500"
    if (status === "connecting") return "bg-warning/10 text-warning border-warning/20"
    return "bg-gray-500/10 text-gray-500"
  }

  const getStatusText = (status?: string) => {
    if (status === "open") return "Conectado"
    if (status === "close") return "Desconectado"
    if (status === "connecting") return "Conectando"
    return "Indefinido"
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
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {instances.map((inst) => {
            const isActive = selected.includes(inst.instanceId)
            const isConnected = inst.connectionStatus === "open"

            return (
              <Card
                key={inst.instanceId}
                onClick={() => isConnected && toggleInstance(inst.instanceId)}
                className={`transition-all cursor-pointer rounded-xl shadow-sm hover:shadow-md ${
                  isActive ? "border-primary bg-primary/5" : "border border-muted"
                } ${!isConnected && "opacity-50 cursor-not-allowed"}`}
              >
                <CardContent className="p-3 flex flex-col items-center gap-2 text-center">
                  <img
                    src={inst.profilePicUrl || "/placeholder.svg"}
                    alt={inst.name}
                    className="w-10 h-10 rounded-full ring-1 ring-muted"
                  />
                  <div>
                    <h3 className="font-medium text-xs truncate">{inst.name}</h3>
                    <p className="text-[11px] text-muted-foreground truncate">{inst.phoneNumber}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-[10px] px-2 py-0.5 rounded-full ${getStatusColor(inst.connectionStatus)}`}
                  >
                    {getStatusText(inst.connectionStatus)}
                  </Badge>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="flex items-center justify-center space-x-4 pt-4 border-t border-border">
          <Button
            size="lg"
            onClick={handleToggle}
            className={isHeating ? "bg-destructive hover:bg-destructive/90" : "bg-success hover:bg-success/90"}
          >
            {isHeating ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Parar Aquecimento
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Iniciar Aquecimento
              </>
            )}
          </Button>

          <Button variant="outline" size="lg" onClick={checkInitialStatus} disabled={loading}>
            <Square className="w-5 h-5 mr-2" />
            Verificar Status
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}





// "use client"

// import { useEffect, useState } from "react"
// import {
//   startConversationAction,
//   stopConversationAction,
//   getRunningStatus,
//   getWhatsappInstances,
// } from "@/actions/aquecimento/aquecedores.action"
// //import { toast } from "react-toastify"
// import {  toast } from "react-hot-toast"
// import {
//   Check,
//   Smartphone,
//   Zap,
//   Play,
//   Pause,
//   Square,
// } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"

// interface InstanceEvo {
//   instanceId: string
//   name: string
//   phoneNumber: string
//   connectionStatus: string
//   profilePicUrl?: string
// }

// export default function InstanceSelector() {
//   const [instances, setInstances] = useState<InstanceEvo[]>([])
//   const [selected, setSelected] = useState<string[]>([])
//   const [isRunning, setIsRunning] = useState(false)
//   const [loading, setLoading] = useState(false)

//     const [selectedInstance, setSelectedInstance] = useState("inst_001")
//   const [isHeating, setIsHeating] = useState(false)

//   const apiUrl = `${process.env.NEXT_PUBLIC_MESSAGE_HEATER_API_URL}`
//   const apiKey = `${process.env.NEXT_PUBLIC_HEATER_API_KEY}`

//   const checkRunningStatus = async () => {
//     try {
//       const runningInstances = await getRunningStatus()
//       if (!runningInstances) return isRunning
//       const runningArray = Array.isArray(runningInstances)
//         ? runningInstances
//         : [runningInstances]
//       const anyRunning = runningArray.some(
//         (inst) => inst && inst.running === true,
//       )
//       setIsRunning(anyRunning)
//       return anyRunning
//     } catch (err) {
//       console.error("Erro ao verificar status:", err)
//        toast.error("Erro ao carregar instâncias")
//       setLoading(false)
//       return isRunning
//     }
//   }
// useEffect(() => {
//   const interval = setInterval(async () => {
//     try {
//       const runningInstances = await getRunningStatus()
//        console.warn("runningInstances:", runningInstances)
//       const runningArray = Array.isArray(runningInstances)
//         ? runningInstances
//         : [runningInstances]
//       const anyRunning = runningArray.some(inst => inst && inst.running === true)
//       setIsRunning(anyRunning)
//       console.log("verificar status:", anyRunning)
//     } catch (err) {
//       console.error("Erro ao verificar status:", err)
//     }
//   }, 25000) // verifica a cada 5 segundos

//   return () => clearInterval(interval) // limpa o intervalo ao desmontar
// }, [])

//   useEffect(() => {
//     const loadInstances = async () => {
//       try {
//         const data = await getWhatsappInstances(apiUrl, apiKey)
//         const mapped = data.map((inst: any) => ({
//           instanceId: inst.id,
//           name: inst.name,
//           phoneNumber: inst.ownerJid.split("@")[0],
//           connectionStatus: inst.connectionStatus,
//           profilePicUrl: inst.profilePicUrl,
//         }))
//         setInstances(mapped)
//         await checkRunningStatus()
//       } catch (err) {
//         console.error(err)
//         toast.error("Erro ao carregar instâncias")
//       }
//     }
//     loadInstances()
//   }, [apiUrl, apiKey])

//   const toggleInstance = (id: string) => {
//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
//     )
//   }

// const handleToggle = async () => {
//   const selectedInstances = instances
//     .filter((i) => selected.includes(i.instanceId))
//     .map((i) => ({ instanceId: i.name, phoneNumber: i.phoneNumber }))

//   if (!isRunning && selectedInstances.length === 0) {
//     toast.error("Selecione ao menos uma instância!")
//     return
//   }

//   try {
//     setLoading(true)

//     if (isRunning) {
//       await stopConversationAction(selectedInstances)
//       setIsRunning(false)
//       toast.success("Conversas paradas com sucesso!")
//     } else {
//       await startConversationAction({ selectedInstances })
//       setIsRunning(true)
//       toast.success("Conversas iniciadas com sucesso!") // mover depois do await + setIsRunning
//     }
//   } catch (err) {
//     console.error("Erro no toggle:", err)
//     toast.error("Erro ao alterar estado")
//   } finally {
//     setLoading(false)
//   }
// }


//   console.log('INSTANCE', instances)
//   const getStatusColor = (status?: string) => {
//     if (status === "open") return "bg-green-500/10 text-green-500"
//     if (status === "close") return "bg-red-500/10 text-red-500"
//      if (status === "connecting") return "bg-warning/10 text-warning border-warning/20"
//     return "bg-gray-500/10 text-gray-500"
//   }

//   const getStatusText = (status?: string) => {
//     if (status === "open") return "Conectado"
//     if (status === "close") return "Desconectado"
//      if (status === "connecting") return "Conectando"
    
//     return "Indefinido"
//   }

//   return (
//     <Card className="bg-card border-border">
//       <CardHeader>
//         <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
//           <Zap className="w-5 h-5 mr-2" />
//           Controle de Aquecimento
//         </CardTitle>
//       </CardHeader>

//       <CardContent className="space-y-6">
//      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
//   {instances.map((inst) => {
//     const isActive = selected.includes(inst.instanceId)
//     const isConnected = inst.connectionStatus === "open"

//     return (
//       <Card
//         key={inst.instanceId}
//         onClick={() => isConnected && toggleInstance(inst.instanceId)}
//         className={`transition-all cursor-pointer rounded-xl shadow-sm hover:shadow-md ${
//           isActive ? "border-primary bg-primary/5" : "border border-muted"
//         } ${!isConnected && "opacity-50 cursor-not-allowed"}`}
//       >
//         <CardContent className="p-3 flex flex-col items-center gap-2 text-center">
//           <img
//             src={inst.profilePicUrl || "/placeholder.svg"}
//             alt={inst.name}
//             className="w-10 h-10 rounded-full ring-1 ring-muted"
//           />
//           <div>
//             <h3 className="font-medium text-xs truncate">{inst.name}</h3>
//             <p className="text-[11px] text-muted-foreground truncate">
//               {inst.phoneNumber}
//             </p>
//           </div>
//           <Badge
//             variant="outline"
//             className={`text-[10px] px-2 py-0.5 rounded-full ${getStatusColor(
//               inst.connectionStatus
//             )}`}
//           >
//             {getStatusText(inst.connectionStatus)}
//           </Badge>
//         </CardContent>
//       </Card>
//     )
//   })}
// </div>




//         <div className="flex items-center justify-center space-x-4 pt-4 border-t border-border">
//           <Button
//             size="lg"
//             onClick={handleToggle}
//             disabled={loading}
//             className={
//               isRunning
//                 ? "bg-destructive hover:bg-destructive/90"
//                 : "bg-success hover:bg-success/90"
//             }
//           >
//             {isRunning ? (
//               <>
//                 <Pause className="w-5 h-5 mr-2" />
//                 Pausar Conversa
//               </>
//             ) : (
//               <>
//                 <Play className="w-5 h-5 mr-2" />
//                 Iniciar Conversa
//               </>
//             )}
//           </Button>

//           <Button
//             variant="outline"
//             size="lg"
//             onClick={checkRunningStatus}
//             disabled={loading}
//           >
//             <Square className="w-5 h-5 mr-2" />
//             Verificar Status
//           </Button>

//           <Button
//   size="lg"
//   onClick={async () => {
//     await handleToggle() // chama sua função
//     setIsHeating(!isHeating)   // alterna o estado
//   }}
//   className={isHeating ? "bg-destructive hover:bg-destructive/90" : "bg-success hover:bg-success/90"}
//   disabled={loading}
// >
//   {isHeating ? (
//     <>
//       <Pause className="w-5 h-5 mr-2" />
//       Pausar Aquecimento
//     </>
//   ) : (
//     <>
//       <Play className="w-5 h-5 mr-2" />
//       Iniciar Aquecimento v2
//     </>
//   )}
// </Button>


          
//         </div>
//       </CardContent>
//     </Card>
//   )
// }
