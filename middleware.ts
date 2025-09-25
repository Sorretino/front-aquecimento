// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"

// export function middleware(request: NextRequest) {
//   // Verificar se há um usuário logado no cookie ou header
//   const userCookie = request.cookies.get("user")
//   const pathname = request.nextUrl.pathname

//   // Rotas que precisam de autenticação
//   const protectedRoutes = ["/"]

//   // Rotas de autenticação (login, register)
//   const authRoutes = ["/auth/login", "/auth/register"]

//   // Verificar se a rota atual é protegida
//   const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

//   // Verificar se a rota atual é de autenticação
//   const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

//   // Se for uma rota protegida e não há usuário logado
//   if (isProtectedRoute && !userCookie) {
//     // Redirecionar para login
//     return NextResponse.redirect(new URL("/auth/login", request.url))
//   }

//   // Se o usuário está logado e tenta acessar páginas de auth
//   if (isAuthRoute && userCookie) {
//     // Redirecionar para dashboard
//     return NextResponse.redirect(new URL("/", request.url))
//   }

//   // Redirecionar root para dashboard se logado, senão para login
//   if (pathname === "/") {
//     if (userCookie) {
//       return NextResponse.redirect(new URL("/", request.url))
//     } else {
//       return NextResponse.redirect(new URL("/auth/login", request.url))
//     }
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - public folder
//      */
//     "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
//   ],
// }

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get("user")
  const pathname = request.nextUrl.pathname

  const protectedRoutes = ["/dashboard"]
  const authRoutes = ["/auth/login", "/auth/register", "/auth"] // adicionando /auth às rotas de autenticação
  const publicRoutes = ["/api"]

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))
  if (isPublicRoute) {
    return NextResponse.next()
  }

  let isAuthenticated = false
  if (userCookie?.value) {
    try {
      const userData = JSON.parse(userCookie.value)
      isAuthenticated = userData && userData.id
      console.log("[v0] Cookie encontrado:", userData)
    } catch (error) {
      console.log("[v0] Erro ao fazer parse do cookie:", error)
      const response = NextResponse.next()
      response.cookies.delete("user")
      isAuthenticated = false
    }
  } else {
    console.log("[v0] Nenhum cookie encontrado")
  }

  // Verificar se a rota atual é protegida
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  console.log(
    "[v0] Pathname:",
    pathname,
    "isProtected:",
    isProtectedRoute,
    "isAuth:",
    isAuthRoute,
    "isAuthenticated:",
    isAuthenticated,
  )

  if (pathname === "/auth") {
    if (isAuthenticated) {
      console.log("[v0] Usuário autenticado acessando /auth - redirecionando para dashboard")
      return NextResponse.redirect(new URL("/dashboard", request.url))
    } else {
      console.log("[v0] Usuário não autenticado acessando /auth - redirecionando para login")
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  // Se não está autenticado e tenta acessar rota protegida
  if (isProtectedRoute && !isAuthenticated) {
    console.log("[v0] Redirecionando para login - rota protegida sem auth")
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // Se está autenticado e tenta acessar páginas de auth
  if (isAuthRoute && isAuthenticated) {
    console.log("[v0] Redirecionando para dashboard - usuário já autenticado")
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (pathname === "/") {
    if (isAuthenticated) {
      console.log("[v0] Redirecionando usuário autenticado para dashboard")
      return NextResponse.redirect(new URL("/dashboard", request.url))
    } else {
      console.log("[v0] Redirecionando usuário não autenticado para login")
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
