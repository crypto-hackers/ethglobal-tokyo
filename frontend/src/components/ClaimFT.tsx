import React, { useState } from "react";
import { web3Store } from "@/stores/web3Store";
import { observer } from "mobx-react-lite";
import { verificationDataStore } from "@/stores/verificationDataStore";

const ClaimFT: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleMint = async () => {
    setMessage("");

    if (web3Store.accounts.length === 0) {
      alert("Please connect your wallet");
      return;
    }

    const response = await fetch("/api/claimFT", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: web3Store.accounts[0] }),
    });

    const data = await response.json();
    console.log(data);

    if (response.status === 201) {
      setMessage(`You got Airdrop!`);
    } else {
      setMessage(`Error claiming FT: ${data.data.error}`);
    }
  };

  if (web3Store.accounts.length === 0) return null;
  if (!verificationDataStore.worldId.isVerified) return null;
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleMint}
        className="bg-yellow-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-4 lg:mb-0"
      >
        Claim WorldToken Airdrop
      </button>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default observer(ClaimFT);
