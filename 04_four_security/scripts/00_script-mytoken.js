const { ethers } = require("hardhat");

// 部署合约并转账
async function main() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy(ethers.parseEther("1000000"));
    await token.waitForDeployment();
    console.log("Token deployed to:", await token.getAddress());
    
    await token.transfer(addr1.address, ethers.parseEther("200000"));
    await token.transfer(addr2.address, ethers.parseEther("100000"));
    console.log("owner balance:", await token.balanceOf(owner.address));
    console.log("addr1 balance:", await token.balanceOf(addr1.address));
    console.log("addr2 balance:", await token.balanceOf(addr2.address));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});