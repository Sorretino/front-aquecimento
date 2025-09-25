"use client"

import React, { useState, useEffect } from "react";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Play, Pause, Settings, Trash2, RefreshCw, Zap, Eye, Trash, Power, Smartphone ,ChevronLeft, ChevronRight} from "lucide-react"
import { deleteInstanceHeater, getInstancesHeaterCount, getInstancesHeaterGlobal, logoutHeaterInstance, PatchIntanceHeaterCompanyGlobal, PostInstanceHeaterCreate } from "@/actions/aquecimento/instance-heater-action";
import { formatarTelefone } from "@/util/formatPhone";
import Image from "next/image";
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"



const instancess = [
  {
    id: "inst_001",
    name: "Instância Principal",
    phone: "+55 11 99999-0001",
    status: "heating",
    progress: 75,
    messagesCount: '1250',
    successRate: 98.5,
    errorCount: 18,
    lastActivity: "2 min atrás",
    createdAt: "2024-01-15",
    heatingStarted: "2024-01-20 14:30",
    estimatedCompletion: "16:45",
  },
  {
    id: "inst_002",
    name: "Instância Backup",
    phone: "+55 11 99999-0002",
    status: "online",
    progress: 100,
    messagesCount: '2100',
    successRate: 99.2,
    errorCount: 5,
    lastActivity: "30 seg atrás",
    createdAt: "2024-01-10",
    heatingStarted: "2024-01-18 09:15",
    estimatedCompletion: "Concluído",
  },
  {
    id: "inst_003",
    name: "Instância Teste",
    phone: "+55 11 99999-0003",
    status: "offline",
    progress: 0,
    messagesCount: '0',
    successRate: 0,
    errorCount: 12,
    lastActivity: "1h atrás",
    createdAt: "2024-01-20",
    heatingStarted: "Não iniciado",
    estimatedCompletion: "Não iniciado",
  },
  {
    id: "inst_004",
    name: "Instância Nova",
    phone: "+55 11 99999-0004",
    status: "heating",
    progress: 25,
    messagesCount: '320',
    successRate: 97.8,
    errorCount: 7,
    lastActivity: "5 min atrás",
    createdAt: "2024-01-22",
    heatingStarted: "2024-01-22 13:00",
    estimatedCompletion: "18:30",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "OPEN":
      return "bg-success/10 text-success border-success/20"
    case "heater":
      return "bg-warning/10 text-warning border-warning/20"
    case "CLOSED":
      return "bg-destructive/10 text-destructive border-destructive/20"
    case "":
      return "bg-destructive/10 text-destructive border-destructive/20"
    case "online":
      return "bg-success/10 text-success border-success/20"
    case "heating":
      return "bg-warning/10 text-warning border-warning/20"
    case "offline":
      return "bg-destructive/10 text-destructive border-destructive/20"
    default:
      return "bg-destructive/10 text-destructive border-destructive/20"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
     case "OPEN":
      return "Online"
       case "heater":
      return "Aquecendo"
      case "CLOSED":
      return "offline"
      case "":
      return "offline"
    case "online":
      return "Online"
    case "heating":
      return "Aquecendo"
    case "offline":
      return "Offline"
    default:
      return "Offline"
  }
}

