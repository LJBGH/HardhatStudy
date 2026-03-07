const { ethers } = require("ethers");

// 使用钱包对消息进行签名
function walletSignature() {
    const privateKey = "b3a4523ccb51637f81b9d5b9a02744d949e8e2fc2a71f822b06be45c7ae371ce";
    const wallet = new ethers.Wallet(privateKey);
    const message = "hello";
    // 对消息进行签名 结果包含  r、s、v
    console.log(`Wallet signature: ${wallet.signMessageSync(message)}`);

    const privateKey1 = "0xb3a4523ccb51637f81b9d5b9a02744d949e8e2fc2a71f822b06be45c7ae371ce";
    const signingKey = new ethers.SigningKey(privateKey1); // privateKey要加前缀0x
    const hashMessage = ethers.hashMessage(message); // EIP-191
    console.log("\nhashMessage: ", hashMessage)
    const signatureDegest = signingKey.sign(hashMessage); // 获取签名结果，r、s、v
    console.log(`\nSignature degest:`,signatureDegest);
}

// hashMessage的使用
function hashMessageTset() {
    
    const message = "hello";

    // hashMessage EIP-191
    const hash = ethers.hashMessage(message);

    /*
    字符串首先转成utf8字节码，然后新型哈希
    比例如16进制 0x1234 会hash成[0,x,1,2,3,4]6个字符串
    */
    console.log(ethers.toUtf8Bytes(message));
    console.log(ethers.hashMessage(ethers.toUtf8Bytes(message)));
    console.log(ethers.hashMessage(message));

    /*
    如果只想hash两个bytes
    hash[0x12,0x34] 两个字节
    */
    console.log("字节hash", ethers.hashMessage(ethers.getBytes("0x1234")));
    console.log("字节hash", ethers.hashMessage(new Uint8Array(["0x12,0x34"])));

    /*
    去掉0x,拼接hash
    */
    console.log("concant:", ethers.concat([
        ethers.hashMessage(message),
        ethers.hashMessage(message),
    ]))
}


/*
* hashMessage的组成
* 消息头部: "\0x19" + "Ethereum Signed Message:\n"
* message长度
* message
*/

// 手动构造 EIP-191 与 hashMessage对比
function customHashMessage() {

    const message = "hello";
    const messagePrefix = "\x19Ethereum Signed Message:\n";
    const concatMessage = ethers.concat([
        ethers.toUtf8Bytes(messagePrefix),
        ethers.toUtf8Bytes(String(message.length)),
        ethers.toUtf8Bytes(message),
    ])
    console.log("拼接后哈希", concatMessage);

    console.log("keccak256:", ethers.keccak256(concatMessage));

    console.log("hassMessage:", ethers.hashMessage(message));
}

function main() {
    walletSignature();
    // hashMessageTset();
    // customHashMessage();
}

main();

