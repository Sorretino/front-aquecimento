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
  token?: string
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

  // Hidratação: só roda no cliente
  useEffect(() => {
    const initializeAuth = async () => {
      if (typeof window !== "undefined") {
        const savedUser = localStorage.getItem("user")
        const savedToken = localStorage.getItem("token")

        if (savedUser && savedToken) {
          try {
            const userData = JSON.parse(savedUser)
            setUser({ ...userData, token: savedToken })
          } catch {
            localStorage.removeItem("user")
            localStorage.removeItem("token")
          }
        }
      }
      setLoading(false)
      setIsHydrated(true)
    }

    initializeAuth()
  }, [])

const login = async (email: string, password: string): Promise<boolean> => {
  try {
    setLoading(true)
    console.log("[v0] Fazendo chamada para API de login")

    const response = await apiInstances.post(
      "/auth/login",
      { email, password },
      { withCredentials: true } // mantém cookies, se estiver usando
    )

    const data = response.data
    console.log("[v0] Login response", data)

    // Aceita sucesso quando recebemos user ou token (backend retorna { token, user })
    if (data && (data.user || data.token)) {
      const userData = data.user

      // atualiza estado
      setUser(userData)

      if (typeof window !== "undefined") {
        // salva fallback em localStorage (útil em dev e para o front)
        localStorage.setItem("user", JSON.stringify(userData))
        if (data.token) {
          localStorage.setItem("token", data.token)
        }

        // cookie legível por JS (apenas informativo; se você usa HttpOnly do backend,
        // o token real fica no cookie HttpOnly e não precisa disso)
        document.cookie = `user=${encodeURIComponent(JSON.stringify(userData))}; path=/; max-age=86400`
      }

      return true
    }

    console.log("[v0] Falha no login:", data?.message ?? "Resposta inválida")
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
      const res = await apiInstances.post("/auth/register", { email, password, name })

      if (res.data?.user && res.data?.token) {
        setUser({ ...res.data.user, token: res.data.token })

        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(res.data.user))
          localStorage.setItem("token", res.data.token)
        }
        return true
      }
      return false
    } catch (error) {
      console.error("[Auth] Erro ao registrar:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
    }
    router.replace("/auth/login")
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, isHydrated }}>
      {/* 👇 só renderiza children depois da hidratação */}
      {isHydrated ? children : null}
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
