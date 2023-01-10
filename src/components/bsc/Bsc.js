import { Fragment, useState, useEffect } from "react";
import { GearFill } from "react-bootstrap-icons";
import { Divider, Space, Typography } from "antd";
import fromExponential from "from-exponential";
import "./style.css";
import { Avatar } from "antd";
import { useDispatch } from "react-redux";
import Figure from "react-bootstrap/Figure";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ethBalance, tokenBalance } from "../Balance";
import { useAccount, useProvider } from "wagmi";
import axios from "axios";
import Web3 from "web3";
import { abi } from "./pancakeabi.js";
import { ChainId, Token, Fetcher } from "@pancakeswap-libs/sdk";
import ImportHeader from "./ImportHeader";
import activeTick from "./assets/logo/Artboard.png";
import {
  approveRouter,
  checkAllowanceForRouter,
  checkAllowanceForRouterShib,
} from "./allowance";
import Add from "../../assests/add.svg";
import Remove from "../../assests/remove.svg";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { CoinlistData } from "../CoinlistApiData";

// icons
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

//importing media assets
import down from "./assets/icons/down.svg";

// import { Coins } from "./coinList1"; //change to mainnet
import { Coins } from "./coinListTestnet";
import Addliquidity from "./Addliquidity";
import { useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  swapExactTokensForTokens,
  swapExactETHForTokens,
  swapExactTokensForETH,
  swapExactETHForTokensRef,
  swapExactTokensForETHRef,
  swapExactTokensForTokensRef,
} from "./swap";
import SlowTag from "../Tags/SlowTag";
import AverageTag from "../Tags/Averagetag";
import FastTag from "../Tags/FastTag";

import {
  addTokenAddressBsc,
  addCurrentRouterOfBsc,
} from "../../reducers/wallectReducers";

