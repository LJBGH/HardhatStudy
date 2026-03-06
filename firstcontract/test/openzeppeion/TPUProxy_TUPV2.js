import hre from "hardhat";
const { ethers, upgrades } = hre;

async function deploy() {
  // 获取 V2 实现合约工厂
  const TUPV2 = await ethers.getContractFactory("TUPV2");

  // 部署可升级代理合约升级到TUPV2 使用的是upgrades函数，需传入TUPV1部署后的地址和TUPV2的工厂
  const v2 = await upgrades.upgradeProxy("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", TUPV2);

  await v2.waitForDeployment();

  // 打印代理合约地址和状态变量
  console.log("Proxy address:", await v2.getAddress());
  console.log("x (before):", (await v2.x()).toString());

  // 调用逻辑函数
  await v2.call();

  console.log("x (after):", (await v2.x()).toString());
}

// 入口
deploy().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});