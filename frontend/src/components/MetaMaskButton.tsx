import React from "react";
import { observer } from "mobx-react-lite";
import detectEthereumProvider from "@metamask/detect-provider";
import { web3Store } from "@/stores/web3Store";
import { ChainId, ExternallyOwnedAccounts } from "@/shared/types";

const MetaMaskButton: React.FC = () => {
  const handleConnect = async () => {
    try {
      const provider = await detectEthereumProvider();
      if (!provider) {
        console.error("No provider found");
        return;
      }

      // @ts-ignore
      if (provider !== window.ethereum) {
        console.error("Different provider found");
        return;
      }

      // @ts-ignore
      const ethereum = window.ethereum;
      requestAccounts(ethereum).then();

      ethereum.on("connect", (connectInfo: ConnectInfo) => {
        requestAccounts(ethereum).then();
        web3Store.setChainId(Number(connectInfo.chainId));
      });

      ethereum.on("accountsChanged", (accounts: ExternallyOwnedAccounts) => {
        web3Store.setAccounts(accounts);
      });

      ethereum.on("chainChanged", (chainId: string) => {
        web3Store.setChainId(Number(chainId));
      });

      ethereum.on("disconnect", (error: { code: number; message: string }) => {
        web3Store.setAccounts([]);
        web3Store.setChainId(ChainId.ethereum);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const requestAccounts = async (ethereum: any) => {
    try {
      // @ts-ignore
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      web3Store.setAccounts(accounts);
      console.log(accounts);
    } catch (error) {
      console.error(error);
    }
  };

  if (web3Store.accounts.length > 0) return null;
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleConnect}
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mb-4 lg:mb-0"
      >
        Connect to MetaMask
      </button>
    </div>
  );
};

interface ConnectInfo {
  chainId: string;
}

export default observer(MetaMaskButton);
