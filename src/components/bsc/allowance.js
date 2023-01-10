import { ethers } from "ethers";
import { all } from "express/lib/application";
import { bsc, constants, bscTestnet } from "../../config";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";

const factoryAddress = bsc.factoryAddress; // change to mainnet
const routerAddress = bsc.pancakeRouterAddress; // change to mainnet
const shibRouter = bsc.shibnobiRouter;

const erc20Abi = constants.erc20Abi;
const pairAbi = constants.pairAbi;

// Check allowance for any given token for router address or factory address to spend
export const checkAllowanceForFactory = async (tokenAddress, _provider) => {
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const token = new ethers.Contract(tokenAddress, erc20Abi, signer);
  const allowance = await token.allowance(address, factoryAddress);
  return allowance;
};

export const checkAllowanceForRouter = async (tokenAddress, provider) => {
  try {
    const _provider = new ethers.providers.Web3Provider(provider);
    const signer = _provider.getSigner();
    const address = await signer.getAddress();
    const token = new ethers.Contract(tokenAddress, erc20Abi, signer);
    const allowance = await token.allowance(address, routerAddress);
    const allowanceInDec = parseInt(allowance, 10);
    return allowanceInDec;
  } catch (error) {
    console.log(error);
  }
};

export const checkAllowanceForRouterShib = async (tokenAddress, provider) => {
  try {
    const _provider = new ethers.providers.Web3Provider(provider);
    const signer = _provider.getSigner();
    const address = await signer.getAddress();
    const token = new ethers.Contract(tokenAddress, erc20Abi, signer);

    const allowance = await token.allowance(address, shibRouter);

    const allowanceInDec = parseInt(allowance, 10);

    return allowanceInDec;
  } catch (error) {
    console.log(error);
  }
};

// Approve tokens if insufficient allowance
export const approveFactory = async (tokenAddress, amountToSend, _provider) => {
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const allowanceInHex = checkAllowanceForFactory(tokenAddress);
  const allowanceInDec = parseInt(allowanceInHex, 10);
  const token = new ethers.Contract(tokenAddress, erc20Abi, signer);
  if (allowanceInDec <= amountToSend) {
    const approve = await token.approve(factoryAddress, amountToSend);
  }
};

export const approveRouter = async (tokenAddress, amountToSend, _provider) => {
  try {
    const provider = new ethers.providers.Web3Provider(_provider);
    const signer = provider.getSigner();
    //   const address = await signer.getAddress();
    // const allowanceInDec = await checkAllowanceForRouter(tokenAddress, _provider);

    // const address = await signer.getAddress();
    // const _token = new ethers.Contract(tokenAddress, erc20Abi, signer);
    // const allowance = await _token.allowance(address, routerAddress);
    // const allowanceInDec = parseInt(allowance, 10);

    // const allowanceInDec = parseInt(allowanceInHex, 10);

    const token = new ethers.Contract(tokenAddress, erc20Abi, signer);

    let values = "0x" + amountToSend.toString(16);

    // console.log(token.approve(routerAddress, values));
    return await token.approve(routerAddress, values);
  } catch (err) {
    console.log(err);
  }
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

export const approveLiquidity = async (pairAddress, amount, _provider) => {
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const pairContract = new ethers.Contract(pairAddress, pairAbi, signer);
  let amountInHex = "0x" + amount.toString(16);
  const tx = await pairContract.approve(routerAddress, amountInHex);
};
