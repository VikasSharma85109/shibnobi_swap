import { ethers } from "ethers";
import { bsc, constants, bscTestnet } from "../../config";

// const provider = new ethers.providers.Web3Provider(window.ethereum);
// const signer = provider.getSigner();

const factoryAddress = bscTestnet.factoryAddress; //change to mainnet
const factoryAbi = constants.factoryAbi;

const routerAddress = bscTestnet.pancakeRouterAddress; //change to mainnet
const routerAbi = constants.routerAbi;

const zeroAddr = bscTestnet.zeroAddress; //change to mainnet
const wethAddress = bscTestnet.wethAddress; //change to mainnet
const pairAbi = constants.pairAbi;
const erc20Abi = constants.erc20Abi;

// const factory = new ethers.Contract(factoryAddress, factoryAbi, signer);
// const router = new ethers.Contract(routerAddress, routerAbi, signer);
const shibFactoryAddrss = bsc.shibnobiFactory;
const shibFactoryAbi = constants.shibFactoryAbi;

const shibRouterAddress = bsc.shibnobiRouter;
const shibRouterAbi = constants.shibRouterAbi;
const getUnixTime = () => {
  const time = Math.floor(new Date().getTime() / 1000);

  return time;
};

const slippageAmt = (amt, percent) => {
  const amount = amt - (amt * percent) / 100;
  return amount;
};

// check if tokens have existing pair
export const getPair = async (tokenA, tokenB, _provider) => {
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const factory = new ethers.Contract(factoryAddress, factoryAbi, signer);

  const pair = await factory.getPair(tokenA, tokenB);
};

export const addLiquidityTokenShib = async (
  tokenA,
  tokenB,
  amtA,
  amtB,
  slipPercent,
  deadline,
  _provider
) => {
  let time = getUnixTime();
  deadline = deadline + time;
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  let amt1 = slippageAmt(amtA, slipPercent);
  let amt2 = slippageAmt(amtB, slipPercent);

  amtA = "0x" + amtA.toString(16);
  amtB = "0x" + amtB.toString(16);

  amt1 = "0x" + amt1.toString(16);
  amt2 = "0x" + amt2.toString(16);
  deadline = "0x" + deadline.toString(16);
  const router = new ethers.Contract(shibRouterAddress, shibRouterAbi, signer);
  const tx = await router.addLiquidity(
    tokenA,
    tokenB,
    amtA,
    amtB,
    amt1,
    amt2,
    address,
    deadline,
    { gasLimit: 21000 }
  );
};
// create pair for both tokens
export const addLiquidityToken = async (
  tokenA,
  tokenB,
  amtA,
  amtB,
  slipPercent,
  deadline,
  _provider
) => {
  let time = getUnixTime();
  deadline = deadline + time;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  let amt1 = slippageAmt(amtA, slipPercent);
  let amt2 = slippageAmt(amtB, slipPercent);

  amtA = "0x" + amtA.toString(16);
  amtB = "0x" + amtB.toString(16);

  amt1 = "0x" + amt1.toString(16);
  amt2 = "0x" + amt2.toString(16);
  deadline = "0x" + deadline.toString(16);
  const router = new ethers.Contract(routerAddress, routerAbi, signer);
  const tx = await router.addLiquidity(
    tokenA,
    tokenB,
    amtA,
    amtB,
    amt1,
    amt2,
    address,
    deadline,
    { gasLimit: 21000 }
  );
};
// create pair for one token and bnb
export const addLiquidityEthShib = async (
  tokenA,
  amtA,
  ethAmt,
  slipPercent,
  deadline,
  _provider
) => {
  let time = getUnixTime();
  deadline = deadline + time;
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const address = await signer.getSigner();
  const amt1 = slippageAmt(amtA, slipPercent);
  const ethAmt1 = slippageAmt(ethAmt, slipPercent);
  const shibRouter = new ethers.Contract(
    shibRouterAddress,
    shibRouterAbi,
    signer
  );
  const tx = await shibRouter.addLiquidityEth(
    tokenA,
    amtA,
    amt1,
    ethAmt1,
    address,
    deadline,
    { value: ethers.utils.parseEther(ethAmt), gasLimit: 21000 }
  );
};
// create pair for one token and bnb
export const addLiquidityEth = async (
  tokenA,
  amtA,
  ethAmt,
  slipPercent,
  deadline,
  _provider
) => {
  let time = getUnixTime();
  deadline = deadline + time;
  const router = new ethers.Contract(routerAddress, routerAbi, signer);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getSigner();
  const amt1 = slippageAmt(amtA, slipPercent);
  const ethAmt1 = slippageAmt(ethAmt, slipPercent);
  const tx = await router.addLiquidityEth(
    tokenA,
    amtA,
    amt1,
    ethAmt1,
    address,
    deadline,
    { value: ethers.utils.parseEther(ethAmt), gasLimit: 21000 }
  );
};

