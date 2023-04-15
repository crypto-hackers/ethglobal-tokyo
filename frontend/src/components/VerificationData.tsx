import { observer } from "mobx-react";
import { useEffect } from "react";
import { web3Store } from "@/stores/web3Store";
import { verificationDataStore } from "@/stores/verificationDataStore";

const VerificationData: React.FC = () => {
  const { data } = verificationDataStore;
  const keys = [
    "isTwitterVerified",
    "isDiscordVerified",
    "isEmailVerified",
    "isKYCVerified",
    "isWorldIdVerified",
    "isPolygonIdVerified",
    "twitterID",
    "discordID",
    "emailAddress",
    "worldId",
    "polygonId",
  ];

  useEffect(() => {
    const fetchVerificationData = async () => {
      if (web3Store.accounts.length === 0) return;

      try {
        const response = await fetch(
          `/api/verificationData?address=${web3Store.accounts[0]}`
        );
        const fetchedData = await response.json();

        if (response.status === 200) {
          verificationDataStore.setData(fetchedData.data);
        } else {
          verificationDataStore.setData([]);
          alert(`Error fetching verification data: ${fetchedData.error}`);
        }
      } catch (error) {
        console.error(error);
        verificationDataStore.setData([]);
        alert("Error fetching verification data");
      }
    };

    fetchVerificationData();
  }, [web3Store.accounts]);

  return (
    <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8">
      <h2 className="text-2xl mb-4">Verification Data</h2>
      <ul className="space-y-2">
        {data.map((item, index) => (
          <li key={index}>
            <strong className="mr-2">{keys[index]}:</strong> {item.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default observer(VerificationData);
