// components/VerificationData.tsx
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { verificationDataStore } from "@/stores/verificationDataStore";
import { web3Store } from "@/stores/web3Store";

const VerificationData: React.FC = () => {
  useEffect(() => {
    if (web3Store.accounts.length > 0) {
      verificationDataStore.fetchData(web3Store.accounts[0]).then();
    }
  }, [web3Store.accounts]);

  const dataItems = [
    {
      label: "Twitter",
      data: verificationDataStore.twitter,
    },
    {
      label: "Discord",
      data: verificationDataStore.discord,
    },
    {
      label: "Email",
      data: verificationDataStore.email,
    },
    {
      label: "KYC",
      data: verificationDataStore.kyc,
    },
    {
      label: "WorldID",
      data: verificationDataStore.worldId,
    },
    {
      label: "PolygonID",
      data: verificationDataStore.polygonId,
    },
  ];

  if (web3Store.accounts.length === 0) return null;
  if (verificationDataStore.dataFetchStatus !== "done") return null;
  return (
    <table className="table-auto border-collapse border border-green-800 mt-10">
      <thead>
        <tr>
          <th className="border border-green-600 px-4 py-2">Item</th>
          <th className="border border-green-600 px-4 py-2">Verified</th>
          <th className="border border-green-600 px-4 py-2">Value</th>
          <th className="border border-green-600 px-4 py-2">Verify</th>
        </tr>
      </thead>
      <tbody>
        {dataItems.map(({ label, data }) => (
          <tr key={label}>
            <td className="border border-green-600 px-4 py-2">{label}</td>
            <td className="border border-green-600 px-4 py-2">
              {data.isVerified ? "v" : "-"}
            </td>
            <td className="border border-green-600 px-4 py-2">
              {data[
                data.hasOwnProperty("emailAddress")
                  ? "emailAddress"
                  : "twitterID"
              ] ||
                data[
                  data.hasOwnProperty("discordID") ? "discordID" : "worldId"
                ] ||
                data[data.hasOwnProperty("polygonId") ? "polygonId" : "-"] ||
                "-"}
            </td>
            <td className="border border-green-600 px-4 py-2">
              {!data.isVerified && (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                  Verify
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default observer(VerificationData);