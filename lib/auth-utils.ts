// export function isAuthenticated(): boolean {
//   if (typeof window === "undefined") return false

//   const user = localStorage.getItem("user")
//   return !!user
// }

// export function getUser() {
//   if (typeof window === "undefined") return null

//   const user = localStorage.getItem("user")
//   return user ? JSON.parse(user) : null
// }

// export function clearAuth() {
//   if (typeof window === "undefined") return

//   localStorage.removeItem("user")
//   document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
// }

// export function setAuthCookie(userData: any) {
//   if (typeof window === "undefined") return

//   document.cookie = `user=${JSON.stringify(userData)}; path=/; max-age=86400`
// }

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false

  const user = localStorage.getItem("user")
  return !!user
}

export function getUser() {
  if (typeof window === "undefined") return null

  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

export function clearAuth() {
  if (typeof window === "undefined") return

  localStorage.removeItem("user")
  document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
}

export function setAuthCookie(userData: any) {
  if (typeof window === "undefined") return

  document.cookie = `user=${JSON.stringify(userData)}; path=/; max-age=86400`
}