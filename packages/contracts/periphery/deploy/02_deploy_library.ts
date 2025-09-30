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

  const library = await midl.deploy("UV2Library", {
    args: [await getUniswapV2FactoryAddress("midl", packageJSON.version)],
  });
  await midl.execute();

  console.log("library", library);
};

deploy.tags = ["UV2Library"];

export default deploy;
