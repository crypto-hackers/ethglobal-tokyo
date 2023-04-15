import { Request, Response } from "express";
import Web3 from "web3";
import web3 from "../config/web3Provider";
import ERC20ABI from "../abi/RestrictedERC20.json";

const NfContractAddress = process.env.FT_CONTRACT_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;
if (!NfContractAddress || !privateKey) throw new Error("Missing env variables");
console.log("Contract address:", NfContractAddress);

const claimAirdrop = async (req: Request, res: Response) => {
  try {
    const to = req.body.to;

    if (!Web3.utils.isAddress(to)) {
      return res.status(400).json({ message: "Invalid recipient address" });
    }

    const contract = new web3.eth.Contract(ERC20ABI as any, NfContractAddress);

    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;

    const gasEstimate = await contract.methods
      .claimAirdrop(to)
      .estimateGas({ from: account.address });

    const mintTx = contract.methods.claimAirdrop(to);

    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: NfContractAddress,
        data: mintTx.encodeABI(),
        gas: gasEstimate,
      },
      privateKey
    );

    if (!signedTx.rawTransaction) throw new Error("Failed to sign transaction");

    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    res.status(201).json({
      message: "FT Airdrop successfully",
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      transactionIndex: receipt.transactionIndex,
    });
  } catch (error) {
    console.error("Error minting FT:", error);
    res
      .status(500)
      // @ts-ignore
      .json({ message: "Error minting FT", error: error.message });
  }
};

export { claimAirdrop };
