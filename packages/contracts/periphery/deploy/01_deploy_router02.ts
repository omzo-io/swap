import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import packageJSON from "../package.json";

const getUniswapV2FactoryAddress = async (chain: string, version: string) => {
  const deployment = await import(
    `@omzo-swap/core/deployments/${version}/${chain}/UniswapV2Factory.json`
  );

  return deployment.address;
};

const deploy: DeployFunction = async function ({ midl }: HardhatRuntimeEnvironment) {
  await midl.initialize();

  const router02 = await midl.deploy("UniswapV2Router02", {
    args: [
      await getUniswapV2FactoryAddress("midl", packageJSON.version),
      "0xC726845d8b6f0586A12D31ec5075e47B28c8eC4A",
    ],
  });
  await midl.execute();

  console.log("router02", router02);
};

deploy.tags = ["core"];

export default deploy;
