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
                        confirmations: BigInt(1200),
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
                        confirmations: BigInt(1200),
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
                // Optional Receive Library Timeout for when the Old Receive Library Address will no longer be valid
                // Note:  This configuring `receiveLibraryTimeoutConfig` using devtools is not currently available for Solana.
                // receiveLibraryTimeoutConfig: {
                //     lib: '0x0000000000000000000000000000000000000000',
                //     expiry: BigInt(0),
                // },
                // Optional Send Configuration
                // @dev Controls how the `from` chain sends messages to the `to` chain.
                sendConfig: {
                    executorConfig: {
                        maxMessageSize: 10000,
                        // The configured Executor address.  Note, this is the executor PDA not the program ID.
                        executor: '0x173272739Bd7Aa6e4e214714048a9fE699453059',
                    },
                    ulnConfig: {
                        // // The number of block confirmations to wait on BSC before emitting the message from the source chain.
                        confirmations: BigInt(15),
                        // The address of the DVNs you will pay to verify a sent message on the source chain ).
                        // The destination tx will wait until ALL `requiredDVNs` verify the message.
                        requiredDVNs: [
                            '0x589dEDbD617e0CBcB916A9223F4d1300c294236b', // LayerZero
                        ],
                        // The address of the DVNs you will pay to verify a sent message on the source chain ).
                        // The destination tx will wait until the configured threshold of `optionalDVNs` verify a message.
                        optionalDVNs: [],
                        // The number of `optionalDVNs` that need to successfully verify the message for it to be considered Verified.
                        optionalDVNThreshold: 0,
                    },
                },
                // Optional Receive Configuration
                // @dev Controls how the `from` chain receives messages from the `to` chain.
                receiveConfig: {
                    ulnConfig: {
                        // The number of block confirmations to expect from the `to` chain.
                        confirmations: BigInt(32),
                        // The address of the DVNs your `receiveConfig` expects to receive verifications from on the `from` chain ).
                        // The `from` chain's OApp will wait until the configured threshold of `requiredDVNs` verify the message.
                        requiredDVNs: [
                            '0x589dEDbD617e0CBcB916A9223F4d1300c294236b', // LayerZero
                        ],
                        // The address of the DVNs you will pay to verify a sent message on the source chain ).
                        // The destination tx will wait until the configured threshold of `optionalDVNs` verify a message.
                        optionalDVNs: [],
                        // The number of `optionalDVNs` that need to successfully verify the message for it to be considered Verified.
                        optionalDVNThreshold: 0,
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                        value: 2500000,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                        value: 2500000,
                    },
                    {
                        // Solana options use (gas == compute units, value == lamports)
                        msgType: 2,
                        optionType: ExecutorOptionType.COMPOSE,
                        index: 0,
                        gas: 200000,
                        value: 2500000,
                    },
                ],
            },
        },
        {
            from: solanaContract,
            to: ethereumContract,
            // TODO Here are some default settings that have been found to work well sending to Sepolia. We suggest
            //  performing additional profiling to ensure they are correct for your use case.
            config: {
                sendLibrary: '7a4WjyR8VZ7yZz5XJAKm39BUGn5iT9CKcv2pmG9tdXVH',
                receiveLibraryConfig: {
                    receiveLibrary: '7a4WjyR8VZ7yZz5XJAKm39BUGn5iT9CKcv2pmG9tdXVH',
                    gracePeriod: BigInt(0),
                },
                // Optional Receive Library Timeout for when the Old Receive Library Address will no longer be valid
                // Note:  This configuring `receiveLibraryTimeoutConfig` using devtools is not currently available for Solana.
                // receiveLibraryTimeoutConfig: {
                //     lib: '0x0000000000000000000000000000000000000000',
                //     expiry: BigInt(0),
                // },
                // Optional Send Configuration
                // @dev Controls how the `from` chain sends messages to the `to` chain.
                sendConfig: {
                    executorConfig: {
                        maxMessageSize: 10000,
                        // The configured Executor address.  Note, this is the executor PDA not the program ID.
                        executor: '6doghB248px58JSSwG4qejQ46kFMW4AMj7vzJnWZHNZn',
                    },
                    ulnConfig: {
                        // // The number of block confirmations to wait on BSC before emitting the message from the source chain.
                        confirmations: BigInt(32),
                        // The address of the DVNs you will pay to verify a sent message on the source chain ).
                        // The destination tx will wait until ALL `requiredDVNs` verify the message.
                        requiredDVNs: [
                            '4VDjp6XQaxoZf5RGwiPU9NR1EXSZn2TP4ATMmiSzLfhb', // LayerZero
                        ],
                        // The address of the DVNs you will pay to verify a sent message on the source chain ).
                        // The destination tx will wait until the configured threshold of `optionalDVNs` verify a message.
                        optionalDVNs: [],
                        // The number of `optionalDVNs` that need to successfully verify the message for it to be considered Verified.
                        optionalDVNThreshold: 0,
                    },
                },
                // Optional Receive Configuration
                // @dev Controls how the `from` chain receives messages from the `to` chain.
                receiveConfig: {
                    ulnConfig: {
                        // The number of block confirmations to expect from the `to` chain.
                        confirmations: BigInt(15),
                        // The address of the DVNs your `receiveConfig` expects to receive verifications from on the `from` chain ).
                        // The `from` chain's OApp will wait until the configured threshold of `requiredDVNs` verify the message.
                        requiredDVNs: [
                            '4VDjp6XQaxoZf5RGwiPU9NR1EXSZn2TP4ATMmiSzLfhb', // LayerZero
                        ],
                        // The address of the DVNs you will pay to verify a sent message on the source chain ).
                        // The destination tx will wait until the configured threshold of `optionalDVNs` verify a message.
                        optionalDVNs: [],
                        // The number of `optionalDVNs` that need to successfully verify the message for it to be considered Verified.
                        optionalDVNThreshold: 0,
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                    },
                ],
            },
        },
    ],
}

export default config