export function InstancesTable() {

  const [instances, setInstances] = useState<any[]>([]);
 const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7
  const [searchTerm, setSearchTerm] = useState("")

  const filteredInstances = instancess.filter(
    (instance) => instance.name.toLowerCase().includes(searchTerm.toLowerCase()) || instance.phone.includes(searchTerm),
  )


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
 const filteredInstancesProd = instances.filter(
    (instance) => instance.name.toLowerCase().includes(searchTerm.toLowerCase()) || instance.ownerJid.includes(searchTerm),
  )
 // Paginação
  const totalPages = Math.ceil(filteredInstancesProd.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedInstances = filteredInstancesProd.slice(
    startIndex,
    startIndex + itemsPerPage
  )
  console.log(instances,'instances')
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
           <div className="flex flex-col items-start">
            <CardTitle className="text-lg font-semibold text-card-foreground">Todas as Instâncias</CardTitle>
           <CardDescription >Total de Instâncias {instances.length}</CardDescription>
           </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar instâncias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
     


        <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Instância</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progresso</TableHead>
              <TableHead>Mensagens</TableHead>
              <TableHead>Taxa Sucesso</TableHead>
              <TableHead>Recebidas</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Última Atividade</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedInstances.length > 0 ? (
              paginatedInstances.map((instance, idx) => (
              <TableRow key={instance.id}>
                <TableCell>
                  <div>
                    <div className="font-medium text-foreground">{instance.name}</div>
                    <div className="text-sm text-muted-foreground">+55 {formatarTelefone(instance.number)|| "-"}</div>
                  </div>
                </TableCell>
                <TableCell>
                   <Badge className={getStatusColor(instance.connectionStatus)}>{getStatusText(instance.connectionStatus)}</Badge>
                    <Badge className={getStatusColor(instance.status)}>{getStatusText(instance.status)}</Badge>
                    
                </TableCell>
              
                <TableCell>
                    {instance.status === "heater" ? (
                   <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{instance.heaterMetric.length ? instance.heaterMetric[0].responseRate : 0}%</span>
                        <span className="text-muted-foreground">ETA:0 {instance.estimatedCompletion}</span>
                      </div>
                     <Progress
  value={instance.heaterMetric.length ? instance.heaterMetric[0].responseRate : 0}
  className="h-2 w-24"
/>

                    </div>
                  ) : (
                    //null
                    <span className="text-sm text-muted-foreground">
                      {instance.status === "online" ? "Completo" : "Parado"}
                    </span>
                  )} 
                   
                </TableCell>
                <TableCell>
                  <span className="font-medium">
                   
                  {instance.heaterMetric?.length
  ? instance.heaterMetric[0].sentCount
  : "0"}
                    {/* {instance.messagesCount.toLocaleString()} */}
                    </span>
                </TableCell>
                
             <TableCell>
  <span className={
    instance.heaterMetric?.length > 0 && instance.heaterMetric[0].successRate > 70
      ? "text-success"
      : "text-warning"
  }>
    {instance.heaterMetric?.length > 0
      ? instance.heaterMetric[0].successRate.toFixed(1) + "%"
      : "0"}
  </span>
</TableCell>

                 <TableCell>
                  <span className={
  instance.heaterMetric?.length > 0 && instance.heaterMetric[0].receivedCount > 80 
    ? "text-primary" 
    : "text-muted-foreground"
}>
  {instance.heaterMetric?.length > 0 ? instance.heaterMetric[0].receivedCount : 0}
</span>
                 </TableCell>
                

                <TableCell>
                  <span className={instance.heaterMetric?.length > 0 ? instance.heaterMetric[0].healthScore : 0 > 10 ? "text-destructive" : "text-muted-foreground"}>
                 
                    <span>{instance.heaterMetric?.length > 0 ?instance.heaterMetric[0].healthScore :0}%</span>


                  </span>
                </TableCell>
                 
                  {/* <TableCell>
                   <span className="text-sm text-muted-foreground">  {instance.heaterMetric.length 
        ? instance.heaterMetric[0].heatingHours.toFixed(1) + "h" 
        : "0"}</span>
                   <span className="text-sm text-muted-foreground"> - 5 min atrás</span>
                </TableCell> */}
              <TableCell>
                {/* <span className="text-sm text-muted-foreground">
                  {instance.heaterMetric.length
                    ? instance.heaterMetric[0].heatingHours.toFixed(1) + "h"
                    : "0"}
                </span> */}
                <span className="text-sm text-muted-foreground">
  {instance.heaterMetric?.length
    ? instance.heaterMetric[0].heatingHours < 1
      ? Math.round(instance.heaterMetric[0].heatingHours * 60) + "m" // converte para minutos
      : instance.heaterMetric[0].heatingHours.toFixed(1) + "h" // mantém em horas
    : "0"}
</span>
                <span className="text-sm text-muted-foreground"> - {" "}
                  {instance.heaterMetric?.length
                    ? formatDistanceToNow(new Date(instance.heaterMetric[0].updatedAt), {
                        addSuffix: true,
                        locale: ptBR,
                      })
                    : ""}
                </span>
              </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        {instance.status === "online" ? (
                          <>
                            <Pause className="w-4 h-4 mr-2" />
                            Pausar
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Iniciar
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Zap className="w-4 h-4 mr-2" />
                        Iniciar Aquecimento
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="w-4 h-4 mr-2" />
                        Configurações
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remover
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Nenhuma instância encontrada
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          {/* {filteredInstancesProd.map((instance) => (
  <TableRow key={instance.id}>
    <TableCell>{instance.name}</TableCell>
    <TableCell>
      {instance.heaterMetric.length 
        ? instance.heaterMetric[0].successRate.toFixed(1) + "%" 
        : "N/A"}
    </TableCell>
    <TableCell>
      {instance.heaterMetric.length 
        ? instance.heaterMetric[0].responseRate.toFixed(1) + "%" 
        : "N/A"}
    </TableCell>
    <TableCell>
      {instance.heaterMetric.length 
        ? instance.heaterMetric[0].heatingHours.toFixed(1) + "h" 
        : "N/A"}
    </TableCell>
    <TableCell>
      {instance.heaterMetric.length 
        ? instance.heaterMetric[0].healthScore 
        : "N/A"}
    </TableCell>
  </TableRow>
))} */}

        </Table>

         {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <Pagination>
              <PaginationContent>

<PaginationItem>
  <Button
    variant="outline"
    size="icon"
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
  >
    <ChevronLeft className="w-4 h-4" />
  </Button>
</PaginationItem>

{Array.from({ length: totalPages }, (_, i) => (
  <PaginationItem key={i}>
    <Button
      variant={currentPage === i + 1 ? "default" : "outline"}
      size="sm"
      onClick={() => setCurrentPage(i + 1)}
      className={
        currentPage === i + 1
          ? "text-white bg-amber-400"
          : "text-muted-foreground"
      }
    >
      {i + 1}
    </Button>
  </PaginationItem>
))}

<PaginationItem>
  <Button
    variant="outline"
    size="icon"
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
  >
    <ChevronRight className="w-4 h-4" />
  </Button>
</PaginationItem>

{/* <PaginationItem>
  <PaginationPrevious
    asChild
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
  >
    <Button variant="outline" size="icon">
      <ChevronLeft className="w-4 h-4" />
    </Button>
  </PaginationPrevious>
</PaginationItem>

{Array.from({ length: totalPages }, (_, i) => (
  <PaginationItem key={i}>
    <Button
      variant={currentPage === i + 1 ? "default" : "outline"}
      size="sm"
      onClick={() => setCurrentPage(i + 1)}
      className={
        currentPage === i + 1
          ? "text-white bg-amber-400"
          : "text-muted-foreground"
      }
    >
      {i + 1}
    </Button>
  </PaginationItem>
))}

<PaginationItem>
  <PaginationNext
    asChild
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
  >
    <Button variant="outline" size="icon">
      <ChevronRight className="w-4 h-4" />
    </Button>
  </PaginationNext>
</PaginationItem> */}


              </PaginationContent>
            </Pagination>
          </div>
        )}

      </CardContent>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Instância</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progresso</TableHead>
              <TableHead>Mensagens</TableHead>
              <TableHead>Taxa Sucesso</TableHead>
              <TableHead>Erros</TableHead>
              <TableHead>Última Atividade</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInstances.map((instance) => (
              <TableRow key={instance.id}>
                <TableCell>
                  <div>
                    <div className="font-medium text-foreground">{instance.name}</div>
                    <div className="text-sm text-muted-foreground">{instance.phone}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(instance.status)}>{getStatusText(instance.status)}</Badge>
                </TableCell>
                <TableCell>
                  {instance.status === "heating" ? (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{instance.progress}%</span>
                        <span className="text-muted-foreground">ETA: {instance.estimatedCompletion}</span>
                      </div>
                      <Progress value={instance.progress} className="h-2 w-24" />
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {instance.status === "online" ? "Completo" : "Parado"}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <span className="font-medium">{instance.messagesCount.toLocaleString()}</span>
                </TableCell>
                <TableCell>
                  <span className={instance.successRate > 95 ? "text-success" : "text-warning"}>
                    {instance.successRate}%
                  </span>
                </TableCell>
                <TableCell>
                  <span className={instance.errorCount > 10 ? "text-destructive" : "text-muted-foreground"}>
                    {instance.errorCount}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{instance.lastActivity}</span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        {instance.status === "online" ? (
                          <>
                            <Pause className="w-4 h-4 mr-2" />
                            Pausar
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Iniciar
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Zap className="w-4 h-4 mr-2" />
                        Iniciar Aquecimento
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="w-4 h-4 mr-2" />
                        Configurações
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remover
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
