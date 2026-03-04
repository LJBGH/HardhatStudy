import {ethers} from "ethers";

function getEth(){
    const eth = Window.ethereum;
    if(!eth){
        alert("请安装MetaMask等以太坊钱包插件");
        throw new Error("No Ethereum provider found");
    }
    return eth;
}