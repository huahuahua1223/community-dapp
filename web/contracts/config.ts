interface ContractAddresses {
    [key: string]: string;
}

type NetworkType = 'testnet' | 'mainnet';

// transaction hash: 3w84TuGBmBBuiYfteYPkLyfcrJVxKPTZneweTQPh7cMq
const configs = {
    testnet: {
        Package: "0x2088098e1d1b2c7c57dab710a2156987c642f7ec5a76adb9a27d10f6ee932614",
        MemberRecord: "0x7b0968cb53e45ef12270f7e62cfd9bc0a3f5294965136e9cd1248394145567da",
        Version: "0x1732f52e1c496ccbfb5bcb5886f62b5887919f6389afbd9e95c9434bfbbe2bc4",
        Validators: "0x5cb9cce66c984988c88f2c677ca837a449fe0505c373351bb0101786725241fb",
    },
    mainnet: {
        Package: "0x1111111111111111111111111111111111111111",
    }
} as const satisfies Record<NetworkType, ContractAddresses>;

export function getContractConfig(network: NetworkType): ContractAddresses {
    return configs[network];
}