export const removeLiquidityTokens = async (
  tokenA,
  tokenB,
  lpTokens,
  slipPercent,
  deadline,
  _provider
) => {
  let time = getUnixTime();
  deadline = deadline + time;
  const address = signer.getAddress();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const tokenAContract = new ethers.Contract(tokenA, erc20Abi, signer);
  const tokenBContract = new ethers.Contract(tokenB, erc20Abi, signer);

  //Token decimals
  let decimalA = await tokenAContract.decimals();
  decimalA = parseInt(decimalA, 10);

  let decimalB = await tokenBContract.decimals();
  decimalB = parseInt(decimalB, 10);

  const pairAddress = await getPair(tokenA, tokenB);
  const pairContract = new ethers.Contract(pairAddress, pairAbi, signer);
  const reserves = await pairContract.getReserves();
  let resA = parseInt(reserves[0], 10);
  let resB = parseInt(reserves[1], 10);

  resA = (resA / 10 ** decimalA).toFixed(4);
  resB = (resB / 10 ** decimalB).toFixed(4);

  let lpTokensInHex = "0x" + lpTokens.toString(16);

  let minAmountA = slippageAmt(resA, slipPercent);
  let minAmountB = slippageAmt(resB, slipPercent);

  minAmountA = "0x" + minAmountA.toString(16);
  minAmountB = "0x" + minAmountB.toString(16);
  deadline = "0x" + deadline.toString(16);
  const router = new ethers.Contract(routerAddress, routerAbi, signer);
  const tx = await router.removeLiquidity(
    tokenA,
    tokenB,
    lpTokensInHex,
    minAmountA,
    minAmountB,
    address,
    deadline,
    { gasLimit: 21000 }
  );
};

export const removeLiquidityEth = async (
  tokenA,
  lpTokens,
  slipPercent,
  deadline,
  _provider
) => {
  let time = getUnixTime();
  deadline = deadline + time;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = signer.getAddress();
  const tokenAContract = new ethers.Contract(tokenA, erc20Abi, signer);

  //Token decimals
  let decimalA = await tokenAContract.decimals();

  decimalA = parseInt(decimalA, 10);

  const pairAddress = await getPair(tokenA, wethAddress);
  const pairContract = new ethers.Contract(pairAddress, pairAbi, signer);
  const reserves = await pairContract.getReserves();
  let resA = parseInt(reserves[0], 10);
  let resWEth = parseInt(reserves[1], 10);

  resA = (resA / 10 ** decimalA).toFixed(4);
  resWEth = (resWEth / 10 ** 18).toFixed(4);

  let lpTokensInHex = "0x" + lpTokens.toString(16);

  let minAmountA = slippageAmt(resA, slipPercent);
  let minAmountWEth = slippageAmt(resWEth, slipPercent);

  minAmountA = "0x" + minAmountA.toString(16);
  minAmountWEth = "0x" + minAmountWEth.toString(16);
  deadline = "0x" + deadline.toString(16);
  const router = new ethers.Contract(routerAddress, routerAbi, signer);
  const tx = await router.removeLiquidityETH(
    tokenA,
    lpTokensInHex,
    minAmountA,
    minAmountWEth,
    address,
    deadline,
    { gasLimit: 21000 }
  );
};
