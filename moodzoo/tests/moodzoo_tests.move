#[test_only]
module moodzoo::moodzoo_tests {
    use moodzoo::moodzoo::{Self, MoodZooNFT, AdminCap};
    use sui::test_scenario as ts;
    use sui::transfer;
    use sui::object::{Self, ID, UID};
    use sui::tx_context::{Self, TxContext};
    use std::string;
    use std::vector;
    
    // 测试账户地址
    const ADMIN: address = @0xA11CE;
    const USER: address = @0xB0B;
    
    // 测试 NFT 铸造功能
    #[test]
    fun test_mint_nft() {
        // 初始化测试场景
        let scenario = ts::begin(ADMIN);
        
        // 第一步：模拟合约发布者进行初始化
        {
            let ctx = ts::ctx(&mut scenario);
            moodzoo::init_for_testing(ctx);
        };
        
        // 第二步：普通用户铸造 NFT
        ts::next_tx(&mut scenario, USER);
        {
            let ctx = ts::ctx(&mut scenario);
            
            // 铸造 NFT
            moodzoo::mint_nft(
                string::utf8(b"Cool NFT"),
                string::utf8(b"This is a test NFT"),
                string::utf8(b"https://example.com/nft.jpg"),
                string::utf8(b"https://example.com/audio.mp3"),
                string::utf8(b"TRANQUILITY"),
                string::utf8(b"CAT"),
                string::utf8(b"A calm and peaceful cat"),
                string::utf8(b"medium"),
                ctx
            );
        };
        
        // 第三步：验证 NFT 已被铸造并属于用户
        ts::next_tx(&mut scenario, USER);
        {
            // 获取用户拥有的 NFT
            let nft = ts::take_from_address<MoodZooNFT>(&scenario, USER);
            
            // 验证 NFT 属性
            assert!(string::to_ascii(moodzoo::name(&nft)) == string::to_ascii(string::utf8(b"Cool NFT")), 0);
            assert!(string::to_ascii(moodzoo::description(&nft)) == string::to_ascii(string::utf8(b"This is a test NFT")), 1);
            assert!(string::to_ascii(moodzoo::emotion(&nft)) == string::to_ascii(string::utf8(b"TRANQUILITY")), 2);
            assert!(string::to_ascii(moodzoo::animal(&nft)) == string::to_ascii(string::utf8(b"CAT")), 3);
            assert!(moodzoo::creator(&nft) == USER, 4);
            
            // 归还 NFT 以避免测试错误
            ts::return_to_address(USER, nft);
        };
        
        // 第四步：管理员使用 AdminCap 进行批量铸造测试
        ts::next_tx(&mut scenario, ADMIN);
        {
            let ctx = ts::ctx(&mut scenario);
            let admin_cap = ts::take_from_address<AdminCap>(&scenario, ADMIN);
            
            let names = vector[string::utf8(b"Batch NFT 1"), string::utf8(b"Batch NFT 2")];
            let descriptions = vector[string::utf8(b"Desc 1"), string::utf8(b"Desc 2")];
            let urls = vector[string::utf8(b"https://example.com/1.jpg"), string::utf8(b"https://example.com/2.jpg")];
            let audio_urls = vector[string::utf8(b"https://example.com/1.mp3"), string::utf8(b"https://example.com/2.mp3")];
            let emotions = vector[string::utf8(b"RAGE"), string::utf8(b"MELANCHOLY")];
            let animals = vector[string::utf8(b"TIGER"), string::utf8(b"WOLF")];
            let animal_descriptions = vector[string::utf8(b"Angry tiger"), string::utf8(b"Sad wolf")];
            let intensities = vector[string::utf8(b"high"), string::utf8(b"low")];
            let recipients = vector[USER, USER];
            
            // 批量铸造
            moodzoo::batch_mint(
                &admin_cap,
                names,
                descriptions,
                urls,
                audio_urls,
                emotions,
                animals,
                animal_descriptions,
                intensities,
                recipients,
                ctx
            );
            
            ts::return_to_address(ADMIN, admin_cap);
        };
        
        // 完成测试
        ts::end(scenario);
    }
}
