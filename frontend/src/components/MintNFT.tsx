import React, { useState } from "react";
import { web3Store } from "@/stores/web3Store";
import { ExternallyOwnedAccounts } from "@/shared/types";

const MintNFT: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleMint = async () => {
    setMessage("");

    if (web3Store.accounts.length === 0) {
      alert("Please connect your wallet");
      return;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mint`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: web3Store.accounts[0] }),
    });

    const data = await response.json();

    if (response.status === 200) {
      setMessage(
        `NFT minted successfully. Transaction hash: ${data.transactionHash}`
      );
    } else {
      setMessage(`Error minting NFT: ${data.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow">
        <h1 className="text-2xl font-semibold">Mint NFT</h1>
        <p>Recipient Address: {web3Store.accounts[0]}</p>
        <button
          onClick={handleMint}
          className="w-full p-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-500"
        >
          Mint NFT
        </button>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default MintNFT;
