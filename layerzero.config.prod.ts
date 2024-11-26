import { EndpointId } from '@layerzerolabs/lz-definitions'
import { ExecutorOptionType } from '@layerzerolabs/lz-v2-utilities'

import type { OAppOmniGraphHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'

const ethereumContract = {
    eid: EndpointId.ETHEREUM_V2_MAINNET,
    contractName: 'WooTokenOFTAdapter',
};

const merlinContract = {
    eid: EndpointId.MERLIN_V2_MAINNET,
    contractName: 'WooTokenOFT',
};

const solanaContract: OmniPointHardhat = {
    eid: EndpointId.SOLANA_V2_MAINNET,
    address: '', // TODO update this with the OFTStore address.
}

const config: OAppOmniGraphHardhat = {
    contracts: [
        {
            contract: ethereumContract,
        },
        {
            contract: merlinContract,
        },
        {
            contract: solanaContract,
        },
    ],
    connections: [
        {
            from: ethereumContract,
            to: merlinContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
                sendConfig: {
                    executorConfig: {
                        maxMessageSize: 99,
                        executor: '0x0000000000000000000000000000000000000000',
                    },
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: ['0x589dEDbD617e0CBcB916A9223F4d1300c294236b'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: ['0x589dEDbD617e0CBcB916A9223F4d1300c294236b'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: merlinContract,
            to: ethereumContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
                sendConfig: {
                    executorConfig: {
                        maxMessageSize: 99,
                        executor: '0x0000000000000000000000000000000000000000',
                    },
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: ['0x6788f52439ACA6BFF597d3eeC2DC9a44B8FEE842'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: ['0x6788f52439ACA6BFF597d3eeC2DC9a44B8FEE842'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: ethereumContract,
            to: solanaContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                        value: 2500000,
                    },
                ],
                sendConfig: {
                    executorConfig: {
                        maxMessageSize: 99,
                        executor: '0x0000000000000000000000000000000000000000',
                    },
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: ['0x589dEDbD617e0CBcB916A9223F4d1300c294236b'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: ['0x589dEDbD617e0CBcB916A9223F4d1300c294236b'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: solanaContract,
            to: ethereumContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                        value: 0,
                    },
                ],
                sendConfig: {
                    executorConfig: {
                        maxMessageSize: 99,
                        executor: '0x0000000000000000000000000000000000000000',
                    },
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: ['0x6788f52439ACA6BFF597d3eeC2DC9a44B8FEE842'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: ['0x6788f52439ACA6BFF597d3eeC2DC9a44B8FEE842'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
    ],
}

export default config
