const main = async () => {
	const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
	
	const gameContract = await gameContractFactory.deploy(
		["Bulbasaur", "Charmander", "Squirtle"],
		["https://i.imgur.com/IjX49Yf.png",     
		"https://i.imgur.com/Xid5qaC.png",
		"https://i.imgur.com/kW2dNCs.png"],
		[100, 200, 300],                         
		[100, 50, 25],
		"MYU2", 
		"https://i.imgur.com/3Ikh51a.png", 
		10000, 
		50 
	);

	const nftGame = await gameContract.deployed();

	console.log("Contract deployed to:", nftGame.address);

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