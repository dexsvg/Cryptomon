"use client";

import type { NextPage } from "next";
import { useState, useEffect } from "react";

const Home: NextPage = () => {
  const [account, setAccount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Put your Smart Contract Address here, Bro!
  const CONTRACT_ADDRESS = 0x263043098927A76cA8370363F6B815f34E716851;

  // Function to connect OKX Wallet / MetaMask
  const connectWallet = async () => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } catch (err) {
        console.error("Failed to connect wallet", err);
      }
    } else {
      alert("Please install OKX Wallet or MetaMask first!");
    }
  };

  // Check if wallet is already connected
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

  // Function to Buy & Open Booster Pack
  const buyPack = async () => {
    if (!account) return;
    setIsLoading(true);
    try {
      const hexPrice = "0x1c6bf52634000"; // Hex value for 0.0005 ETH
      
      await (window as any).ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: CONTRACT_ADDRESS,
            value: hexPrice,
            // Method ID for buyAndOpenPack(1)
            data: "0x367a78370000000000000000000000000000000000000000000000000000000000000001",
          },
        ],
      });
      
      alert("Booster Pack Successfully Purchased! Check your new cards in your profile!");
    } catch (err) {
      console.error("Transaction failed", err);
      alert("Transaction rejected or insufficient funds!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center flex-col flex-grow pt-10 bg-slate-900 text-white min-h-screen">
      {/* Top Right Connect Wallet Button */}
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
          <span className="block text-2xl mb-2 text-slate-300">Welcome to</span>
          <span className="block text-5xl font-extrabold text-yellow-400 tracking-wide">
            Cryptomon TCG!
          </span>
        </h1>
        
        <p className="text-center text-md text-slate-400 mb-8">
          Open your digital Booster Pack now and collect rare Cryptomon cards! 
          Chance to get a <span className="text-purple-400 font-bold">Legendary card is only 5%</span>.
        </p>

        {/* Main Booster Pack UI */}
        <div className="bg-slate-800 border-2 border-yellow-500 rounded-3xl p-8 shadow-2xl flex flex-col items-center max-w-sm mx-auto mb-10">
          {/* Main Booster Pack UI */}
<div className="bg-slate-800 border-2 border-yellow-500 rounded-3xl p-8 shadow-2xl flex flex-col items-center max-w-sm mx-auto mb-10">
  
  {/* Efek Glow & Gambar Kartu Charizard Mewah */}
  <div className="relative group mb-6 cursor-pointer flex justify-center">
    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-purple-600 rounded-2xl blur opacity-75 animate-pulse"></div>
    <img 
      src="https://images.pokemontcg.io/base1/4_hires.png 
      alt="Charizard 1st Edition" 
      className="relative w-48 h-68 object-cover rounded-2xl shadow-2xl border-4 border-yellow-400"
    />
  </div>
  
          </div>

          <p className="text-amber-400 font-bold text-xl mb-6">Price: 0.0005 ETH</p>

          {account ? (
            <button
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-black py-4 rounded-xl text-lg transition-all"
              onClick={buyPack}
              disabled={isLoading}
            >
              {isLoading ? "OPENING PACK..." : "MINT / OPEN PACK"}
            </button>
          ) : (
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg transition-all"
              onClick={connectWallet}
            >
              CONNECT WALLET FIRST
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
        
