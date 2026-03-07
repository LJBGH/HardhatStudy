// 监听事件 
const { ethers } = require("ethers");
require("dotenv").config();

// 获取连接到以太坊测试网的提供者
const SEPOLIA_URL = `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`;
const provider = new ethers.JsonRpcProvider(SEPOLIA_URL);

// ABI
const MyToken_ABI = [
    "function name() public view returns (string)",
    "function symbol() public view returns (string)",
    "function decimals() public view returns (uint8)",
    "function totalSupply() public view returns (uint256)",
    "function balanceOf(address) public view returns (uint256)",
    "function transfer(address to, uint256 amount) public returns (bool)",
    "event Transfer(address indexed, address indexed, uint256)",
];

// 合约地址
const MyToken_ADDRESS = "0xB8A765b06f782530837bE0F1869534540E7A9Baa";

// 获取合约
const contract = new ethers.Contract(MyToken_ADDRESS, MyToken_ABI, provider);

async function main() {
    // 获取当前区块号
    const block = await provider.getBlockNumber();
    console.log(`block: ${block}`);

    // 获取Transfer事件
    const transferEvents = await contract.queryFilter(
        "Transfer",
        block - 1,
        block
    );

    console.log(transferEvents[0]);
}

main();