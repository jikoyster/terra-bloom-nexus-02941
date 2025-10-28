// src/models/userModel.ts
import { supabase } from '../supabaseClient'

export const UserModel = {
  async saveUser(user: any) {
    const { email, user_metadata } = user

    // Check if user exists
    const { data: existing, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Fetch error:', error)
      return
    }

    // If exists, update login timestamp
    if (existing) {
      await supabase
        .from('users')
        .update({
          last_login: new Date().toISOString(),
          status: 'active',
        })
        .eq('email', email)
    } else {
      // Else, insert new user
      await supabase.from('users').insert([
        {
          name: user_metadata?.name || 'New User',
          email,
          role: user_metadata?.role || 'farmer',
          status: 'active',
          last_login: new Date().toISOString(),
        },
      ])
    }
  },
}
