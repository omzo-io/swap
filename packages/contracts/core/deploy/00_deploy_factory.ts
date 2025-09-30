import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function ({ midl, deployments, getNamedAccounts }: HardhatRuntimeEnvironment) {
  await midl.initialize();

  const factory = await midl.deploy("UniswapV2Factory", {
    args: ["0xE20F7d05718b6bAC2A250F8e87373e552f3D23A4"],
  });
  await midl.execute();

  console.log("factory", factory);
};

deploy.tags = ["core"];

export default deploy;
