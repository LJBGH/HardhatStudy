import "@nomicfoundation/hardhat-ethers";
import { ethers, network, run } from "hardhat";

async function deployTestGas() {
  const TestGas = await ethers.getContractFactory("TestGas");
  const testGas = await TestGas.deploy();

  // 等待部署完成并多等几块，方便区块浏览器索引
  const deployTx = testGas.deploymentTransaction();
  if (deployTx) {
    await deployTx.wait(5);
  } else {
    await testGas.waitForDeployment();
  }

  const address = await testGas.getAddress();
  console.log("TestGas deployed to:", address);

  // 在 Sepolia 上自动验证合约
  if (network.name === "sepolia") {
    console.log("Verifying TestGas on Etherscan...");
    try {
      await run("verify:verify", {
        address,
        constructorArguments: [],
      });
      console.log("TestGas verified successfully.");
    } catch (e: any) {
      console.error("Verify failed:", e.message ?? e);
    }
  }

  return testGas;
}

deployTestGas().then(() => {
  // no-op
}); 