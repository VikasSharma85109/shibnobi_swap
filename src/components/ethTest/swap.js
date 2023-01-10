import { ethers } from "ethers";
import { constants, eth } from "../../config";
import Web3 from "web3";
import fromExponential from "from-exponential";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const web3 = new Web3(provider);
const factoryAddress = eth.factoryAddress; //Change to mainnet
const factoryAbi = constants.factoryAbi;

const ERC20 = constants.erc20Abi;

const routerAddress = eth.pancakeRouterAddress; //Change to mainnet
const routerAbi = constants.routerAbi;

const shibnobiRouterAddress = eth.shibnobiRouter;
const shibRouterAbi = constants.shibRouterAbi;

const zeroAddr = eth.zeroAddress; //Change to mainnet

const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

// const factory = new ethers.Contract(factoryAddress, factoryAbi, signer);
// const router = new ethers.Contract(routerAddress, routerAbi, signer);

// const shibRouter = new ethers.Contract(
//   shibnobiRouterAddress,
//   shibRouterAbi,
//   signer
// );

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
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    let factories = new window.web3.eth.Contract(factoryAbi, factoryAddress);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    let userwalletaddresss = accounts[0];
    factories.methods
      .getPair(tokenA, tokenB)
      .call({ from: userwalletaddresss })
      .then((pairaddress) => {
        return pairaddress;
      })
      .catch((error) => console.log(error));
  }
};

// get output amount for another tokens if a pair exists
export const getAmountsOut = async (amtA, tokenA, tokenB, _provider) => {
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const router = new ethers.Contract(routerAddress, routerAbi, signer);
  const amountOut = await router.getAmountsOut(amtA, [tokenA, tokenB]);
  return amountOut;
};

// Receive as many output tokens as possible for an exact amount of BNB.
export const swapExactETHForTokens = async (
  ethAmount,
  inAmount,
  tokenA,
  tokenB,
  slipPercent,
  deadline,
  _provider
) => {
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  let address = signer.getAddress();
  let time = getUnixTime();
  time = time + deadline;
  time = "0x" + time.toString(16);
  // console.log("amountout: ", inAmount)
  let minAmount = slippageAmt(inAmount, slipPercent);
  minAmount = "0x" + minAmount.toString(16);
  const router = new ethers.Contract(routerAddress, routerAbi, signer);
  const tx = await router.swapExactETHForTokens(
    minAmount,
    [tokenA, tokenB],
    address,
    time,
    { value: ethers.utils.parseEther(ethAmount), gasLimit: 51000 }
  );
};

// Receive as much BNB as possible for an exact amount of input tokens.
export const swapExactTokensForETH = async (
  inAmt,
  outputEth,
  tokenA,
  tokenB,
  slipPercent,
  deadline,
  _provider
) => {
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  let address = await signer.getAddress();

  let time = getUnixTime();
  time = time + deadline;
  time = "0x" + time.toString(16);

  let minAmtOut = slippageAmt(outputEth, slipPercent);
  minAmtOut = "0x" + minAmtOut.toString(16);

  inAmt = "0x" + inAmt.toString(16);
  const router = new ethers.Contract(routerAddress, routerAbi, signer);
  await router.swapExactTokensForETH(
    inAmt,
    minAmtOut,
    [tokenA, tokenB],
    address,
    deadline
  );
};

// Receive as many output tokens as possible for an exact amount of input tokens.
export const swapExactTokensForTokens = async (
  inAmt,
  tokenA,
  tokenB,
  deadline,
  slipagepercentage,
  _provider
) => {
  let time = getUnixTime();
  deadline = deadline + time;
  let minAmtOut = slippageAmt(inAmt, slipagepercentage);
  inAmt = "0x" + inAmt.toString(16);
  deadline = "0x" + deadline.toString(16);
  minAmtOut = "0x" + minAmtOut.toString(16);
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const router = new ethers.Contract(routerAddress, routerAbi, signer);
  await router.swapExactTokensForTokens(
    inAmt,
    minAmtOut,
    [tokenA, tokenB],
    address,
    deadline,
    { gasLimit: 21000 }
  );
};

