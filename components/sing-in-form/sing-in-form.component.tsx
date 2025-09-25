//  "use client"

//  import { useState } from "react"
//  import { useRouter } from "next/navigation"
//  import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
//  import { Button } from "@/components/ui/button"
//  import { Input } from "@/components/ui/input"
//  import { Label } from "@/components/ui/label"

//  export default function LoginPageForm() {
//    const [email, setEmail] = useState("")
//    const [password, setPassword] = useState("")
//    const [error, setError] = useState("")
//    const router = useRouter()

//    const handleLogin = async (e: React.FormEvent) => {
//      e.preventDefault()
//      setError("")
//      try {
//        const res = await fetch("http:localhost:3333/auth/login", {
//          method: "POST",
//          headers: { "Content-Type": "application/json" },
//          body: JSON.stringify({ email, password }),
//        })

//        const data = await res.json()
//        if (!res.ok) throw new Error(data.error || "Erro no login")

//        localStorage.setItem("token", data.token)
//        router.push("/")
//      } catch (err: any) {
//        setError(err.message)
//      }
//    }

//    return (
//      <div className="flex items-center justify-center min-h-screen bg-gray-100">
//        <Card className="w-full max-w-md">
//          <CardHeader>
//            <CardTitle>Login</CardTitle>
//          </CardHeader>
//          <CardContent>
//            <form onSubmit={handleLogin} className="space-y-4">
//              <div>
//                <Label htmlFor="email">Email</Label>
//                <Input
//                  id="email"
//                  type="email"
//                  value={email}
//                  onChange={(e) => setEmail(e.target.value)}
//                  required
//                />
//              </div>
//              <div>
//                <Label htmlFor="password">Senha</Label>
//                <Input
//                  id="password"
//                  type="password"
//                  value={password}
//                  onChange={(e) => setPassword(e.target.value)}
//                  required
//                />
//              </div>
//              {error && <p className="text-red-500 text-sm">{error}</p>}
//              <Button type="submit" className="w-full">
//                Entrar
//              </Button>
//            </form>
//          </CardContent>
//        </Card>
//      </div>
//    )
//  }
 "use client"

 import { useState } from "react"
 import { useRouter } from "next/navigation"
 import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
 import { Button } from "@/components/ui/button"
 import { Input } from "@/components/ui/input"
 import { Label } from "@/components/ui/label"
import apiInstances from "@/apiserverAquecer/api"

 export default function LoginPage() {
 const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

// const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const res = await apiInstances.post("/auth/login", { email, password });
//       const { token, user } = res.data;

//       // salva token e info do user (pode mudar para cookie httpOnly depois)
//       if (typeof window !== "undefined") {
//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(user || {}));
//       }

//       router.push("/"); // redireciona para área protegida
//     } catch (err: any) {
//       setError(err.response?.data?.error || err.message || "Erro ao logar");
//     } finally {
//       setLoading(false);
//     }
//   };

// const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     setLoading(true)

//     try {
//       await apiInstances.post(
//         "/auth/login",
//         { email, password },
//         { withCredentials: true } // ✅ cookies vão junto
//       )

//       // não precisa salvar token manualmente, já está no cookie
//       router.push("/") // redireciona para home/dashboard
//     } catch (err: any) {
//       setError(err.response?.data?.error || err.message || "Erro ao logar")
//     } finally {
//       setLoading(false)
//     }
//   }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError("")
  setLoading(true)

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

    router.push("/") // redireciona pro dashboard
  } catch (err: any) {
    setError(err.response?.data?.error || err.message || "Erro ao logar")
  } finally {
    setLoading(false)
  }
}
   return (
     <div className="flex items-center justify-center min-h-screen ">
       <Card className="w-full max-w-md">
         <CardHeader>
           <CardTitle>Login</CardTitle>
         </CardHeader>
         <CardContent>
           <form onSubmit={handleSubmit} className="space-y-4">
             <div>
               <Label htmlFor="email">Email</Label>
               <Input
                 id="email"
                 type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required
               />
             </div>
             <div>
               <Label htmlFor="password">Senha</Label>
               <Input
                 id="password"
                 type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
               />
             </div>
             {error && <p className="text-red-500 text-sm">{error}</p>}
             <Button type="submit" className="w-full">
               Entrar
             </Button>
           </form>
         </CardContent>
       </Card>
     </div>
   )
 }
