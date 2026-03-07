import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("TestGas", async function () {
  it("test gas", async function () {
    
    const TestGas = await ethers.getContractFactory("TestGas");
    const testGas = await TestGas.deploy();
    await testGas.waitForDeployment(); // 等待部署完成

    for(let i =0;i<10;i++){
      await testGas.test1();
      await testGas.test2();
      await testGas.test3();
      await testGas.test4();
      await testGas.test5();
    }
  });
});