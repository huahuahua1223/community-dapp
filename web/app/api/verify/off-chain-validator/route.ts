import { NextResponse } from 'next/server';
import { bcs } from '@mysten/sui/bcs';
import { keccak256 } from 'js-sha3';
import { fromHex } from '@mysten/sui/utils';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { addr, last_time } = body;
        const response = {
            signature: await signMessage(addr, last_time)
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

const signMessage = async (addr: string, last_time:number) => {
    try {
        const off_chain_validator_info = bcs.struct('OffChainValidator', {
            addr: bcs.Address,
            last_time: bcs.u64()
        });

        const off_chain_validator_info_bytes = off_chain_validator_info.serialize({addr, last_time}).toBytes();
        const hash_data = keccak256(off_chain_validator_info_bytes);
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
