"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useScaffoldContractWrite } from "@@/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();

  // Logic untuk menembak fungsi buyAndOpenPack di smart contract
  const { writeAsync: buyPack, isLoading } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "buyAndOpenPack",
    args: [1n], // Beli 1 pack dulu sebagai contoh
    value: "0.0005", // Harga dalam ETH sesuai contract
  });

  return (
    <div className="flex items-center flex-col flex-grow pt-10 bg-slate-900 text-white min-h-screen">
      <div className="px-5 text-center max-w-xl">
        <h1 className="text-center mb-4">
          <span className="block text-2xl mb-2 text-slate-400">Selamat Datang di</span>
          <span className="block text-5xl font-extrabold text-yellow-400 drop-shadow-md">
            Cryptomon TCG!
          </span>
        </h1>
        
        <p className="text-center text-lg text-slate-300 mb-8">
          Buka Booster Pack digitalmu sekarang dan koleksi kartu Cryptomon langka! 
          Peluang dapet kartu <span className="text-purple-400 font-bold">Legendary cuma 5%</span>.
        </p>

        {/* Kotak Utama Booster Pack */}
        <div className="bg-slate-800 border-2 border-yellow-500 rounded-3xl p-8 shadow-2xl flex flex-col items-center max-w-sm mx-auto">
          {/* Kamu bisa ganti teks ini jadi gambar bungkusan kartu nanti */}
          <div className="w-48 h-64 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-inner mb-6 font-bold text-2xl text-slate-900 tracking-wider">
            BOOSTER PACK
          </div>

          <p className="text-amber-400 font-bold text-xl mb-4">Harga: 0.0005 ETH</p>

          {isConnected ? (
            <button
              className={`btn btn-primary bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold px-8 py-3 rounded-full border-none text-lg w-full ${
                isLoading ? "loading" : ""
              }`}
              onClick={() => buyPack()}
            >
              {isLoading ? "Membuka Pack..." : "BELI & BUKA PACK"}
            </button>
          ) : (
            <p className="text-red-400 font-semibold animate-pulse">
              Silakan koneksikan wallet kamu di pojok kanan atas!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
          
