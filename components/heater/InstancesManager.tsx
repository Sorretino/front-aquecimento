
"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { PostInstanceHeaterCreate, getInstancesHeaterCount } from "@/actions/aquecimento/instance-heater-action"
import { toast } from "react-hot-toast"

interface Instance {
  id: string
  name: string
  phone: string
  status: string
  progress?: number
  messagesCount?: string
  successRate?: number
  errorCount?: number
  lastActivity?: string
  createdAt?: string
  heatingStarted?: string
  estimatedCompletion?: string
  qrcode?: { base64: string }
}

// ================== Componente Pai ==================
export function InstancesManager() {
  const [instances, setInstances] = useState<Instance[]>([])

  // Função para adicionar nova instância
  const handleAddInstance = (newInstance: Instance) => {
    setInstances(prev => [...prev, newInstance])
  }

  // Busca inicial das instâncias
  useEffect(() => {
    const fetchInstances = async () => {
      try {
        const response = await getInstancesHeaterCount()
        if (response) setInstances(response)
      } catch (error) {
        console.error("Erro ao buscar instâncias:", error)
      }
    }
    fetchInstances()
  }, [])

  return (
    <div className="space-y-6">
      <AddInstanceCreateDialog onInstanceCreated={handleAddInstance} />
      <InstancesTable instances={instances} />
    </div>
  )
}

// ================== Tabela de Instâncias ==================
interface InstancesTableProps {
  instances: Instance[]
}

function InstancesTable({ instances }: InstancesTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

 const filteredInstances = instances.filter(
  instance =>
    instance.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    instance.phone?.includes(searchTerm)
)


  return (
    <div>
      <Input
        placeholder="Buscar instância..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInstances.map(inst => (
            <TableRow key={inst.id}>
              <TableCell>{inst.name}</TableCell>
              <TableCell>{inst.phone}</TableCell>
              <TableCell>{inst.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// ================== Modal de Criação ==================
interface AddInstanceCreateDialogProps {
  onInstanceCreated?: (newInstance: Instance) => void
}
  
function AddInstanceCreateDialog({ onInstanceCreated }: AddInstanceCreateDialogProps) {
  const [open, setOpen] = useState(false)
  const [instanceName, setInstanceName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [instanceData, setInstanceData] = useState<Instance | null>(null)
  const [isQrModalOpen, setIsQrModalOpen] = useState(false)
  const [error, setError] = useState("")

  function CardKanbanInstances({
    qrCode,
  }: {
    // qrCode: { base64: string; pairingCode: string } | null;
    qrCode: { base64: string };
  }) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 py-2">
        {qrCode ? (
          <div className="flex flex-col items-center">
            <img
              src={qrCode.base64}
              alt="QR Code"
              className="mx-auto max-w-full h-auto"
            />
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              Use o aplicativo para escanear o QR code e conectar.
              {/* {qrCode.pairingCode && " Ou use o código de pareamento acima."} */}
            </p>
            {/* <p className="mt-4">Código de Pareamento: {qrCode.pairingCode}</p> */}
          </div>
        ) : (
          <p>Carregando QR Code...</p>
        )}
      </div>
    );
  }

const handleCreateInstance = async () => {
  if (!instanceName.trim()) {
    setError("O nome da instância é obrigatório.")
    return
  }
  setIsLoading(true)
  setError("")

  try {
    const response = await PostInstanceHeaterCreate(instanceName)
    if (response.instance) {
      setInstanceData(response.instance)       // primeiro salva a instância
      setOpen(false)                            // fecha modal principal
      // setIsInstanceModalOpen(true); // abre modal do QR Code, por ex.
      setTimeout(() => setIsQrModalOpen(true), 100) // abre QR Code depois
      onInstanceCreated?.(response.instance)   // atualiza tabela no pai
      toast.success("Instância criada com sucesso!")
    } else {
      toast.error("Erro ao criar a instância. Tente novamente.")
    }
  } catch (err) {
    console.error("Erro inesperado:", err)
    toast.error("Erro inesperado ao criar a instância.")
  } finally {
    setIsLoading(false)
  }
}


  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nova Instância
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Nova Instância</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Nome da instância"
              value={instanceName}
              onChange={e => setInstanceName(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <DialogFooter>
            <Button onClick={handleCreateInstance} disabled={isLoading}>
              {isLoading ? "Criando..." : "Criar Instância"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal QR Code */}
    

          {isQrModalOpen && instanceData && (
        <div className="fixed inset-0 bg-neutral-800/80 flex justify-center items-center z-50">
          <div className="bg-neutral-900 text-white rounded-lg shadow-lg p-6 w-full max-w-2xl border hover:bg-zinc-900 border-neutral-800">
            <h2 className="text-lg font-bold mb-4 flex flex-row gap-4">
              <span className="bg-customGreen rounded-full p-2">✔</span>
              Escaneie o QR Code
            </h2>
            {/* <CardKanbanInstances qrCode={instanceData?.qrcode ?? null} /> */}
            <img
        src={instanceData?.qrcode?.base64 ?? null}
        alt="QR Code"
        className="mx-auto mb-4"
      />
           <Button className="mt-4 w-full" onClick={() => setIsQrModalOpen(false)}>
              Fechar
            </Button>
          </div>
        </div>
      )}
    </>
  )
}