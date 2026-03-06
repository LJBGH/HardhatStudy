import hre from "hardhat";
const { ethers, upgrades } = hre;

async function deploy() {
  // 获取 V1 实现合约工厂
  const UUPSV1 = await ethers.getContractFactory("UUPSV1");

  // 部署可升级代理合约UUPSV1
  const v1 = await upgrades.deployProxy(UUPSV1, [1], {
    initializer: "initialize",
    kind: "uups", // 指定使用 UUPS 代理模式
  });

  await v1.waitForDeployment();

  // 打印代理合约地址和状态变量
  console.log("Proxy address:", await v1.getAddress());
  console.log("x (before):", (await v1.x()).toString());
  await v1.call();
  console.log("x (after):", (await v1.x()).toString());

  // 升级到 UUPSV2
  const UUPSV2 = await ethers.getContractFactory("UUPSV2"); 
  await upgrades.upgradeProxy(await v1.getAddress(), UUPSV2); 

  console.log("Upgraded Proxy address:", await v1.getAddress());
  console.log("x (after upgrade):", (await v1.x()).toString());
  await v1.call();
  console.log("x (after):", (await v1.x()).toString());
}

// 入口
deploy().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});