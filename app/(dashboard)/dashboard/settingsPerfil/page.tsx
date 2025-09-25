// "use client"

// import { useAuth } from "@/hooks/use-auth"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Separator } from "@/components/ui/separator"
// import { useState } from "react"

// export default function SettingsPage() {
//   const { user } = useAuth()
//   const [name, setName] = useState(user?.name || "")
//   const [email, setEmail] = useState(user?.email || "")

//   const handleSave = () => {
//     // Aqui você implementaria a lógica para salvar as alterações
//     console.log("Salvando alterações:", { name, email })
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-balance">Configurações</h1>
//         <p className="text-muted-foreground">Gerencie suas preferências e configurações da conta.</p>
//       </div>

//       <div className="grid gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Informações Pessoais</CardTitle>
//             <CardDescription>Atualize suas informações básicas</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid gap-4 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Nome</Label>
//                 <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//               </div>
//             </div>
//             <Button onClick={handleSave}>Salvar Alterações</Button>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Segurança</CardTitle>
//             <CardDescription>Configurações de segurança da sua conta</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label>Alterar Senha</Label>
//               <Button variant="outline">Alterar Senha</Button>
//             </div>
//             <Separator />
//             <div className="space-y-2">
//               <Label>Autenticação de Dois Fatores</Label>
//               <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança à sua conta</p>
//               <Button variant="outline">Configurar 2FA</Button>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Preferências</CardTitle>
//             <CardDescription>Personalize sua experiência</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label>Tema</Label>
//               <Button variant="outline">Alternar Tema</Button>
//             </div>
//             <Separator />
//             <div className="space-y-2">
//               <Label>Notificações</Label>
//               <p className="text-sm text-muted-foreground">Configure como você quer receber notificações</p>
//               <Button variant="outline">Configurar Notificações</Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }
"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function DashboardPage() {
  const { user, isHydrated } = useAuth()

   
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar as alterações
    console.log("Salvando alterações:", { name, email })
  }

  if (!isHydrated) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 bg-muted rounded animate-pulse mb-2"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-2/3"></div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-4 bg-muted rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-muted rounded animate-pulse w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
    <main className="flex-1 overflow-y-auto p-6">
    <div className="space-y-6">
      <div>
        <h4 className="text-2xl font-semibold text-balance">Bem-vindo ao Dashboard, {user?.name}!</h4>
        <p className="text-muted-foreground">Aqui você pode gerenciar todas as funcionalidades do sistema.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Badge variant="secondary">+12%</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+180 desde o mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas</CardTitle>
            <Badge variant="secondary">+8%</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 45,231</div>
            <p className="text-xs text-muted-foreground">+20.1% desde o mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Ativos</CardTitle>
            <Badge variant="secondary">+3%</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+201 desde a semana passada</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Últimas ações realizadas no sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Novo usuário cadastrado</p>
                <p className="text-xs text-muted-foreground">2 minutos atrás</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Pedido #1234 finalizado</p>
                <p className="text-xs text-muted-foreground">5 minutos atrás</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Sistema atualizado</p>
                <p className="text-xs text-muted-foreground">1 hora atrás</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações da Conta</CardTitle>
            <CardDescription>Detalhes do seu perfil</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Nome</p>
              <p className="text-sm text-muted-foreground">{user?.name || "Carregando..."}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{user?.email || "Carregando..."}</p>
            </div>
            <div>
              <p className="text-sm font-medium">ID do Usuário</p>
              <p className="text-sm text-muted-foreground">{user?.id || "Carregando..."}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Status</p>
              <Badge variant="outline" className="text-green-600">
                Ativo
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
      <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance">Configurações</h1>
        <p className="text-muted-foreground">Gerencie suas preferências e configurações da conta.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>Atualize suas informações básicas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <Button onClick={handleSave}>Salvar Alterações</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Segurança</CardTitle>
            <CardDescription>Configurações de segurança da sua conta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Alterar Senha</Label>
              <Button variant="outline">Alterar Senha</Button>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Autenticação de Dois Fatores</Label>
              <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança à sua conta</p>
              <Button variant="outline">Configurar 2FA</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferências</CardTitle>
            <CardDescription>Personalize sua experiência</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tema</Label>
              <Button variant="outline">Alternar Tema</Button>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Notificações</Label>
              <p className="text-sm text-muted-foreground">Configure como você quer receber notificações</p>
              <Button variant="outline">Configurar Notificações</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </main>
    </>
  )
}