import {
  Amount,
  Balance,
  Holder,
  MarketCap,
  TotalSupply,
  Transaction,
} from "../Rows/Rows";
import CenterPanelView from "./CenterPanelView";
import { bsc, bscTestnet, constants } from "../../config";
import {
  addBSCDeadline,
  addBSCPercentage,
} from "../../reducers/transactionSettings";
import { BrowserView } from "react-device-detect";
import TransactionSetting from "./TransactionSetting";
import { Button, notification } from "antd";
import ModelAddTokenBsc from "./ModelAddTokenBsc";
import CreateliquidityBsc from "./CreateliquidityBsc";
var Provider = require("@ethersproject/providers");
const { Text, Title } = Typography;
const _loadlash = require("lodash");
export default function Bsc({ provider, chain, topViewData }) {
  //for topview
  const [apitopViewData, setTopViewData] = useState();
  const tokenData = useSelector((state) => state.counter.bscSearchData);
  //state.currentRouterOfBsc
  const currentRouterOfBsc = useSelector(
    (state) => state.counter.currentRouterOfBsc
  );
  const getCoinDataInRedux = useSelector(
    (state) => state.counter.ethDetails.bscToken
  );

  const token0symbol1 = tokenData.symbol;
  const [swapStatus, setSwapStatus] = useState("");

  const [title, setTile] = useState("Connect Wallet");
  const { isConnected } = useAccount();
  const [myData, setMyData] = useState({ connect: "", theme: false });
  const [darkTheme, setDarkTheme] = useState(false);
  const [results, setResults] = useState([]);
  const [fromCoin, setFromCoin] = useState(getCoinDataInRedux[0].symbol);
  const [toCoin, setToCoin] = useState(getCoinDataInRedux[1].symbol);
  const [totalSupplyvalue, settotalSupplyvalue] = useState("");
  const [fromCoinid, setFromCoinid] = useState(getCoinDataInRedux[0].id);
  const [toCoinid, setToCoinid] = useState(getCoinDataInRedux[1].id);
  const mode = useSelector((state) => state.counter.mode);
  const [fromAddress, setFromAddress] = useState(getCoinDataInRedux[0].address);
  const [toAddress, setToAddress] = useState(getCoinDataInRedux[1].address);
  const [liqFromToken, setliqFromToken] = useState({});
  const [liqToToken, setliqToToken] = useState({});
  const [coindata, setCoindata] = useState(getCoinDataInRedux);
  const [fromdecimmal, setfromdecimal] = useState(
    getCoinDataInRedux[0].decimals
  );
  const [todecimal, settodecimal] = useState(getCoinDataInRedux[1].decimals);
  const [fromObj, setFromObj] = useState(getCoinDataInRedux[0]);
  const [toObj, setToObj] = useState(getCoinDataInRedux[1]);
  const [fromImage, setFromImage] = useState(getCoinDataInRedux[0].logoURI);
  const [toImage, setToImage] = useState(getCoinDataInRedux[1].logoURI);
  const [warningMsg, setwarningMsg] = useState("");
  const [amountIn, setAmountIn] = useState();
  const [amountOut, setAmountOut] = useState("");
  const [isModalOpenOne, setModalStateOne] = useState(false);
  const [isModalOpenTwo, setModalStateTwo] = useState(false);
  const [price, setPrice] = useState(0);
  const [methodType, setMethodType] = useState("Direct");
  const [sidebarActive, setSidebarActive] = useState(false);
  const [show, setShow] = useState(false);
  const [frombal, setfrombal] = useState(0);
  const [tobal, settobal] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [slippageAmount, setSlippageAmount] = useState(0.5);
  const [deadlineMinutes, setDeadlineMinutes] = useState(10);
  const [showModal, setShowModal] = useState(undefined);
  const [totalreferal, settotalreferal] = useState(0);
  const [totalearn, settotalearn] = useState(0);
  const reduxValue = useSelector((state) => state);
  const accountbalnced = useSelector((state) => state.counter.walletbalanced);
  const [DirectPairValue, setDirectPairValue] = useState("");
  const [searchtext, setSearchText] = useState("");
  const [apiData, setApiData] = useState(CoinlistData);
  const [apiData1, setApiData1] = useState(getCoinDataInRedux);

  const [pairsBsclist, setpairsBsclist] = useState([]);
  const [fromCoinId, setFromCoinId] = useState(getCoinDataInRedux[0].id);
  const [toCoinId, setToCoinId] = useState(getCoinDataInRedux[1].id);
  const [fromCoinUSD, setFromCoinUSD] = useState(0);
  const [toCoinUSD, setToCoinUSD] = useState(0);

  const [showRouter, setShowRouter] = useState(false);

  // const [currentRouter, setCurrentRouter] = useState("pancake");

  const [getAddressData, setGetAddressData] = useState();

  // check from where user enter value
  const [checkUserInput, setCheckUserInput] = useState("");

  // notification

  const openNotification = () => {
    notification.open({
      message: "Notification Title",
      description: "Already Selcted this Token, Please select another token",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  /**  ------------------------------------------------------------------------------**/

  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    setFromCoin(token0symbol1);
  }, [token0symbol1]);

  useEffect(() => {
    if (isConnected) {
      setTile("Enter Amount");
    } else {
      setTile("Connect Wallet");
    }
  }, []);

  /**  ------------------------------------------------------------------------------**/
  {
    /** 
  Author :-vikas
 Description :-  This useEffect use  Api call  check address and calculate result 
**/
  }

  const getTokenDetails = async (searchtext) => {
    if (searchtext === "") {
      return false;
    }
    try {
      const data = await fetch(
        `https://deep-index.moralis.io/api/v2/erc20/metadata?chain=bcs&addresses=${searchtext}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            accept: "application/json",
            "X-API-Key":
              "Eb3phmAPxN6vzGcH4vX7TS8dqoR57yESrfazKp8u7lZAVGA3vSF5md0u8HxTj53o",
          },
        }
      );

      const response = await data.json();
    } catch (error) {
      console.log(1099898, error);
    }
  };

  useEffect(() => {
    getTokenDetails(searchtext);
  }, [searchtext]);

  const [tokenModel, setTokenModal] = useState(false);

  //=================================================

  const getTokenAddress = (searchtext) => {
    axios
      .get(
        `https://deep-index.moralis.io/api/v2/erc20/metadata?chain=bcs&addresses=${searchtext}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            accept: "application/json",
            "X-API-Key":
              "Eb3phmAPxN6vzGcH4vX7TS8dqoR57yESrfazKp8u7lZAVGA3vSF5md0u8HxTj53o",
          },
        }
      )
      .then(function (response) {
        if (response.data) {
          isModalOpenOne ? setModalStateOne(false) : setModalStateTwo(false);
          //ek
          setGetAddressData(response.data);
          setTokenModal(true);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(89878789, error);
      })
      .finally(function () {
        // always executed
      });
  };

  useEffect(() => {
    axios
      .get(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${fromCoin},${toCoin}&tsyms=USD&api_key=2e42f86bf533950e84569f24c3418971aed54f31dc4786ca577a724d744b46c6`
      )
      .then((response) => {
        setFromCoinUSD(response.data[fromCoin].USD);
        setToCoinUSD(response.data[toCoin].USD);
      });
  }, [fromCoin, toCoin]);

  const getPairList = async () => {
    const options = {
      method: "POST",
      url: "https://api.thegraph.com/subgraphs/name/vmatskiv/pancakeswap-v2",
      // headers: {
      //   'content-type': 'application/json',
      //   'x-rapidapi-host': 'geodb-cities-graphql.p.rapidapi.com',
      //   'x-rapidapi-key': process.env.REACT_PUBLIC_RAPIDAPI_KEY
      // },
      data: {
        query: `{
  pairs(
    first: 10
     orderBy: reserveUSD
    orderDirection: desc
  ) {
    id
    token0 {
      id
      symbol
    }
    token1 {
      id
      symbol
    }
    reserveUSD
    volumeUSD
    totalSupply
  }
}`,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        setpairsBsclist(response.data.data.pairs);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  /**  ------------------------------------------------------------------------------**/

  /**  ------------------------------------------------------------------------------**/

  useEffect(() => {
    getPairList();
  }, []);

  const [gasdata, setGasdata] = useState("0");
  const [averagegas, setAveragegas] = useState("0");
  const [slowgas, setSlowgas] = useState("0");

  const bscRpcTestnet = "https://data-seed-prebsc-1-s3.binance.org:8545/";
  const bscRpcMainnet = "https://bsc-dataseed1.binance.org/";

  const pancakeRouterv1Testnet = bscTestnet.pancakeRouterAddress; //change to mainnet
  // const pancakeRouterv1Testnet = MAINNET.pancakeRouterAddress;
  const routerAbi = constants.routerAbi;

  const shibRouter = bscTestnet.shibnobiRouter; //change to mainnet
  const shibRouterAbi = constants.shibRouterAbi;
  const [usingFor, setusingFor] = useState("0");

  const dispatch = useDispatch();

  const addpairedView = () => {
    setusingFor("1");
    setAddshow(true);
  };
  const removePairedView = () => {
    setusingFor("2");
    setAddshow(true);
  };

  // -------------------------------------------------------------------------------

  /**
    Author :- vikas
    Description:- method call pair list and bnb token supply
   **/

  useEffect(() => {
    getPairList();
  }, []);

  // -------------------------------------------------------------------------------

  /**
    Author :- vikas
    Description:- this method used data get gas tracker 
   **/

  useEffect(() => {
    setInterval(() => {
      axios
        .get(
          "https://api.bscscan.com/api?module=gastracker&action=gasoracle&apikey=71J64U623PK3QCEMRRHNGKYJ1WC946S2NS"
        )
        .then(function (response) {
          setGasdata(response.data.result.FastGasPrice);
          setAveragegas(response.data.result.ProposeGasPrice);
          setSlowgas(response.data.result.SafeGasPrice);
        })
        .catch(function (error) {
          // handle error
        })
        .finally(function () {
          // always executed
        });

      //  tokenapi()
    }, 5000);
  }, []);

  const [market, setMarket] = useState();
  const [transcation, settranscation] = useState();
  const [holder, setHolder] = useState();

  /**
    Author :- vikas
    Description:- this methods used calculate balanced , total supply data get and token Address
   **/

  const fromBalance = async (address, decimal) => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // // console.log(accounts);
      let userwalletaddresss = accounts[0];
      window.web3 = new Web3(window.ethereum);
      let balance = new window.web3.eth.Contract(constants.erc20Abi, address);
      if (address != "0x0000000000000000000000000000000000000000") {
        balance.methods
          .balanceOf(userwalletaddresss)
          .call({ from: userwalletaddresss })
          .then((balan) => {
            setfrombal(parseFloat(balan / 10 ** decimal).toFixed(4));
          })
          .catch((err) => {
            console.error(122, err);
          });
      } else {
        let balan = await window.web3.eth.getBalance(userwalletaddresss);
        console.log("eth", balan);
        setfrombal(parseFloat(balan / 10 ** 18).toFixed(4));
      }
    }
  };
  const toBalance = async (address, decimal) => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // // console.log(accounts);
      let userwalletaddresss = accounts[0];
      window.web3 = new Web3(window.ethereum);
      let balance = new window.web3.eth.Contract(constants.erc20Abi, address);
      if (address != "0x0000000000000000000000000000000000000000") {
        balance.methods
          .balanceOf(userwalletaddresss)
          .call({ from: userwalletaddresss })
          .then((balan) => {
            settobal(parseFloat(balan / 10 ** decimal).toFixed(4));
          })
          .catch((err) => {
            console.error(122, err);
          });
      } else {
        let balan = await window.web3.eth.getBalance(userwalletaddresss);
        console.log("eth", balan);
        settobal(parseFloat(balan / 10 ** 18).toFixed(4));
      }
    }
  };
  const totalSupply = async (tokenA) => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      let userwalletaddresss = accounts[0];
      window.web3 = new Web3(window.ethereum);

      let Erc20 = new window.web3.eth.Contract(constants.erc20Abi, tokenA);
      Erc20.methods
        .totalSupply()
        .call({ from: userwalletaddresss })
        .then((_factory) => {
          console.log("212121", _factory);
          settotalSupplyvalue(_factory);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    if (fromCoin === "BNB") {
      let balance = ethBalance(provider);
      setfrombal(isNaN(balance) ? 0 : balance);
    } else {
      let balance1 = tokenBalance(toAddress, provider);
      setfrombal(isNaN(balance1) ? 0 : balance1);
    }

    fromBalance(fromAddress, fromdecimmal);
    toBalance(toAddress, todecimal);
    totalSupply(fromAddress);

    axios
      .get(
        "https://deep-index.moralis.io/api/v2/erc20/" +
          fromAddress +
          "/price?chain=eth"
      )
      .then(function (response) {
        setMarket(response.data.result);
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(function () {
        // always executed
      });
    fetch(
      `https://api.ethplorer.io/getTokenInfo/${fromAddress}?apiKey=EK-nAUJr-Fj2iAAQ-NEG7G`
    )
      .then((response) => response.json())
      .then((response) => {
        settranscation(response.txsCount);
        setHolder(response.holdersCount);
      })
      .catch(() => {});
  }, [fromAddress, fromCoin, provider, toAddress]);

  // drop down
  const [addshow, setAddshow] = useState(false);
  const [addshow1, setAddshow1] = useState(false);
  const [addshowCreate, setAddshowCreate] = useState(false);

  const Ether = new Provider.StaticJsonRpcProvider(
    bscRpcTestnet //change to mainnet
  );

  // const provider = new Web3(
  //   new Web3.providers.HttpProvider(bscRpcTestnet) //change to mainnet
  // );
  const web3 = new Web3(provider);

  let pancake = new web3.eth.Contract(abi, pancakeRouterv1Testnet);

  const mapp = Coins.map((coin) => coin).filter(
    (fil) => fil.symbol !== fromCoin && fil.symbol !== toCoin
  );

  {
    /**
    Author :- vikas
    Description:-useEffect used, this methods call token coin
**/
  }

  useEffect(() => {
    setResults(Coins);
  }, []);

  {
    /**
    Author :- vikas
    Description:- this function call model popUp open and close
**/
  }

  const modelClose = () => {
    setModalStateOne(false);
    setModalStateTwo(false);
  };

  var temp = 0;
  var tem;

  const getamountout = async (tokenA, tokenB, amount) => {

    if (window.web3) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      let userwalletaddresss = accounts[0];

      // let amountIn = (BigNumber(Number(amount)*(Math.pow(10,18))));
      let amountIn = window.web3.utils.toBN(
        fromExponential(amount * Math.pow(10, 18))
      );

      if (tokenA == "0x0000000000000000000000000000000000000000") {
        let path = [bscTestnet.weth, tokenB];

        window.web3 = new Web3(window.ethereum);
        let swaping = new window.web3.eth.Contract(
          routerAbi,
          bscTestnet.pancakeRouterAddress
        );
        //getAmountsIn

        swaping.methods
          .getAmountsOut(amountIn, path)
          .call({ from: userwalletaddresss })
          .then((res) => {
            console.log(res);
            let amount = parseFloat(res[1]) / 10 ** 18;
            setAmountOut(parseFloat(amount).toFixed(5));
          })
          .catch(function (error) {
            console.error(error);
          });
      } else if (tokenB == "0x0000000000000000000000000000000000000000") {
        let path = [tokenA, bscTestnet.weth];

        window.web3 = new Web3(window.ethereum);
        let swaping = new window.web3.eth.Contract(
          routerAbi,
          bscTestnet.pancakeRouterAddress
        );

        swaping.methods
          .getAmountsOut(amountIn, path)
          .call({ from: userwalletaddresss })
          .then((res) => {
            // console.log(res)

            let amount = parseInt(res[1]) / 10 ** 18;
            setAmountOut(parseFloat(amount).toFixed(5));
          })
          .catch(function (error) {
            console.error(error);
          });
      } else {
        let path = [tokenA, tokenB];

        window.web3 = new Web3(window.ethereum);
        let swaping = new window.web3.eth.Contract(
          routerAbi,
          bscTestnet.pancakeRouterAddress
        );
          console.log(1234455, path, bscTestnet.pancakeRouterAddress)
        swaping.methods
          .getAmountsOut(amountIn, path)
          .call({ from: userwalletaddresss })
          .then((res) => {
            console.log(res)

            //let amount = (parseInt(res[1])/(10**18));
            let amount = parseInt(parseFloat(res[1]) / Math.pow(10, 18));
            setAmountOut(parseFloat(amount).toFixed(5));
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    }
  };
  const getamountoutShibnobi = async (tokenA, tokenB, amount) => {

    if (window.web3) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      let userwalletaddresss = accounts[0];

      // let amountIn = (BigNumber(Number(amount)*(Math.pow(10,18))));
      let amountIn = window.web3.utils.toBN(
        fromExponential(amount * Math.pow(10, 18))
      );

      if (tokenA == "0x0000000000000000000000000000000000000000") {
        let path = [bscTestnet.weth, tokenB];

        window.web3 = new Web3(window.ethereum);
        let swaping = new window.web3.eth.Contract(
          routerAbi,

          bscTestnet.shibnobiRouter
        );
        //getAmountsIn

        swaping.methods
          .getAmountsOut(amountIn, path)
          .call({ from: userwalletaddresss })
          .then((res) => {
            console.log(res);
            let amount = parseFloat(res[1]) / 10 ** 18;
            setDirectPairValue(parseFloat(amount).toFixed(5));
          })
          .catch(function (error) {
            console.error(error);
          });
      } else if (tokenB == "0x0000000000000000000000000000000000000000") {
        let path = [tokenA, bscTestnet.weth];

        window.web3 = new Web3(window.ethereum);
        let swaping = new window.web3.eth.Contract(
          routerAbi,

          bscTestnet.shibnobiRouter
        );

        swaping.methods
          .getAmountsOut(amountIn, path)
          .call({ from: userwalletaddresss })
          .then((res) => {
            // console.log(res)

            let amount = parseInt(res[1]) / 10 ** 18;
            setDirectPairValue(parseFloat(amount).toFixed(5));
          })
          .catch(function (error) {
            console.error(error);
          });
      } else {
        let path = [tokenA, tokenB];

        window.web3 = new Web3(window.ethereum);
        let swaping = new window.web3.eth.Contract(
          routerAbi,
          bscTestnet.shibnobiRouter
        );

        swaping.methods
          .getAmountsOut(amountIn, path)
          .call({ from: userwalletaddresss })
          .then((res) => {
            // console.log(res)

            //let amount = (parseInt(res[1])/(10**18));
            let amount = parseInt(parseFloat(res[1]) / Math.pow(10, 18));
            setDirectPairValue(parseFloat(amount).toFixed(5));
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    }
  };

  //getting the final best price list
  async function finalFilter() {
    for (var i = 0; i < multiHopLevelTwo.length; i++) {
      var temm = multiHopLevelTwo[i].symbol;

      for (var j = 0; j < multiHopLevelThree.length; j++) {
        if (multiHopLevelThree[j].symbol === temm) {
          multiHopFinal = multiHopLevelThree;

          break;
        }
      }
    }
  }

  
  /**================ MULTI HOP =================== */

  //fixing decimal numbers
  function getFlooredFixed(v, d) {
    return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
  }
  const getUnixTime = () => {
    const time = Math.floor(new Date().getTime() / 1000) + 100000;
    return time;
  };
  // GET AMOUNTS IN //

  var temp = 0;
  var tem;

  const swap = async (tokenA, tokenB, amount, routerAddress) => {


    if (window.web3) {
      // let amountIn = (BigNumber(Number(amount)*(Math.pow(10,18))));
      let amountIn = window.web3.utils.toBN(
        fromExponential(amount * Math.pow(10, 18))
      );

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      let userwalletaddresss = accounts[0];

      if (tokenA == "0x0000000000000000000000000000000000000000") {
        let WETH = bscTestnet.weth;
        let path = [WETH, tokenB];
        let deadline = getUnixTime();

        window.web3 = new Web3(window.ethereum);
        let swaping = new window.web3.eth.Contract(routerAbi, routerAddress);
        //getAmountsIn
        console.log(amountIn);

        swaping.methods
          .swapExactETHForTokens(1, path, userwalletaddresss, deadline)
          .send({ from: userwalletaddresss, value: amountIn })
          .then((res) => {
            console.log(res);
          })
          .catch(function (error) {
            console.error(error);
          });
      } else if (tokenB == "0x0000000000000000000000000000000000000000") {

        approve(
          tokenA,
          amount,
          currentRouterOfBsc == "shibnobi"
            ? bscTestnet.shibnobiRouter
            : bscTestnet.pancakeRouterAddress
        ).then((response) => {
          let WETH = bscTestnet.weth;
          let path = [tokenA, WETH];
          let deadline = getUnixTime();

          window.web3 = new Web3(window.ethereum);
          let swaping = new window.web3.eth.Contract(routerAbi, routerAddress);
          swaping.methods
            .swapExactTokensForETH(
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
            .catch(function (error) {
              console.error(error);
            });
        });
      } else {
        approve(
          tokenA,
          amount,
          currentRouterOfBsc == "shibnobi"
            ? bscTestnet.shibnobiRouter
            : bscTestnet.pancakeRouterAddress
        ).then((response) => {
          let path = [tokenA, tokenB];
          let deadline = getUnixTime();

          window.web3 = new Web3(window.ethereum);
          let swaping = new window.web3.eth.Contract(routerAbi, routerAddress);

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
            .catch(function (error) {
              console.error(error);
            });
        });
      }
    }
  };
  const approve = async (tokenA, amountIn, router) => {

    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      let userwalletaddresss = accounts[0];

      let amount = amountIn * Math.pow(10, 25);

      window.web3 = new Web3(window.ethereum);
      let token = new window.web3.eth.Contract(constants.erc20Abi, tokenA);
      console.log("1");
      await token.methods
        .allowance(userwalletaddresss, router)
        .call({ from: userwalletaddresss })
        .then(async (allownace) => {

          if (allownace >= amount) {
            //swap
            return true;
          } else {
            let amountIn = window.web3.utils.toBN(fromExponential(amount));
            await token.methods
              .approve(router, amountIn)
              .send({ from: userwalletaddresss })
              .then((result) => {
                console.log(result);
                //swap
                return true;
              })
              .catch(function (error) {
                console.error(error);
              });
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  //Multi Hop Level Three
  async function multiHopThreeIn() {
    await Promise.all(
      multiHopLevelTwo.map(async (levelThree) => {
        try {
          tem = await pancake.methods
            .getAmountsIn("1000000000000000000", [
              levelThree.address,
              toAddress,
            ])
            .call();
          multiHopLevelThree.push(levelThree);
        } catch {
          //console.log("err");
        }

        return 0;
      })
    );
    await finalFilterIn();
  }

  //finding best price

  async function hasword(str, word) {
    return str.split(" ").includes(word);
  }

  // async function bestpairIn(arrsymbol, arrpricelist) {
  //   for (let i = 0; i < arrsymbol.length; i++) {
  //     for (let j = 0; j < arrpricelist.length; j++) {
  //       if (hasword(arrsymbol[i], arrpricelist[j])) {
  //         console.log(arrsymbol[i], arrpricelist[j]);
  //       }
  //     }
  //   }
  //   return;
  // }

  //getting the final best price list
  async function finalFilterIn() {
    for (var i = 0; i < multiHopLevelTwo.length; i++) {
      var temm = multiHopLevelTwo[i].symbol;

      for (var j = 0; j < multiHopLevelThree.length; j++) {
        if (multiHopLevelThree[j].symbol === temm) {
          multiHopFinal = multiHopLevelThree;

          break;
        }
      }
    }
  }

  //Multi Hop finding best pair
  async function finalPriceIn(value) {
    let amt = (value * Math.pow(10, 18)).toString();

    await Promise.all(
      multiHopLevelOne.map(async (levelone) => {
        multiHopFinal.map(async (levelFinal) => {
          try {
            const a = levelone.address;
            const b = levelFinal.address;
            const temp = await pancake.methods
              .getAmountsIn(amt, [fromAddress, a, b, toAddress])
              .call();

            const teemp = temp[3] / Math.pow(10, 18);
            finalPriceList.push(teemp);
            var str = levelone.symbol.concat([
              " " + levelFinal.symbol + " " + teemp,
            ]);
            finalPriceListSymbol.push(str);
            // console.log(bestpair(finalPriceListSymbol, finalPriceList));
            setAmountIn(bests(finalPriceList));
            // console.log(finalPriceList, path1, path2.symbol);
          } catch {}
        });
        return;
      })
    );

    //empting all arrays
    multiHopLevelOne = [];
    multiHopLevelTwo = [];
    multiHopLevelThree = [];
    multiHopFinal = [];
    // finalPriceList = [];
    // finalPriceListSymbol = [];
  }

  /**================ MULTI HOP =================== */

  //fixing decimal numbers
  function getFlooredFixed(v, d) {
    return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
  }

  // END //

  const [allowance, setAllowance] = useState(0);

  //handling user input
  const handleChange = async (e) => {
    if (frombal === 0) {
      setTile("Insufficient Balance");
    }

    // if (e.target.value === "" || e.target.value === "0")
    if (e === "" || e === "0") {
      setAmountOut("");
      setTile("Enter Amount");
    }

    setAmountIn(e.target.value);
    let val = e.target.value;

    // setAmountIn(e.target.value);
    // let val = e.target.value;

    if (methodType === "Direct") {
      await directPair(val);
    }
    if (methodType === "SingleHop") {
      await singleHopMethod(val);
    }
    if (methodType === "MultiHop") {
      await multiHop();
      await finalPrice(val);
    }

    checkAllowance(e.target.value);
  };

  /**
   description:-check wallet balanced
   **/

  const handleChangeIn = async (e) => {
    if (frombal === 0) {
      setTile("Insufficient Balance");
    }

    if (e.target.value === "" || e.target.value === "0") {
      setAmountIn("");
      setTile("Enter Amount");
    }

    setAmountOut(e.target.value);
    let val = e.target.value;

    if (methodType === "Direct") {
      await directPairIn(val);
    }
    if (methodType === "SingleHop") {
      await singleHopMethodIn(val);
    }
    if (methodType === "MultiHop") {
      await multiHopIn();
      await finalPriceIn(val);
    }

    checkAllowance(e.target.value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => {
  //   test();
  // });

  //rendering Header
  const renderHeader = <></>;

  //rendering form In

  const renderInForm = (
    <div
      className={
        mode === "dark"
          ? "input-card-top input-eth dark"
          : "input-card-top input-eth light"
      }
      style={{
        borderRadius: 10,
        padding: 10,
        display: "block",
        lineHeight: 1.5,
        border: "1px solid",
      }}
    >
      <div className="online">
        <p className="allfontsizeSet">From</p>
        <p className="allfontsizeSet">Balance {frombal}</p>
      </div>

      <div className="online">
        <div>
          <input
            type="text"
            name="amountIn"
            autoComplete="off"
            value={amountIn}
            onChange={(e) => {
              const value = e.target.value;
              getamountout(fromAddress, toAddress, value);
              // getamountoutShibnobi(fromAddress, toAddress, value);
              setCheckUserInput("From");
              // handleChange(e);
              setAmountOut("");
              setDirectPairValue("");
            }}
            placeholder="0.0"
          />
        </div>

        <div
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => {
            setCoindata(Coins);
            setSearchText("");
            setModalStateOne(true);
          }}
        >
          {/* <Avatar size="small" src={fromImage} /> */}
          <p className="tokenSymbol allfontsizeSet">{fromCoin}</p>

          <img class="icon-sm" src={down} alt="caret-down" />
        </div>
      </div>

      <div className="online" style={{ dispay: "block" }}>
        <p className="allfontsizeSet">
          ${amountIn == null ? 1 * fromCoinUSD : fromCoinUSD * amountIn}
        </p>
      </div>
    </div>
  );

  //rendering form Out

  const renderOutForm = (
    <div
      onClick={() => dispatch(addCurrentRouterOfBsc("pancake"))}
      className={`input-card-top input-eth ${
        mode === "dark" ? "dark" : "light"
      }    ${
        currentRouterOfBsc === "pancake"
          ? "selectedBorder"
          : "nonselectedBorder"
      }`}
      style={{
        borderRadius: 10,
        padding: 10,
        display: "block",
        lineHeight: 1.5,
        border: "1px",
      }}
    >
      <div className="online">
        <p className="allfontsizeSet">To (estimated)</p>
        <p className="allfontsizeSet">Balance {tobal}</p>
      </div>

      <div
        className="input-card-top input-eth"
        style={{ border: "0px 0px 15px 15px" }}
      >
        <div className="online">
          <div>
            <input
              type="text"
              name="amountOut"
              autoComplete="off"
              value={amountOut}
              onFocus={() => dispatch(addCurrentRouterOfBsc("pancake"))}
              onChange={(e) => {
                const value = e.target.value;
                setAmountOut(value);
                setCheckUserInput("To");
                handleChangeIn(e);
              }}
              placeholder="0.0"
            />
          </div>
          <div
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => {
              setCoindata(Coins);
              setSearchText("");
              setModalStateTwo(true);
            }}
          >
            {/* <Avatar size="small" src={toImage} /> */}

            <p className="tokenSymbol allfontsizeSet">{toCoin}</p>
            <img class="icon-sm" src={down} alt="caret-down" />
          </div>
        </div>
      </div>
      <div className="online" style={{ dispay: "block" }}>
        <p className="allfontsizeSet">
          ${amountOut == "" ? 1 * toCoinUSD : toCoinUSD * amountOut}
        </p>
      </div>
    </div>
  );

  /**  Author: - vikas
   Description:- this function used icon, arrow, address, decimals...etc 
 **/

  const renderIcon = (
    <div
      className="arrow"
      onClick={() => {
        const address = fromAddress;
        const decimals = fromdecimmal;
        const name = fromCoin;

        const image = fromImage;
        const obj = fromObj;
        const input = amountIn;

        setFromAddress(toAddress);
        setfromdecimal(todecimal);
        setFromCoin(toCoin);
        setFromImage(toImage);
        setFromObj(toObj);
        setAmountIn(amountOut);

        setToAddress(address);
        settodecimal(decimals);
        setToCoin(name);
        setToImage(image);
        setToObj(obj);
        setAmountOut(input);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ff00ff"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <polyline points="19 12 12 19 5 12"></polyline>
      </svg>
    </div>
  );

  //rendring form

  const renderForm = (
    <Fragment>
      {renderInForm}
      {renderIcon}
      {renderOutForm}
      <p style={{ color: "red", fontSize: "11px" }}>{swapStatus}</p>
    </Fragment>
  );

  //handling modal
  const handleModal = (res) => {
    if (isModalOpenOne) {
      setModalStateOne(false);
      setFromCoin(res.symbol);
      setfromdecimal(res.decimals);
      setFromAddress(res.address);
      setFromImage(res.logoURI);
    } else {
      setModalStateTwo(false);
      setToCoin(res.symbol);
      settodecimal(res.decimals);
      setToImage(res.logoURI);
      setToAddress(res.address);
    }
    modelClose();
  };

  //rendering search results of modal

  //rendering modal
  const renderMod = (
    <div>
      <Modal
        className={mode === "dark" ? "dark" : "light"}
        show={true}
        onHide={() =>
          isModalOpenOne ? setModalStateOne(false) : setModalStateTwo(false)
        }
      >
        <Modal.Header
          closeButton
          className={mode === "dark" ? "dark" : "light"}
        >
          <Modal.Title className={mode === "dark" ? "dark" : "light"}>
            Select Token
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={mode === "dark" ? "dark" : "light"}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchtext}
                className={mode === "dark" ? "dark" : "light"}
                onChange={(e) => {
                  // Using the _.filter() method
                  let filtered_array = _loadlash.filter(
                    getCoinDataInRedux,
                    function (o) {
                      return (
                        o.address.includes(e.target.value) ||
                        o.symbol.includes(e.target.value.toLocaleUpperCase())
                      );
                    }
                  );

                  // Printing the output
                  console.log(1212, filtered_array);

                  setSearchText(e.target.value);
                  if (e.target.value === "") {
                    setCoindata(getCoinDataInRedux);
                  } else {
                    if (e.target.value.length == 42) {
                      //call api token
                      getTokenAddress(searchtext);
                      //once dtata receive open new model with add button
                    } else {
                      setCoindata(filtered_array);
                    }
                  }
                }}
              />
            </Form.Group>
          </Form>

          {coindata.map((curVal, i) => {
            return (
              <Figure
                className="listData"
                // onClick={() => handleModal(curVal)}
                onClick={() =>
                  fromCoin == curVal.symbol || toCoin == curVal.symbol
                    ? openNotification()
                    : handleModal(curVal)
                }
                key={i}
              >
                <div style={{ display: "flex" }}>
                  <Avatar src={curVal.logoURI} style={{ margin: 5 }} />
                  <div>
                    <Figure.Caption style={{ fontWeight: 700 }}>
                      {curVal.symbol}
                    </Figure.Caption>
                    <Figure.Caption>{curVal.name}</Figure.Caption>
                  </div>
                </div>

                <Figure.Image
                  width={20}
                  height={20}
                  style={{ margin: 5, objectFit: "contain" }}
                  alt=""
                  src={activeTick}
                />
              </Figure>
            );
          })}
        </Modal.Body>
      </Modal>

      <ModelAddTokenBsc
        status={tokenModel}
        setGetAddressData={getAddressData}
      />
    </div>
  );

  {
    /**
  this function used checkAllowance in BSC 
  **/
  }

  const checkAllowance = async (inputValue) => {
    let value;
    if (currentRouterOfBsc == "pancake") {
      value = await checkAllowanceForRouter(fromAddress, provider);
    } else {
      value = await checkAllowanceForRouterShib(fromAddress, provider);
    }

    setAllowance(value);

    // if (frombal == 0) {
    //   setTile("Insufficient Balance");
    // }
    // else
    if (parseFloat(inputValue) > parseFloat(value)) {
      setTile("Approve");
    } else {
      setTile("Swap");
    }
  };

  //rendering routes

  let methods = ["Direct", "SingleHop", "MultiHop"];

  const handleRadioChange = async (e) => {
    setMethodType(e.target.value);
    setAmountIn("");
    setAmountOut("");
  };

  //rendering methods

  const btn = () => {
    setAddshow(true);
  };
  const btn1 = () => {
    setAddshow1(true);
  };

  const btn2 = () => {
    setAddshowCreate(true);
  };
  //transactionsetting onchnage
  const onChangeEvent = (msg, amount, percentage) => {
    setwarningMsg(msg);
    setSlippageAmount(amount);
    dispatch(addBSCPercentage(percentage));
  };
  //change deadlineminute

  const deadlineMinute = (value) => {
    setDeadlineMinutes(value);
    dispatch(addBSCDeadline(value));
  };

  // ----------------------return part start---------------------

  return (
    <div className="container-fluid">
      <Tabs className="mobTabNav">
        <TabList>
          <Tab>Swap</Tab>
          <Tab>Market</Tab>
          <Tab>Staking</Tab>
        </TabList>

        <TabPanel>
          <div className="col-lg-4 col-md-12 ml-0">
            {addshow1 ? (
              <ImportHeader setAddshow1={setAddshow1} provider={provider} />
            ) : (
              <Tabs className=" ">
                <div className={mode === "dark" ? "App dark" : "App"}>
                  <div className="content">
                    {renderHeader}
                    {isModalOpenOne || isModalOpenTwo ? (
                      renderMod
                    ) : (
                      <>
                        <div
                          className={
                            mode === "dark" ? "swapper dark" : "swapper"
                          }
                        >
                          <div
                            className={mode === "dark" ? "title dark" : "title"}
                          ></div>

                          <div className="block"></div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="main-boby">
                    <div className="tab-content " id="pills-tabContent">
                      <div
                        className="swap-container tab-pane fade show active"
                        id="pills-swap"
                        role="tabpanel"
                        aria-labelledby="pills-swap-tab"
                      >
                        <div
                          className={
                            mode == "dark"
                              ? "dark swap-contents"
                              : "light swap-contents"
                          }
                        >
                          <div
                            className={
                              mode == "dark"
                                ? "dark card swap-contents-card"
                                : "light card swap-contents-card"
                            }
                          >
                            <TabList>
                              <div className="tabeedd">
                                <Tab>
                                  <div className="swap-head card-header">
                                    Swap
                                  </div>
                                </Tab>
                                <Tab>
                                  <div className="swap-head card-header">
                                    Liquidity
                                  </div>
                                </Tab>
                              </div>
                            </TabList>
                            <TabPanel>
                              {/* <h2>Any content 1</h2> */}

                              <div className="appBody">
                                <div>
                                  <div className="">
                                    {/* <div className="">
                                    {showModal && (
                                      <ConfigModal
                                        onClose={() => setShowModal(false)}
                                        setDeadlineMinutes={setDeadlineMinutes}
                                        deadlineMinutes={deadlineMinutes}
                                        setSlippageAmount={setSlippageAmount}
                                        slippageAmount={slippageAmount}
                                      />
                                    )}
                                  </div> */}

                                    <div className="card-input input-group">
                                      {renderForm}
                                      <div
                                        className={`oneInch ${
                                          mode === "dark" ? "dark" : "light"
                                        }    ${
                                          currentRouterOfBsc !== "pancake"
                                            ? "selectedBorder"
                                            : "nonselectedBorder"
                                        }`}
                                        onClick={() =>
                                          dispatch(
                                            addCurrentRouterOfBsc("shibnobi")
                                          )
                                        }
                                      >
                                        <Text
                                          onClick={() =>
                                            dispatch(
                                              addCurrentRouterOfBsc("shibnobi")
                                            )
                                          }
                                        >
                                          {"SHIBNOBI ROUTER"}
                                        </Text>
                                        <small>{DirectPairValue}</small>
                                      </div>
                                      <div
                                        style={{
                                          flexDirection: "row",
                                          width: "inherit",
                                          flexWrap: "nowrap",
                                          alignContent: "center",
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "flex-start",
                                          padding: 10,
                                        }}
                                      >
                                        <Text>Slippage Tolerance</Text>
                                        <div>
                                          <div
                                            style={{ color: "#FF00FF " }}
                                            className="gearContainer"
                                            onClick={() => setShowModal(true)}
                                          >
                                            <GearFill
                                              style={{ fontSize: "22px" }}
                                              onClick={() => {
                                                setShow(true);
                                              }}
                                            />
                                          </div>
                                          <div
                                            style={{
                                              color: "#FF00FF ",
                                              marginRight: "10px",
                                            }}
                                            className="gearContainer"
                                            onClick={() => setShowModal(true)}
                                          >
                                            <span style={{ color: "white" }}>
                                              {slippageAmount}%
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      <Button
                                        type="primary"
                                        block
                                        onClick={async () => {
                                          //swap from to
                                          swap(
                                            fromAddress,
                                            toAddress,
                                            amountIn,
                                            currentRouterOfBsc == "shibnobi"
                                              ? bscTestnet.shibnobiRouter
                                              : bscTestnet.pancakeRouterAddress
                                          );
                                        }}
                                      >
                                        {title}
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                                <div className="lgg">
                                  <div className="gastracker">
                                    <FastTag
                                      gasdata={gasdata === "" ? "0" : gasdata}
                                    />
                                    <AverageTag
                                      gasdata={
                                        averagegas === "" ? "0" : averagegas
                                      }
                                    />
                                    <SlowTag
                                      gasdata={slowgas === "" ? "0" : slowgas}
                                    />
                                  </div>
                                  <div className="p10">
                                    <p className="allfontsizeSet">{fromCoin}</p>
                                    <div className="token">
                                      <p className="allfontsizeSet">
                                        {fromAddress &&
                                          fromAddress.toString().slice(0, 25) +
                                            "......"}
                                      </p>
                                      <p className="allfontsizeSet">
                                        <CopyToClipboard
                                          text={fromAddress}
                                          onCopy={() => alert("copied")}
                                        >
                                          <ContentCopyIcon />
                                        </CopyToClipboard>
                                      </p>
                                    </div>
                                    <br></br>
                                    <Amount />
                                    <hr />
                                    <Balance value={frombal} mode={mode} />
                                    <hr />
                                    <div
                                      style={{
                                        marginTop: 50,
                                        marginBottom: 50,
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          marginBottom: 10,
                                        }}
                                      >
                                        <img
                                          src="https://bscscan.com/images/logo-bscscan.svg?v=0.0.3"
                                          alt="https://bscscan.com/"
                                          height={35}
                                        />
                                      </div>

                                      <div>
                                        <TotalSupply
                                          value={totalSupplyvalue}
                                          mode={mode}
                                        />
                                        <hr></hr>
                                        <MarketCap value={""} mode={mode} />
                                        <hr></hr>

                                        <Transaction
                                          value={transcation}
                                          mode={mode}
                                        />
                                        <hr></hr>

                                        <Holder value={holder} mode={mode} />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TabPanel>

                            {/* Liquidity start */}

                            <TabPanel>
                              {addshow === true && (
                                <Addliquidity
                                  setAddshow={setAddshow}
                                  fromdecimmal={fromdecimmal}
                                  todecimal={todecimal}
                                  slippageModel={handleShow}
                                  usingFor={usingFor}
                                  FromToken={liqFromToken}
                                  ToToken={liqToToken}
                                  provider={provider}
                                  fromCoin={fromCoin}
                                  toCoin={toCoin}
                                />
                              )}

                              {addshowCreate === true && (
                                <CreateliquidityBsc
                                  setAddshowCreate={setAddshowCreate}
                                  fromdecimmal={fromdecimmal}
                                  todecimal={todecimal}
                                  slippageModel={handleShow}
                                  usingFor={usingFor}
                                  FromToken={liqFromToken}
                                  ToToken={liqToToken}
                                  provider={provider}
                                  fromCoin={fromCoin}
                                  toCoin={toCoin}
                                />
                              )}

                              {addshow === false && addshowCreate === false && (
                                <div className="yourLiq-pd">
                                  <Title level={4}>Your Liquidity</Title>
                                  <Divider />
                                  <Space wrap>
                                    <Button
                                      onClick={btn2}
                                      className="btn createApair"
                                    >
                                      Create a pair
                                    </Button>

                                    <Button
                                      onClick={btn}
                                      className="btn createApair fill"
                                    >
                                      + Add liquidity
                                    </Button>
                                  </Space>
                                  <Divider />
                                  <div className="noteText">
                                    {"Dont't see pool you joined?  "}
                                  </div>
                                  <span
                                    onClick={btn1}
                                    className="noteText"
                                    style={{
                                      cursor: "pointer",
                                      fontWeight: 600,
                                    }}
                                  >
                                    &nbsp;Import it.
                                  </span>
                                </div>
                              )}
                            </TabPanel>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs>
            )}
          </div>
        </TabPanel>
        <TabPanel>
          <CenterPanelView topView={topViewData} />
        </TabPanel>
        <TabPanel>
          <h2>Coming Soon</h2>
        </TabPanel>
      </Tabs>

      <BrowserView>
        <div className={mode === "dark" ? "dark row " : "light row "}>
          <div className="col-lg-9 col-md-12">
            <CenterPanelView topView={topViewData} />
          </div>

          <div className="col-lg-3 col-md-12 ml-0">
            {addshow1 ? (
              <ImportHeader setAddshow1={setAddshow1} provider={provider} />
            ) : (
              <Tabs className=" ">
                <div className={mode === "dark" ? "App dark" : "App"}>
                  <div className="content">
                    {renderHeader}
                    {isModalOpenOne || isModalOpenTwo ? (
                      renderMod
                    ) : (
                      <>
                        <div
                          className={
                            mode === "dark" ? "swapper dark" : "swapper"
                          }
                        >
                          <div
                            className={mode === "dark" ? "title dark" : "title"}
                          ></div>

                          <div className="block"></div>
                        </div>
                        {/* {renderRoute} */}
                      </>
                    )}
                  </div>

                  <div className="main-boby">
                    <div className="tab-content " id="pills-tabContent">
                      <div
                        className="swap-container tab-pane fade show active"
                        id="pills-swap"
                        role="tabpanel"
                        aria-labelledby="pills-swap-tab"
                      >
                        <div
                          className={
                            mode == "dark"
                              ? "dark swap-contents"
                              : "light swap-contents"
                          }
                        >
                          <div
                            className={
                              mode == "dark"
                                ? "dark card swap-contents-card"
                                : "light card swap-contents-card"
                            }
                          >
                            <TabList>
                              <div
                                style={{
                                  display: "flex",
                                }}
                              >
                                <Tab>
                                  <div className="swap-head card-header">
                                    Swap
                                  </div>
                                </Tab>
                                <Tab>
                                  <div className="swap-head card-header">
                                    Liquidity
                                  </div>
                                </Tab>
                              </div>
                            </TabList>
                            <TabPanel>
                              {/* <h2>Any content 1</h2> */}

                              <div className="appBody">
                                <div>
                                  <div className="">
                                    <div
                                      style={{
                                        backgroundColor:
                                          mode === "dark"
                                            ? "#191b1f"
                                            : "#cad3de",
                                      }}
                                      className="card-input input-group"
                                    >
                                      {renderForm}
                                      <div
                                        className={`oneInch ${
                                          mode === "dark" ? "dark" : "light"
                                        }    ${
                                          currentRouterOfBsc !== "pancake"
                                            ? "selectedBorder"
                                            : "nonselectedBorder"
                                        }`}
                                        onClick={() =>
                                          dispatch(
                                            addCurrentRouterOfBsc("shibnobi")
                                          )
                                        }
                                      >
                                        <div
                                          onClick={() =>
                                            dispatch(
                                              addCurrentRouterOfBsc("shibnobi")
                                            )
                                          }
                                        >
                                          <p
                                            className="allfontsizeSet"
                                            style={{ fontSize: "small" }}
                                          >
                                            {"SHIBNOBI ROUTER"}
                                          </p>
                                          <small>{DirectPairValue}</small>
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          flexDirection: "row",
                                          width: "inherit",
                                          flexWrap: "nowrap",
                                          alignContent: "center",
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "flex-start",
                                          padding: 10,
                                        }}
                                      >
                                        <div>Slippage Tolerance</div>
                                        <div>
                                          <div
                                            style={{ color: "#FF00FF " }}
                                            className="gearContainer"
                                            onClick={() => setShowModal(true)}
                                          >
                                            <GearFill
                                              style={{ fontSize: "22px" }}
                                              onClick={() => {
                                                setShow(true);
                                              }}
                                            />
                                          </div>
                                          <div
                                            style={{
                                              color: "#FF00FF ",
                                              marginRight: "10px",
                                            }}
                                            className="gearContainer"
                                            onClick={() => setShowModal(true)}
                                          >
                                            <span>{slippageAmount}%</span>
                                          </div>
                                        </div>
                                      </div>
                                      {/* {fromCoin === "BNB" ||
                                      toCoin === "BNB" ? (
                                        <div className="enterWallet">
                                          <input
                                            type="text"
                                            placeholder="Enter Wallet Address"
                                          />
                                        </div>
                                      ) : null} */}
                                      <Button
                                        type="primary"
                                        block
                                        onClick={async () => {
                                          swap(
                                            fromAddress,
                                            toAddress,
                                            amountIn,
                                            currentRouterOfBsc == "shibnobi"
                                              ? bscTestnet.shibnobiRouter
                                              : bscTestnet.pancakeRouterAddress
                                          );
                                        }}
                                      >
                                        {title}
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                                <div className="lgg">
                                  <div className="gastracker">
                                    <FastTag
                                      mode={mode}
                                      gasdata={gasdata === "" ? "0" : gasdata}
                                    />
                                    <AverageTag
                                      mode={mode}
                                      gasdata={
                                        averagegas === "" ? "0" : averagegas
                                      }
                                    />
                                    <SlowTag
                                      mode={mode}
                                      gasdata={slowgas === "" ? "0" : slowgas}
                                    />
                                  </div>

                                  <div className="p10">
                                    <p className="allfontsizeSet">
                                      {tokenData.name}
                                    </p>
                                    <div className="token">
                                      {/* <p>{fromAddress &&
                                          fromAddress.toString().slice(0, 25) +
                                          "......"}</p> */}
                                      <p className="allfontsizeSet">
                                        {fromAddress &&
                                          fromAddress.substring(0, 20) + "...."}
                                      </p>
                                      <p className="allfontsizeSet">
                                        <CopyToClipboard
                                          text={tokenData.token0}
                                          onCopy={() => {}}
                                        >
                                          <ContentCopyIcon />
                                        </CopyToClipboard>
                                      </p>
                                    </div>
                                    <br></br>
                                    <Amount mode={mode} />
                                    <hr />
                                    <Balance value={frombal} mode={mode} />
                                    <hr />
                                    <div
                                      style={{
                                        marginTop: 50,
                                        marginBottom: 50,
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          marginBottom: 10,
                                        }}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="120"
                                          viewBox="0 0 97.455 22.738"
                                        >
                                          <g
                                            id="bscscan-logo"
                                            transform="translate(-219.377 -213.516)"
                                          >
                                            <g
                                              id="bscscan-logo-circle"
                                              transform="translate(219.377 213.516)"
                                            >
                                              <path
                                                id="Path_1"
                                                data-name="Path 1"
                                                d="M224.111,224.323a.965.965,0,0,1,.97-.965l1.608.005a.967.967,0,0,1,.967.967v6.081c.181-.054.413-.111.668-.171a.806.806,0,0,0,.621-.784v-7.542a.967.967,0,0,1,.967-.967h1.613a.967.967,0,0,1,.967.967v7s.4-.163.8-.329a.807.807,0,0,0,.493-.743V219.5a.967.967,0,0,1,.967-.967h1.611a.967.967,0,0,1,.966.967v6.872a18.9,18.9,0,0,0,3.936-3.694,1.623,1.623,0,0,0,.247-1.515,11.38,11.38,0,1,0-20.618,9.4,1.439,1.439,0,0,0,1.373.711c.3-.027.684-.065,1.135-.118a.805.805,0,0,0,.714-.8v-6.035"
                                                transform="translate(-219.377 -213.516)"
                                                fill="#fff"
                                              ></path>
                                              <path
                                                id="Path_2"
                                                data-name="Path 2"
                                                d="M244.417,279.835a11.384,11.384,0,0,0,18.081-9.208c0-.263-.012-.521-.03-.779-4.16,6.2-11.84,9.1-18.052,9.987"
                                                transform="translate(-239.717 -259.275)"
                                                fill="#fff"
                                              ></path>
                                            </g>
                                            <g
                                              id="words"
                                              transform="translate(245.766 216.13)"
                                            >
                                              <path
                                                id="Path_124"
                                                data-name="Path 124"
                                                d="M3.074-19.653H1.48l-.282.8H.36l1.464-3.93H2.73l1.458,3.93H3.35Zm-.214-.6-.586-1.678-.586,1.678Zm5.411-1.757a1.34,1.34,0,0,1,.709.191,1.293,1.293,0,0,1,.493.555,1.923,1.923,0,0,1,.177.853,1.923,1.923,0,0,1-.177.853,1.293,1.293,0,0,1-.493.555,1.34,1.34,0,0,1-.709.191A1.172,1.172,0,0,1,7.6-19a1.032,1.032,0,0,1-.4-.5v2.14H6.407v-4.606H7.2v.648a1.017,1.017,0,0,1,.4-.5,1.185,1.185,0,0,1,.673-.186Zm-.248.693a.785.785,0,0,0-.594.244.919.919,0,0,0-.234.663.911.911,0,0,0,.234.657.785.785,0,0,0,.594.244.781.781,0,0,0,.6-.239.927.927,0,0,0,.225-.662.937.937,0,0,0-.225-.664.776.776,0,0,0-.6-.242Zm3.266-.056a1.3,1.3,0,0,1,.462-.47,1.227,1.227,0,0,1,.642-.172v.85h-.231q-.873,0-.873.811v1.5h-.794v-3.119h.794Zm3.266-.636a1.73,1.73,0,0,1,.819.191,1.4,1.4,0,0,1,.571.555,1.685,1.685,0,0,1,.208.853,1.669,1.669,0,0,1-.208.85,1.425,1.425,0,0,1-.571.555,1.709,1.709,0,0,1-.819.194,1.709,1.709,0,0,1-.819-.194,1.425,1.425,0,0,1-.571-.555,1.669,1.669,0,0,1-.208-.85,1.685,1.685,0,0,1,.208-.853,1.4,1.4,0,0,1,.571-.555,1.73,1.73,0,0,1,.819-.191Zm0,.687a.761.761,0,0,0-.563.234.926.926,0,0,0-.231.678.926.926,0,0,0,.231.678.761.761,0,0,0,.563.234.761.761,0,0,0,.563-.234.926.926,0,0,0,.231-.678.926.926,0,0,0-.231-.678.761.761,0,0,0-.563-.234Zm3.665-.687a1.185,1.185,0,0,1,.673.186,1.049,1.049,0,0,1,.4.5V-23.02h.788v4.167H19.3v-.653a1.065,1.065,0,0,1-.4.5,1.172,1.172,0,0,1-.672.19,1.34,1.34,0,0,1-.709-.191,1.293,1.293,0,0,1-.493-.555,1.923,1.923,0,0,1-.177-.853,1.923,1.923,0,0,1,.177-.853,1.293,1.293,0,0,1,.493-.555A1.34,1.34,0,0,1,18.22-22.012Zm.248.693a.776.776,0,0,0-.6.242.937.937,0,0,0-.225.664.927.927,0,0,0,.225.662.781.781,0,0,0,.6.239.785.785,0,0,0,.593-.245.911.911,0,0,0,.234-.657.919.919,0,0,0-.234-.661.785.785,0,0,0-.593-.245Zm5.6-.653v3.119h-.794v-.631a1,1,0,0,1-.408.493,1.213,1.213,0,0,1-.657.177,1.1,1.1,0,0,1-.861-.355,1.424,1.424,0,0,1-.321-.991v-1.813h.788v1.723a.815.815,0,0,0,.191.577.674.674,0,0,0,.518.206.707.707,0,0,0,.546-.22.9.9,0,0,0,.2-.631v-1.655Zm2.4-.039a1.544,1.544,0,0,1,1.005.327,1.426,1.426,0,0,1,.5.89h-.839a.648.648,0,0,0-.231-.391.709.709,0,0,0-.456-.144.68.68,0,0,0-.526.234.989.989,0,0,0-.211.684.989.989,0,0,0,.21.684.68.68,0,0,0,.527.234.709.709,0,0,0,.456-.144.648.648,0,0,0,.231-.391h.839a1.426,1.426,0,0,1-.5.89,1.544,1.544,0,0,1-1.005.327,1.66,1.66,0,0,1-.811-.194,1.365,1.365,0,0,1-.552-.555,1.745,1.745,0,0,1-.2-.85,1.762,1.762,0,0,1,.2-.853,1.343,1.343,0,0,1,.552-.555,1.68,1.68,0,0,1,.811-.191Zm4.02,2.477v.681h-.417a1.153,1.153,0,0,1-.8-.253A1.1,1.1,0,0,1,29-19.951V-21.3h-.434v-.67H29v-.771h.794v.771h.7v.67h-.7v1.363a.44.44,0,0,0,.09.315.421.421,0,0,0,.3.09Zm3.8-2.477a1.73,1.73,0,0,1,.819.191,1.4,1.4,0,0,1,.571.555,1.685,1.685,0,0,1,.208.853,1.669,1.669,0,0,1-.208.85,1.425,1.425,0,0,1-.571.555,1.709,1.709,0,0,1-.819.194,1.709,1.709,0,0,1-.82-.194,1.425,1.425,0,0,1-.571-.555,1.669,1.669,0,0,1-.208-.85,1.685,1.685,0,0,1,.208-.853,1.4,1.4,0,0,1,.571-.555A1.73,1.73,0,0,1,34.295-22.012Zm0,.687a.761.761,0,0,0-.563.234.926.926,0,0,0-.231.678.926.926,0,0,0,.231.678.761.761,0,0,0,.563.234.761.761,0,0,0,.563-.234.926.926,0,0,0,.231-.678.926.926,0,0,0-.231-.678A.761.761,0,0,0,34.295-21.325Zm3.986-1.188a.678.678,0,0,0-.49.1.556.556,0,0,0-.141.434v.006h.631v.67h-.631v2.449h-.794V-21.3h-.4v-.67h.4v-.073a1.126,1.126,0,0,1,.318-.859,1.324,1.324,0,0,1,.943-.3q.107,0,.163.006Zm3.2.445v.833h1.346v.726H41.479v.884h1.515v.771H40.517v-3.981h2.477v.766ZM45.6-19.681v.828h-.434a1.248,1.248,0,0,1-.859-.273,1.157,1.157,0,0,1-.307-.9v-1.154H43.58V-22H44v-.771h.963V-22H45.6v.811h-.631v1.171a.353.353,0,0,0,.075.259.363.363,0,0,0,.256.073Zm2.815-2.348a1.087,1.087,0,0,1,.859.36,1.445,1.445,0,0,1,.319.991v1.824h-.963v-1.712a.693.693,0,0,0-.166-.493.577.577,0,0,0-.442-.177.6.6,0,0,0-.465.186.751.751,0,0,0-.172.529v1.667h-.963V-23.02h.963v1.6a1.036,1.036,0,0,1,.4-.445A1.181,1.181,0,0,1,48.416-22.029Zm5.079,1.52a1.328,1.328,0,0,1-.028.259H51.288a.728.728,0,0,0,.18.51.582.582,0,0,0,.417.155.569.569,0,0,0,.355-.107.5.5,0,0,0,.186-.276h1.019a1.332,1.332,0,0,1-.27.594,1.44,1.44,0,0,1-.529.411,1.676,1.676,0,0,1-.715.15,1.689,1.689,0,0,1-.819-.194,1.389,1.389,0,0,1-.56-.561,1.738,1.738,0,0,1-.2-.856,1.754,1.754,0,0,1,.2-.859,1.37,1.37,0,0,1,.56-.557,1.7,1.7,0,0,1,.822-.194,1.7,1.7,0,0,1,.822.191,1.352,1.352,0,0,1,.549.538A1.6,1.6,0,0,1,53.495-20.509Zm-.974-.146a.579.579,0,0,0-.166-.465.612.612,0,0,0-.425-.155.631.631,0,0,0-.439.158.66.66,0,0,0-.2.462Zm2.72-.749a1.366,1.366,0,0,1,.465-.456,1.186,1.186,0,0,1,.617-.169V-21h-.276a.952.952,0,0,0-.594.163.657.657,0,0,0-.211.552v1.43h-.963V-22h.963Zm2.911-.631a1.442,1.442,0,0,1,.954.3,1.3,1.3,0,0,1,.448.788h-.9a.5.5,0,0,0-.178-.3.539.539,0,0,0-.346-.11.379.379,0,0,0-.248.07.246.246,0,0,0-.084.2.234.234,0,0,0,.155.22,2.469,2.469,0,0,0,.488.146,4.837,4.837,0,0,1,.591.172.976.976,0,0,1,.4.284.786.786,0,0,1,.169.529.812.812,0,0,1-.146.479.964.964,0,0,1-.422.327,1.65,1.65,0,0,1-.653.118,1.682,1.682,0,0,1-1.019-.282,1.188,1.188,0,0,1-.467-.805h.929a.418.418,0,0,0,.172.31.647.647,0,0,0,.386.107.359.359,0,0,0,.248-.076.256.256,0,0,0,.084-.2.24.24,0,0,0-.155-.234,2.848,2.848,0,0,0-.5-.15,4.029,4.029,0,0,1-.574-.158.948.948,0,0,1-.389-.273.761.761,0,0,1-.163-.515.841.841,0,0,1,.321-.684A1.4,1.4,0,0,1,58.151-22.035Zm3.682,0a1.56,1.56,0,0,1,1.019.335,1.486,1.486,0,0,1,.518.921H62.352a.538.538,0,0,0-.186-.315.55.55,0,0,0-.355-.113.515.515,0,0,0-.417.2.9.9,0,0,0-.163.582.9.9,0,0,0,.163.583.515.515,0,0,0,.417.2.55.55,0,0,0,.355-.113.538.538,0,0,0,.186-.315h1.019a1.486,1.486,0,0,1-.518.92,1.56,1.56,0,0,1-1.019.336,1.689,1.689,0,0,1-.819-.194,1.389,1.389,0,0,1-.56-.56,1.738,1.738,0,0,1-.2-.856,1.754,1.754,0,0,1,.2-.859,1.37,1.37,0,0,1,.56-.557A1.7,1.7,0,0,1,61.834-22.035Zm3.513,0a1.137,1.137,0,0,1,.619.163.982.982,0,0,1,.383.445V-22h.957v3.142h-.957v-.569a.982.982,0,0,1-.383.445,1.137,1.137,0,0,1-.619.163,1.272,1.272,0,0,1-.7-.194,1.329,1.329,0,0,1-.484-.56,1.942,1.942,0,0,1-.177-.856,1.937,1.937,0,0,1,.177-.859,1.333,1.333,0,0,1,.484-.557A1.273,1.273,0,0,1,65.347-22.035Zm.31.845a.649.649,0,0,0-.5.2.8.8,0,0,0-.189.563.8.8,0,0,0,.189.563.649.649,0,0,0,.5.2.651.651,0,0,0,.5-.208.785.785,0,0,0,.194-.557.782.782,0,0,0-.194-.56.655.655,0,0,0-.5-.206Zm4.589-.839a1.087,1.087,0,0,1,.859.36,1.445,1.445,0,0,1,.319.991v1.824h-.963v-1.712a.693.693,0,0,0-.166-.493.577.577,0,0,0-.442-.177.6.6,0,0,0-.465.186.751.751,0,0,0-.172.529v1.667h-.964V-22h.963v.574a1.036,1.036,0,0,1,.4-.445A1.181,1.181,0,0,1,70.246-22.029Z"
                                                transform="translate(-0.36 36.036)"
                                                fill="#fff"
                                                opacity="0.8"
                                              ></path>
                                              <path
                                                id="Path_123"
                                                data-name="Path 123"
                                                d="M9.932-46.8a2.315,2.315,0,0,1,1.385.818,2.321,2.321,0,0,1,.52,1.507,2.381,2.381,0,0,1-.8,1.9,3.463,3.463,0,0,1-2.331.7H4.608v-9.54H8.621a3.432,3.432,0,0,1,2.223.635A2.171,2.171,0,0,1,11.621-49a2.224,2.224,0,0,1-.466,1.459,2.168,2.168,0,0,1-1.223.744Zm-3.419-.622H8.229a1.633,1.633,0,0,0,1.089-.318,1.134,1.134,0,0,0,.372-.912,1.165,1.165,0,0,0-.365-.92A1.651,1.651,0,0,0,8.2-49.891H6.513Zm1.811,3.986a1.8,1.8,0,0,0,1.162-.331,1.175,1.175,0,0,0,.405-.966,1.206,1.206,0,0,0-.413-.98,1.774,1.774,0,0,0-1.169-.345h-1.8v2.622Zm7.432-6.027a3.3,3.3,0,0,1,2.189.689,2.984,2.984,0,0,1,1.027,1.838H17.19A1.483,1.483,0,0,0,16.7-47.8a1.463,1.463,0,0,0-.986-.324,1.134,1.134,0,0,0-.757.23.774.774,0,0,0-.27.622.632.632,0,0,0,.216.5,1.558,1.558,0,0,0,.541.3q.324.108.932.257a9.589,9.589,0,0,1,1.385.4,2.292,2.292,0,0,1,.92.662,1.825,1.825,0,0,1,.385,1.223,1.889,1.889,0,0,1-.751,1.554,3.166,3.166,0,0,1-2.02.594,3.82,3.82,0,0,1-2.338-.655,2.755,2.755,0,0,1-1.068-1.872h1.824a1.233,1.233,0,0,0,.486.872,1.764,1.764,0,0,0,1.095.318,1.059,1.059,0,0,0,.743-.236.8.8,0,0,0,.257-.615.679.679,0,0,0-.223-.527,1.505,1.505,0,0,0-.554-.311q-.331-.108-.938-.257a10.587,10.587,0,0,1-1.358-.385,2.168,2.168,0,0,1-.892-.628,1.765,1.765,0,0,1-.372-1.189,1.947,1.947,0,0,1,.743-1.581A3.151,3.151,0,0,1,15.756-49.457Zm8.094,0a3.7,3.7,0,0,1,2.412.784,3.424,3.424,0,0,1,1.209,2.135H25.458a1.555,1.555,0,0,0-.554-.938,1.7,1.7,0,0,0-1.095-.345,1.633,1.633,0,0,0-1.263.561,2.373,2.373,0,0,0-.507,1.642,2.373,2.373,0,0,0,.507,1.642,1.633,1.633,0,0,0,1.263.561,1.7,1.7,0,0,0,1.095-.345,1.555,1.555,0,0,0,.554-.938h2.013a3.424,3.424,0,0,1-1.209,2.135,3.7,3.7,0,0,1-2.411.782,3.985,3.985,0,0,1-1.946-.465,3.277,3.277,0,0,1-1.324-1.331,4.189,4.189,0,0,1-.473-2.04,4.229,4.229,0,0,1,.473-2.047A3.223,3.223,0,0,1,21.9-49,4.032,4.032,0,0,1,23.851-49.457Zm11.527,4.974a2.587,2.587,0,0,1-.365,1.345,2.621,2.621,0,0,1-1.081.986,3.748,3.748,0,0,1-1.743.37,4.523,4.523,0,0,1-1.811-.345,3.062,3.062,0,0,1-1.276-.993,2.865,2.865,0,0,1-.547-1.513h2.027a1.549,1.549,0,0,0,.466.966,1.462,1.462,0,0,0,1.061.385,1.235,1.235,0,0,0,.912-.318,1.107,1.107,0,0,0,.318-.818,1.071,1.071,0,0,0-.257-.736,1.874,1.874,0,0,0-.649-.466q-.392-.176-1.081-.405a10.686,10.686,0,0,1-1.459-.588,2.7,2.7,0,0,1-.966-.845,2.42,2.42,0,0,1-.4-1.445,2.351,2.351,0,0,1,.885-1.939,3.638,3.638,0,0,1,2.345-.709,3.713,3.713,0,0,1,2.412.73,2.754,2.754,0,0,1,1.019,1.945H33.134a1.431,1.431,0,0,0-.432-.845,1.343,1.343,0,0,0-.959-.331,1.265,1.265,0,0,0-.851.277,1,1,0,0,0-.325.8,1,1,0,0,0,.25.7,1.908,1.908,0,0,0,.635.453,10.424,10.424,0,0,0,1.047.392,13.924,13.924,0,0,1,1.493.608,2.631,2.631,0,0,1,.98.851,2.5,2.5,0,0,1,.405,1.486Zm4.77-4.974a3.7,3.7,0,0,1,2.412.784,3.424,3.424,0,0,1,1.209,2.135H41.756a1.555,1.555,0,0,0-.554-.938,1.7,1.7,0,0,0-1.095-.345,1.633,1.633,0,0,0-1.263.561,2.373,2.373,0,0,0-.507,1.642,2.373,2.373,0,0,0,.507,1.642,1.633,1.633,0,0,0,1.263.561,1.7,1.7,0,0,0,1.095-.345,1.555,1.555,0,0,0,.554-.938h2.013a3.424,3.424,0,0,1-1.209,2.134,3.7,3.7,0,0,1-2.412.783,3.985,3.985,0,0,1-1.946-.465,3.277,3.277,0,0,1-1.324-1.331,4.189,4.189,0,0,1-.473-2.04,4.229,4.229,0,0,1,.473-2.047A3.223,3.223,0,0,1,38.2-49a4.032,4.032,0,0,1,1.946-.459Zm7.905,0a2.877,2.877,0,0,1,1.622.446,2.429,2.429,0,0,1,.959,1.2v-1.554h1.892v7.486H50.634v-1.568a2.465,2.465,0,0,1-.959,1.209,2.845,2.845,0,0,1-1.622.452,3.216,3.216,0,0,1-1.7-.459,3.1,3.1,0,0,1-1.182-1.331,4.616,4.616,0,0,1-.426-2.047,4.616,4.616,0,0,1,.426-2.047A3.1,3.1,0,0,1,46.35-49,3.216,3.216,0,0,1,48.053-49.457Zm.595,1.662a1.864,1.864,0,0,0-1.432.582,2.252,2.252,0,0,0-.541,1.6,2.225,2.225,0,0,0,.541,1.588,1.875,1.875,0,0,0,1.432.574,1.885,1.885,0,0,0,1.426-.588,2.186,2.186,0,0,0,.561-1.574,2.2,2.2,0,0,0-.561-1.588A1.885,1.885,0,0,0,48.647-47.8Zm10.067-1.676a2.651,2.651,0,0,1,2.068.851,3.441,3.441,0,0,1,.77,2.392v4.351H59.66v-4.135A1.955,1.955,0,0,0,59.2-47.4a1.633,1.633,0,0,0-1.257-.493,1.681,1.681,0,0,0-1.3.527,2.153,2.153,0,0,0-.486,1.513v3.973h-1.9v-7.486h1.905v1.5a2.385,2.385,0,0,1,.98-1.182,2.912,2.912,0,0,1,1.575-.425Z"
                                                transform="translate(-4.115 51.552)"
                                                fill="#fff"
                                              ></path>
                                            </g>
                                          </g>
                                        </svg>
                                      </div>

                                      <div>
                                        <TotalSupply
                                          value={totalSupplyvalue}
                                          mode={mode}
                                        />
                                        <hr></hr>
                                        <MarketCap value={""} mode={mode} />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TabPanel>

                            <TabPanel>
                              {addshow === true && (
                                <Addliquidity
                                  setAddshow={setAddshow}
                                  fromdecimmal={fromdecimmal}
                                  todecimal={todecimal}
                                  slippageModel={handleShow}
                                  usingFor={usingFor}
                                  FromToken={liqFromToken}
                                  ToToken={liqToToken}
                                  provider={provider}
                                  fromCoin={fromCoin}
                                  toCoin={toCoin}
                                />
                              )}

                              {addshowCreate === true && (
                                <CreateliquidityBsc
                                  setAddshowCreate={setAddshowCreate}
                                  fromdecimmal={fromdecimmal}
                                  todecimal={todecimal}
                                  slippageModel={handleShow}
                                  usingFor={usingFor}
                                  FromToken={liqFromToken}
                                  ToToken={liqToToken}
                                  provider={provider}
                                  fromCoin={fromCoin}
                                  toCoin={toCoin}
                                />
                              )}

                              {addshow === false && addshowCreate === false && (
                                <div className="yourLiq-pd">
                                  <Title level={4}>Your Liquidity</Title>
                                  <Divider />
                                  <Space wrap>
                                    <Button
                                      onClick={btn2}
                                      className="btn createApair"
                                    >
                                      Create a pair
                                    </Button>

                                    <Button
                                      onClick={btn}
                                      className="btn createApair fill"
                                    >
                                      + Add liquidity
                                    </Button>
                                  </Space>
                                  <Divider />
                                  <div className="noteText">
                                    {"Dont't see pool you joined?  "}
                                  </div>
                                  <span
                                    onClick={btn1}
                                    className="noteText"
                                    style={{
                                      cursor: "pointer",
                                      fontWeight: 600,
                                    }}
                                  >
                                    &nbsp;Import it.
                                  </span>
                                </div>
                              )}
                            </TabPanel>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs>
            )}
          </div>
        </div>
      </BrowserView>

      <TransactionSetting
        show={show}
        onHide={handleClose}
        mode={mode}
        onChangeEvent={onChangeEvent}
        deadlineMinute={deadlineMinute}
        deadlineMinutes={deadlineMinutes}
        slippage={slippageAmount}
      />
    </div>
  );
}
