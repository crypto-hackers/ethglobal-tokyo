// stores/verificationDataStore.ts
import { makeAutoObservable } from "mobx";

class VerificationDataStore {
  data: any[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setData(data: any[]) {
    this.data = data;
  }
}

export const verificationDataStore = new VerificationDataStore();
