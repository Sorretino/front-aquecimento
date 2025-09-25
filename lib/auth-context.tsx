// "use client"

// import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
// import { useRouter } from "next/navigation"

// interface User {
//   id: string
//   email: string
//   name: string
// }

// interface AuthContextType {
//   user: User | null
//   login: (email: string, password: string) => Promise<boolean>
//   register: (email: string, password: string, name: string) => Promise<boolean>
//   logout: () => void
//   loading: boolean
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [loading, setLoading] = useState(true)
//   const router = useRouter()

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const savedUser = localStorage.getItem("user")
//       if (savedUser) {
//         try {
//           const userData = JSON.parse(savedUser)
//           setUser(userData)
//           document.cookie = `user=${JSON.stringify(userData)}; path=/; max-age=86400`
//         } catch (error) {
//           console.error("Erro ao carregar usuário salvo:", error)
//           localStorage.removeItem("user")
//         }
//       }
//     }
//     setLoading(false)
//   }, [])

//   const login = async (email: string, password: string): Promise<boolean> => {
//     try {
//       setLoading(true)

//       // Simulação de API - substitua pela sua lógica real
//       if (email === "admin@example.com" && password === "password") {
//         const userData = {
//           id: "1",
//           email: email,
//           name: "Admin User",
//         }

//         setUser(userData)
//         if (typeof window !== "undefined") {
//           localStorage.setItem("user", JSON.stringify(userData))
//           document.cookie = `user=${JSON.stringify(userData)}; path=/; max-age=86400`
//         }
//         return true
//       }

//       return false
//     } catch (error) {
//       console.error("Erro no login:", error)
//       return false
//     } finally {
//       setLoading(false)
//     }
//   }

//   const register = async (email: string, password: string, name: string): Promise<boolean> => {
//     try {
//       setLoading(true)

//       // Simulação de API - substitua pela sua lógica real
//       const userData = {
//         id: Date.now().toString(),
//         email: email,
//         name: name,
//       }

//       setUser(userData)
//       if (typeof window !== "undefined") {
//         localStorage.setItem("user", JSON.stringify(userData))
//         document.cookie = `user=${JSON.stringify(userData)}; path=/; max-age=86400`
//       }
//       return true
//     } catch (error) {
//       console.error("Erro no registro:", error)
//       return false
//     } finally {
//       setLoading(false)
//     }
//   }

//   const logout = () => {
//     setUser(null)
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("user")
//       document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
//     }
//     router.push("/auth/login")
//   }

//   return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth deve ser usado dentro de um AuthProvider")
//   }
//   return context
// }


"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import apiInstances from "@/apiserverAquecer/api"

interface User {
  id: string
  email: string
  name: string
  token?: string // Adicionado token opcional
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  loading: boolean
  isHydrated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isHydrated, setIsHydrated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    console.log("[v0] AuthProvider: Iniciando hidratação")
    const initializeAuth = async () => {
      if (typeof window !== "undefined") {
        console.log("[v0] AuthProvider: Verificando localStorage")
        const savedUser = localStorage.getItem("user")
        const savedToken = localStorage.getItem("token")

        if (savedUser && savedToken) {
          try {
            const userData = JSON.parse(savedUser)
            console.log("[v0] AuthProvider: Usuário encontrado no localStorage:", userData)

            const isTokenValid = await validateToken(savedToken)
            if (isTokenValid) {
              setUser({ ...userData, token: savedToken })
              document.cookie = `user=${JSON.stringify(userData)}; path=/; max-age=86400`
            } else {
              // Token inválido, limpar dados
              localStorage.removeItem("user")
              localStorage.removeItem("token")
              console.log("[v0] AuthProvider: Token inválido, dados removidos")
            }
          } catch (error) {
            console.error("[v0] AuthProvider: Erro ao carregar usuário salvo:", error)
            localStorage.removeItem("user")
            localStorage.removeItem("token")
          }
        } else {
          console.log("[v0] AuthProvider: Nenhum usuário no localStorage")
        }
      }
      console.log("[v0] AuthProvider: Hidratação concluída")
      setLoading(false)
      setIsHydrated(true)
    }

