'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers, BrowserProvider, Contract } from 'ethers';

interface Web3ContextType {
  account: string | null;
  provider: BrowserProvider | null;
  signer: any;
  contracts: {
    eeth: Contract | null;
    weeth: Contract | null;
    lender: Contract | null;
  };
  connectWallet: () => Promise<void>;
  isConnecting: boolean;
  error: string | null;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<any>(null);
  const [contracts, setContracts] = useState<{
    eeth: Contract | null;
    weeth: Contract | null;
    lender: Contract | null;
  }>({ eeth: null, weeth: null, lender: null });
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadContracts = async (signer: any) => {
    try {
      // Load contract addresses
      const addressesResponse = await fetch('/contract-addresses.json');
      const addresses = await addressesResponse.json();

      // Load ABIs
      const eethAbiResponse = await fetch('/abis/LiquidStakingToken.json');
      const weethAbiResponse = await fetch('/abis/WrappedStakingToken.json');
      const lenderAbiResponse = await fetch('/abis/StakingLender.json');

      const eethAbi = await eethAbiResponse.json();
      const weethAbi = await weethAbiResponse.json();
      const lenderAbi = await lenderAbiResponse.json();

      // Initialize contracts
      const eethContract = new Contract(addresses.LiquidStakingToken, eethAbi, signer);
      const weethContract = new Contract(addresses.WrappedStakingToken, weethAbi, signer);
      const lenderContract = new Contract(addresses.StakingLender, lenderAbi, signer);

      setContracts({
        eeth: eethContract,
        weeth: weethContract,
        lender: lenderContract,
      });
    } catch (err) {
      console.error('Error loading contracts:', err);
      setError('Failed to load contracts. Make sure the local blockchain is running.');
    }
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      if (typeof window.ethereum === 'undefined') {
        setError('Please install MetaMask or another Web3 wallet');
        return;
      }

      const web3Provider = new BrowserProvider(window.ethereum);
      const accounts = await web3Provider.send('eth_requestAccounts', []);
      const web3Signer = await web3Provider.getSigner();

      setAccount(accounts[0]);
      setProvider(web3Provider);
      setSigner(web3Signer);

      await loadContracts(web3Signer);
    } catch (err: any) {
      console.error('Error connecting wallet:', err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  // Auto-connect if already connected
  useEffect(() => {
    const autoConnect = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const web3Provider = new BrowserProvider(window.ethereum);
        const accounts = await web3Provider.send('eth_accounts', []);
        
        if (accounts.length > 0) {
          await connectWallet();
        }
      }
    };

    autoConnect();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
          setProvider(null);
          setSigner(null);
          setContracts({ eeth: null, weeth: null, lender: null });
        }
      });
    }
  }, []);

  return (
    <Web3Context.Provider
      value={{
        account,
        provider,
        signer,
        contracts,
        connectWallet,
        isConnecting,
        error,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};
