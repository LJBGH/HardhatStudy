// 发送ETH

const { ethers } = require("ethers");
require("dotenv").config();
const {promptForKey} = require("../helpers/prompt.js");

// 以太坊测试网地址
const SEPOLIA_URL = `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`;

// 获取连接到以太坊测试网的提供者
const provider = new ethers.JsonRpcProvider(SEPOLIA_URL);

// 接收方地址 testAccount2
const REVICER = "0x7fB966829894b58DCdf5D87935942d87e497E8E1"; 

async function main() {

    // Setup wallet 
    // 获取发送方私钥，通过控制台输入testAccount1的私钥
    const privateKey = await promptForKey();

    // console.log(await provider._network())
    const wallet = new ethers.Wallet(privateKey, provider);
    
    // Get balances before
    const senderBalanceBefore = await provider.getBalance(wallet.address);
    const reciverBalanceBefore = await provider.getBalance(REVICER);

    console.log(`\n Sender balance before: ${ethers.formatUnits(senderBalanceBefore, 18)} ETH`);
    console.log(`\n Reciver balance before: ${ethers.formatUnits(reciverBalanceBefore, 18)} ETH`); 

    // Create transaction
    const transaction = await wallet.sendTransaction({
        to:REVICER,
        value:ethers.parseUnits("0.05",18),
    });

    const receipt = await transaction.wait();
    console.log(transaction);
    console.log(receipt);

    // Get balances after
    const senderBalanceAfter = await provider.getBalance(wallet.address);
    const reciverBalanceAfter = await provider.getBalance(REVICER);

    console.log(`\n Sender balance after: ${ethers.formatUnits(senderBalanceAfter, 18)} ETH`);
    console.log(`\n Reciver balance after: ${ethers.formatUnits(reciverBalanceAfter, 18)} ETH`); 
}

main();