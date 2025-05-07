import React, { createContext, useContext, useMemo } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Metaplex } from "@metaplex-foundation/js";
import { walletAdapterIdentity } from "@metaplex-foundation/js";

const MetaplexContext = createContext(null);

export const MetaplexProvider = ({ children }:any) => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const metaplex = useMemo(() => {
    if (!connection || !wallet) return null;
    return Metaplex.make(connection).use(walletAdapterIdentity(wallet));
  }, [connection, wallet]);

  return (
    //@ts-ignore
    <MetaplexContext.Provider value={metaplex}>
      {children}
    </MetaplexContext.Provider>
  );
};

export const useMetaplex = () => {
  const context = useContext(MetaplexContext);
  if (!context) {
    throw new Error("useMetaplex must be used within a MetaplexProvider");
  }
  return context;
};
