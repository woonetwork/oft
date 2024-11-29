import bs58 from 'bs58'
import { BigNumber } from 'ethers'
import { task, types } from 'hardhat/config'
import { ActionType, HardhatRuntimeEnvironment } from 'hardhat/types'

import { makeBytes32 } from '@layerzerolabs/devtools'
import { EndpointId } from '@layerzerolabs/lz-definitions'

import { getLayerZeroScanLink } from '../solana'

interface TaskArguments {
    dstEid: number
    amount: string
    to: string
}

const action: ActionType<TaskArguments> = async ({ dstEid, amount, to }, hre: HardhatRuntimeEnvironment) => {
    const signer = await hre.ethers.getNamedSigner('deployer')
    const tokenName = 'WooTokenOFTAdapter'
    // @ts-ignore
    const token = (await hre.ethers.getContract(tokenName)).connect(signer)

    if (hre.network.name == 'sepolia') {
        const IERC20 = '@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20'
        const tokenAddress = '0xDd481A5FBa15E777fd73493E505C057fe16b0955'
        // @ts-ignore
        const erc20Token = (await hre.ethers.getContractAt(IERC20, tokenAddress)).connect(signer)
        const approvalTxResponse = await erc20Token.approve(token.address, amount)
        const approvalTxReceipt = await approvalTxResponse.wait()
        console.log(`approve: ${amount}: ${approvalTxReceipt.transactionHash}`)
    }

    const amountLD = BigNumber.from(amount)
    const sendParam = {
        dstEid,
        //to: makeBytes32(bs58.decode(to)), // to solana address
        to: makeBytes32(to), // to evm address
        amountLD: amountLD.toString(),
        minAmountLD: amountLD.mul(9_000).div(10_000).toString(),
        extraOptions: '0x',
        composeMsg: '0x',
        oftCmd: '0x',
    }
    const [msgFee] = await token.functions.quoteSend(sendParam, false)
    const txResponse = await token.functions.send(sendParam, msgFee, signer.address, {
        value: msgFee.nativeFee,
        gasLimit: 500_000,
    })
    const txReceipt = await txResponse.wait()
    console.log(`send: ${amount} to ${to}: ${txReceipt.transactionHash}`)
    console.log(
        `Track cross-chain transfer here: ${getLayerZeroScanLink(txReceipt.transactionHash, dstEid == EndpointId.SOLANA_V2_TESTNET)}`
    )
}

task('send', 'Sends a transaction', action)
    .addParam('dstEid', 'Destination endpoint ID', undefined, types.int, false)
    .addParam('amount', 'Amount to send in wei', undefined, types.string, false)
    .addParam('to', 'Recipient address', undefined, types.string, false)
