// 连接网络，并获取账户余额

require("dotenv").config();
const { ethers } = require("ethers");

// 以太坊测试网地址
const SEPOLIA_URL = `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`;

// 获取连接到以太坊测试网的提供者
const provider = new ethers.JsonRpcProvider(SEPOLIA_URL);

// 测试网的账户地址吧 
const ADDRESS = "0x6B8b35DD1f52d46cE62D825c1cE01ade0EbeA11A";

async function main() {
    const balance = await provider.getBalance(ADDRESS);
    console.log("Balance:", balance);

    // 将余额转换为以太币单位
    console.log("Balance in Ether:", ethers.formatUnits(balance,18));
}

main();