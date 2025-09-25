"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Save, Shield, Key, Eye, EyeOff, Trash2, Plus } from "lucide-react"

const activeSessions = [
  {
    id: "session_001",
    device: "Chrome - Windows",
    location: "São Paulo, BR",
    lastActivity: "Agora",
    current: true,
  },
  {
    id: "session_002",
    device: "Safari - iPhone",
    location: "São Paulo, BR",
    lastActivity: "2h atrás",
    current: false,
  },
  {
    id: "session_003",
    device: "Firefox - Linux",
    location: "Rio de Janeiro, BR",
    lastActivity: "1 dia atrás",
    current: false,
  },
]

export function SecuritySettings() {
  const [settings, setSettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "24",
    ipWhitelist: true,
    allowedIPs: "192.168.1.0/24, 10.0.0.0/8",
    auditLog: true,
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireNumbers: true,
      requireSymbols: true,
    },
    loginAttempts: 5,
    lockoutDuration: 30,
  })

  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKey] = useState("sk-1234567890abcdef1234567890abcdef")

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Autenticação e Acesso
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Autenticação de Dois Fatores</Label>
              <p className="text-xs text-muted-foreground">Adicionar camada extra de segurança</p>
            </div>
            <Switch
              checked={settings.twoFactorAuth}
              onCheckedChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="session-timeout" className="text-sm font-medium">
                Timeout da Sessão (horas)
              </Label>
              <Select
                value={settings.sessionTimeout}
                onValueChange={(value) => setSettings({ ...settings, sessionTimeout: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hora</SelectItem>
                  <SelectItem value="8">8 horas</SelectItem>
                  <SelectItem value="24">24 horas</SelectItem>
                  <SelectItem value="168">7 dias</SelectItem>
                  <SelectItem value="720">30 dias</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-attempts" className="text-sm font-medium">
                Tentativas de Login
              </Label>
              <Input
                id="login-attempts"
                type="number"
                value={settings.loginAttempts}
                onChange={(e) => setSettings({ ...settings, loginAttempts: Number.parseInt(e.target.value) })}
                min={3}
                max={10}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Lista Branca de IPs</Label>
              <p className="text-xs text-muted-foreground">Restringir acesso a IPs específicos</p>
            </div>
            <Switch
              checked={settings.ipWhitelist}
              onCheckedChange={(checked) => setSettings({ ...settings, ipWhitelist: checked })}
            />
          </div>

          {settings.ipWhitelist && (
            <div className="space-y-2">
              <Label htmlFor="allowed-ips" className="text-sm font-medium">
                IPs Permitidos
              </Label>
              <Input
                id="allowed-ips"
                value={settings.allowedIPs}
                onChange={(e) => setSettings({ ...settings, allowedIPs: e.target.value })}
                placeholder="192.168.1.0/24, 10.0.0.0/8"
              />
              <p className="text-xs text-muted-foreground">Separe múltiplos IPs ou ranges com vírgula</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
            <Key className="w-5 h-5 mr-2" />
            Chaves de API
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <div>
                <p className="text-sm font-medium text-foreground">Chave Principal</p>
                <p className="text-xs text-muted-foreground">Criada em 15/01/2024</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <code className="text-sm bg-background px-2 py-1 rounded border">
                {showApiKey ? apiKey : "sk-" + "•".repeat(28)}
              </code>
              <Button variant="ghost" size="sm" onClick={() => setShowApiKey(!showApiKey)}>
                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <Button variant="outline" className="w-full bg-transparent">
            <Plus className="w-4 h-4 mr-2" />
            Gerar Nova Chave
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground">Sessões Ativas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dispositivo</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Última Atividade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    <span className="text-sm text-foreground">{session.device}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{session.location}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{session.lastActivity}</span>
                  </TableCell>
                  <TableCell>
                    {session.current ? (
                      <Badge className="bg-success/10 text-success border-success/20">Atual</Badge>
                    ) : (
                      <Badge variant="outline">Ativa</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {!session.current && (
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  )
}
