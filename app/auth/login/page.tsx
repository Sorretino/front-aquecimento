"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import apiInstances from "@/apiserverAquecer/api"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit1 = async (e: React.FormEvent) => {
  e.preventDefault()
  setError("")
  setIsLoading(true)

  try {
    const res = await apiInstances.post(
      "/auth/login",
      { email, password },
      { withCredentials: true } // ✅ tenta via cookie HttpOnly
    )

    // Se sua API ainda estiver devolvendo o token no body,
    // salva também no localStorage como fallback
    if (res.data?.token) {
      localStorage.setItem("token", res.data.token)
    }

    if (res.data?.user) {
      localStorage.setItem("user", JSON.stringify(res.data.user))
    }

    router.push("/dashboard") // redireciona pro dashboard
  } catch (err: any) {
    setError(err.response?.data?.error || err.message || "Erro ao logar")
  } finally {
    setIsLoading(false)
  }
}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        router.push("/dashboard")
      } else {
        setError("Email ou senha incorretos")
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">Entre com suas credenciais para acessar o dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">Não tem uma conta? </span>
            <Link href="/auth/register" className="text-primary hover:underline">
              Registre-se
            </Link>
          </div>

          <div className="mt-4 p-3 bg-muted rounded-md text-sm">
            <p className="font-medium">Credenciais de teste:</p>
            <p>Email: admin@example.com</p>
            <p>Senha: password</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
