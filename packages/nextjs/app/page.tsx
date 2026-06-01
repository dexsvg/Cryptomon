"use client";

import type { NextPage } from "next";
import { useState, useEffect } from "react";

const Home: NextPage = () => {
  const [account, setAccount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Masukkan alamat 
  const CONTRACT_ADDRESS = 0x263043098927A76cA8370363F6B815f34E716851;

  // Fungsi untuk menyambungkan Wallet (OKX / MetaMask)
  const connectWallet = async () => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } catch (err) {
        console.error("Gagal konek wallet, Bro", err);
      }
    } else {
      alert("Install OKX Wallet atau MetaMask dulu, Bro!");
    }
  };

  // Cek apakah wallet sudah terkoneksi otomatis
  useEffect(() => {
    const checkWallet = async () => {
      if (typeof window !== "undefined" && (window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      }
    };
    checkWallet();
  }, []);

  // Fungsi untuk Beli & Buka Pack Kartu
  const buyPack = async () => {
    if (!account) return;
    setIsLoading(true);
    try {
      // Logic transaksi langsung via web3 provider browser
      const hexPrice = "0x1c6bf52634000"; // Nilai Hex dari 0.0005 ETH (225000000000000 Wei)
      
      await (window as any).ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: CONTRACT_ADDRESS,
            value: hexPrice,
            // Data untuk memicu fungsi buyAndOpenPack(1) di smart contract
            data: "0x367a78370000000000000000000000000000000000000000000000000000000000000001",
          },
        ],
      });
      
      alert("Booster Pack Berhasil Dibeli! Cek kartu baru di profilmu, Bro!");
    } catch (err) {
      console.error("Transaksi gagal", err);
      alert("Transaksi dibatalkan atau dana kurang!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center flex-col flex-grow pt-10 bg-slate-900 text-white min-h-screen">
      {/* Tombol Konek Wallet di Atas */}
      <div className="w-full flex justify-end px-10 mb-6">
        {account ? (
          <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-full font-mono text-sm text-yellow-400">
            {account.substring(0, 6)}...{account.substring(account.length - 4)}
          </div>
        ) : (
          <button 
            onClick={connectWallet}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-full text-sm transition-all"
          >
            Connect Wallet
          </button>
        )}
      </div>

      <div className="px-5 text-center max-w-xl">
        <h1 className="text-center mb-2">
          <span className="block text-2xl mb-2 text-slate-300">Selamat Datang di</span>
          <span className="block text-5xl font-extrabold text-yellow-400 tracking-wide">
            Cryptomon TCG!
          </span>
        </h1>
        
        <p className="text-center text-md text-slate-400 mb-8">
          Buka Booster Pack digitalmu sekarang dan koleksi kartu Cryptomon langka! 
          Peluang dapet kartu <span className="text-purple-400 font-bold">Rare cuma 5%</span>.
        </p>

        {/* Kotak Utama Booster Pack */}
        <div className="bg-slate-800 border-2 border-yellow-500 rounded-3xl p-8 shadow-2xl flex flex-col items-center max-w-sm mx-auto mb-10">
          <div className="w-48 h-56 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg mb-6 font-black text-3xl text-slate-900 tracking-wider">
            BOOSTER
          </div>

          <p className="text-amber-400 font-bold text-xl mb-6">Harga: 0.0005 ETH</p>

          {account ? (
            <button
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-black py-4 rounded-xl text-lg transition-all"
              onClick={buyPack}
              disabled={isLoading}
            >
              {isLoading ? "MEMBUKA PACK..." : "MINT / BUKA PACK"}
            </button>
          ) : (
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg transition-all"
              onClick={connectWallet}
            >
              CONNECT WALLET DULU
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
        
