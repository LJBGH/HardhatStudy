const hre = require("hardhat");
const { ethers } = hre;

// 获取签名
// 链下获取签名，链上调用permit函数授权spender可以代表owner转移代币
// 参数说明：
// wallet: 签名者的钱包对象
// token: ERC20Permit合约实例
// spender: 授权的地址
// value: 授权的代币数量
// deadline: 授权的截止时间
async function getPermitSignature(wallet, token, spender, value, deadline) {
  // 初始化签名数据
  const [name, chainId, nonce] = await Promise.all([
    token.name(),
    wallet.provider.getNetwork().then((n) => n.chainId),
    token.nonces(wallet.address),
  ]);

  // 使用EIP-712标准签名数据
  const domain = {
    name: name, // 代币名称
    version: "1", // 版本号
    chainId: chainId, // 链ID
    verifyingContract: await token.getAddress(), // 合约地址
  };

  // 定义签名数据结构
  const types = {
    Permit: [
      {
        name: "owner",
        type: "address",
      },
      {
        name: "spender",
        type: "address",
      },
      {
        name: "value",
        type: "uint256",
      },
      {
        name: "nonce",
        type: "uint256",
      },
      {
        name: "deadline",
        type: "uint256",
      },
    ],
  };

  const values = {
    owner: wallet.address,
    spender: spender.address,
    value,
    nonce,
    deadline,
  };

  const signature = await wallet.signTypedData(domain, types, values);
  // 将签名分解为v、r、s三个部分
  return ethers.Signature.from(signature);
}

// 将签名分解为v、r、s三个部分，并在本地测试一次permit流程
async function test() {
  const [owner, spender] = await hre.ethers.getSigners();

  const MyERC20Permit = await hre.ethers.getContractFactory("MyERC20Permit");
  const token = await MyERC20Permit.deploy(owner.address);
  await token.waitForDeployment();

  console.log("Token deployed to:", await token.getAddress());

  const allowance = ethers.parseUnits("100", 18);
  const deadline = ethers.MaxUint256;

  const { v, r, s } = await getPermitSignature(
    owner,
    token,
    spender,
    allowance,
    deadline
  );

  // 调用permit函数授权spender可以代表owner转移代币
  const tx = await token.permit(
    owner.address,
    spender.address,
    allowance,
    deadline,
    v,
    r,
    s
  );
  await tx.wait();

  const onChainAllowance = await token.allowance(
    owner.address,
    spender.address
  );
  console.log("On-chain allowance:", onChainAllowance.toString());
}

test().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});