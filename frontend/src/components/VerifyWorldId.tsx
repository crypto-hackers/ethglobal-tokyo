import React, { useState } from "react";
import { web3Store } from "@/stores/web3Store";
import { observer } from "mobx-react-lite";
import { verificationDataStore } from "@/stores/verificationDataStore";
import { SignInWithWorldID } from "@worldcoin/idkit";
import cryptoRandomString from 'crypto-random-string';

const VerifyWorldId: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    setMessage("");

    if (web3Store.accounts.length === 0) {
      alert("Please connect your wallet");
      return;
    }

    const response = await fetch("/api/verifyWorldId", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: web3Store.accounts[0] }),
    });

    const data = await response.json();
    console.log(data);

    if (response.status === 200) {
      verificationDataStore.fetchData(web3Store.accounts[0]).then();
    } else {
      setMessage(`Error verifying KYC: ${data.data.error}`);
    }
  };

  const randomString = cryptoRandomString({ length: 10 });

  return (
    <>
      <SignInWithWorldID
        nonce={randomString}
        onSuccess={(result) => {
          console.log(result);
          handleVerify();
        }}
        app_id="app_7532c5865327fdc0a4f409574775e380"
      >
        {({ open }) => (
          <button
            onClick={open}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          >
            Verify
          </button>
        )}
      </SignInWithWorldID>
      {message && <p className="mt-4 text-center">{message}</p>}
    </>
  );
};

export default observer(VerifyWorldId);
