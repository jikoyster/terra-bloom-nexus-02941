// src/controllers/authController.ts
import { supabase } from '../supabaseClient'

export const AuthController = {
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data.user
  },

  async signUp(name: string, email: string, password: string, role: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role },
      },
    })
    if (error) throw error
    return data.user
  },
}
