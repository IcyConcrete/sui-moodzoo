MoodZoo is a playful, emotional NFT minting platform that combines mood-based audio uploads with AI-generated animal visuals, all on the Sui blockchain. Below is the complete user journey for the MVP.
+------------------------+       +-----------------------------+       +------------------------+       +-----------------------------+
|   Visit MoodZoo        |  -->  |   Connect Wallet / Sign In  |  -->  | Upload Audio + Choose Mood |  -->  | Animal Generation + NFT Preview |
+------------------------+       +-----------------------------+       +------------------------+       +-----------------------------+
        🐾                        User clicks “Connect Wallet”             Upload or drag & drop audio       🎨 Generate animal + mood metadata
MoodZoo landing page      Use MetaMask or Sui Wallet for login         Choose mood tag + add description  Preview generated NFT cover image
Displays brand & vibe     (identity auto-detected)                     Click “Next” to continue            Click “MINT NFT” to proceed

                     ↓                                                     ↓
+------------------------------+                          +---------------------------------+
|   Mint NFT (IPFS + Sui)      |  <----------------------  |   User Confirms Minting         |
+------------------------------+                          +---------------------------------+
Upload audio + mood data to IPFS                             Show contract confirmation screen  
Mint NFT on Sui blockchain                                   On confirm, write to chain  
Redirect to NFT gallery view                                 Show “Mint Successful” message

                     ↓
+------------------------------+       +---------------------------------------------+
|  Explore MoodZoo Gallery     |  -->  |  View NFT Detail Page (w/ Like & Info)       |
+------------------------------+       +---------------------------------------------+
Browse NFTs by mood category             Display: audio player, mood info, animal art  
Users can ❤️ Like or comment            On-chain data, IPFS link, mint timestamp  
Explore trending moods & leaderboard     “Back to Gallery” button available

                     ↓
+------------------------------+       
|  Degen Animal Page (Bonus)   |
+------------------------------+
Browse a special Meme NFT collection  
Includes viral pets, quotes, and degen humor  
Option to mint limited edition Degen NFTs  