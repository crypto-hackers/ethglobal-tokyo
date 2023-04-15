import { makeAutoObservable } from "mobx";
import { ChainId, ExternallyOwnedAccounts } from "@/shared/types";

class Web3Store {
  accounts: ExternallyOwnedAccounts = [];
  chainId: ChainId = ChainId.ethereum;

  constructor() {
    makeAutoObservable(this);
  }

  setAccounts(accounts: ExternallyOwnedAccounts) {
    this.accounts = accounts;
  }

  setChainId(chainId: ChainId) {
    this.chainId = chainId;
  }
}

export const web3Store = new Web3Store();
