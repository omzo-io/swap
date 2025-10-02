import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "hardhat-abi-exporter";
import "dotenv/config";

const packageJson = require("./package.json");

const accounts = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [];

const config: HardhatUserConfig = {
  solidity: {
    version: "0.6.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999,
      },
    },
  },
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/MLItZDJKDvcgpwPFsc2V_FTKGyawnnWq",
      accounts,
      tags: ["weth", "core"],
    },
    testnetErigon: {
      url: "https://testnet-rpc.prom.io/?apiKey=Tx0Dk5kq_ZpX2FJH3cim2hDF1CaBAV57.FIC2IrXcjVrNLi7U",
      accounts,
      chainId: 584548796,
      tags: ["weth", "core"],
    },
    promMainnet: {
      url: "https://prom-rpc.eu-north-2.gateway.fm",
      accounts,
      chainId: 227,
    },
  },
  etherscan: {
    enabled: true,
    apiKey: "TKNKBSY99DGWRUNV6TAZ7CEZ85R2SKAG5X",
  },
  namedAccounts: {
    deployer: 0,
  },
  abiExporter: {
    path: "./dist",
    runOnCompile: true,
    clear: true,
    flat: true,
    pretty: false,
  },
  paths: {
    deployments: `deployments/${packageJson.version}`,
  },
};

export default config;