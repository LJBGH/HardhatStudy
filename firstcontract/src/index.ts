import { ethers } from "ethers";
import { abi as counterAbi } from "../artifacts/contracts/Counter.sol/Counter.json";

console.log("address from env:", process.env.CONTRACT_ADDRESS);

// 获取以太坊提供者（如 MetaMask）
function getEth() {
    // @ts-ignore
    const eth = window.ethereum;

    if (!eth) {
        alert("请安装 MetaMask 等以太坊钱包插件");
        throw new Error("No Ethereum provider found");
    }
    return eth;
}

// 请求用户授权访问以太坊账户
async function requestAccess() {
    const eth = getEth();
    const results = (await eth.request({ method: "eth_requestAccounts" })) as string[];
    return results && results.length > 0;
}

// 获取当前是否已有已连接账户
async function hasSigners() {
    const metamask = getEth();
    const signers = (await metamask.request({ method: "eth_accounts" })) as string[];
    return signers && signers.length > 0;
}

// 获取合约实例并与之交互
async function getContract() {
    if (!(await requestAccess()) && !(await hasSigners())) {
        throw new Error("请授权访问以太坊账户");
    }

    const provider = new ethers.BrowserProvider(getEth());

    // 读取环境变量中的合约地址
    const address = process.env.CONTRACT_ADDRESS;

    console.log("[debug] address from env:", address);
    const network = await provider.getNetwork();
    console.log("[debug] connected network:", {
        chainId: network.chainId.toString(),
        name: network.name,
    });

    const code = await provider.getCode(address);
    console.log("[debug] code at address:", code);
    
    const contract = new ethers.Contract(
        address, //合约地址
        counterAbi, //合约ABI
        await provider.getSigner() //授权后的 signer 用于发送交易
    );
    
    console.log("abi function names:", counterAbi.filter(x => x.type === "function").map(x => x.name));

    // 创建一个 div 元素用于显示 count 值
    const counter = document.createElement("div");
    async function refreshCount() {
        try {
          console.log("[refreshCount] before getCount()");
          const value = await contract.getCount();
          console.log("[refreshCount] after getCount(), raw value =", value);
          console.log("[refreshCount] value.toString() =", value.toString());
          counter.innerHTML = value.toString();
        } catch (e) {
          console.error("[refreshCount] getCount() error:", e);
        }
    }

    await refreshCount();

    // 创建一个按钮来调用 count 函数
    const button = document.createElement("button");
    button.innerHTML = "increment";
    button.onclick = async function () {
        try {
          console.log("[button] before count()");
          const tx = await contract.count();
          console.log("[button] tx sent:", tx.hash);
          await tx.wait();
          console.log("[button] tx mined");
          await refreshCount();
        } catch (e) {
          console.error("[button] count() error:", e);
        }
    };

    // 监听合约事件，当 CounterInc 事件被触发时更新 count 值
    contract.on("CounterInc", async (_sender: string, newCounter: bigint) => {
        console.log("[event] CounterInc:", _sender, newCounter.toString());
        counter.innerHTML = newCounter.toString();
    });

    // 将计数器和按钮添加到页面中
    document.body.appendChild(counter);
    document.body.appendChild(button);
}

async function main() {
    try {
        await getContract();
    } catch (e) {
        console.error(e);
    }
}

// 页面加载完成后自动执行 main，避免页面空白
document.addEventListener("DOMContentLoaded", () => {
    void main();
});