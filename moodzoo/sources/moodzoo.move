/// MoodZoo NFT 合约 - 基于情绪和动物的数字藏品
module moodzoo::moodzoo {
    use sui::transfer;
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::url::{Self, Url};
    use sui::event;
    use std::string::{Self, String};

    // ===== 合约发布时的一次性见证结构 =====
    public struct MOODZOO has drop {}

    // ===== 主要存储结构 =====
    
    /// MoodZoo NFT 主要结构
    public struct MoodZooNFT has key, store {
        id: UID,
        name: String,
        description: String,
        url: Url,
        emotion: String,
        animal: String,
        creator: address
    }

    // ===== 事件 =====
    
    /// NFT 铸造事件
    public struct NFTMinted has copy, drop {
        nft_id: address,
        name: String,
        creator: address
    }

    // ===== 函数 =====

    /// 初始化函数，在合约发布时执行一次
    fun init(witness: MOODZOO, ctx: &mut TxContext) {
        // 快速初始化，仅保留核心功能
        let _ = witness;
    }

    /// 创建 NFT（由用户调用）
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

        // 发出铸造事件
        event::emit(NFTMinted {
            nft_id: object::uid_to_address(&nft.id),
            name: nft.name,
            creator: sender
        });

        // 将 NFT 转移给创建者
        transfer::public_transfer(nft, sender);
    }

    // ===== Getter 函数 =====

    /// 获取 NFT 名称
    public fun name(nft: &MoodZooNFT): &String {
        &nft.name
    }

    /// 获取 NFT 描述
    public fun description(nft: &MoodZooNFT): &String {
        &nft.description
    }

    /// 获取 NFT URL
    public fun url(nft: &MoodZooNFT): &Url {
        &nft.url
    }

    /// 获取 NFT 情绪
    public fun emotion(nft: &MoodZooNFT): &String {
        &nft.emotion
    }

    /// 获取 NFT 动物
    public fun animal(nft: &MoodZooNFT): &String {
        &nft.animal
    }

    /// 获取 NFT 创建者
    public fun creator(nft: &MoodZooNFT): address {
        nft.creator
    }
}
