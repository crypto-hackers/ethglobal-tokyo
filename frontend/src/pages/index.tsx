import Image from "next/image";
import { Inter } from "next/font/google";
import MetaMaskButton from "@/components/MetaMaskButton";
import MintNFT from "@/components/MintNFT";
import VerificationData from "@/components/VerificationData";
import ClaimFT from "@/components/ClaimFT";
import CreateChatGroup from "@/components/CreateChatGroup";
import UpdateChatGroup from "@/components/UpdateChatGroup";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <MetaMaskButton />
        <MintNFT />
        <VerificationData />
        <ClaimFT />
        <CreateChatGroup />
        <UpdateChatGroup/>
      </div>
    </main>
  );
}
