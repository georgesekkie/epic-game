const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(
        ["Bulbasaur", "Charmander", "Squirtle"], 
        ["QmQh3Uy5Mg2eKW1S2j81SsTzTBxabLipBqJ3jJGmjV8j3J",  
        "QmQEBvQrwufwKip4yb38xwf9fDM8h8tUtxSfLmbEpSFxYY",
        "QmdNUUtoiT6f4dRugCzd2bvHGvsuuqgRJAYRMKQwqgNegC"],
        [300, 301, 703],                    // キャラクターのHP
        [100, 50, 25],
        "MYU2", // Bossの名前
        "https://i.imgur.com/3Ikh51a.png", // Bossの画像
        10000, // Bossのhp
        50 // Bossの攻撃力                 
    );
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);
    // 再代入可能な変数 txn を宣言
    let txn;
    // 3体のNFTキャラクターの中から、2番目のキャラクターを Mint しています。
    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();

    // 1回目の攻撃: attackBoss 関数を追加
    txn = await gameContract.attackBoss();
    await txn.wait();

    // 2回目の攻撃: attackBoss 関数を追加
    txn = await gameContract.attackBoss();
    await txn.wait();

    // Minting が仮想マイナーにより、承認されるのを待ちます。
    await txn.wait();

    // NFTのURIの値を取得します。tokenURI は ERC721 から継承した関数です。
    let returnedTokenUri = await gameContract.tokenURI(1);
    console.log("Token URI:", returnedTokenUri);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
runMain();