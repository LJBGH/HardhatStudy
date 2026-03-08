const { vars } = require("hardhat/config");

require("@nomicfoundation/hardhat-toolbox");

const INFURA_API_KEY = vars.get("INFURA_API_KEY");
const ACCOUNT_TEST = vars.get("ACCOUNT_TEST");
const ACCOUNT_TEST1 = vars.get("ACCOUNT_TEST1");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.28" },
      { version: "0.6.0" },
      { version: "0.8.0" },
      { version: "0.6.12"}
    ]
  },
  networks: {
    hardhat: {
      chainId: 31337
    },
    sepolia: {
      chainId: 11155111,
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [ACCOUNT_TEST, ACCOUNT_TEST1],
    }
  },
};