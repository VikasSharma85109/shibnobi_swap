import { ethers } from "ethers";
import { constants, bscTestnet } from "../../config";

// const provider = new ethers.providers.Web3Provider(window.ethereum);
// const signer = provider.getSigner();
const zeroAddr = bscTestnet.zeroAddress; //Change to mainnet
const pairAbi = constants.pairAbi;
const erc20ABI = constants.erc20Abi;
const factoryAbi = constants.factoryAbi;
const factoryAddress = bscTestnet.factoryAddress; //change to mainnet

// const factory = new ethers.Contract(factoryAddress, factoryAbi, signer);

export const fetchPairAddress = async (tokenA, tokenB) => {

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const factory = new ethers.Contract(factoryAddress, factoryAbi, signer);

  const pair = await factory.getPair(tokenA, tokenB);

  return pair;
};

export const fetchPoolForUser = async (tokenA, tokenB, _provider) => {

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  let pairAddress = await fetchPairAddress(tokenA, tokenB);

  if (pairAddress === zeroAddr) {
    return false;
  }

  const pairContract = new ethers.Contract(pairAddress, pairAbi, signer);

  const contractA = new ethers.Contract(tokenA, erc20ABI, signer);
  // const contractB = new ethers.Contract(tokenB, erc20ABI, signer);

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
  const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
  const address = signer.getAddress();
  const lpToken = new ethers.Contract(tokenAddress, erc20ABI, signer);
  let lpBalance = await lpToken.balanceOf(address);
  lpBalance = parseInt(lpBalance, 10);
  let decimal = await lpToken.decimals();
  decimal = parseInt(decimal, 10);
  return lpBalance / 10 ** decimal;
};
