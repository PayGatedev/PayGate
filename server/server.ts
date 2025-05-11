import express, { Request, Response } from 'express';
import { Connection, Keypair, clusterApiUrl } from '@solana/web3.js';
import { Metaplex, keypairIdentity, toMetaplexFile } from '@metaplex-foundation/js';
import { NFTStorage } from 'nft.storage';
import fs from 'fs';
import multer from 'multer'; // Для обробки файлів
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ініціалізація Solana
const connection = new Connection(clusterApiUrl('devnet'));

// Ініціалізація бекендового гаманця
const keypair = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(process.env.SOLANA_SECRET!))
);

const metaplex = Metaplex.make(connection).use(keypairIdentity(keypair));

// Ініціалізація NFT.Storage
const nftStorage = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY! });

// Налаштування multer для обробки завантажених файлів
const upload = multer({ dest: 'uploads/' });

// POST endpoint для мінтингу NFT
// @ts-ignore
app.post('/mint-nft', upload.single('imageFile'), async (req: Request, res: Response) => {
  try {
    // Отримуємо метадані і файл з форми
    const { name, description } = req.body;
    const imageFile = req.file; // Тепер це буде завантажений файл

    if (!imageFile) {
      return res.status(400).json({ message: 'Image file is required.' });
    }

    // Завантажуємо зображення в buffer
    const imageBuffer = fs.readFileSync(imageFile.path);
    const file = toMetaplexFile(imageBuffer, imageFile.originalname);

    // Завантажуємо метадані на NFT.Storage
    const metadata = await nftStorage.store({
      name,
      description,
      image: new Blob([imageBuffer], { type: 'image/png' }),
    });

    // Завантажуємо метадані в Metaplex
    const { uri } = await metaplex.nfts().uploadMetadata({
      name,
      description,
      image: file,
    });

    // Мінтинг NFT
    const { nft } = await metaplex.nfts().create({
      uri,
      name,
      sellerFeeBasisPoints: 0, // Можна встановити свою комісію
    });

    // Повертаємо адреси NFT і метадані
    res.json({
      mintAddress: nft.address.toBase58(),
      metadataUri: uri,
    });
  } catch (error) {
    console.error('Error minting NFT:', error);
    res.status(500).json({ message: 'Failed to mint NFT' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
