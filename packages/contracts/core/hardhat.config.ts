import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "@midl-xyz/hardhat-deploy";
import "hardhat-abi-exporter";
import "dotenv/config";
import { MempoolSpaceProvider } from "@midl-xyz/midl-js-core";

const packageJson = require("./package.json");

const accounts = [
  process.env.MNEMONIC as string,
];

const walletsPaths = {
  leather: "m/86'/1'/0'/0/0"
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
        {
            version: "0.5.16",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200,
                },
            },
        },
    ],
  },
  networks: {
    default: {
      // url: midlRegtest.rpcUrls.default.http[0],
      // chainId: midlRegtest.id,
      url: "https://rpc.regtest.midl.xyz",
            accounts: {
                mnemonic: accounts[0],
                path: walletsPaths.leather
            },
            chainId: 777
    },
  },
  midl: {
    path: "deployments",
    networks: {
        default: {
            mnemonic: accounts[0],
            confirmationsRequired: 1,
            btcConfirmationsRequired: 1,
            hardhatNetwork: "default",
            network: {
                explorerUrl: "https://mempool.regtest.midl.xyz",
                id: "regtest",
                network: "regtest"
            },
            provider: new MempoolSpaceProvider({
                "regtest": "https://mempool.regtest.midl.xyz",
            } as any)
        },
    }
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
