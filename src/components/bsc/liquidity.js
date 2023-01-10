import { ethers } from "ethers";
import { bsc, constants, bscTestnet } from "../../config";

import Web3 from "web3";
import fromExponential from "from-exponential";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const web3 = new Web3(provider);
const ERC20 = constants.erc20Abi;
const factoryAddress = bscTestnet.factoryAddress; //change to mainnet
const factoryAbi = constants.factoryAbi;

const routerAddress = bscTestnet.pancakeRouterAddress; //change to mainnet
const routerAbi = constants.routerAbi;

const shibFactoryAddrss = bscTestnet.shibnobiFactory;
const shibFactoryAbi = constants.shibFactoryAbi;

const shibRouterAddress = bscTestnet.shibnobiRouter;
const shibRouterAbi = constants.shibRouterAbi;

const zeroAddr = bscTestnet.zeroAddress; //change to mainnet
const wethAddress = bscTestnet.wethAddress; //change to mainnet
const wethDecimals = 18;
const pairAbi = constants.pairAbi;
const erc20Abi = constants.erc20Abi;

// const factory = new ethers.Contract(factoryAddress, factoryAbi, signer);
// const router = new ethers.Contract(routerAddress, routerAbi, signer);

// const shibFactory = new ethers.Contract(shibFactoryAddrss, shibFactoryAbi, signer);
// const shibRouter = new ethers.Contract(shibRouterAddress, shibRouterAbi, signer);

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

