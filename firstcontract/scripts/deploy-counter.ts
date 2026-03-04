import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";

async function deployCounter(){
    const provider = ethers.provider;
    const blockBefore = await provider.getBlockNumber();
    console.log("部署前区块号:", blockBefore);

    const Counter = await ethers.getContractFactory("Counter"); // 获取Counter合约工厂
    const counter = await Counter.deploy(); // 部署Counter合约
    await counter.waitForDeployment(); // 等待部署完成

    console.log("Counter deployed to:", await counter.getAddress()); // 打印合约地址
    
    const blockAfter = await provider.getBlockNumber();
    console.log("部署后区块号:", blockAfter);
    console.log("部署产生的区块数:", blockAfter - blockBefore);

    return counter; // 返回部署好的合约实例
}

// 调用count函数（会发交易，产生新区块）
async function count(counter: any){
    const provider = ethers.provider;
    const blockBeforeCount = await provider.getBlockNumber();
    console.log("调用 count() 前区块号:", blockBeforeCount);

    const countValue = await counter.count(); // 发交易并等待上链
    console.log("Count value:", countValue.toString());

    const blockAfterCount = await provider.getBlockNumber();
    console.log("调用 count() 后区块号:", blockAfterCount);
    console.log("count() 产生的区块数:", blockAfterCount - blockBeforeCount);
    console.log("Counter value:", (await counter.getCount()).toString());
}

deployCounter().then(count); // 部署合约并调用count函数