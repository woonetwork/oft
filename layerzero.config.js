// eslint-disable-next-line @typescript-eslint/no-var-requires
const { EndpointId } = require('@layerzerolabs/lz-definitions');
const { ExecutorOptionType } = require('@layerzerolabs/lz-v2-utilities');

// PROD
// const ethereumContract = {
//     eid: EndpointId.ETHEREUM_V2_MAINNET,
//     contractName: 'WooTokenOFTAdapter',
// };

// CAUTION: arbitrum for test ONLY
const arbitrumContract = {
    eid: EndpointId.ARBITRUM_V2_MAINNET,
    contractName: 'WooTokenOFTAdapter',
};

const merlinContract = {
    eid: EndpointId.MERLIN_V2_MAINNET,
    contractName: 'WooTokenOFT',
};

module.exports = {
    contracts: [
        // {
        //     contract: ethereumContract,
        // },
        {
            contract: arbitrumContract,
        },
        {
            contract: merlinContract,
        },
    ],
    connections: [
        {
            from: arbitrumContract,
            to: merlinContract,
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
                        confirmations: BigInt(42),
                        requiredDVNs: ['0x2f55C492897526677C5B68fb199ea31E2c126416'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(42),
                        requiredDVNs: ['0x2f55C492897526677C5B68fb199ea31E2c126416'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: merlinContract,
            to: arbitrumContract,
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
                        confirmations: BigInt(42),
                        requiredDVNs: ['0x6788f52439ACA6BFF597d3eeC2DC9a44B8FEE842'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(42),
                        requiredDVNs: ['0x6788f52439ACA6BFF597d3eeC2DC9a44B8FEE842'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        // {
        //     from: merlinContract,
        //     to: ethereumContract,
        //     config: {
        //         enforcedOptions: [
        //             {
        //                 msgType: 1,
        //                 optionType: ExecutorOptionType.LZ_RECEIVE,
        //                 gas: 200000,
        //                 value: 0,
        //             },
        //         ],
        //         sendConfig: {
        //             executorConfig: {
        //                 maxMessageSize: 99,
        //                 executor: '0x0000000000000000000000000000000000000000',
        //             },
        //             ulnConfig: {
        //                 confirmations: BigInt(42),
        //                 requiredDVNs: ['0x6788f52439ACA6BFF597d3eeC2DC9a44B8FEE842'],
        //                 optionalDVNs: [],
        //                 optionalDVNThreshold: 0,
        //             },
        //         },
        //         receiveConfig: {
        //             ulnConfig: {
        //                 confirmations: BigInt(42),
        //                 requiredDVNs: ['0x6788f52439ACA6BFF597d3eeC2DC9a44B8FEE842'],
        //                 optionalDVNs: [],
        //                 optionalDVNThreshold: 0,
        //             },
        //         },
        //     },
        // },
        // {
        //     from: ethereumContract,
        //     to: arbitrumContract,
        //     config: {
        //         enforcedOptions: [
        //             {
        //                 msgType: 1,
        //                 optionType: ExecutorOptionType.LZ_RECEIVE,
        //                 gas: 200000,
        //                 value: 0,
        //             },
        //         ],
        //         sendConfig: {
        //             executorConfig: {
        //                 maxMessageSize: 99,
        //                 executor: '0x0000000000000000000000000000000000000000',
        //             },
        //             ulnConfig: {
        //                 confirmations: BigInt(42),
        //                 requiredDVNs: ['0x589dEDbD617e0CBcB916A9223F4d1300c294236b'],
        //                 optionalDVNs: [],
        //                 optionalDVNThreshold: 0,
        //             },
        //         },
        //         receiveConfig: {
        //             ulnConfig: {
        //                 confirmations: BigInt(42),
        //                 requiredDVNs: ['0x589dEDbD617e0CBcB916A9223F4d1300c294236b'],
        //                 optionalDVNs: [],
        //                 optionalDVNThreshold: 0,
        //             },
        //         },
        //     },
        // },
        // {
        //     from: ethereumContract,
        //     to: optimismContract,
        //     config: {
        //         enforcedOptions: [
        //             {
        //                 msgType: 1,
        //                 optionType: ExecutorOptionType.LZ_RECEIVE,
        //                 gas: 200000,
        //                 value: 0,
        //             },
        //         ],
        //         sendConfig: {
        //             executorConfig: {
        //                 maxMessageSize: 99,
        //                 executor: '0x0000000000000000000000000000000000000000',
        //             },
        //             ulnConfig: {
        //                 confirmations: BigInt(42),
        //                 requiredDVNs: ['0x589dEDbD617e0CBcB916A9223F4d1300c294236b'],
        //                 optionalDVNs: [],
        //                 optionalDVNThreshold: 0,
        //             },
        //         },
        //         receiveConfig: {
        //             ulnConfig: {
        //                 confirmations: BigInt(42),
        //                 requiredDVNs: ['0x589dEDbD617e0CBcB916A9223F4d1300c294236b'],
        //                 optionalDVNs: [],
        //                 optionalDVNThreshold: 0,
        //             },
        //         },
        //     },
        // },
        // {
        //     from: optimismContract,
        //     to: ethereumContract,
        //     config: {
        //         enforcedOptions: [
        //             {
        //                 msgType: 1,
        //                 optionType: ExecutorOptionType.LZ_RECEIVE,
        //                 gas: 200000,
        //                 value: 0,
        //             },
        //         ],
        //         sendConfig: {
        //             executorConfig: {
        //                 maxMessageSize: 99,
        //                 executor: '0x0000000000000000000000000000000000000000',
        //             },
        //             ulnConfig: {
        //                 confirmations: BigInt(42),
        //                 requiredDVNs: ['0x6A02D83e8d433304bba74EF1c427913958187142'],
        //                 optionalDVNs: [],
        //                 optionalDVNThreshold: 0,
        //             },
        //         },
        //         receiveConfig: {
        //             ulnConfig: {
        //                 confirmations: BigInt(42),
        //                 requiredDVNs: ['0x6A02D83e8d433304bba74EF1c427913958187142'],
        //                 optionalDVNs: [],
        //                 optionalDVNThreshold: 0,
        //             },
        //         },
        //     },
        // },
        // {
        //     from: arbitrumContract,
        //     to: mantaContract,
        //     config: {
        //         enforcedOptions: [
        //             {
        //                 msgType: 1,
        //                 optionType: ExecutorOptionType.LZ_RECEIVE,
        //                 gas: 200000,
        //                 value: 0,
        //             },
        //         ],
        //         sendConfig: {
        //             executorConfig: {
        //                 maxMessageSize: 99,
        //                 executor: '0x0000000000000000000000000000000000000000',
        //             },
        //             ulnConfig: {
        //                 confirmations: BigInt(42),
        //                 requiredDVNs: [
        //                     '0x2f55C492897526677C5B68fb199ea31E2c126416',
        //                     '0x8ddF05F9A5c488b4973897E278B58895bF87Cb24',
        //                 ],
        //                 optionalDVNs: [],
        //                 optionalDVNThreshold: 0,
        //             },
        //         },
        //         receiveConfig: {
        //             ulnConfig: {
        //                 confirmations: BigInt(42),
        //                 requiredDVNs: [
        //                     '0x2f55C492897526677C5B68fb199ea31E2c126416',
        //                     '0x8ddF05F9A5c488b4973897E278B58895bF87Cb24',
        //                 ],
        //                 optionalDVNs: [],
        //                 optionalDVNThreshold: 0,
        //             },
        //         },
        //     },
        // },
        // {
        //     from: mantaContract,
        //     to: arbitrumContract,
        //     config: {
        //         enforcedOptions: [
        //             {
        //                 msgType: 1,
        //                 optionType: ExecutorOptionType.LZ_RECEIVE,
        //                 gas: 200000,
        //                 value: 0,
        //             },
        //         ],
        //         sendConfig: {
        //             executorConfig: {
        //                 maxMessageSize: 99,
        //                 executor: '0x0000000000000000000000000000000000000000',
        //             },
        //             ulnConfig: {
        //                 confirmations: BigInt(42),
        //                 requiredDVNs: [
        //                     '0xA09dB5142654e3eB5Cf547D66833FAe7097B21C3',
        //                     '0x8ddF05F9A5c488b4973897E278B58895bF87Cb24',
        //                 ],
        //                 optionalDVNs: [],
        //                 optionalDVNThreshold: 0,
        //             },
        //         },
        //         receiveConfig: {
        //             ulnConfig: {
        //                 confirmations: BigInt(42),
        //                 requiredDVNs: [
        //                     '0xA09dB5142654e3eB5Cf547D66833FAe7097B21C3',
        //                     '0x8ddF05F9A5c488b4973897E278B58895bF87Cb24',
        //                 ],
        //                 optionalDVNs: [],
        //                 optionalDVNThreshold: 0,
        //             },
        //         },
        //     },
        // },
        // {
        //     from: lineaContract,
        //     to: baseContract,
        //     config: {
        //         enforcedOptions: [
        //             {
        //                 msgType: 1,
        //                 optionType: ExecutorOptionType.LZ_RECEIVE,
        //                 gas: 200000,
        //                 value: 0,
        //             },
        //         ],
        //         sendConfig: {
        //             executorConfig: {
        //                 maxMessageSize: 99,
        //                 executor: '0x0000000000000000000000000000000000000000',
        //             },
        //             ulnConfig: {
        //                 confirmations: BigInt(42),
        //                 requiredDVNs: ['0x129Ee430Cb2Ff2708CCADDBDb408a88Fe4FFd480'],
        //                 optionalDVNs: [],
        //                 optionalDVNThreshold: 0,
        //             },
        //         },
        //         receiveConfig: {
        //             ulnConfig: {
        //                 confirmations: BigInt(42),
        //                 requiredDVNs: ['0x129Ee430Cb2Ff2708CCADDBDb408a88Fe4FFd480'],
        //                 optionalDVNs: [],
        //                 optionalDVNThreshold: 0,
        //             },
        //         },
        //     },
        // },
    ],
};
