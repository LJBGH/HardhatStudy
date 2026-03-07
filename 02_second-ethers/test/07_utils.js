const { ethers } = require("ethers");

// 校验地址
function verifyAddress(){
    // 字母如果全小写或全大写默认是合法的地址，可以通过ETP-55标准得到混合大小写地址
    const address = "0xc7f1421d420e390a6360f80b70a4de6edcfd2db2";

    // 是否是地址
    if(ethers.isAddress(address)){
        // 格式化为EIP-55标准混合大小写格式
        const formattedAddress = ethers.getAddress(address);
        console.log("Formatted Address (EIP-55):", formattedAddress);
    }else{
        console.log("Invalid address format");
    }
}

// 地址生成EIP-55
function generateAccount(){

    // 1.创建随机钱包
    const randomWallet = ethers.Wallet.createRandom();
    console.log("Private Key: ", randomWallet.privateKey); // 0x...64个十六进制字符
    console.log("Address: ", randomWallet.address); // 0x...40个十六进制字符

    // 2.从私钥创建钱包
    const privateKey = randomWallet.privateKey;
    const wallerFormPrivateKey = new  ethers.Wallet(privateKey);
    console.log("Address from private key: ", wallerFormPrivateKey.address);
}

// uint转换
function uintConvert(){
    
    // Ether 转为 Wei
    const ethValue = "1.5";
    const weiValue = ethers.parseEther(ethValue);
    console.log(`${ethValue} ETH = ${weiValue.toString()} Wei`);

    // Wei 转为 Ether
    const bigWeiValue = ethers.getBigInt("1500000000000000000");
    const convertedEthValue = ethers.formatEther(bigWeiValue);
    console.log(`${bigWeiValue.toString()} Wei = ${convertedEthValue} ETH`);

    // 使用Gwei进行转换（常用用于Gas）
    const gweiValue = "20";
    const weiFormGwei = ethers.parseUnits(gweiValue, "gwei");
    console.log(`${gweiValue} Gwei = ${weiFormGwei.toString()} Wei`);

    const formattedGwei = ethers.formatUnits(weiFormGwei, 9);
    console.log(`${weiFormGwei.toString()} Wei = ${formattedGwei} Gwei`);
}

// hash编码
function hashCodes(){
    
    // 计算Keccak-256 哈希  【相当于Solidity中的 keccak256】
    const data = "Test Ethereum";
    const hash = ethers.keccak256(ethers.toUtf8Bytes(data)); // 0x... (长度为 32 字节)
    console.log("keccak=256 Hash:", hash);



    // ABI编码与解码
    const testAddress = "0xc7f1421d420e390a6360f80b70a4de6edcfd2db2";
    const testNumber = 123;

    // 编码  【相当于Solidity中的 abi.encode】
    const encodedData = ethers.AbiCoder.defaultAbiCoder().encode(
        ["address","uint256"],
        [testAddress,testNumber]
    );
    console.log("Encoded Data:", encodedData); // 0x... (长度为 32 + 32 = 64 字节)

    // 解码  【相当于Solidity中的 abi.decode】
    const decodeData = ethers.AbiCoder.defaultAbiCoder().decode(
        ["address", "uint256"],
        encodedData
    )
    console.log("Decoded Address: ", decodeData[0]);
    console.log("Decoded Number: ", decodeData[1]);


    
    // Packed编码 【相当于Solidity中的 abi.encodePacked】
    const packedData = ethers.solidityPacked(
        ["address", "uint256"], 
        [testAddress, testNumber]
    );
    console.log("PackedData Data:", packedData); // 0x... (长度为 20 + 32 = 52 字节)

    

    // 计算紧打包编码的哈希  【相当于 Solidity 中的 keccak256(abi.encodePacked(...))】
    const packedHash = ethers.solidityPackedKeccak256(
        ["address", "uint256"],
        [testAddress,testNumber]
    )
    console.log("Packed Keccak-256 Hash: ", packedHash); // 0x... (长度为32字节)
}


async function main(){
    // verifyAddress();
    // generateAccount();
    // uintConvert();
    hashCodes();
}

main();
