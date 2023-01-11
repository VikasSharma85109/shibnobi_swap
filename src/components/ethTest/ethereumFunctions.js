import { Contract, ethers } from "ethers";
import { eth, constants, bsc, ethTestnet } from "../../config";

const ROUTER = ethTestnet.pancakeRouterAddress;
const ERC20 = constants.erc20Abi;
const FACTORY = ethTestnet.factoryAddress;

export function getProvider(provider) {
  return new ethers.providers.Web3Provider(provider);
}

export function getSigner(provider) {
  return provider.getSigner();
}

export function getRouter(address, signer) {
  return new Contract(address, ROUTER, signer);
}

export function getWeth(address, signer) {
  return new Contract(address, ERC20, signer);
}

export function getFactory(address, signer) {
  return new Contract(address, FACTORY, signer);
}

export async function getAccount() {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  return accounts[0];
}
export async function getDecimals(token) {
  const decimals = await token
    .decimals()
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log("No tokenDecimals function for this token, set to 0");
      return 0;
    });
  return decimals;
}
export const getAmountOut = async (
  address1,
  address2,
  amountIn,
  routerContract,
  signer
) => {
  try {
    console.log(address1, address2);
    const token1 = new Contract(address1, ERC20, signer);
    const token1Decimals = await getDecimals(token1);

    const token2 = new Contract(address2, ERC20, signer);
    const token2Decimals = await getDecimals(token2);

    const router = new ethers.Contract(
      routerContract,
      constants.routerAbi,
      signer
    );

    const values_out = await router.getAmountsOut(
      ethers.utils.parseUnits(String(amountIn), token1Decimals),
      [address1, address2]
    );
    const amount_out = values_out[1] * 10 ** -token2Decimals;
    return Number(amount_out);
  } catch (err) {
    console.log(111, err);
    return Number("0");
  }
};

// export async function fetchReserves(address1, address2, pair) {
//   try {
//     const reservesRaw = await pair.getReserves();
//     let results = [
//       Number(ethers.utils.formatEther(reservesRaw[0])),
//       Number(ethers.utils.formatEther(reservesRaw[1])),
//     ];

//     return [
//       (await pair.token0()) === address1 ? results[0] : results[1],
//       (await pair.token1()) === address2 ? results[1] : results[0],
//     ];
//   } catch (err) {
//     console.log("no reserves yet");
//     return [0, 0];
//   }
// }

// export async function getReserves(
//   address1,
//   address2,
//   factory,
//   signer,
//   accountAddress
// ) {
//   const pairAddress = await factory.getPair(address1, address2);
//   const pair = new Contract(pairAddress, PAIR.abi, signer);

//   const reservesRaw = await fetchReserves(address1, address2, pair);
//   const liquidityTokens_BN = await pair.balanceOf(accountAddress);
//   const liquidityTokens = Number(
//     ethers.utils.formatEther(liquidityTokens_BN)
//   ).toFixed(2);

//   return [
//     reservesRaw[0].toFixed(2),
//     reservesRaw[1].toFixed(2),
//     liquidityTokens,
//   ];
// }
