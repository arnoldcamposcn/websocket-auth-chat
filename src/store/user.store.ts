import { create } from 'zustand'
import { UserProfile } from '../models/user/types/user'
import { usersService } from '../api/services/users.service'
import { handleError } from '../utils/errorHandler'

interface UserState {
    
    user: UserProfile | null
    loading: boolean
    error: string | null
    fetchProfile: () => Promise<void>
    updateProfile: (data: Partial<UserProfile>) => Promise<void>
    setUser: (user: UserProfile | null) => void
    clearUser: () => void
}

export const useUserStore = create<UserState>((set) => ({

    user: null,
    loading: false,
    error: null,

    fetchProfile: async () => {
        set({ loading: true, error: null })
        try {
            const profile = await usersService.getMyProfile()
            set({ user: profile, loading: false })
        } catch (err) {
            const message = handleError(err, false)
            set({ error: message, loading: false })
        }
    },

    updateProfile: async (data: Partial<UserProfile>) => {
        set({ loading: true, error: null })
        try {
            const updatedProfile = await usersService.updateMyProfile(data)
            set({ user: updatedProfile, loading: false })
        } catch (err) {
            const message = handleError(err, false)
            set({ error: message, loading: false })
            throw err
        }
    },

    setUser: (user: UserProfile | null) => {
        set({ user })
    },

    clearUser: () => {
        set({ user: null, error: null })
    },
}))