// const { Wallet} = require("ethers");
// 使用ethersproject/wallet,减少依赖和打包体积
const { Wallet} = require("@ethersproject/wallet");
const wallet = Wallet.createRandom();
console.log(wallet.address);
console.log(wallet.privateKey);