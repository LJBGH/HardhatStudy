import { ethers } from "ethers";
import "dotenv/config";

const nftAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

async function main(){
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    // 获取本地账户
    const signer = new ethers.Wallet(process.env.ACCOUNT_LOCAL, provider);
    // 获取NFT合约,如果只访问合约状态，可以传provider，否则需要传signer
    const nft = new ethers.Contract(nftAddress, ["function mint(address to) public"], signer);
    // 调用mint函数
    // const tx = await nft.mint(signer.address);
    // await tx.wait();
    // console.log("Minted NFT to ", signer.address, "Transaction hash: ", tx.hash);

    // nonce gasOrice chainId data to from gasLimit
    // 获取nonce
    const nonce = await provider.getTransactionCount(signer.address);
    // 获取gas价格
    const { gasPrice } = await provider.getFeeData();
  if (!gasPrice) throw new Error("No gasPrice from getFeeData()");
    // 获取链ID
    const {chainId} = await provider.getNetwork();
    // 编码函数数据
    const data = nft.interface.encodeFunctionData("mint", [signer.address]); 
    const to = nftAddress;
    const from = signer.address;
    // 估计gas费
    const gasLimit = await provider.estimateGas({
        from: signer.address, 
        to: nftAddress,
        data 
    });
    // 生成未签名的交易
    const unsignedTx = await signer.populateTransaction({ 
        to: to, 
        from: from, 
        data: data, 
        gasLimit: gasLimit,
        gasPrice: gasPrice,
        chainId: chainId,
        nonce: nonce
    });

    console.log("Unsigned transaction: ", unsignedTx);
    // 签名交易
    const signedTx = await signer.signTransaction(unsignedTx);
    // 发送交易
    provider.send("eth_sendRawTransaction", [signedTx]);
 
}

main();