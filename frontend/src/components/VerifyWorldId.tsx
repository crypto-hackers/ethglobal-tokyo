import React, { useState } from "react";
import { web3Store } from "@/stores/web3Store";
import { observer } from "mobx-react-lite";
import { verificationDataStore } from "@/stores/verificationDataStore";
import { IDKitWidget } from "@worldcoin/idkit";

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

  return (
    <>
      <IDKitWidget
        action="uniq"
        onSuccess={
          (result) => {
            console.log(result);
            handleVerify();
          }
        }
        app_id="app_staging_5413ea86b55f65d9f4c83c55c839afee"
      >    
        {({ open }) => (
          <button
            onClick={open}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          >
            Verify
          </button>
        )}
      </IDKitWidget>
      {message && <p className="mt-4 text-center">{message}</p>}
    </>
  );
};

export default observer(VerifyWorldId);
