import Image from "next/image";
import { Inter } from "next/font/google";
import MetaMaskButton from "@/components/MetaMaskButton";
import MintNFT from "@/components/MintNFT";
import VerificationData from "@/components/VerificationData";
import { SignInWithWorldID } from "@worldcoin/idkit";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <MetaMaskButton />
        <MintNFT />
        <VerificationData />
        <SignInWithWorldID
            nonce="z-dkEmoy_ujfk7B8uTiQpp"
            onSuccess={result => console.log(result)}
            app_id="app_staging_bdde51f6c88010a57aec659b733f18b4"
          >
          {({ open }) => 
            <button  onClick={open} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4 lg:mb-0">
              WorldID Connect
            </button>
          }
        </SignInWithWorldID>
      </div>
    </main>
  );
}
