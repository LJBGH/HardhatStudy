import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("HelloWorld", async function () {
  it("Hello, World!", async function () { 
    // 1. 初始化
    // 2. 导入合约
    // 3. 编写测试用例

    const HW = await ethers.getContractFactory("HelloWorld");
    const hw = await HW.deploy();
    await hw.waitForDeployment(); // 等待部署完成

    expect(await hw.sayHello()).to.equal("Hello, World!");
  });
});