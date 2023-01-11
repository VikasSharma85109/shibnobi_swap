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

const getUnixTime = () => {
  const time = Math.floor(new Date().getTime() / 1000) + 100000;
  return time;
};

export const onApprove = async (tokenA, tokenB, amtA, amtB, UNISWAP_ROUTER) => {
   
  if (window.ethereum) {
    let AmountA = window.web3.utils.toBN(
      fromExponential(amtA * Math.pow(10, 18))
    );
    let AmountB = window.web3.utils.toBN(
      fromExponential(amtB * Math.pow(10, 18))
    );
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    let userwalletaddresss = accounts[0];
    window.web3 = new Web3(window.ethereum);
    const web3 = window.web3;
    if (
      tokenA == "0x0000000000000000000000000000000000000000" ||
      tokenB == "0x0000000000000000000000000000000000000000"
    ) {
      let tokenAddress;
      let Amount;
      if (tokenA == "0x0000000000000000000000000000000000000000") {
        tokenAddress = tokenB;
        Amount = AmountB;
      } else {
        tokenAddress = tokenA;
        Amount = AmountA;
      }

      let ercContract = new web3.eth.Contract(ERC20, tokenAddress);

      await ercContract.methods
        .allowance(userwalletaddresss, UNISWAP_ROUTER)
        .call({ from: userwalletaddresss })
        .then((allowance) => {
          if (allowance >= Amount) {
            liquidity(amtA, amtB, tokenA, tokenB, UNISWAP_ROUTER);
          } else {
            ercContract.methods
              .approve(UNISWAP_ROUTER, Amount)
              .send({ from: userwalletaddresss })
              .then((res) => {
                liquidity(amtA, amtB, tokenA, tokenB, UNISWAP_ROUTER);
              })
              .catch();
          }
        })
        .catch();
    } else {
      console.log("tokenA", tokenA);
      const web3 = window.web3;
      let ercContract = new web3.eth.Contract(ERC20, tokenA);
      ercContract.methods
        .allowance(userwalletaddresss, UNISWAP_ROUTER)
        .call({ from: userwalletaddresss })
        .then(async (allowance) => {
          if (allowance >= AmountA) {
            let ercContract = new web3.eth.Contract(ERC20, tokenB);
            ercContract.methods
              .allowance(userwalletaddresss, UNISWAP_ROUTER)
              .call({ from: userwalletaddresss })
              .then((allowance) => {
                if (allowance >= AmountB) {
                  liquidity(amtA, amtB, tokenA, tokenB, UNISWAP_ROUTER);
                } else {
                  ercContract.methods
                    .approve(UNISWAP_ROUTER, AmountB)
                    .send({ from: userwalletaddresss })
                    .then((res) => {
                      liquidity(amtA, amtB, tokenA, tokenB, UNISWAP_ROUTER);
                    })
                    .catch();
                }
              })
              .catch();

            // liquidity(amtA, amtB, tokenA, tokenB, UNISWAP_ROUTER);
          } else {
            ercContract.methods
              .approve(UNISWAP_ROUTER, AmountA)
              .send({ from: userwalletaddresss })
              .then(async (res) => {
                let ercContract = new web3.eth.Contract(ERC20, tokenB);
                ercContract.methods
                  .allowance(userwalletaddresss, UNISWAP_ROUTER)
                  .call({ from: userwalletaddresss })
                  .then((allowance) => {
                    if (allowance >= AmountB) {
                      liquidity(amtA, amtB, tokenA, tokenB, UNISWAP_ROUTER);
                    } else {
                      ercContract.methods
                        .approve(UNISWAP_ROUTER, AmountB)
                        .send({ from: userwalletaddresss })
                        .then((res) => {
                          liquidity(amtA, amtB, tokenA, tokenB, UNISWAP_ROUTER);
                        })
                        .catch();
                    }
                  })
                  .catch();
              })
              .catch();
          }
        })
        .catch((err) => console.log(122, err));
    }
  }
};

const approveToken = () => {};

export const liquidity = async (
  amountA,
  amountB,
  tokenA,
  tokenB,
  UNISWAP_ROUTER
) => {
  if (window.ethereum) {
    console.log(
      "console value",
      amountA,
      amountB,
      tokenA,
      tokenB,
      UNISWAP_ROUTER
    );
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    let userwalletaddresss = accounts[0];
    window.web3 = new Web3(window.ethereum);
    let liquidity = new window.web3.eth.Contract(routerAbi, UNISWAP_ROUTER);

    let amountADesired = window.web3.utils.toBN(
      fromExponential(amountA * Math.pow(10, 18))
    );
    let amountBDesired = window.web3.utils.toBN(
      fromExponential(amountB * Math.pow(10, 18))
    );
    let amountAMin = 1;
    let amountBMin = 1;
    console.log(tokenB, tokenB, amountADesired, amountBDesired);
    if (true) {
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
            console.log(result);
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
        console.log(tokenB, tokenB, amountADesired, amountBDesired);
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
            console.log(result);
          })
          .catch((err) => {
            if (err.code !== -32602) {
              alert("Transaction Failed!");

              window.location.reload();
            } else {
              alert("Gas fees is too low.");
            }
          });
      }
    }
  }
};

export const createPair = async (tokenA, tokenB, UNISWAP_ROUTER) => {
  console.log(898, tokenA, tokenB, UNISWAP_ROUTER)

  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });



    let userwalletaddresss = accounts[0];
    window.web3 = new Web3(window.ethereum);

    let liquidity = new window.web3.eth.Contract(routerAbi, UNISWAP_ROUTER);
    liquidity.methods.factory().call({ from: userwalletaddresss })
      .then((_factory) => {

        let factory = new window.web3.eth.Contract(factoryAbi, _factory);

        factory.methods
          .createPair(tokenA, tokenB)
          .send({ from: userwalletaddresss })
          .then((fees) => {
            console.log(fees);
          })
          .catch();
      })
      .catch();


  }
};




export const totalSupply = async (tokenA) => { 

  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });



    let userwalletaddresss = accounts[0];
    window.web3 = new Web3(window.ethereum);

    let Erc20 = new window.web3.eth.Contract(ERC20,tokenA)
    Erc20.methods.totalSupply().call({ from: userwalletaddresss })
      .then((_factory) => {

        console.log(_factory)

      })
      .catch();


  }
};


async function approve(tokenA,amount,router)
{
    if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
        let userwalletaddresss = accounts[0];
        window.web3 = new Web3(window.ethereum);
        let token = new window.web3.eth.Contract(ERC20,tokenA);
        
        token.methods.allowance(userwalletaddresss,router).call({from:userwalletaddresss})
        .then((allownace)=>
        {
            if(allownace>=amount) 
            {
                //swap
            }
            else
            {
                token.methods.approve(router, amount).send({ from: userwalletaddresss })
                    .then((result) => 
                    {
                        console.log(result);
                        //swap
                    })
                    .catch()
            }   
        }).catch()
      }
    }

