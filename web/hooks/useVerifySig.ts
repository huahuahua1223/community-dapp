'use client'

import { useState } from 'react'
import { apiFetch } from '@/utils/apiClient'
import { OffChainValidatorParams } from '@/types/verify'

export const useVerifySig = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    
    const verifyOffChainValidation = async (data: OffChainValidatorParams) => {
        try {
            const response = await apiFetch<OffChainValidatorParams>(`/api/verify/off-chain-validator`, {
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

    const verifyaddress = async (data: string) => {
        try {
            const response = await apiFetch<string>(`/api/verify/address`, {
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