import { ethers } from "ethers";
import { constants, bsc, bscTestnet } from "../../config";

const pairAbi = constants.pairAbi;
const erc20ABI = constants.erc20Abi;
const factoryAbi = constants.factoryAbi;
const factoryAddress = bsc.factoryAddress; //change to mainnet

const shibFactoryAddrss = bsc.shibnobiFactory;
const shibFactoryAbi = constants.shibFactoryAbi;
const shibRouterAddress = bsc.shibnobiRouter;
const shibRouterAbi = constants.shibRouterAbi;

// const shibFactory = new ethers.Contract(shibFactoryAddrss, shibFactoryAbi, signer);
// const shibRouter = new ethers.Contract(shibRouterAddress, shibRouterAbi, signer);

// const factory = new ethers.Contract(factoryAddress, factoryAbi, signer);
const zeroAddr = bsc.zeroAddress; //Change to mainnet

export const fetchPairAddress = async (tokenA, tokenB, _provider) => {
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const factory = new ethers.Contract(factoryAddress, factoryAbi, signer);
  const pair = await factory.getPair(tokenA, tokenB);

  return pair;
};

export const fetchPairAddressSHIB = async (tokenA, tokenB, _provider) => {
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const factory = new ethers.Contract(
    shibFactoryAddrss,
    shibFactoryAbi,
    signer
  );
  const pair = await factory.getPair(tokenA, tokenB);

  return pair;
};

export const fetchPoolForUser = async (tokenA, tokenB, _provider) => {
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  let pairAddress = await fetchPairAddress(tokenA, tokenB, _provider);

  if (pairAddress == zeroAddr) {
    return false;
  }

  const pairContract = new ethers.Contract(pairAddress, pairAbi, signer);

  const contractA = new ethers.Contract(tokenA, erc20ABI, signer);
  const contractB = new ethers.Contract(tokenB, erc20ABI, signer);

  let totalSupplyLp = await pairContract.totalSupply();
  totalSupplyLp = parseInt(totalSupplyLp, 10);

  let decimalA = await contractA.decimals();
  decimalA = parseInt(decimalA, 10);

  let decimalB = await contractA.decimals();
  decimalB = parseInt(decimalB, 10);

  let reserves = await pairContract.getReserves();

  let resA = parseInt(reserves[0], 10);
  resA = (resA / 10 ** decimalA).toFixed(4);

  let resB = parseInt(reserves[1], 10);
  resB = (resB / 10 ** decimalB).toFixed(4);

  let lpBalance = await pairContract.balanceOf(address);
  lpBalance = parseInt(lpBalance, 10);
  lpBalance = (lpBalance / 10e18).toFixed(4);

  let lpTokenA = (resA * lpBalance) / totalSupplyLp;
  let lpTokenB = (resB * lpBalance) / totalSupplyLp;

  return [resA, resB, lpBalance, totalSupplyLp, lpTokenA, lpTokenB];
};

export const checkLpToken = async (tokenAddress, _provider) => {
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const address = signer.getAddress();
  const lpToken = new ethers.Contract(tokenAddress, erc20ABI, signer);
  let lpBalance = await lpToken.balanceOf(address);
  lpBalance = parseInt(lpBalance, 10);
  let decimal = await lpToken.decimals();
  decimal = parseInt(decimal, 10);

  return lpBalance / 10 ** decimal;
};

/// Shibnobi router functions

export const getPairShib = async (tokenA, tokenB, _provider) => {
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const shibFactory = new ethers.Contract(
    shibFactoryAddrss,
    shibFactoryAbi,
    signer
  );
  const pair = await shibFactory.getPair(tokenA, tokenB);
  return pair;
};

export const fetchPoolForUserShib = async (tokenA, tokenB, _provider) => {
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const address = signer.getAddress();

  let pairAddress = await fetchPairAddressSHIB(tokenA, tokenB, _provider);

  if (pairAddress == zeroAddr) {
    return false;
  }

  const pairContract = new ethers.Contract(pairAddress, pairAbi, signer);

  const contractA = new ethers.Contract(tokenA, erc20ABI, signer);
  const contractB = new ethers.Contract(tokenB, erc20ABI, signer);

  let totalSupplyLp = await pairContract.totalSupply();
  totalSupplyLp = parseInt(totalSupplyLp, 10);

  let decimalA = await contractA.decimals();
  decimalA = parseInt(decimalA, 10);

  let decimalB = await contractA.decimals();
  decimalB = parseInt(decimalB, 10);

  let reserves = await pairContract.getReserves();

  let resA = parseInt(reserves[0], 10);
  resA = (resA / 10 ** decimalA).toFixed(4);

  let resB = parseInt(reserves[1], 10);
  resB = (resB / 10 ** decimalB).toFixed(4);

  let lpBalance = await pairContract.balanceOf(address);
  lpBalance = parseInt(lpBalance, 10);
  lpBalance = (lpBalance / 10e18).toFixed(4);

  let lpTokenA = (resA * lpBalance) / totalSupplyLp;
  let lpTokenB = (resB * lpBalance) / totalSupplyLp;

  return [resA, resB, lpBalance, totalSupplyLp, lpTokenA, lpTokenB];
};

export const checkLpTokenShib = async (tokenAddress, _provider) => {
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const address = signer.getAddress();
  const lpToken = new ethers.Contract(tokenAddress, erc20ABI, signer);
  let lpBalance = await lpToken.balanceOf(address);
  lpBalance = parseInt(lpBalance, 10);
  let decimal = await lpToken.decimals();
  decimal = parseInt(decimal, 10);

  return lpBalance / 10 ** decimal;
};
