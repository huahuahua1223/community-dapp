'use client'

import { useState } from 'react'
import { apiFetch } from '@/utils/apiClient'

export const useVerifySig = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    
    const verifyOffChainValidation = async (data: any) => {
        try {
            const response = await apiFetch<any>(`/api/verify/off-chain-validator`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              })
              const result = await response
              return result
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to verify off-chain validation')
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const verifyaddress = async (data: any) => {
        try {
            const response = await apiFetch<any>(`/api/verify/address`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            const result = await response   
            return result
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to verify address')
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        error,
        verifyOffChainValidation,
        verifyaddress
    }
}