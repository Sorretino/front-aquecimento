// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value
// console.log("🔑 Token no middleware:", token)
//   // Se não tiver token e tentar acessar a home (/)
//   if (!token && req.nextUrl.pathname === "/") {
//     return NextResponse.redirect(new URL("/auth", req.url))
//   }
//  console.log("✅ Token presente, liberado")
//   return NextResponse.next()
// }

// // export const config = {
// //   matcher: ["/"], // protege só a home
// // }
// export const config = {
//   matcher: ["/((?!auth).*)"], 
// }

// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value

//   // Se não tiver token em QUALQUER rota protegida
//   if (!token) {
//     return NextResponse.redirect(new URL("/auth", req.url))
//   }

//   return NextResponse.next()
// }

// // Protege tudo, menos /auth/*
// export const config = {
//   matcher: ["/((?!auth).*)"], 
// }

// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import apiInstances from "@/apiserverAquecer/api"

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const userCookie = request.cookies.get("token")?.value;
  if (request.nextUrl.pathname.startsWith("/auth")) {
    if (token && userCookie) {
      apiInstances.defaults.headers.Authorization = `Bearer ${token}`;
      return NextResponse.redirect(new URL("/", request.url));
    }
    return null;
  }
  if (request.nextUrl.pathname.startsWith("/")) {
    if (!token || !userCookie) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    apiInstances.defaults.headers.Authorization = `Bearer ${token}`;
  }
  return null;
}

// export const config = {
//   matcher: ["/auth", "/:path*"],
// };

export const config = {
  matcher: ["/((?!auth).*)"], 
}