const getUnixTime = () => {
  const time = Math.floor(new Date().getTime() / 1000) + 100000;
  return time;
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
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const address = await signer.getSigner();
  const amt1 = slippageAmt(amtA, slipPercent);
  const ethAmt1 = slippageAmt(ethAmt, slipPercent);
  const router = new ethers.Contract(routerAddress, routerAbi, signer);
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

/** 
 Author:-yash
 Description:-this function used  remove liquidity token
**/

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
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const address = signer.getAddress();

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

/** 
 Author:-yash
 Description:-this function used  remove Liquidity Eth
**/

export const removeLiquidityEth = async (
  tokenA,
  lpTokens,
  slipPercent,
  deadline,
  _provider
) => {
  let time = getUnixTime();
  deadline = deadline + time;
  const provider = new ethers.providers.Web3Provider(_provider);
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
  resWEth = (resWEth / 10 ** wethDecimals).toFixed(4);

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

/// Shibnobi router functions

// check if tokens have existing pair
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

/** 
 Author:-yash
 Description:-this function used  remove Liquidity Tokens Shib
**/

export const removeLiquidityTokensShib = async (
  tokenA,
  tokenB,
  lpTokens,
  slipPercent,
  deadline,
  _provider
) => {
  let time = getUnixTime();
  deadline = deadline + time;
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const address = signer.getAddress();
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
  const shibRouter = new ethers.Contract(
    shibRouterAddress,
    shibRouterAbi,
    signer
  );
  const tx = await shibRouter.removeLiquidity(
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

/** 
 Author:-yash
 Description:-this function used  remove Liquidity Eth Shib
**/
export const removeLiquidityEthShib = async (
  tokenA,
  lpTokens,
  slipPercent,
  deadline,
  _provider
) => {
  let time = getUnixTime();
  deadline = deadline + time;
  const provider = new ethers.providers.Web3Provider(_provider);
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
  resWEth = (resWEth / 10 ** wethDecimals).toFixed(4);

  let lpTokensInHex = "0x" + lpTokens.toString(16);

  let minAmountA = slippageAmt(resA, slipPercent);
  let minAmountWEth = slippageAmt(resWEth, slipPercent);

  minAmountA = "0x" + minAmountA.toString(16);
  minAmountWEth = "0x" + minAmountWEth.toString(16);
  deadline = "0x" + deadline.toString(16);
  const shibRouter = new ethers.Contract(
    shibRouterAddress,
    shibRouterAbi,
    signer
  );
  const tx = await shibRouter.removeLiquidityETH(
    tokenA,
    lpTokensInHex,
    minAmountA,
    minAmountWEth,
    address,
    deadline,
    { gasLimit: 21000 }
  );
};

export const onApprove = async (address, amount, type, UNISWAP_ROUTER) => {
  const tokenBlock = address;
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  let userwalletaddresss = accounts[0];
  if (type == "swap") {
  } else {
    const web3 = window.web3;
    if (
      tokenBlock[0] == "0x0000000000000000000000000000000000000000" ||
      tokenBlock[1] == "0x0000000000000000000000000000000000000000"
    ) {
      var tokenapprove;
      var amountapprove;
      if (tokenBlock[0] == "0x0000000000000000000000000000000000000000") {
        tokenapprove = tokenBlock[1];
        amountapprove = amount[1];
      } else {
        tokenapprove = tokenBlock[0];
        amountapprove = amount[0];
      }
      console.log("1");
      let ercContract = await new web3.eth.Contract(ERC20, tokenapprove);
      ercContract.methods
        .allowance(userwalletaddresss, UNISWAP_ROUTER)
        .call({ from: userwalletaddresss })
        .then((allowance) => {
          // console.log(allowance,'allow',parseFloat(amountapprove))
          console.log("11", allowance);
          if (allowance >= parseFloat(amountapprove)) {
            alert("Token already approved, click add liquidity to continue");
            liquidity(
              UNISWAP_ROUTER,
              tokenBlock[0],
              tokenBlock[1],
              amount[0],
              amount[1],
              true
            );
          } else {
            console.log("amountapprove", amountapprove);
            ercContract.methods
              .approve(UNISWAP_ROUTER, amountapprove)
              .send({ from: userwalletaddresss })
              .then((res) => {
                //// console.log(res);
                alert("Transaction Approval success!");
              })
              .catch((err) => {
                alert("Transaction Approval rejected!");
                // console.log('onApprove... reject');
                if (err.code != -32602) {
                  console.log("err");
                }
              });
          }
        });
    } else {
      console.log("1111");
      let ercContract = await new web3.eth.Contract(ERC20, tokenBlock[0]);
      ercContract.methods
        .allowance(userwalletaddresss, UNISWAP_ROUTER)
        .call({ from: userwalletaddresss })
        .then((allowance) => {
          console.log("15", allowance);
          if (allowance >= parseFloat(amount[0])) {
            let ercCont = new web3.eth.Contract(ERC20, tokenBlock[1]);
            ercCont.methods
              .allowance(userwalletaddresss, UNISWAP_ROUTER)
              .call({ from: userwalletaddresss })
              .then((allowance1) => {
                // if(allowance1>=parseFloat(amount[1]))
                // {
                //     alert('Token already approved, click add liquidity to continue');
                //     this.setState({isliquidityapprove:true, Loading: false, isLoading: false});
                //     this.setState({liquiditymethod:'Add Liquidity'})
                // }
                // else
                // {

                let ercCont = new web3.eth.Contract(
                  ERC20,
                  "0x8b68Dd1a63a1b1442a1341df777FCE96692c0602"
                );
                console.log("AFC", amount[0]);
                ercCont.methods
                  .approve(UNISWAP_ROUTER, amount[0])
                  .send({ from: userwalletaddresss })
                  .then((result) => {
                    console.log("166", result);
                    liquidity(
                      UNISWAP_ROUTER,
                      tokenBlock[0],
                      tokenBlock[1],
                      amount[0],
                      amount[1],
                      true
                    );
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                // }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            ercContract.methods
              .approve(UNISWAP_ROUTER, amount[0])
              .send({ from: userwalletaddresss })
              .then((res) => {
                //  // console.log(res);

                let ercCont = new web3.eth.Contract(ERC20, tokenBlock[1]);
                //// console.log(amount[1])
                ercCont.methods
                  .approve(UNISWAP_ROUTER, amount[1])
                  .send({ from: userwalletaddresss })
                  .then((result) => {
                    // // console.log(result);

                    alert("Token approved successfully");
                    liquidity(
                      UNISWAP_ROUTER,
                      tokenBlock[0],
                      tokenBlock[1],
                      amount[0],
                      amount[1],
                      true
                    );
                  })
                  .catch((err) => {
                    if (err.code != -32602) {
                      this.setState({ isLoading: false, Loading: false });
                    }
                    alert("Token approval failed");
                  });
              })
              .catch((err) => {
                if (err.code != -32602) {
                  this.setState({ isLoading: false, Loading: false });
                }
                alert("Token approval failed");
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};

export const liquidity = async (
  UNISWAP_ROUTER,
  fromAddress,
  toAddress,
  liquiditytokenamountA,
  liquiditytokenamountB,
  isliquidityapprove
) => {
  // if (
  //   liquiditytokenfrom === "Select Token" ||
  //   !tot === "Select Token"
  // )
  //   return alert("Please choose both tokens");
  // if (!liquiditytokenamountA || !liquiditytokenamountB)
  //   return alert("Please choose a valid amount");

  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    // // console.log(accounts);
    let userwalletaddresss = accounts[0];
    window.web3 = new Web3(window.ethereum);
    let liquidity = new window.web3.eth.Contract(routerAbi, UNISWAP_ROUTER);
    let tokenA = fromAddress;
    let tokenB = toAddress;
    let amountADesired = window.web3.utils.toBN(
      fromExponential(liquiditytokenamountA * Math.pow(10, 18))
    );
    let amountBDesired = window.web3.utils.toBN(
      fromExponential(liquiditytokenamountB * Math.pow(10, 18))
    );
    let amountAMin = 1;
    let amountBMin = 1;
    if (isliquidityapprove) {
      if (
        tokenA == "0x0000000000000000000000000000000000000000" ||
        tokenB == "0x0000000000000000000000000000000000000000"
      ) {
        var tokenaddress;
        var amountTokenDesired;
        var amountethDesired;
        if (tokenA == "0x0000000000000000000000000000000000000000") {
          tokenaddress = tokenB;
          if (amountADesired > 10 ** 18) {
            amountethDesired = amountADesired;
            amountTokenDesired = amountBDesired;
          } else {
            amountethDesired = amountADesired;
            amountTokenDesired = amountBDesired;
          }
        } else {
          tokenaddress = tokenA;
          if (amountBDesired > 10 ** 18) {
            amountethDesired = amountBDesired;
            amountTokenDesired = amountADesired;
          } else {
            amountethDesired = amountBDesired;
            amountTokenDesired = amountADesired;
          }
        }
        liquidity.methods
          .addLiquidityETH(
            tokenaddress,
            amountTokenDesired,
            amountAMin,
            amountBMin,
            userwalletaddresss,
            getUnixTime()
          )
          .send({ from: userwalletaddresss, value: amountethDesired })
          .then((result) => {
            // alert("Transaction Succeed!");
            // window.location.reload();
          })
          .catch((err) => {
            // snackbar here

            if (err.code !== -32602) {
              alert("Transaction Failed!");

              window.location.reload();
            } else {
              alert("Gas fees is too low.");
            }
          });
      } else {
        // amountADesired=(amountADesired);
        // amountBDesired=(amountBDesired)

        liquidity.methods
          .addLiquidity(
            tokenA,
            tokenB,
            amountADesired,
            amountBDesired,
            amountAMin,
            amountBMin,
            userwalletaddresss,
            getUnixTime()
          )
          .send({ from: userwalletaddresss })
          .then((result) => {
            // console.log('if success')

            alert("Transaction Succeed!");
          })
          .catch((err) => {
            //snackbar

            if (err.code !== -32602) {
              alert("Transaction Failed!");

              window.location.reload();
            } else {
              alert("Gas fees is too low.");
            }
          });
      }
    } else {
      // amountADesired=(amountADesired);amountBDesired=(amountBDesired)
      onApprove(
        [tokenA, tokenB],
        [amountADesired, amountBDesired],
        "lqudity",
        UNISWAP_ROUTER
      );
    }
  }
};

