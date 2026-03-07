// 发送ERC20交易

const { ethers } = require("ethers");
require("dotenv").config();
const { promptForKey } = require("../helpers/prompt");

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
    "function transfer(address to, uint256 amount) public returns (bool)"
];

// 合约地址
const MyToken_ADDRESS = "0xB8A765b06f782530837bE0F1869534540E7A9Baa";

// 获取合约
const contract = new ethers.Contract(MyToken_ADDRESS, MyToken_ABI, provider);

// 接收方地址 testAccount2
const REVICER = "0x7fB966829894b58DCdf5D87935942d87e497E8E1";

async function main() {
    // Setup wallet 
    // 获取发送方私钥，通过控制台输入testAccount1的私钥
    const privateKey = await promptForKey();
    // 获取钱包
    const wallet = new ethers.Wallet(privateKey, provider);

    const decimals = await contract.decimals();

    const senderBalanceBefore = await contract.balanceOf(wallet.address);
    const reciverBalanceBefore = await contract.balanceOf(REVICER);

    console.log(`\nReading MyToken address fron ${MyToken_ADDRESS}\n`);
    console.log(`Sender balance before: ${ethers.formatUnits(senderBalanceBefore, decimals)} MT`);
    console.log(`Reciver balance before: ${ethers.formatUnits(reciverBalanceBefore, decimals)} MT`);

    const amount = ethers.parseUnits("0.5", decimals);
    // Create transaction
    // 使用contract.connect(wallet) 连接到钱包，再发起转账
    const transaction = await contract.connect(wallet).transfer(REVICER, amount);

    const receipt = await transaction.wait();
    console.log(transaction);
    console.log(receipt);

    // Get balances after
    const senderBalanceAfter = await contract.balanceOf(wallet.address);
    const reciverBalanceAfter = await contract.balanceOf(REVICER);

    console.log(`Sender balance after: ${ethers.formatUnits(senderBalanceAfter, decimals)} MT`);
    console.log(`Reciver balance after: ${ethers.formatUnits(reciverBalanceAfter, decimals)} MT`);
}

main();