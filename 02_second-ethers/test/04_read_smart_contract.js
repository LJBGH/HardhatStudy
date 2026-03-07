// 获取合约状态

const { ethers } = require("ethers");
require("dotenv").config();

// 以太坊测试网地址
const SEPOLIA_URL = `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`;

// 获取连接到以太坊测试网的提供者
const provider = new ethers.JsonRpcProvider(SEPOLIA_URL);

// ABI
const MyToken_ABI = [
  "function name() public view returns (string)",
  "function symbol() public view returns (string)",
  "function decimals() public view returns (uint8)",
  "function totalSupply() public view returns (uint256)",
  "function balanceOf(address) public view returns (uint256)"
];

// 合约地址，合约的owner是testAccount1
const MyToken_ADDRESS= "0xB8A765b06f782530837bE0F1869534540E7A9Baa";
const contract = new ethers.Contract(MyToken_ADDRESS,MyToken_ABI,provider);

async function main(){
    const name = await contract.name();
    const symbol = await contract.symbol();
    const decimals = await contract.decimals();
    const totalSupply = await contract.totalSupply();

    // 打印用户的地址
    console.log(`\nReading contract address fron ${MyToken_ADDRESS}\n`);
    console.log(`\nname: ${name}`);
    console.log(`\nsymbol: ${symbol}`);
    console.log(`\ndecimals: ${decimals}`);
    console.log(`\ntotalSupply ${ethers.formatUnits(totalSupply, 18)} MT`);

    // 用户testAccount2的地址
    const User_ADDRESS = "0x7fB966829894b58DCdf5D87935942d87e497E8E1"
    const balaance = await contract.balanceOf(User_ADDRESS);
    console.log(`\nUser balance is ${ethers.formatUnits(balaance, 18)} MT`);
} 

main();