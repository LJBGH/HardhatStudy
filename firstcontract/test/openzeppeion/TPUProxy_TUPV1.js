import hre from "hardhat";
const { ethers, upgrades } = hre;

async function deploy() {
  // 获取 V1 实现合约工厂
  const TUPV1 = await ethers.getContractFactory("TUPV1");

  // 部署可升级代理合约TUPV1
  const v1 = await upgrades.deployProxy(TUPV1, [1], {
    initializer: "initialize",
  });

  await v1.waitForDeployment();

  // 打印代理合约地址和状态变量
  console.log("Proxy address:", await v1.getAddress());
  console.log("x (before):", (await v1.x()).toString());

  // 调用逻辑函数
  await v1.call();

  console.log("x (after):", (await v1.x()).toString());
}

// 入口
deploy().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});