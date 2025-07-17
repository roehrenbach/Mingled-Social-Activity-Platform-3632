// This is a mock Supabase client for demo purposes
// In production, you would use the real Supabase client

const mockSupabase = {
  auth: {
    signInWithPassword: async () => {
      return { data: null, error: null }
    },
    signUp: async () => {
      return { data: null, error: null }
    },
    signOut: async () => {
      return { error: null }
    },
    getSession: async () => {
      return { data: { session: null } }
    },
    onAuthStateChange: () => {
      return { data: { subscription: { unsubscribe: () => {} } } }
    }
  },
  from: (table) => ({
    select: () => ({
      limit: () => ({
        then: (callback) => callback({ data: [], error: null }),
        catch: () => {}
      })
    }),
    insert: () => ({
      then: (callback) => callback({ data: [], error: null }),
      catch: () => {}
    })
  })
}

export const supabase = mockSupabase