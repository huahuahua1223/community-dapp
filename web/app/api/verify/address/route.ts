import { NextResponse } from 'next/server';
import { bcs } from '@mysten/sui/bcs';
import { keccak256 } from 'js-sha3';
import { fromHex } from '@mysten/sui/utils';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { address } = body;
        const response = {
            signature: await signMessage(address)
        };
        return NextResponse.json(response);
    } catch (error) {
        console.error('Verification error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Verification failed'
            },
            { status: 500 }
        );
    }
}

const signMessage = async (address: any) => {
    try {
        const address_info = bcs.Address;

        const address_info_bytes = address_info.serialize(address).toBytes();
        const hash_data = keccak256(address_info_bytes);
        const hash_bytes = fromHex(hash_data);

        if (!process.env.ADDRESS_SECRET_KEY) {
            throw new Error('SECRET_KEY is not set');
        }
        const keypair = Ed25519Keypair.fromSecretKey(process.env.ADDRESS_SECRET_KEY);
        const signature = await keypair.sign(hash_bytes);        
        return signature;
    } catch (error) {
        console.error('Signing error:', error);
        throw error;
    }
}
