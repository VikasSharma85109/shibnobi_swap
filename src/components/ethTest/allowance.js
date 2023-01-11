import { ethers } from "ethers";
import { constants, eth, ethTestnet } from "../../config";

const provider = new ethers.providers.InfuraProvider(
  "homestead",
  "3071518e1f4a491ca5b967f5b1dcd3de"
);

// const signer = provider.getSigner();

// const address = signer.getAddress();

const factoryAddress = ethTestnet.factoryAddress; // change to mainnet
const routerAddress = ethTestnet.uniswapRouterAddress; // change to mainnet

const shibRouter = ethTestnet.shibnobiRouterAddress;

const erc20Abi = constants.erc20Abi;
const pairAbi = constants.pairAbi;

// Check allowance for any given token for router address or factory address to spend
export const checkAllowanceForFactory = async (tokenAddress, _provider) => {
  const provider = new ethers.providers.Web3Provider(_provider);

  const signer = provider.getSigner();
  const address = signer.getAddress();
  const token = new ethers.Contract(tokenAddress, erc20Abi, signer);
  const allowance = await token.allowance(address, factoryAddress);
  return allowance;
};

export const checkAllowanceForRouter = async (tokenAddress, _provider) => {
  try {
    const provider = new ethers.providers.Web3Provider(_provider);

    const signer = provider.getSigner();
    const address = signer.getAddress();
    const token = new ethers.Contract(tokenAddress, erc20Abi, signer);
    const allowance = await token.allowance(address, routerAddress);
    const allowanceInDec = parseInt(allowance, 10);

    return allowanceInDec;
  } catch (error) {}
};
export const approveRouterShib = async (
  tokenAddress,
  amountToSend,
  _provider
) => {
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  //   const address = await signer.getAddress();
  // const allowanceInHex = await checkAllowanceForRouter(tokenAddress, _provider);

  // const allowanceInDec = parseInt(allowanceInHex, 10);

  const token = new ethers.Contract(tokenAddress, erc20Abi, signer);

  let values = "0x" + amountToSend.toString(16);
  return await token.approve(shibRouter, values);
  // if (allowanceInDec <= amountToSend) {
  //   // console.log(token.approve(routerAddress, values));
  //   return await token.approve(shibRouter, values);
  // } else {
  //   return allowanceInDec;
  // }
};
// Approve tokens if insufficient allowance
export const approveFactory = async (tokenAddress, amountToSend, _provider) => {
  const provider = new ethers.providers.Web3Provider(_provider);

  const signer = provider.getSigner();
  const address = signer.getAddress();
  const allowanceInHex = checkAllowanceForFactory(tokenAddress);
  const allowanceInDec = parseInt(allowanceInHex, 10);
  const token = new ethers.Contract(tokenAddress, erc20Abi, signer);
  if (allowanceInDec <= amountToSend) {
    const approve = await token.approve(factoryAddress, amountToSend);
  }
};

export const approveRouter = async (tokenAddress, amountToSend, _provider) => {
  const provider = new ethers.providers.Web3Provider(_provider);

  const signer = provider.getSigner();
  const address = signer.getAddress();
  //   const address = await signer.getAddress();
  const allowanceInHex = await checkAllowanceForRouter(tokenAddress, _provider);
  const allowanceInDec = parseInt(allowanceInHex, 10);
  const token = new ethers.Contract(tokenAddress, erc20Abi, signer);

  let values = "0x" + amountToSend.toString(16);

  if (allowanceInDec <= amountToSend) {
    return await token.approve(routerAddress, values);
  } else {
    return allowanceInDec;
  }
};

export const approveLiquidity = async (pairAddress, amount, _provider) => {
  const provider = new ethers.providers.Web3Provider(_provider);

  const signer = provider.getSigner();
  const pairContract = new ethers.Contract(pairAddress, pairAbi, signer);
  let amountInHex = "0x" + amount.toString(16);
  const tx = await pairContract.approve(routerAddress, amountInHex);
};

export const checkAllowanceForRouterShib = async (tokenAddress, _provider) => {
  try {
    const provider = new ethers.providers.Web3Provider(_provider);

    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const token = new ethers.Contract(tokenAddress, erc20Abi, signer);
    const allowance = await token.allowance(address, shibRouter);
    const allowanceInDec = parseInt(allowance, 10);

    return allowanceInDec;
  } catch (error) {}
};