// Receive an exact amount of ETH for as few input tokens as possible.
export const swapTokensForExactETH = async (
  amtOut,
  amtInMax,
  tokenA,
  tokenB,
  deadline,
  slipPercent,
  amountIn,
  _provider
) => {
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  let time = getUnixTime();
  time = time + deadline;
  time = "0x" + time.toString(16);
  let amountOut = "0x" + amtOut.toString(16);
  amountIn = slippageAmtPlus(amtInMax, slipPercent);
  amountIn = "0x" + amountIn.toString(16);
  const router = new ethers.Contract(routerAddress, routerAbi, signer);
  await router.swapTokensForExactETH(
    amountOut,
    amtInMax,
    [tokenA, tokenB],
    address,
    deadline
  );
};
const slippageAmtPlus = (amt, percent) => {
  const amount = amt + (amt * percent) / 100;
  return amount;
};
export const swapETHForExactTokens = async (
  outAmt,
  ethInMax,
  tokenA,
  tokenB,
  deadline,
  slipPercent,
  _provider
) => {
  let time = getUnixTime();
  deadline = deadline + time;

  outAmt = "0x" + outAmt.toString(16);
  deadline = "0x" + deadline.toString(16);
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  let ethMax = slippageAmtPlus(ethInMax, slipPercent);
  const router = new ethers.Contract(routerAddress, routerAbi, signer);
  await router.swapETHForExactTokens(outAmt, [tokenA, tokenB], deadline, {
    value: ethers.utils.parseEther(ethMax),
    gasLimit: 21000,
  });
};

// Receive an exact amount of output tokens for as few input tokens as possible.
export const swapTokensForExactTokens = async (
  amtOut,
  amtInMax,
  tokenA,
  tokenB,
  slipPercent,
  amountIn,
  deadline,
  _provider
) => {
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  let time = getUnixTime();
  time = time + deadline;
  time = "0x" + time.toString(16);
  let amountOut = "0x" + amtOut.toString(16);
  amountIn = slippageAmtPlus(amtInMax, slipPercent);
  amountIn = "0x" + amountIn.toString(16);
  const router = new ethers.Contract(routerAddress, routerAbi, signer);
  await router.swapTokensForExactTokens(
    amountOut,
    amountIn,
    [tokenA, tokenB],
    address,
    time
  );
};

/* ******   REFERRAL FUNCTION ******
  Functions called on shibnobi router
*/

export const swapExactETHForTokensRef = async (
  minAmt,
  tokenA,
  tokenB,
  deadline,
  ETHAmount,
  slippagePercentage,
  referralAddress,
  _provider
) => {
  let time = getUnixTime();
  deadline = deadline + time;
  let minAmtOut = slippageAmt(minAmt, slippagePercentage);
  minAmtOut = "0x" + minAmtOut.toString(16);
  ETHAmount = "0x" + ETHAmount.toString(16);
  deadline = "0x" + deadline.toString(16);
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  const shibRouter = new ethers.Contract(
    shibnobiRouterAddress,
    shibRouterAbi,
    signer
  );

  const tx = await shibRouter.swapExactETHForTokens(
    minAmtOut,
    [tokenA, tokenB],
    address,
    deadline,
    referralAddress,
    {
      value: ethers.utils.parseEther(ETHAmount),
      gasLimit: 21000,
    }
  );
};

export const swapTokensForExactETHRef = async (
  amtOut,
  amtInMax,
  tokenA,
  tokenB,
  slipPercent,
  deadline,
  referralAddress,
  amtamountInMax,
  _provider
) => {
  let time = getUnixTime();
  deadline = deadline + time;
  let amountInMax = slippageAmtPlus(amtInMax, slipPercent);
  amtOut = "0x" + amtOut.toString(16);
  amountInMax = "0x" + amtamountInMax.toString(16);
  deadline = "0x" + deadline.toString(16);
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  const shibRouter = new ethers.Contract(
    shibnobiRouterAddress,
    shibRouterAbi,
    signer
  );

  const tx = await shibRouter.swapTokensForExactETH(
    amtOut,
    amountInMax,
    [tokenA, tokenB],
    address,
    deadline,
    referralAddress,
    { gasLimit: 21000 }
  );
};

