import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";

// 部署MyToken合约
async function deployMyToken(){
    const HW = await ethers.getContractFactory("MyToken");  //合约工厂中获取MyToken合约
    // owner 是 testAccount1
    // const owner = "0x6B8b35DD1f52d46cE62D825c1cE01ade0EbeA11A"; 
    const hw = await HW.deploy(); //部署合约
    await hw.waitForDeployment(); // 等待部署完成
    console.log("address: ", await hw.getAddress())
    return hw; // 返回部署好的合约实例 
}

async function deploy(){
    const hw = await deployMyToken(); 
    return hw; 
}

async function totalSupply(myToken: any){
    const result = await myToken.totalSupply(); // 调用合约中的totalSupply函数
    console.log(result);
}


// 转账 1 个代币给 testAccount2
async function transfer(myToken: any) {
    const userAddress = "0x7fB966829894b58DCdf5D87935942d87e497E8E1";

    // 假设你的 MyToken 使用 18 位小数（标准 ERC20）
    // 如果你的合约 decimals 不是 18，请根据实际情况调整
    const amount = ethers.parseUnits("1", 18); // 转 1 个代币

    const tx = await myToken.transfer(userAddress, amount);
    console.log("Transfer transaction sent:", tx.hash);
    await tx.wait(); // 等待交易确认
    console.log("1 token transferred to", userAddress);
}


// 主流程：部署 → 查总供应 → 转账
async function main() {
    const myToken = await deployMyToken();
    await totalSupply(myToken);
    await transfer(myToken);
}

// 执行主函数
main().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
});