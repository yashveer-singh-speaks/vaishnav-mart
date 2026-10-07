'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { UserProfile, Address } from '@/types'
import { UserRepository } from '@/lib/data/repositories'

interface AuthContextType {
  user: UserProfile | null
  isAuthenticated: boolean
  isLoading: boolean
  isLoginModalOpen: boolean
  setIsLoginModalOpen: (open: boolean) => void
  isProfileModalOpen: boolean
  setIsProfileModalOpen: (open: boolean) => void
  loginWithGoogle: () => Promise<UserProfile>
  logout: () => Promise<void>
  updateProfile: (data: Partial<UserProfile>) => Promise<UserProfile | null>
  addAddress: (address: Omit<Address, 'id'>) => Promise<void>
  updateAddress: (address: Address) => Promise<void>
  deleteAddress: (id: string) => Promise<void>
  setDefaultAddress: (id: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  useEffect(() => {
    // Check saved session in browser
    const storedUid = localStorage.getItem('vm_session_uid')
    if (storedUid) {
      UserRepository.getUserById(storedUid).then((foundUser) => {
        if (foundUser) {
          setUser(foundUser)
        }
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }, [])

  const loginWithGoogle = async (): Promise<UserProfile> => {
    // In mock mode, simulate Google authentication popup
    const mockUid = 'user-google-dev-' + Date.now().toString().slice(-4)
    const existing = await UserRepository.getUserById(mockUid)
    let profile: UserProfile

    if (existing) {
      profile = existing
    } else {
      profile = {
        uid: mockUid,
        name: 'Gaurav Singhal',
        email: 'gaurav.singhal@gmail.com',
        phone: '+91 98710 44221',
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        addresses: [],
        profileComplete: false, // Triggers 2-step profile completion
        marketingConsent: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
      }
      await UserRepository.saveUser(profile)
    }

    localStorage.setItem('vm_session_uid', profile.uid)
    setUser(profile)
    setIsLoginModalOpen(false)

    // Trigger profile completion modal if incomplete
    if (!profile.profileComplete) {
      setIsProfileModalOpen(true)
    }

    return profile
  }

  const logout = async () => {
    localStorage.removeItem('vm_session_uid')
    setUser(null)
  }

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return null
    const updated = await UserRepository.saveUser({
      ...user,
      ...data,
      updatedAt: new Date().toISOString(),
    })
    setUser(updated)
    return updated
  }

  const addAddress = async (newAddr: Omit<Address, 'id'>) => {
    if (!user) return
    const addressWithId: Address = {
      ...newAddr,
      id: `addr-${Date.now()}`,
    }
    const updatedAddresses = [...user.addresses, addressWithId]
    const updated = await UserRepository.saveUser({
      ...user,
      addresses: updatedAddresses,
      defaultAddressId: user.defaultAddressId || addressWithId.id,
    })
    setUser(updated)
  }

  const updateAddress = async (updatedAddr: Address) => {
    if (!user) return
    const updatedAddresses = user.addresses.map((a) => (a.id === updatedAddr.id ? updatedAddr : a))
    const updated = await UserRepository.saveUser({
      ...user,
      addresses: updatedAddresses,
    })
    setUser(updated)
  }

  const deleteAddress = async (id: string) => {
    if (!user) return
    const updatedAddresses = user.addresses.filter((a) => a.id !== id)
    const newDefaultId = user.defaultAddressId === id ? updatedAddresses[0]?.id : user.defaultAddressId
    const updated = await UserRepository.saveUser({
      ...user,
      addresses: updatedAddresses,
      defaultAddressId: newDefaultId,
    })
    setUser(updated)
  }

  const setDefaultAddress = async (id: string) => {
    if (!user) return
    const updated = await UserRepository.saveUser({
      ...user,
      defaultAddressId: id,
    })
    setUser(updated)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
        loginWithGoogle,
        logout,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
