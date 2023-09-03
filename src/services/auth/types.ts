export type MeResponse = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}

export type LoginArgs = {
  password: string
  email: string
  rememberMe: boolean
}

export type SignUpArgs = {
  email: string
  password: string
}
