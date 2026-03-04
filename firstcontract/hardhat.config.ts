import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
const dotenv = require("dotenv");
dotenv.config();

type config = import('hardhat/config').HardhatUserConfig;

const config: config = {
  solidity: "0.8.33",
  networks:{
    hardhat: {
      chainId: 31337
    },
    sepolia: {
      chainId: 11155111,
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [process.env.ACCOUNT_TEST],
    }
  }
};

export default config;