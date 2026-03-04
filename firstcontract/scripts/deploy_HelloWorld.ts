import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";

// 部署HelloWorld合约
async function deployHelloWorld(){
    const HW = await ethers.getContractFactory("HelloWorld");  //合约工厂中获取HelloWorld合约
    const hw = await HW.deploy(); //部署合约
    await hw.waitForDeployment(); // 等待部署完成
    return hw; // 返回部署好的合约实例 
}

async function deploy(){
    const hw = await deployHelloWorld(); 
    return hw; 
}

async function sayHello(helloWorld: any){
    const result = await helloWorld.sayHello(); // 调用合约中的sayHello函数
    console.log(result);
}

deploy().then(sayHello); // 部署合约并调用sayHello函数