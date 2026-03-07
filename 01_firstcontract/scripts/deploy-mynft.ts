import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";


async function deploy(){
    const MyNFT = await ethers.getContractFactory("MyNFT");
    const myNFT = await MyNFT.deploy("MyNFT", "MNFT");
    await myNFT.waitForDeployment();
    console.log("MyNFT deployed to:", await myNFT.getAddress());
    return myNFT;
}


deploy();