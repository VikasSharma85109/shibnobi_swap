import { ethers } from "ethers";
import { constants } from "../config";
import Web3 from "web3";
import fromExponential from "from-exponential";
// const provider = new ethers.providers.InfuraProvider(
//   "homestead",
//   "3071518e1f4a491ca5b967f5b1dcd3de"
// );
// console.log('sdasdasd', provider)

// const signer = provider.getSigner();

export const tokenBalance = async (tokenAddress, _provider) => {
  let balan;
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  // // console.log(accounts);
  let userwalletaddresss = accounts[0];
  window.web3 = new Web3(window.ethereum);
  let balance = new window.web3.eth.Contract(constants.erc20Abi, tokenAddress);
  let decimal = await balance.methods.decimals().call();
  if (tokenAddress != "0x0000000000000000000000000000000000000000") {
    balance.methods
      .balanceOf(userwalletaddresss)
      .call({ from: userwalletaddresss })
      .then((balan) => {
        console.log("ssss", balan);
        return balan / 10 ** decimal;
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    balan = await window.web3.eth.getBalance(userwalletaddresss);
  }
  console.log("res", balan);

  return balan === undefined ? 0 : balan;
};

export const ethBalance = async (_provider) => {
  const provider = new ethers.providers.Web3Provider(_provider);
  const signer = provider.getSigner();
  const address = signer.getAddress();
  let balance = await provider.getBalance(address);
  console.log("balance", balance);
  return balance;
};

// export const Bal = async () => {
//   if (window.ethereum) {
//     const accounts = await window.ethereum.request({
//       method: "eth_requestAccounts",
//     });
//     // // console.log(accounts);
//     let userwalletaddresss = accounts[0];
//     window.web3 = new Web3(window.ethereum);
//     let balance = new window.web3.eth.Contract(
//       constants.erc20Abi,
//       "0x5AF69DF134E712baC4a4354F238Ff765a7E2C14c"
//     );
//     balance.methods
//       .balanceOf(userwalletaddresss)
//       .call({ from: userwalletaddresss })
//       .then((balan) => {
//         console.log("ssss", balan);
//       })
//       .catch((err) => {
//         console.error(122, err);
//       });
//   }
// };
