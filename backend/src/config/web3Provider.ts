import Web3 from "web3";

const providerUrl = process.env.PROVIDER_URL;
if (!providerUrl) throw new Error("Missing env variable PROVIDER_URL");
const web3 = new Web3(providerUrl);

export default web3;
