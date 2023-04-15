// stores/verificationDataStore.ts
import { action, makeAutoObservable } from "mobx";
import axios from "axios";

class VerificationDataStore {
  twitter: any = {
    isVerified: false,
    twitterID: "",
  };
  discord: any = {
    isVerified: false,
    discordID: "",
  };
  email: any = {
    isVerified: false,
    emailAddress: "",
  };
  kyc: any = {
    isVerified: false,
  };
  worldId: any = {
    isVerified: false,
    worldId: "",
  };
  polygonId: any = {
    isVerified: false,
    polygonId: "",
  };
  dataFetchStatus: FetchStatus = FetchStatus.idle;

  constructor() {
    makeAutoObservable(this);
  }

  setVerificationData(data: VerificationDataType) {
    this.twitter.isVerified = data[0];
    this.twitter.twitterID = data[6];
    this.discord.isVerified = data[1];
    this.discord.discordID = data[7];
    this.email.isVerified = data[2];
    this.email.emailAddress = data[8];
    this.kyc.isVerified = data[3];
    this.worldId.isVerified = data[4];
    this.worldId.worldId = data[9];
    this.polygonId.isVerified = data[5];
    this.polygonId.polygonId = data[10];
  }

  updateDataFetchStatus(status: FetchStatus): void {
    this.dataFetchStatus = status;
  }

  async fetchData(address: string) {
    try {
      this.updateDataFetchStatus(FetchStatus.pending);
      const response = await axios.get(
        `/api/verificationData?address=${address}`
      );
      console.log("response.data.data:", response.data.data);
      this.setVerificationData(response.data.data);
      this.updateDataFetchStatus(FetchStatus.done);
    } catch (error) {
      this.updateDataFetchStatus(FetchStatus.error);
      console.error("Error fetching verification data:", error);
    }
  }
}

type VerificationDataType = [
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  string,
  string,
  string,
  string,
  string
];

enum FetchStatus {
  idle = "idle",
  pending = "pending",
  done = "done",
  error = "error",
}

export const verificationDataStore = new VerificationDataStore();
