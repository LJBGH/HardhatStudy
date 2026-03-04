import { ethers } from "ethers";
import {abi as counterAbi } from "../artifacts/contracts/Counter.sol/Counter.json";
import { get } from "node:http";

// 获取以太坊提供者（如MetaMask）并进行基本的账户访问和合约交互
function getEth(){
    // @ts-ignore
    const eth = window.ethereum;
    if(!eth){
        alert("请安装MetaMask等以太坊钱包插件");
        throw new Error("No Ethereum provider found");
    }
    return eth;
}

// 请求用户授权访问以太坊账户
async function requestAccess(){
    const eth = getEth();
    const results = await eth.request({ method: "eth_requestAccounts" }) as string[];
    return results && results.length > 0;
}

// 获取当前连接的以太坊账户地址
async function hasSigners(){
    const metamask = getEth();
    const signers = await metamask.request({ method: "eth_accounts" }) as string[];
    return signers && signers.length > 0;
}

// 获取合约实例并与之交互
async function getContract(){
    // 1.地址
    // 2.方法名
    // 3.provider
    // 4.signer

    if(!await requestAccess() && !await hasSigners()){
        throw new Error("请授权访问以太坊账户");
    }

    // 创建以太坊提供者并连接到部署好的合约
    const privider = new ethers.BrowserProvider(getEth());
    // 替换为部署好的合约地址
    const address = "0x7a2088a1bfc9d81c55368ae168c2c02570cb814f"; 
    // 创建合约实例
    const contract = new ethers.Contract(
        address, // 合约地址
        counterAbi, // 合约ABI
        await privider.getSigner() // 使用 signer 进行交易签名
    );

    // 创建一个 div 元素用于显示 count 值，并设置一个按钮来调用 count 函数
    const counter = document.createElement("div");
    async function getCount(){
        counter.innerHTML = await contract.getCount();
    }

    getCount();
    const button = document.createElement("button");
    button.innerHTML = "increment"; 
    button.onclick = async function ()  {
        await contract.count(); // 调用合约的 count 函数
        await getCount(); // 更新显示的 count 值
    }

    // 监听合约事件，当 CounterInc 事件被触发时更新 count 值
    contract.on(contract.filters.CounterInc(), async function({args}){
        // 监听 CounterInc 事件，更新 count 值
        counter.innerHTML = args[0].toString() || await contract.getCount();  
    })

    // 将计数器和按钮添加到页面中
    document.body.appendChild(counter);
    document.body.appendChild(button);
}

async function main(){
    await getContract();
}