export const swapExactTokensForETHRef = async (
  inAmt,
  minAmt,
  tokenA,
  tokenB,
  deadline,
  slippagePercentage,
  referralAddress,
  _provider
) => {
  let time = getUnixTime();
  deadline = deadline + time;
  let minAmtOut = slippageAmt(minAmt, slippagePercentage);

  inAmt = "0x" + inAmt.toString(16);
  minAmtOut = minAmtOut.toString(16);
  deadline = "0x" + deadline.toString(16);
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  const shibRouter = new ethers.Contract(
    shibnobiRouterAddress,
    shibRouterAbi,
    signer
  );
  const tx = await shibRouter.swapExactTokensForETH(
    inAmt,
    minAmtOut,
    [tokenA, tokenB],
    address,
    deadline,
    referralAddress,
    { gasLimit: 21000 }
  );
};

export const swapTokensForExactTokensRef = async (
  inAmt,
  minAmt,
  tokenA,
  tokenB,
  deadline,
  slippagePercentage,
  referralAddress,
  _provider
) => {
  let time = getUnixTime();
  deadline = deadline + time;
  let minAmtOut = slippageAmt(minAmt, slippagePercentage);

  inAmt = "0x" + inAmt.toString(16);
  minAmtOut = minAmtOut.toString(16);
  deadline = "0x" + deadline.toString(16);
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  const shibRouter = new ethers.Contract(
    shibnobiRouterAddress,
    shibRouterAbi,
    signer
  );
  const tx = await shibRouter.swapTokensForExactTokens(
    inAmt,
    minAmtOut,
    [tokenA, tokenB],
    address,
    deadline,
    referralAddress,
    { gasLimit: 21000 }
  );
};

export const swapETHForExactTokensRef = async (
  outAmt,
  ethInMax,
  tokenA,
  tokenB,
  deadline,
  slipPercent,
  referralAddress,
  _provider
) => {
  let time = getUnixTime();
  deadline = deadline + time;

  outAmt = "0x" + outAmt.toString(16);
  deadline = "0x" + deadline.toString(16);

  let ethMax = slippageAmtPlus(ethInMax, slipPercent);
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  const shibRouter = new ethers.Contract(
    shibnobiRouterAddress,
    shibRouterAbi,
    signer
  );
  const tx = await shibRouter.swapETHForExactTokens(
    outAmt,
    [tokenA, tokenB],
    deadline,
    referralAddress,
    {
      value: ethers.utils.parseEther(ethMax),
      gasLimit: 21000,
    }
  );
};

export const swapExactETHForTokensSupportingFeeOnTransferTokensRef = async (
  minAmt,
  tokenA,
  tokenB,
  deadline,
  ethAmount,
  slippagePercentage,
  referralAddress,
  _provider
) => {
  let time = getUnixTime();
  deadline = deadline + time;
  let minAmtOut = slippageAmt(minAmt, slippagePercentage);

  minAmtOut = "0x" + minAmtOut.toString(16);
  deadline = "0x" + deadline.toString(16);
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  const shibRouter = new ethers.Contract(
    shibnobiRouterAddress,
    shibRouterAbi,
    signer
  );
  const tx =
    await shibRouter.swapExactETHForTokensSupportingFeeOnTransferTokens(
      minAmtOut,
      [tokenA, tokenB],
      address,
      deadline,
      referralAddress,
      {
        value: ethers.utils.parseEther(ethAmount),
        gasLimit: 21000,
      }
    );
};

export const swapExactTokensForETHSupportingFeeOnTransferTokensRef = async (
  inAmt,
  minAmt,
  tokenA,
  tokenB,
  deadline,
  slippagePercentage,
  referralAddress,
  _provider
) => {
  let time = getUnixTime();
  deadline = deadline + time;
  let minAmtOut = slippageAmt(minAmt, slippagePercentage);

  inAmt = "0x" + inAmt.toString(16);
  minAmtOut = minAmtOut.toString(16);
  deadline = "0x" + deadline.toString(16);
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  const shibRouter = new ethers.Contract(
    shibnobiRouterAddress,
    shibRouterAbi,
    signer
  );
  const tx =
    await shibRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
      inAmt,
      minAmtOut,
      [tokenA, tokenB],
      address,
      deadline,
      referralAddress
    );
};

