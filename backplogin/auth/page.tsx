import React, { Fragment } from "react";
import { Metadata } from "next";

import LoginPageForm from "@/components/sing-in-form/sing-in-form.component";


export const metadata: Metadata = {
  title: "Acesso | AceleraIA - Premium Messages Leads",
  description: "",
  // other metadata
};

export default function SignInPage(){
  return(
  <>
 
  <LoginPageForm />
  
 
   </>
 )
};

// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// export default function LoginPage() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")
//   const router = useRouter()

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     try {
//       const res = await fetch("https://multatendiment-aquecimento.ybrsom.easypanel.host/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       })

//       const data = await res.json()
//       if (!res.ok) throw new Error(data.error || "Erro no login")

//       localStorage.setItem("token", data.token)
//       router.push("/")
//     } catch (err: any) {
//       setError(err.message)
//     }
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle>Login</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleLogin} className="space-y-4">
//             <div>
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="password">Senha</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             {error && <p className="text-red-500 text-sm">{error}</p>}
//             <Button type="submit" className="w-full">
//               Entrar
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// export default function LoginPage() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")
//   const router = useRouter()

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     try {
//       const res = await fetch("https://multatendiment-aquecimento.ybrsom.easypanel.host/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       })

//       const data = await res.json()
//       if (!res.ok) throw new Error(data.error || "Erro no login")

//       localStorage.setItem("token", data.token)
//       router.push("/")
//     } catch (err: any) {
//       setError(err.message)
//     }
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle>Login</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleLogin} className="space-y-4">
//             <div>
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="password">Senha</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             {error && <p className="text-red-500 text-sm">{error}</p>}
//             <Button type="submit" className="w-full">
//               Entrar
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
