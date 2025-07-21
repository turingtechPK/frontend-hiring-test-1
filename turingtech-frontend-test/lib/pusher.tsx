"use client"

import React from "react"
import Pusher from "pusher-js"
import { createContext, useContext, useEffect, useRef, useCallback } from "react"
import { useAuth } from "./auth-context"

interface PusherContextType {
  subscribe: (channelName: string, eventName: string, callback: (data: any) => void) => () => void
  disconnect: () => void
}

const PusherContext = createContext<PusherContextType | undefined>(undefined)

export function usePusher() {
  const context = useContext(PusherContext)
  if (context === undefined) {
    throw new Error("usePusher must be used within a PusherProvider")
  }
  return context
}

interface PusherProviderProps {
  children: React.ReactNode
}

export function PusherProvider({ children }: PusherProviderProps) {
  const pusherRef = useRef<Pusher | null>(null)
  const { token, isAuthenticated } = useAuth()

  // Initialize Pusher when authenticated
  useEffect(() => {
    if (typeof window === "undefined" || !isAuthenticated || !token || pusherRef.current) {
      return
    }

    pusherRef.current = new Pusher("d44e3d910d38a928e0be", {
      cluster: "eu",
      authEndpoint: "https://frontend-test-api.aircall.dev/pusher/auth",
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })
  }, [token, isAuthenticated])

  // Cleanup on unmount or when auth changes
  useEffect(() => {
    return () => {
      if (pusherRef.current) {
        pusherRef.current.disconnect()
        pusherRef.current = null
      }
    }
  }, [])

  const subscribe = useCallback((channelName: string, eventName: string, callback: (data: any) => void) => {
    if (!pusherRef.current) {
      console.warn("Pusher not initialized")
      return () => {}
    }

    const channel = pusherRef.current.subscribe(channelName)
    channel.bind(eventName, callback)

    return () => {
      channel.unbind(eventName, callback)
      pusherRef.current?.unsubscribe(channelName)
    }
  }, [])

  const disconnect = useCallback(() => {
    if (pusherRef.current) {
      pusherRef.current.disconnect()
      pusherRef.current = null
    }
  }, [])

  const contextValue: PusherContextType = {
    subscribe,
    disconnect,
  }

  return React.createElement(PusherContext.Provider, { value: contextValue }, children)
}
