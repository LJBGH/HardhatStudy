import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify"
import "hardhat-gas-reporter";
import "@openzeppelin/hardhat-upgrades"; 
const dotenv = require("dotenv");
dotenv.config();

type config = import('hardhat/config').HardhatUserConfig;

const config: config = {
  solidity: {
    version: "0.8.24",
    settings: {
      evmVersion: "cancun",
    },
  },
  networks:{
    hardhat: {
      chainId: 31337
    },
    sepolia: {
      chainId: 11155111,
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.ACCOUNT_TEST],
    }
  },
  //  gas报告
  gasReporter: {
    enabled: true,
    // currency: "USD",
    // gasPrice: 21,
  },
  // 合约验证
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;