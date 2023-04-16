import { Request, Response } from "express";
import Web3 from "web3";
import web3 from "../config/web3Provider";
import ERC721ABI from "../abi/ERC721.json";

const NftContractAddress = process.env.NFT_CONTRACT_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;
if (!NftContractAddress || !privateKey)
  throw new Error("Missing env variables");
console.log("Contract address:", NftContractAddress);
console.log("working!);

const mintNFT = async (req: Request, res: Response) => {
  try {
    const to = req.body.to;

    if (!Web3.utils.isAddress(to)) {
      return res.status(400).json({ message: "Invalid recipient address" });
    }

    const contract = new web3.eth.Contract(
      ERC721ABI as any,
      NftContractAddress
    );

    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;

    const gasEstimate = await contract.methods
      .mint(to)
      .estimateGas({ from: account.address });

    const mintTx = contract.methods.mint(to);

    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: NftContractAddress,
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
      message: "NFT minted successfully",
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      transactionIndex: receipt.transactionIndex,
    });
  } catch (error) {
    console.error("Error minting NFT:", error);
    res
      .status(500)
      // @ts-ignore
      .json({ message: "Error minting NFT", error: error.message });
  }
};

const getBatchVerificationData = async (req: Request, res: Response) => {
  try {
    const address = req.params.address;

    if (!Web3.utils.isAddress(address)) {
      return res.status(400).json({ message: "Invalid recipient address" });
    }

    const contract = new web3.eth.Contract(
      ERC721ABI as any,
      NftContractAddress
    );

    const data = await contract.methods
      .getBatchVerificationData(address)
      .call();

    return res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error fetching batch verification data",
      // @ts-ignore
      error: error.message,
    });
  }
};

const updateKYCData = async (req: Request, res: Response) => {
  try {
    const to = req.body.to;

    if (!Web3.utils.isAddress(to)) {
      return res.status(400).json({ message: "Invalid recipient address" });
    }

    const contract = new web3.eth.Contract(
      ERC721ABI as any,
      NftContractAddress
    );

    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;

    const tokenId = await tokenOfOwnerByIndex(to);

    const gasEstimate = await contract.methods
      .updateWorldIdData(tokenId, true, to)
      .estimateGas({ from: account.address });

    const updateTx = contract.methods.updateWorldIdData(tokenId, true, to);

    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: NftContractAddress,
        data: updateTx.encodeABI(),
        gas: gasEstimate,
      },
      privateKey
    );

    if (!signedTx.rawTransaction) throw new Error("Failed to sign transaction");

    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    res.status(200).json({
      message: "KYC Data Updated successfully",
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      transactionIndex: receipt.transactionIndex,
    });
  } catch (error) {
    console.error("Error minting NFT:", error);
    res
      .status(500)
      // @ts-ignore
      .json({ message: "Error minting NFT", error: error.message });
  }
};

const updateWorldIdData = async (req: Request, res: Response) => {
  try {
    const to = req.body.to;

    if (!Web3.utils.isAddress(to)) {
      return res.status(400).json({ message: "Invalid recipient address" });
    }

    const contract = new web3.eth.Contract(
      ERC721ABI as any,
      NftContractAddress
    );

    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;

    const tokenId = await tokenOfOwnerByIndex(to);


    const gasEstimate = await contract.methods
      .updateWorldIdData(tokenId, true, tokenId)
      .estimateGas({ from: account.address });

    const updateTx = contract.methods.updateWorldIdData(
      tokenId,
      true,
      tokenId
    );

    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: NftContractAddress,
        data: updateTx.encodeABI(),
        gas: gasEstimate,
      },
      privateKey
    );

    if (!signedTx.rawTransaction) throw new Error("Failed to sign transaction");

    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    res.status(200).json({
      message: "KYC Data Updated successfully",
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      transactionIndex: receipt.transactionIndex,
    });
  } catch (error) {
    console.error("Error minting NFT:", error);
    res
      .status(500)
      // @ts-ignore
      .json({ message: "Error minting NFT", error: error.message });
  }
};

const tokenOfOwnerByIndex = async (address: string) => {
  try {
    if (!Web3.utils.isAddress(address)) throw new Error("Invalid address");

    const contract = new web3.eth.Contract(
      ERC721ABI as any,
      NftContractAddress
    );

    const data = await contract.methods.tokenOfOwnerByIndex(address, 0).call();

    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export { mintNFT, getBatchVerificationData, updateKYCData, updateWorldIdData };
