/// MoodZoo NFT Contract - Digital collectibles based on emotions and animals
module moodzoo::moodzoo {
    use sui::transfer;
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::url::{Self, Url};
    use sui::event;
    use std::string::{Self, String};

    // ===== One-time witness structure for contract deployment =====
    public struct MOODZOO has drop {}

    // ===== Main storage structures =====
    
    /// MoodZoo NFT main structure
    public struct MoodZooNFT has key, store {
        id: UID,
        name: String,
        description: String,
        url: Url,
        emotion: String,
        animal: String,
        creator: address
    }

    // ===== Events =====
    
    /// NFT minting event
    public struct NFTMinted has copy, drop {
        nft_id: address,
        name: String,
        creator: address
    }

    // ===== Functions =====

    /// Initialization function, executed once when the contract is published
    fun init(witness: MOODZOO, ctx: &mut TxContext) {
        // Quick initialization, only keeping core functionality
        let _ = witness;
    }

    /// Create NFT (called by users)
    public entry fun mint_nft(
        name: vector<u8>,
        description: vector<u8>,
        url: vector<u8>,
        emotion: vector<u8>,
        animal: vector<u8>,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        let nft = MoodZooNFT {
            id: object::new(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            url: url::new_unsafe_from_bytes(url),
            emotion: string::utf8(emotion),
            animal: string::utf8(animal),
            creator: sender
        };

        // Emit minting event
        event::emit(NFTMinted {
            nft_id: object::uid_to_address(&nft.id),
            name: nft.name,
            creator: sender
        });

        // Transfer NFT to creator
        transfer::public_transfer(nft, sender);
    }

    // ===== Getter functions =====

    /// Get NFT name
    public fun name(nft: &MoodZooNFT): &String {
        &nft.name
    }

    /// Get NFT description
    public fun description(nft: &MoodZooNFT): &String {
        &nft.description
    }

    /// Get NFT URL
    public fun url(nft: &MoodZooNFT): &Url {
        &nft.url
    }

    /// Get NFT emotion
    public fun emotion(nft: &MoodZooNFT): &String {
        &nft.emotion
    }

    /// Get NFT animal
    public fun animal(nft: &MoodZooNFT): &String {
        &nft.animal
    }

    /// Get NFT creator
    public fun creator(nft: &MoodZooNFT): address {
        nft.creator
    }
}
