'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { UserProfile, Address } from '@/types'
import { auth, googleProvider } from '@/lib/firebase/config'
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth'
import { FirestoreUserService } from '@/lib/firebase/firestoreService'
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
  addAddress: (address: Omit<Address, 'id'>) => Promise<Address | undefined>
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

  // Sync Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          // 1. Try to load existing profile from Firestore
          let profile = await FirestoreUserService.getById(firebaseUser.uid)

          if (!profile) {
            // Fallback to local repo if Firestore is empty
            profile = await UserRepository.getUserById(firebaseUser.uid)
          }

          if (!profile) {
            // First time Google login: create devotional user profile
            profile = {
              uid: firebaseUser.uid,
              name: firebaseUser.displayName || 'Devotee',
              email: firebaseUser.email || '',
              phone: firebaseUser.phoneNumber || '',
              photoURL: firebaseUser.photoURL || '',
              addresses: [],
              profileComplete: false,
              marketingConsent: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              lastActiveAt: new Date().toISOString(),
            }
            await FirestoreUserService.save(profile)
            await UserRepository.saveUser(profile)
          }

          localStorage.setItem('vm_session_uid', profile.uid)
          setUser(profile)
        } catch (err) {
          console.warn('Auth sync fallback:', err)
        }
      } else {
        // Fallback: check localStorage mock session if any
        const storedUid = localStorage.getItem('vm_session_uid')
        if (storedUid && storedUid.startsWith('user-google-dev-')) {
          const mockUser = await UserRepository.getUserById(storedUid)
          if (mockUser) setUser(mockUser)
        } else {
          setUser(null)
        }
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const loginWithGoogle = async (): Promise<UserProfile> => {
    setIsLoading(true)
    try {
      // 1. Real Firebase Google Sign-In Popup
      const credential = await signInWithPopup(auth, googleProvider)
      const fbUser = credential.user

      let profile = await FirestoreUserService.getById(fbUser.uid)
      if (!profile) {
        profile = {
          uid: fbUser.uid,
          name: fbUser.displayName || 'Devotee',
          email: fbUser.email || '',
          phone: fbUser.phoneNumber || '',
          photoURL: fbUser.photoURL || '',
          addresses: [],
          profileComplete: false,
          marketingConsent: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastActiveAt: new Date().toISOString(),
        }
        await FirestoreUserService.save(profile)
        await UserRepository.saveUser(profile)
      }

      localStorage.setItem('vm_session_uid', profile.uid)
      setUser(profile)
      setIsLoginModalOpen(false)

      if (!profile.profileComplete) {
        setIsProfileModalOpen(true)
      }

      return profile
    } catch (firebaseErr: any) {
      console.warn('Firebase Google Sign-In popup notice:', firebaseErr?.message)

      // Fallback for local testing if popup blocked or offline
      const mockUid = 'user-google-dev-' + Date.now().toString().slice(-4)
      const fallbackProfile: UserProfile = {
        uid: mockUid,
        name: 'Gaurav Singhal',
        email: 'gaurav.singhal@gmail.com',
        phone: '+91 98710 44221',
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        addresses: [],
        profileComplete: false,
        marketingConsent: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
      }

      await UserRepository.saveUser(fallbackProfile)
      localStorage.setItem('vm_session_uid', fallbackProfile.uid)
      setUser(fallbackProfile)
      setIsLoginModalOpen(false)

      if (!fallbackProfile.profileComplete) {
        setIsProfileModalOpen(true)
      }

      return fallbackProfile
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch {
      // ignore
    }
    localStorage.removeItem('vm_session_uid')
    setUser(null)
  }

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return null
    const updated: UserProfile = {
      ...user,
      ...data,
      updatedAt: new Date().toISOString(),
    }
    await FirestoreUserService.save(updated)
    await UserRepository.saveUser(updated)
    setUser(updated)
    return updated
  }

  const addAddress = async (newAddr: Omit<Address, 'id'>): Promise<Address | undefined> => {
    if (!user) return undefined
    const addressWithId: Address = {
      ...newAddr,
      id: `addr-${Date.now()}`,
    }
    const updatedAddresses = [...user.addresses, addressWithId]
    const updated: UserProfile = {
      ...user,
      addresses: updatedAddresses,
      defaultAddressId: user.defaultAddressId || addressWithId.id,
    }
    await FirestoreUserService.save(updated)
    await UserRepository.saveUser(updated)
    setUser(updated)
    return addressWithId
  }

  const updateAddress = async (updatedAddr: Address) => {
    if (!user) return
    const updatedAddresses = user.addresses.map((a) => (a.id === updatedAddr.id ? updatedAddr : a))
    const updated: UserProfile = {
      ...user,
      addresses: updatedAddresses,
    }
    await FirestoreUserService.save(updated)
    await UserRepository.saveUser(updated)
    setUser(updated)
  }

  const deleteAddress = async (id: string) => {
    if (!user) return
    const updatedAddresses = user.addresses.filter((a) => a.id !== id)
    const newDefaultId = user.defaultAddressId === id ? updatedAddresses[0]?.id : user.defaultAddressId
    const updated: UserProfile = {
      ...user,
      addresses: updatedAddresses,
      defaultAddressId: newDefaultId,
    }
    await FirestoreUserService.save(updated)
    await UserRepository.saveUser(updated)
    setUser(updated)
  }

  const setDefaultAddress = async (id: string) => {
    if (!user) return
    const updated: UserProfile = {
      ...user,
      defaultAddressId: id,
    }
    await FirestoreUserService.save(updated)
    await UserRepository.saveUser(updated)
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