    const timer = setTimeout(initializeAuth, 0)
    return () => clearTimeout(timer)
  }, [])

  const validateToken = async (token: string): Promise<boolean> => {
    try {
      // Aqui você faria uma chamada para validar o token
      // Por enquanto, retornando true para manter funcionando
      return true
    } catch (error) {
      console.error("Erro ao validar token:", error)
      return false
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      console.log("[v0] Fazendo chamada para API de login")

      // const response = await fetch("https://multatendiment-aquecimento.ybrsom.easypanel.host/auth/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email, password }),
      // })
 const Response = await apiInstances.post(
      "/auth/login",
      { email, password },
      { withCredentials: true } // ✅ tenta via cookie HttpOnly
    )
      const data = await Response.data

      if (data.success && data.user) {
        console.log("[v0] Login bem-sucedido via API:", data.user)
        setUser(data.user)

        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(data.user))
          if (data.user.token) {
            localStorage.setItem("token", data.user.token)
          }
          document.cookie = `user=${JSON.stringify(data.user)}; path=/; max-age=86400`
          console.log("[v0] Dados salvos no localStorage e cookie")
        }
        return true
      }

      console.log("[v0] Falha no login:", data.message)
      return false
    } catch (error) {
      console.error("[v0] Erro na chamada da API de login:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      setLoading(true)
      console.log("[v0] Fazendo chamada para API de registro")

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await response.json()

      if (data.success && data.user) {
        console.log("[v0] Registro bem-sucedido via API:", data.user)
        setUser(data.user)

        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(data.user))
          if (data.user.token) {
            localStorage.setItem("token", data.user.token)
          }
          document.cookie = `user=${JSON.stringify(data.user)}; path=/; max-age=86400`
        }
        return true
      }

      console.log("[v0] Falha no registro:", data.message)
      return false
    } catch (error) {
      console.error("[v0] Erro na chamada da API de registro:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    console.log("[v0] Fazendo logout")
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
      localStorage.removeItem("token") // Remover token também
      document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
    }
    router.replace("/auth/login")
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, isHydrated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}


// "use client"

// import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
// import { useRouter } from "next/navigation"

// interface User {
//   id: string
//   email: string
//   name: string
// }

// interface AuthContextType {
//   user: User | null
//   login: (email: string, password: string) => Promise<boolean>
//   register: (email: string, password: string, name: string) => Promise<boolean>
//   logout: () => void
//   loading: boolean
//   isHydrated: boolean
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [isHydrated, setIsHydrated] = useState(false)
//   const router = useRouter()

//   useEffect(() => {
//     const initializeAuth = () => {
//       if (typeof window !== "undefined") {
//         const savedUser = localStorage.getItem("user")
//         if (savedUser) {
//           try {
//             const userData = JSON.parse(savedUser)
//             setUser(userData)
//             document.cookie = `user=${JSON.stringify(userData)}; path=/; max-age=86400`
//           } catch (error) {
//             console.error("Erro ao carregar usuário salvo:", error)
//             localStorage.removeItem("user")
//           }
//         }
//       }
//       setLoading(false)
//       setIsHydrated(true)
//     }

//     const timer = setTimeout(initializeAuth, 0)
//     return () => clearTimeout(timer)
//   }, [])

//   const login = async (email: string, password: string): Promise<boolean> => {
//     try {
//       setLoading(true)
//       console.log("[v0] Tentando fazer login com:", email)

//       if (email === "admin@example.com" && password === "password") {
//         const userData = {
//           id: "1",
//           email: email,
//           name: "Admin User",
//         }

//         console.log("[v0] Login bem-sucedido, definindo usuário:", userData)
//         setUser(userData)
//         if (typeof window !== "undefined") {
//           localStorage.setItem("user", JSON.stringify(userData))
//           document.cookie = `user=${JSON.stringify(userData)}; path=/; max-age=86400`
//           console.log("[v0] Cookie e localStorage definidos")
//         }
//         return true
//       }

//       console.log("[v0] Credenciais inválidas")
//       return false
//     } catch (error) {
//       console.error("[v0] Erro no login:", error)
//       return false
//     } finally {
//       setLoading(false)
//     }
//   }

//   const register = async (email: string, password: string, name: string): Promise<boolean> => {
//     try {
//       setLoading(true)

//       const userData = {
//         id: Date.now().toString(),
//         email: email,
//         name: name,
//       }

//       setUser(userData)
//       if (typeof window !== "undefined") {
//         localStorage.setItem("user", JSON.stringify(userData))
//         document.cookie = `user=${JSON.stringify(userData)}; path=/; max-age=86400`
//       }
//       return true
//     } catch (error) {
//       console.error("Erro no registro:", error)
//       return false
//     } finally {
//       setLoading(false)
//     }
//   }

//   const logout = () => {
//     console.log("[v0] Fazendo logout")
//     setUser(null)
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("user")
//       document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
//     }
//     router.replace("/auth/login")
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout, loading, isHydrated }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth deve ser usado dentro de um AuthProvider")
//   }
//   return context
// }
