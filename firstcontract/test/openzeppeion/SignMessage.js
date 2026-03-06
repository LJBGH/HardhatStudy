const hre = require("hardhat");
const { ethers } = hre;

async function signMessage(message) {
    // 获取第一个账户
    const [account] = await ethers.getSigners();
    console.log("Signing message with account:", account.address);
    const messageHashBytes = ethers.toBeArray(
        ethers.keccak256(ethers.toUtf8Bytes(message))
    );
    const signature = await account.signMessage(messageHashBytes);
    console.log("Signature:", signature);
}

signMessage("Hello, this is a signed message!");