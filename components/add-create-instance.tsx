"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus, X } from "lucide-react"
import { deleteInstanceHeater, getInstancesHeaterGlobal, logoutHeaterInstance, PatchIntanceHeaterCompanyGlobal, PostInstanceHeaterCreate } from "@/actions/aquecimento/instance-heater-action";
import {  toast } from "react-hot-toast"

export function AddInstanceCreateDialog() {
  const [open, setOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [instanceName, setInstanceName] = useState("");
   const [errors, setErrors] = useState({ instanceName: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [instanceData, setInstanceData] = useState<any>();
  const [isInstanceModalOpen, setIsInstanceModalOpen] = useState(false);

   const handleCreateInstance = async () => {
  setIsLoading(true);

  if (!validateFields()) {
    setIsLoading(false);
    return;
  }
 console.log("entrou aqui criada:");
  try {
     console.log("entrou aqui 2:");
    const response = await PostInstanceHeaterCreate(instanceName); 
    console.log("Instância criada:", response);

    if (response.instance) {
      setInstanceData(response); // { instance, qrcode }
      setIsCreateModalOpen(false);
      setIsInstanceModalOpen(true); // abre modal do QR Code, por ex.
      toast.success("Instância criada com sucesso!");
    } else {
      toast.error("Erro ao criar a instância. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro inesperado:", error);
    toast.error("Erro inesperado ao criar a instância.");
  } finally {
    setIsLoading(false);
  }
};

  const validateFields = () => {
    const newErrors = { instanceName: ""};

    if (!instanceName.trim()) {
      newErrors.instanceName = "O nome da instância é obrigatório.";
    }
   

    setErrors(newErrors);

    // Retorna verdadeiro se não houver erros
    return !newErrors.instanceName ;
  };
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

  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nova Instância modal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Instância</DialogTitle>
          <DialogDescription>Configure uma nova instância WhatsApp para aquecimento.</DialogDescription>
        </DialogHeader>
       
          <div className="bg-gray-100 text-gray-800 dark:bg-neutral-900/95 dark:text-neutral-300 rounded-lg shadow-lg p-5 w-full max-w-md  ">
           
            <div className="space-y-4">
              <div className="w-full py-4">
                <label className="block text-sm font-medium mb-3">
                  Nome da Instância
                </label>
                <input
                  required
                  type="text"
                  value={instanceName}
                  onChange={(e) => setInstanceName(e.target.value)}
                  className="mt-1 w-full rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-transparent  px-4 py-2 text-base font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter  dark:bg-form-input  focus:border-1  focus:outline-0"
                  placeholder="Digite o nome da instancia"
                />
                {errors.instanceName && (
                  <p className="text-red-500 text-sm">{errors.instanceName}</p>
                )}
              </div>
    
            </div>
      
          </div>
      
        <DialogFooter>
          {/* <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={() => setOpen(false)}>Criar Instância</Button> */}
          <button
                onClick={handleCreateInstance}
                disabled={!instanceName || isLoading} // Desabilita enquanto carrega
                className={`w-full flex justify-center items-center gap-3 px-4 py-2 rounded-lg text-xs  transition-colors duration-300 
                   ${
                     !instanceName  || isLoading
                       ? "bg-green-700/20 text-gray-600 cursor-not-allowed"
                       : "bg-green-700 text-white hover:bg-green-800"
                   }
                 
                `}
              >
                {isLoading ? (
                  <>
                    <span className="text-white text-xs">Preparando...</span>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-1 border-rose-600"></div>
                  </>
                ) : (
                  "Enviar dados da"
                )}
              </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* {isInstanceModalOpen && instanceData && (
        <div className="fixed inset-0 bg-neutral-800/80 flex justify-center items-center z-50">
          <div className="bg-neutral-900 text-white rounded-lg shadow-lg p-6 w-full max-w-2xl border hover:bg-zinc-900 border-neutral-800">
            <h2 className="text-lg font-bold mb-4 flex flex-row gap-4">
              <span className="bg-customGreen rounded-full p-2">✔</span>
              Escaneie o QR Code
            </h2>
            <CardKanbanInstances qrCode={instanceData?.qrcode ?? null} />
            <button
              onClick={() => setIsInstanceModalOpen(false)}
              className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg"
            >
              Fechar
            </button>
          </div>
        </div>
      )} */}
      <Dialog open={isInstanceModalOpen} onOpenChange={setIsInstanceModalOpen}>
  <DialogContent className="sm:max-w-[500px]">
    <DialogHeader>
      <DialogTitle>Escaneie o QR Code</DialogTitle>
    </DialogHeader>
    <CardKanbanInstances qrCode={instanceData?.qrcode ?? null} />
    <DialogFooter>
      <Button variant="destructive" onClick={() => setIsInstanceModalOpen(false)}>
        Fechar
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

      </>
  )
}
