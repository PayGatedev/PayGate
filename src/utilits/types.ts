// utils/types.ts
export interface Creator {
    address: string
    name: string
    description: string
  }
  
  export interface NFTData {
    name: string
    description: string
    image: File
  }
  export interface NFTItem {
    name: string;
    image: string;
    description: string;
    mintAddress: string;
    uri?: string;
  }
  export interface CreatorProfile {
    walletAddress: string;
    displayName: string;
    bio?: string;
    avatarUrl?: string;
    links?: Array<{
      title: string;
      url: string;
    }>;
  }  