export const swapExactTokensForTokensRef = async (
  inAmt,
  tokenA,
  tokenB,
  deadline,
  slipagepercentage,
  _provider
) => {
  let time = getUnixTime();
  deadline = deadline + time;
  let minAmtOut = slippageAmt(inAmt, slipagepercentage);
  inAmt = "0x" + inAmt.toString(16);
  deadline = "0x" + deadline.toString(16);
  minAmtOut = "0x" + minAmtOut.toString(16);
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  const shibRouter = new ethers.Contract(
    shibnobiRouterAddress,
    shibRouterAbi,
    signer
  );
  const tx = await shibRouter.swapExactTokensForTokens(
    inAmt,
    minAmtOut,
    [tokenA, tokenB],
    address,
    deadline,
    { gasLimit: 21000 }
  );
};

async function swap(amount) {
  if (window.web3) {
    // let amountIn = (BigNumber(Number(amount)*(Math.pow(10,18))));
    let amountIn = window.web3.utils.toBN(
      fromExponential(amount * Math.pow(10, 18))
    );

    if (
      this.state.tokenfromAddress ==
      "0x0000000000000000000000000000000000000000"
    ) {
      let path = [this.state.tokenfromAddress, this.state.tokentoAddress];
      let deadline = 0;
      let userwalletaddresss = localStorage.getItem("account");
      window.web3 = new Web3(window.ethereum);
      let swaping = new window.web3.eth.Contract(
        routerAbi,
        "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
      );
      //getAmountsIn
      console.log(amountIn);
      swaping.methods
        .swapExactETHForTokens(1, path, userwalletaddresss, deadline)
        .send({ from: userwalletaddresss, value: amountIn })
        .then((res) => {
          console.log(res);
        })
        .catch();
    } else if (
      this.state.tokentoAddress == "0x0000000000000000000000000000000000000000"
    ) {
      let path = [this.state.tokenfromAddress, this.state.tokentoAddress];
      let deadline = 0;
      let userwalletaddresss = localStorage.getItem("account");
      window.web3 = new Web3(window.ethereum);
      let swaping = new window.web3.eth.Contract(
        routerAbi,
        "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
      );
      swaping.methods
        .swapExactTokensForETH(amountIn, 1, path, userwalletaddresss, deadline)
        .send({ from: userwalletaddresss })
        .then((res) => {
          console.log(res);
        })
        .catch();
    } else {
      let path = [this.state.tokenfromAddress, this.state.tokentoAddress];
      let deadline = 0;
      let userwalletaddresss = localStorage.getItem("account");
      window.web3 = new Web3(window.ethereum);
      let swaping = new window.web3.eth.Contract(
        routerAbi,
        "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
      );

      swaping.methods
        .swapExactTokensForTokens(
          amountIn,
          1,
          path,
          userwalletaddresss,
          deadline
        )
        .send({ from: userwalletaddresss })
        .then((res) => {
          console.log(res);
        })
        .catch();
    }
  }
}

const multihop = async (fromAddress, toAddress, amount) => {
  const accounts = await web3.eth.getAccounts();
  const userwalletaddresss = accounts[0];
  const swaping = new web3.eth.Contract(routerAbi, routerAddress);
  let path = [fromAddress, WETH];
  let bal = new window.web3.eth.Contract(ERC20, path[0]);
  bal.methods
    .decimals()
    .call({ from: userwalletaddresss })
    .then((number) => {
      let amountIn = window.web3.utils.toBN(
        fromExponential(amount * Math.pow(10, number))
      );
      swaping.methods
        .getAmountsOut(amountIn, path)
        .call({ from: userwalletaddresss })
        .then((res) => {
          //// console.log(res)
          let balance = new window.web3.eth.Contract(ERC20, path[1]);
          balance.methods
            .decimals()
            .call({ from: userwalletaddresss })
            .then((numb) => {
              let amount = parseFloat(res[1]);
              let amountIn = window.web3.utils.toBN(
                fromExponential(amount * Math.pow(10, number))
              );
              let path = [WETH, toAddress];
              swaping.methods
                .getAmountsOut(amountIn, path)
                .call({ from: userwalletaddresss })
                .then((resp) => {
                  let balance = new window.web3.eth.Contract(ERC20, path[1]);
                  balance.methods
                    .decimals()
                    .call({ from: userwalletaddresss })
                    .then((numbs) => {
                      let amounts = parseFloat(res[1]) / 10 ** numbs;
                      this.setState({ tokenamountOut: amounts });
                    })
                    .catch();
                })
                .catch();
            })
            .catch();
        })
        .catch((err) => {});
    })
    .catch();
};
