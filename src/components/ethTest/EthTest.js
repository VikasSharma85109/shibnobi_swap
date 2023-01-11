import { Fragment, useState, useEffect, useMemo } from "react";
import React from "react";
import { GearFill } from "react-bootstrap-icons";
import "./style.css";
import { eth, constants, ethTestnet } from "../../config";
import { useDispatch } from "react-redux";
import { BrowserView } from "react-device-detect";
import { Avatar, Space } from "antd";
import Figure from "react-bootstrap/Figure";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ModelRows } from "../Rows/Rows";
import { tokenBalance, ethBalance } from "../Balance";
import { useAccount, useConnect, useSigner } from "wagmi";
import axios from "axios";

import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { Tabs as TabsList, notification } from "antd";
import ImportHeader from "./ImportHeader";
import { approveRouter, checkAllowanceForRouter } from "./allowance";
import { getCoinDataInRedux } from "../ethTest/uniswap-default.tokenlist1";

import {
  addTokenAddress,
  addCurrentRouterOfEth,
} from "../../reducers/wallectReducers";

import activeTick from "./assets/logo/Artboard.png";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { ChainId, Token, WETH, Fetcher, Route } from "@uniswap/sdk";

import Add from "../../assests/add.svg";
import Remove from "../../assests/remove.svg";

// icons
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

//importing media assets
import down from "./assets/icons/down.svg";
// import { getCoinDataInRedux } from "./coinList1";
// import {getCoinDataInRedux} from "./coinListTestnet"

import { useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  swapExactETHForTokens,
  swapExactETHForTokensRef,
  swapExactTokensForETH,
  swapExactTokensForTokens,
  swapExactTokensForTokensRef,
  swapExactTokensForETHRef,
  getPair,
  getAmountsOut,
} from "./swap";
import SlowTag from "../Tags/SlowTag";
import AverageTag from "../Tags/Averagetag";
import FastTag from "../Tags/FastTag";
import {
  Amount,
  Balance,
  Holder,
  MarketCap,
  TotalSupply,
  Transaction,
} from "../Rows/Rows";
import fromExponential from "from-exponential";

import {
  addETHDealine,
  addETHPercentage,
} from "../../reducers/transactionSettings";
import { checkAllowanceForRouterShib } from "./allowance";
import ModelAddToken from "./ModelAddToken";
import { CropLandscapeOutlined } from "@mui/icons-material";
import CreateliquidityEth from "./CreateliquidityEth";
import { Divider, Typography } from "antd";
const CenterPanelView = React.lazy(() => import("./CenterPanelView"));
const Addliquidity = React.lazy(() => import("./Addliquidity"));
const _loadlash = require("lodash");

var Provider = require("@ethersproject/providers");

const { Text, Title } = Typography;
export default function EthTest({ provider, chain, topViewData }) {
  // const getCoinDataInRedux = useSelector((state) => state.counter.ethDetails.bscToken);

  const getEthNavbarToken = useSelector((state) => state.counter.ethSearchData);
  const ERC20 = constants.erc20Abi;
  const getCoinDataInRedux = useSelector(
    (state) => state.counter.ethDetails.ethToken
  );
  const routerFromRedux = useSelector((state) => state.counter);
  const ethDeadline = useSelector((state) => state.transactionSetting);
  const currentRouterOfEth = routerFromRedux.currentRouterOfEth;
  const [swapStatus, setSwapStatus] = useState("");
  const token0Address = getCoinDataInRedux[0].address;
  const token0name = getCoinDataInRedux[0].name;
  const token0symbol = getCoinDataInRedux[0].symbol;
  const token0image = getCoinDataInRedux[0].logoURI;

  const [totalSupplyvalue, settotalSupplyvalue] = useState("");

  const [getAddressData, setGetAddressData] = useState();

  const [apitopViewData, setTopViewData] = useState();

  /**
   Author:-vikas
   Description:-this method used render setFromCoin while token0symbol update
   **/

  useEffect(() => {
    //setFromCoin(token0symbol);
    //setFromCoin(filtered[0].symbol);
    setFromCoin(getEthNavbarToken.symbol);

    setFromImage(token0image);
  }, [getEthNavbarToken, token0image]);

  /**
  Author:-vikas
  Description:-this method used get Pairs Address
  **/

  const getTokenAddress = async (searchtext) => {
    if (searchtext == "") {
      return false;
    }

    fetch(
      `https://deep-index.moralis.io/api/v2/erc20/metadata?chain=eth&addresses=${searchtext}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          "X-API-Key":
            "Eb3phmAPxN6vzGcH4vX7TS8dqoR57yESrfazKp8u7lZAVGA3vSF5md0u8HxTj53o",
        },
      }
    ).then((response) => {
      if (response.data.length > 0) {
        isModalOpenOne ? setModalStateOne(false) : setModalStateTwo(false);
        setGetAddressData(response.data);
        setTokenModal(true);
      }
    });
  };

  // const testing = async () => {
  //   const dataResult = await fetch(`https://deep-index.moralis.io/api/v2/erc20/metadata?chain=eth&addresses=0x4eb0eadb533332d3a281cc611964fddf4e088f2a`, {
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //       accept: 'application/json',
  //       'X-API-Key': 'Eb3phmAPxN6vzGcH4vX7TS8dqoR57yESrfazKp8u7lZAVGA3vSF5md0u8HxTj53o'
  //     },
  //   })

  //   const response = await dataResult.json()

  //   console.log(89878789, response)
  // }

  // testing()

  const [tokenModel, setTokenModal] = useState(false);

  const getPaitrs = async () => {
    const options = {
      method: "POST",
      url: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
      // headers: {
      //   'content-type': 'application/json',
      //   'x-rapidapi-host': 'geodb-cities-graphql.p.rapidapi.com',
      //   'x-rapidapi-key': process.env.REACT_PUBLIC_RAPIDAPI_KEY
      // },
      data: {
        query: `{
  pairs(
    first: 10
    where: {id: "0x57ebc28df00ed93552af8fd81439700a95647b8d"}
    orderBy: reserveUSD
    orderDirection: desc
  ) {
    id
    token0 {
       id
      symbol
      totalSupply
      tradeVolume
      tradeVolumeUSD
      untrackedVolumeUSD
      totalLiquidity
      derivedETH
      mostLiquidPairs {
        id
      }
    }
    token1 {
      id
      symbol
      totalSupply
      tradeVolume
      tradeVolumeUSD
      untrackedVolumeUSD
      totalLiquidity
      derivedETH
      mostLiquidPairs {
        id
      }
    }
    reserveUSD
    reserveETH
    txCount
    totalSupply
    volumeUSD
    reserve0
    reserve1
    trackedReserveETH
    volumeToken0
    volumeToken1
    untrackedVolumeUSD
    token0Price
    token1Price
  }
}`,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        const res = response.data;
        setpairslist(res.data.pairs);

        // Response received from the API
      })
      .catch(function (error) {
        console.error(error);
      });
  };

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

  /**
  Author:-vikas
  Description:-this method used get Top View Data total liquidity price and volume
  **/

  const [title, setTile] = useState("Connect Wallet");
  const { connector: activeConnector, isConnected } = useAccount();
  const [myData, setMyData] = useState({ connect: "", theme: false });
  const [darkTheme, setDarkTheme] = useState(false);
  const [liqFromToken, setliqFromToken] = useState({});
  const [liqToToken, setliqToToken] = useState({});
  const [results, setResults] = useState([]);

  const filtered = getCoinDataInRedux.filter((EtheriumCoins) => {
    return EtheriumCoins.symbol === "SHINJA";
  });

  const [fromCoin, setFromCoin] = useState(getCoinDataInRedux[0].symbol);

  const [toCoin, setToCoin] = useState(getCoinDataInRedux[1].symbol);

  const [currentRouter, setCurrentRouter] = useState("uniswap");

  const [fromAddress, setFromAddress] = useState(getCoinDataInRedux[0].address);
  const [toAddress, setToAddress] = useState(getCoinDataInRedux[1].address);
  // usingFor deafult 0 for add liquiidty 1 for paird add 2 for remove paired
  const [usingFor, setusingFor] = useState("0");
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
  const [pairslist, setpairslist] = useState([]);
  const [amountOut, setAmountOut] = useState("");
  const [isModalOpenOne, setModalStateOne] = useState(false);
  const [isModalOpenTwo, setModalStateTwo] = useState(false);
  const [price, setPrice] = useState(0);
  const [methodType, setMethodType] = useState("Direct");
  const [sidebarActive, setSidebarActive] = useState(false);
  const [show, setShow] = useState(false);
  const [fromBal, setfrombal] = useState(0);
  const [searchtext, setSearchText] = useState("");
  const [tobal, settobal] = useState(0);
  const handleClose = () => setShow(false);
  const reduxValue = useSelector((state) => state);

  const [checkUserInput, setCheckUserInput] = useState("");

  const [checkDisable, setCheckDisable] = useState(false);

  const [useInput, setUseinput] = useState("from");

  const [apiHolderCount, setApiHolderCount] = useState();
  const [apiTotalSuply, setApiTotalSuply] = useState();
  const [apiMarketCap, setApiMarketCap] = useState();

  const [serachEthNavbar, setSerachEthNavbar] = useState();

  /**
 Author:- vikas
 Description:-this method used show and hide model 
 **/

  const handleShow = () => {
    setusingFor("0");
    setShow(true);
  };

  /**
Author:- vikas
Description:-this method used show and hide model 
**/

  const addpairedView = () => {
    setusingFor("1");
    setAddshow(true);
  };

  /**
Author:- vikas
Description:-this method used show and hide model 
**/

  const removePairedView = () => {
    setusingFor("2");
    setAddshow(true);
  };
  const [slippageAmount, setSlippageAmount] = useState(0.5);
  const [deadlineMinutes, setDeadlineMinutes] = useState(10);
  const [showModal, setShowModal] = useState(undefined);
  const [totalreferal, settotalreferal] = useState(0);
  const [totalearn, settotalearn] = useState(0);
  const chainIdInRedux = useSelector((state) => state.counter.wallectname);
  const accountbalnced = useSelector((state) => state.counter.walletbalanced);
  const [DirectPairValue, setDirectPairValue] = useState("");

  const navbarTokenAddress = useSelector(
    (state) => state.counter.EthNavbarSearch
  );
  const navbarTokenAddress1 = useSelector((state) => state.counter);

  const [transCount, setTransCount] = useState();
  const [volume, setVolume] = useState();

  const [fromCoinId, setFromCoinId] = useState(getCoinDataInRedux[0].id);
  const [toCoinId, setToCoinId] = useState(getCoinDataInRedux[1].id);
  const [fromCoinUSD, setFromCoinUSD] = useState(0);
  const [toCoinUSD, setToCoinUSD] = useState(0);

  {
    /** Author :-vikas
     Description description This useEffect use  button check amount
**/
  }

  useEffect(() => {
    if (isConnected) {
      setTile("Enter Amount");
    } else {
      setTile("Connect Wallet");
    }
  }, []);

  const [gasdata, setGasdata] = useState("0");
  const [averagegas, setAveragegas] = useState("0");
  const [slowgas, setSlowgas] = useState("0");
  const [apiresult1, setApiresult1] = useState();

  const ethMainnet =
    "https://mainnet.infura.io/v3/dab1364f1304408b9d44f36d0773cf0a";

  const ethRpcTestnet = "https://goerli.infura.io/v3/dab1364f1304408b9d44f36d0773cf0a";
  const bscRpcTestnet = "https://data-seed-prebsc-1-s3.binance.org:8545/";

  const pancakeRouterv1 = "0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F";
  const pancakeRouterv2 = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506";

  const pancakeRouterv1Testnet = ethTestnet.uniswapRouterAddress;  //change to mainnet
  const routerAbi = constants.routerAbi;

  const dispatch = useDispatch();

  const tokenapi = async () => {
    try {
      const tokenresulte = await fetch(
        "https://api.bscscan.com/api?module=stats&action=bnbsupply&apikey=71J64U623PK3QCEMRRHNGKYJ1WC946S2NS"
      );

      const dataresult1 = await tokenresulte.json();
      const finalresult = await dataresult1.result;
      setApiresult1(finalresult);
    } catch (error) {}
  };

  /**
 Author:- vikas
 Description:- this methods used get data info total supply , api Holder, Top View Data and Trans Count
 **/

  const getTokenInfoData = (data) => {
    axios
      .get(
        `https://api.ethplorer.io/getTokenInfo/${data}?apiKey=EK-nAUJr-Fj2iAAQ-NEG7G`
      )
      .then((response) => {
        setApiHolderCount(response.data.holdersCount);

        setApiTotalSuply(response.data.totalSupply);

        setTopViewData(response.data);
        setTransCount(response.data.txsCount);
      });
  };

  //search value navbar onclick getting Address from Eth Plor we are taking total supply
  // useEffect(() => {
  //   getTokenInfoData(navbarTokenAddress);
  // }, [navbarTokenAddress]);

  /**
  Author:-vikas
  Description:-this methods call Top View Data and pairs
 **/

  const getTokenDetails = async (searchtext) => {
    if (searchtext === "") {
      return false;
    }
    try {
      const data = await fetch(
        `https://deep-index.moralis.io/api/v2/erc20/metadata?chain=eth&addresses=${searchtext}`,
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
      console.log(99898, error);
    }
  };

  useEffect(() => {
    getTokenDetails(searchtext);
  }, [searchtext]);

  useEffect(() => {
    getPaitrs();
    axios
      .get(
        "https://api.bscscan.com/api?module=stats&action=bnbsupply&apikey=71J64U623PK3QCEMRRHNGKYJ1WC946S2NS"
      )
      .then(function (response) {
        setApiresult1(response.data.result);
      })
      .catch(function (error) {
        // handle error
      })
      .finally(function () {
        // always executed
      });
  }, []);

  /**
Author:-vikas
Description:-this methods used get gas,average  tracker data 
**/
  useEffect(() => {
    setInterval(() => {
      //  apidata()
      axios
        .get(
          "https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=KMRND4UZ3YVBXWDIHFEXKA3F6IPETNXIEC"
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
  const { data: _signer } = useSigner();
  const [market, setMarket] = useState();
  const [transcation, settranscation] = useState();
  const [holder, setHolder] = useState();
  const [estimatedGas, setestimatedGas] = useState("");

  const getamountout = async (tokenA, tokenB, amount, bool) => {
    if (window.web3) {
      // let amountIn = (BigNumber(Number(amount)*(Math.pow(10,18))));
      let amountIn = window.web3.utils.toBN(
        fromExponential(amount * Math.pow(10, 18))
      );

      if (tokenA == "0x0000000000000000000000000000000000000000") {
        let path = ["0xc778417E063141139Fce010982780140Aa0cD5Ab", tokenB];
        let userwalletaddresss = localStorage.getItem("account");
        window.web3 = new Web3(window.ethereum);
        let swaping = new window.web3.eth.Contract(
          routerAbi,
          "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
        );
        //getAmountsIn

        swaping.methods
          .getAmountsOut(amountIn, path)
          .call({ from: userwalletaddresss })
          .then((res) => {
            //console.log(res)
            let amount = parseFloat(res[1]) / 10 ** 18;
            this.setState({ tokenamountOut: amount });
          })
          .catch();
      } else if (tokenB == "0x0000000000000000000000000000000000000000") {
        let path = [tokenA, "0xc778417E063141139Fce010982780140Aa0cD5Ab"];
        let userwalletaddresss = localStorage.getItem("account");
        window.web3 = new Web3(window.ethereum);
        let swaping = new window.web3.eth.Contract(
          routerAbi,
          "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
        );

        swaping.methods
          .getAmountsOut(amountIn, path)
          .call({ from: userwalletaddresss })
          .then((res) => {
            // console.log(res)

            let amount = parseInt(res[1]) / 10 ** 18;
            this.setState({ tokenamountOut: amount });
          })
          .catch();
      } else {
        let path = [tokenA, tokenB];
        let userwalletaddresss = localStorage.getItem("account");
        window.web3 = new Web3(window.ethereum);
        let swaping = new window.web3.eth.Contract(
          routerAbi,
          "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
        );

        swaping.methods
          .getAmountsOut(amountIn, path)
          .call({ from: userwalletaddresss })
          .then((res) => {
            // console.log(res)

            //let amount = (parseInt(res[1])/(10**18));
            let amount = parseInt(parseFloat(res[1]) / Math.pow(10, 18));
            console.log(amount);

            this.setState({ tokenamountOut: amount });
          })
          .catch();
      }
    }
  };

  /**
Author:-vikas
Description:-this method used get balanced,from Address data and to Address data  
**/

  useEffect(() => {
    setAmountIn("");
    setAmountOut("");

    fromBalance(fromAddress, fromdecimmal);
    toBalance(toAddress, todecimal);
    totalSupply(fromAddress);
  }, [fromAddress, fromCoin, provider, toAddress]);

  /**
Author:-vikas
Description:-this method used render address Data , priceUsd 
**/

  // useEffect(() => {
  //   fetch(
  //     `https://deep-index.moralis.io/api/v2/erc20/${fromAddress}/price?chain=eth`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "content-type": "application/json",
  //         accept: "application/json",
  //         "X-API-Key":
  //           "4QzVHUohNXj5J3hOExjjF4qoPzlXU9qyaOsYmNdXsmqo6qGqlx9GICbKzJu5AHTH",
  //       },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setFromCoinUSD(Number(response.usdPrice).toFixed(2));
  //     });

  //   fetch(
  //     `https://deep-index.moralis.io/api/v2/erc20/${toAddress}/price?chain=eth`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "content-type": "application/json",
  //         accept: "application/json",
  //         "X-API-Key":
  //           "4QzVHUohNXj5J3hOExjjF4qoPzlXU9qyaOsYmNdXsmqo6qGqlx9GICbKzJu5AHTH",
  //       },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setToCoinUSD(Number(response.usdPrice).toFixed(2));
  //     });
  // }, [fromAddress, toAddress]);

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
        console.log("eth", parseFloat(balan / 10 ** 18).toFixed(4));
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

  // drop down
  const [addshow, setAddshow] = useState(false);
  const [addshow1, setAddshow1] = useState(false);
  const [addshowCreate, setAddshowCreate] = useState(false);
  const mode = useSelector((state) => state.counter.mode);

  const Ether = new Provider.StaticJsonRpcProvider(
    ethRpcTestnet //change to mainnet
  );

  async function constructor() {
    // const providers =
    await detectEthereumProvider(provider);
    await window.ethereum.enable(provider);
  }

  const web3 = new Web3(provider);

  let pancake = new web3.eth.Contract(routerAbi, pancakeRouterv1Testnet);

  const mapp = getCoinDataInRedux
    .map((coin) => coin)
    .filter((fil) => fil.symbol !== fromCoin && fil.symbol !== toCoin);

  /**
Author:-vikas
Description:-this method used render coins 
**/

  useEffect(() => {
    setResults(getCoinDataInRedux);
  }, []);

  /**
Author:-vikas
Description:-this method used popup open and close 
**/

  const modelClose = () => {
    setModalStateOne(false);
    setModalStateTwo(false);
  };

  var out = [];
  var check = [];
  var singleHop = [];
  var final = [];
  var best = 0;
  var temp = 0;
  var tem;

  //multihop
  var multiHopLevelOne = [];
  var multiHopLevelTwo = [];
  var multiHopLevelThree = [];
  var multiHopFinal = [];
  var finalPriceList = [];
  var finalPriceListSymbol = [];

  const handleThemeToggler = async () => {
    setDarkTheme(!darkTheme);
    setMyData({ theme: darkTheme });
    localStorage.setItem("user", JSON.stringify(myData));
  };

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  async function setLocalData() {
    setMyData({ theme: darkTheme });
  }

  /**============ Direct Pair ==============**/
  async function directPair(value) {
    // var amt = (value * Math.pow(10, 18)).toString();
    tem = await pancake.methods
      .getAmountsOut((value * Math.pow(10, 18)).toString(), [
        fromAddress,
        toAddress,
      ])
      .call();

    setAmountOut((tem[1] / Math.pow(10, 18)).toString());
    return tem[1] / Math.pow(10, 18);
  }

  /**============ Direct Pair ==============**/

  var Pairi = [];
  var Pair2 = [];
  var Pair3 = [];

  /**================ SINGLE HOP =================== */
  async function singleHopMethod(value) {
    // const network = new ethers.providers.Web3Provider(web3);

    mapp.map(async (val, index) => {
      const StartCheck = Web3.utils.toChecksumAddress(fromAddress);
      var InterCheck = Web3.utils.toChecksumAddress(
        getCoinDataInRedux[index].address
      );

      var Tost = new Token(
        ChainId.GÖRLI, //change to mainnet
        InterCheck,
        18,
        getCoinDataInRedux[index].symbol,
        getCoinDataInRedux[index].name
      );

      var Inter = new Token(
        ChainId.GÖRLI, //change to mainnet
        StartCheck,
        18,
        "BUSD",
        "BUSD Token"
      );

      //const Inter = new Token(ChainId.MAINNET);

      try {
        temp = await Fetcher.fetchPairData(Inter, Tost, Ether);

        Pairi.push(temp);
      } catch {}

      //const
    });
    await thirdLevel();

    async function thirdLevel() {
      mapp.map(async (val, index) => {
        var EndCheck = Web3.utils.toChecksumAddress(toAddress);
        var InterCheck = Web3.utils.toChecksumAddress(
          getCoinDataInRedux[index].address
        );

        const TokenB = new Token(
          ChainId.GÖRLI, //change to mainnet
          EndCheck,
          18,
          "USDT",
          "Tether USD"
        );

        const TokenA = new Token(
          ChainId.GÖRLI, //change to mainnet
          InterCheck,
          18,
          getCoinDataInRedux[index].symbol,
          getCoinDataInRedux[index].name
        );

        try {
          temp = await Fetcher.fetchPairData(TokenA, TokenB, Ether);
          Pair2.push(temp);
        } catch {}
      });

      await nextLevel();
    }
    const nextLevel = async () => {
      //console.log(Pairi, Pair2);
      var mappp = mapp.map(async (val, index) => {
        const TokenA = mapp[index].tokenAmounts[0].currency;

        // console.log("e");
      });

      // const TokenA = pairi[i].tokenAmounts[0].currency;
      //   console.log("e");
      // }
    };
  }

  /**================ MULTI HOP =================== */
  //Multi Hop Level One
  async function multiHop(value) {
    await Promise.all(
      mapp.map(async (levelOne, index) => {
        try {
          tem = await pancake.methods
            .getAmountsOut("1000000000000000000", [
              fromAddress,
              levelOne.address,
            ])
            .call();

          multiHopLevelOne.push(levelOne);
        } catch {
          //console.log("err");
        }
        return;
      })
    );
    await multiHopTwo();
  }

  //Multi Hop Level Two
  async function multiHopTwo() {
    await Promise.all(
      mapp.map(async (levelTwo, index) => {
        try {
          tem = await pancake.methods
            .getAmountsOut("1000000000000000000", [
              multiHopLevelOne[index].address,
              levelTwo.address,
            ])
            .call();

          multiHopLevelTwo.push(levelTwo);
        } catch {
          //console.log("err");
        }
        return;
      })
    );
    await multiHopThree();
  }

  //Multi Hop Level Three
  async function multiHopThree() {
    await Promise.all(
      multiHopLevelTwo.map(async (levelThree, index) => {
        try {
          tem = await pancake.methods
            .getAmountsOut("1000000000000000000", [
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
    await finalFilter();
  }

  //finding best price
  function bests(arr) {
    var temp = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > temp) {
        temp = arr[i];
      }
    }
    return temp;
  }

  async function hasword(str, word) {
    return str.split(" ").includes(word);
  }

  async function bestpair(arrsymbol, arrpricelist) {
    for (let i = 0; i < arrsymbol.length; i++) {
      for (let j = 0; j < arrpricelist.length; j++) {
        if (hasword(arrsymbol[i], arrpricelist[j])) {
        }
      }
    }
    return;
  }

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

  //Multi Hop finding best pair
  async function finalPrice(value) {
    let amt = (value * Math.pow(10, 18)).toString();

    await Promise.all(
      multiHopLevelOne.map(async (levelone, indexOne) => {
        multiHopFinal.map(async (levelFinal, indexTwo) => {
          try {
            const a = levelone.address;
            const b = levelFinal.address;
            const temp = await pancake.methods
              .getAmountsOut(amt, [fromAddress, a, b, toAddress])
              .call();

            const teemp = temp[3] / Math.pow(10, 18);
            finalPriceList.push(teemp);
            var str = levelone.symbol.concat([
              " " + levelFinal.symbol + " " + teemp,
            ]);
            finalPriceListSymbol.push(str);
            // console.log(bestpair(finalPriceListSymbol, finalPriceList));
            setAmountOut(bests(finalPriceList));
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

  const list = [
    {
      id: 0,
      exchange: "Pancake swap",
      return: getFlooredFixed(amountOut, 2),
      price: isNaN(amountOut / amountIn)
        ? 0
        : getFlooredFixed(amountOut / amountIn, 2),
      fees: 10,
    },

    {
      id: 1,
      exchange: "Acryptos",
      return: 224,
      price: 2,
      fees: 10,
    },
  ];

  const [allowance, setAllowance] = useState(0);

  /**
 Author:- vikas
 Description:- handle input user
**/
  const handleChange = async (e) => {
    setUseinput("from");

    if (fromBal == 0) {
      setTile("Insufficient Balance");
    }

    if (e === "0" || e === "0") {
      setAmountOut("");
      setTile("Enter Amount");
    }

    setAmountIn(e);
    let val = e;

    await directPair(val);
    await singleHopMethod(val);
    await multiHop();
    await finalPrice(val);

    checkAllowance(e);
  };

  // GET AMOUNTS IN //

  var temp = 0;
  var tem;

  //multihop
  var multiHopLevelOne = [];
  var multiHopLevelTwo = [];
  var multiHopLevelThree = [];
  var multiHopFinal = [];
  var finalPriceList = [];
  var finalPriceListSymbol = [];

  /**============ Direct Pair ==============**/
  async function directPairIn(value) {
    try {
      // console.log(_provider)
      // return;
      pancake = new web3.eth.Contract(routerAbi, pancakeRouterv1Testnet);

      value = "0x" + (value * 10 ** todecimal).toString(16);

      tem = await pancake.methods
        .getAmountsIn(value, [fromAddress, toAddress])
        .call();

      setAmountIn((tem[0] / Math.pow(10, fromdecimmal)).toString());

      // pancake = new web3.eth.Contract(
      //   shibRouterAbi,
      //   shibRouter
      // );
      // console.log("uniswap router: ",pancake);
      // tem = await pancake.methods
      //   .getAmountsOut((value * Math.pow(10, 18)).toString(), [
      //     fromAddress,
      //     toAddress,
      //   ],9975)
      //   .call();

      setDirectPairValue((tem[0] / Math.pow(10, 18)).toString());

      return tem[0] / Math.pow(10, 18);
    } catch (error) {}
  }

  /**============ Direct Pair ==============**/

  var Pairi = [];
  var Pair2 = [];
  var Pair3 = [];

  /**================ SINGLE HOP =================== */
  async function singleHopMethodIn(value) {
    // const network = new ethers.providers.Web3Provider(web3);

    mapp.map(async (val, index) => {
      const StartCheck = Web3.utils.toChecksumAddress(fromAddress);
      var InterCheck = Web3.utils.toChecksumAddress(
        getCoinDataInRedux[index].address
      );

      var Tost = new Token(
        ChainId.GÖRLI, //change to mainnet
        InterCheck,
        18,
        getCoinDataInRedux[index].symbol,
        getCoinDataInRedux[index].name
      );

      var Inter = new Token(
        ChainId.GÖRLI, //change to mainnet
        StartCheck,
        18,
        "BUSD",
        "BUSD Token"
      );

      //const Inter = new Token(ChainId.MAINNET);

      try {
        temp = await Fetcher.fetchPairData(Inter, Tost, Ether);

        Pairi.push(temp);
        //console.log(Pairi);
      } catch {}

      //const
    });
    await thirdLevelIn();
    //console.log(Pairi);
    async function thirdLevelIn() {
      mapp.map(async (val, index) => {
        var EndCheck = Web3.utils.toChecksumAddress(toAddress);
        var InterCheck = Web3.utils.toChecksumAddress(
          getCoinDataInRedux[index].address
        );

        const TokenB = new Token(
          ChainId.GÖRLI, //change to mainnet
          EndCheck,
          18,
          "USDT",
          "Tether USD"
        );

        const TokenA = new Token(
          ChainId.GÖRLI, //change to mainnet
          InterCheck,
          18,
          getCoinDataInRedux[index].symbol,
          getCoinDataInRedux[index].name
        );

        try {
          temp = await Fetcher.fetchPairData(TokenA, TokenB, Ether);
          Pair2.push(temp);

          //console.log(Pairi);
        } catch {}
      });

      await nextLevelIn();
    }
    const nextLevelIn = async () => {
      //console.log(Pairi, Pair2);
      var mappp = mapp.map(async (val, index) => {
        const TokenA = mapp[index].tokenAmounts[0].currency;

        // console.log("e");
      });

      // const TokenA = pairi[i].tokenAmounts[0].currency;
      //   console.log("e");
      // }
    };
  }

  /**================ MULTI HOP =================== */
  //Multi Hop Level One
  async function multiHopIn(value) {
    await Promise.all(
      mapp.map(async (levelOne, index) => {
        try {
          tem = await pancake.methods
            .getAmountsIn("1000000000000000000", [
              fromAddress,
              levelOne.address,
            ])
            .call();

          multiHopLevelOne.push(levelOne);
        } catch {
          //console.log("err");
        }
        return;
      })
    );
    await multiHopTwoIn();
  }

  //Multi Hop Level Two
  async function multiHopTwoIn() {
    await Promise.all(
      mapp.map(async (levelTwo, index) => {
        try {
          tem = await pancake.methods
            .getAmountsIn("1000000000000000000", [
              multiHopLevelOne[index].address,
              levelTwo.address,
            ])
            .call();

          multiHopLevelTwo.push(levelTwo);
        } catch {
          //console.log("err");
        }
        return;
      })
    );
    await multiHopThreeIn();
  }

  //Multi Hop Level Three
  async function multiHopThreeIn() {
    await Promise.all(
      multiHopLevelTwo.map(async (levelThree, index) => {
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
  function bestsIn(arr) {
    var temp = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > temp) {
        temp = arr[i];
      }
    }
    return temp;
  }

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
      multiHopLevelOne.map(async (levelone, indexOne) => {
        multiHopFinal.map(async (levelFinal, indexTwo) => {
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

  /**
 Author:-vikas
 Description:- handle user input
**/
  const handleChangeIn = async (e) => {
    setUseinput("To");

    if (fromBal === 0) {
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
        borderRadius: 5,
        padding: 10,
        display: "block",
        lineHeight: 1.5,
        border: "1px",
        borderStyle: "solid",
      }}
    >
      <div className="online">
        <Text className="">From</Text>
        <Text>Balance {fromBal}</Text>
      </div>

      <div className="online">
        <div>
          <input
            className={mode === "dark" ? "dark" : "light"}
            type="text"
            name="amountIn"
            autoComplete="off"
            value={amountIn}
            onChange={async (e) => {
              setAmountIn(e.target.value);
              // handleChange(e.target.value);
              getPriceIN(e.target.value);
            }}
            placeholder="0.0"
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => {
            setCoindata(getCoinDataInRedux);
            setSearchText("");
            setModalStateOne(true);
          }}
        >
          {/* <Avatar size="small" src={fromImage} /> */}
          <p className="tokenSymbol">{fromCoin}</p>
          <img class="icon-sm" src={down} alt="caret-down" />
        </div>
      </div>

      <div className="online" style={{ dispay: "block" }}>
        <p>${amountIn == "" ? 1 * fromCoinUSD : fromCoinUSD * amountIn}</p>
      </div>
    </div>
  );

  //rendering form Out
  const renderOutForm = (
    <div
      onClick={() => dispatch(addCurrentRouterOfEth("uniswap"))}
      className={`input-card-top input-eth ${
        mode === "dark" ? "dark" : "light"
      }    ${
        currentRouterOfEth === "uniswap"
          ? "selectedBorder"
          : "nonselectedBorder"
      }`}
      style={{
        borderRadius: 10,
        padding: 10,
        display: "block",
        lineHeight: 1.5,
        borderWidth: "1px",
      }}
    >
      <div className="online">
        <Text>To (estimated)</Text>
        <Text>Balance {tobal}</Text>
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
              onFocus={() => dispatch(addCurrentRouterOfEth("uniswap"))}
              onChange={(e) => {
                setAmountOut(e.target.value);
                const value = e.target.value;
                if (value === "") {
                  setAmountIn("");
                  // setDirectPairValue("0.0");
                } else {
                  getPriceOUT(e.target.value);
                }
                setCheckUserInput("To");
                // handleChangeIn(e);
              }}
              className={mode === "dark" ? "dark" : "light"}
              placeholder="0.0"
            />
          </div>
          <div
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => {
              setCoindata(getCoinDataInRedux);
              setSearchText("");
              setModalStateTwo(true);
            }}
          >
            {/* <Avatar size="small" src={toImage} /> */}
            <p className="tokenSymbol">{toCoin}</p>
            <img class="icon-sm" src={down} alt="caret-down" />
          </div>
        </div>
      </div>

      <div className="online" style={{ dispay: "block" }}>
        <p>${amountOut == "" ? 1 * toCoinUSD : toCoinUSD * amountOut}</p>
      </div>
    </div>
  );

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
        className="centerArrow"
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

  const search = (keyword) => {
    setResults([]);

    setResults(
      getCoinDataInRedux
        .filter((coin) => coin.symbol.includes(keyword.toUpperCase()))
        .map((data) => data)
    );
  };

  //rendering search results of modal
  const renderSearchResults = (
    <div className="list-search-results">
      {/* <div className="list-header">
        <span>Token name</span>
        <span>Price</span>
        <span>Balance</span>
      </div> */}
      {
        // getCoinDataInRedux.map((curVal,i)=>{
        //   return(
        //     <div key={i} className="list-header">
        //     <span>{curVal.symbol}</span>
        //     {/* <span>22</span> */}
        //     {/* <span>1000</span> */}
        // </div>
        //   )
        // })
      }

      <div style={{ height: "20rem", overflow: "auto" }}>
        {/* {console.log(223,results)} */}

        {results &&
          results.map((result) => (
            <div key={result.symbol}>
              <p
                style={{ cursor: "pointer", padding: 5, margin: 0 }}
                value={result.symbol}
                onClick={() => handleModal(result)}
              >
                <div className="modeldata" style={{}}>
                  <ModelRows
                    symbol={result.symbol}
                    name={result.name}
                    image={result.logoURI}
                  />
                </div>
              </p>
              {/* <img class="icon" src={result.logoURI} /> */}
            </div>
          ))}
      </div>
    </div>
  );

  //rendering modal
  const renderMod = (
    <Modal
      className="swapSidearrowdownClickup"
      show={true}
      onHide={() =>
        isModalOpenOne ? setModalStateOne(false) : setModalStateTwo(false)
      }
    >
      <Modal.Header closeButton className={mode === "dark" ? "dark" : "light"}>
        <Modal.Title className={mode === "dark" ? "dark" : "light"}>
          Select Token
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={mode === "dark" ? "dark" : "light"}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Search by token symbol or address  "
              value={searchtext}
              onPaste={(e) => {
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

                setSearchText(e.target.value);
                if (e.target.value === "") {
                  setCoindata(getCoinDataInRedux);
                } else {
                  if (e.target.value.length === 42) {
                    console.log("42", "asdasdasda");
                    getTokenAddress(searchtext);
                    //once dtata receive open new model with add button
                  } else {
                    setCoindata(filtered_array);
                  }
                }
              }}
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

                setSearchText(e.target.value);
                if (e.target.value === "") {
                  setCoindata(getCoinDataInRedux);
                } else {
                  if (e.target.value.length === 42) {
                    console.log("42", "asdasdasda");
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
        {/* <Button>Add</Button> */}
        {/* {console.log(989, searchtext)}  */}
        {coindata.map((curVal, i) => {
          return (
            <Figure
              className="listData"
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
                  {/* <p>{curVal.logoURI}</p> */}
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
  );
  const getUnixTime = () => {
    const time = Math.floor(new Date().getTime() / 1000) + 100000;
    return time;
  };
  const swap = async (tokenA, tokenB, amount, routerAddress) => {
    // debugger;

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
        let WETH = eth.weth;
        let path = [WETH, tokenB];
        let deadline = getUnixTime();

        window.web3 = new Web3(window.ethereum);
        let swaping = new window.web3.eth.Contract(routerAbi, routerAddress);
        //getAmountsIn
        console.log(amountIn);
        // debugger;
        swaping.methods
          .swapExactETHForTokens(1, path, userwalletaddresss, deadline)
          .send({ from: userwalletaddresss, value: amountIn })
          .then((res) => {
            console.log(res);
          })
          .catch();
      } else if (tokenB == "0x0000000000000000000000000000000000000000") {
        // debugger;
        approve(
          tokenA,
          amount,
          currentRouterOfEth == "shibnobi"
            ? eth.shibnobiRouter
            : eth.uniswapRouterAddress
        ).then((response) => {
          let WETH = eth.weth;
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
            .catch();
        });
      } else {
        approve(
          tokenA,
          amount,
          currentRouterOfEth == "shibnobi"
            ? eth.shibnobiRouter
            : eth.uniswapRouterAddress
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
            .catch();
        });
      }
    }
  };
  const approve = async (tokenA, amountIn, router) => {
    // debugger;
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
          // debugger;
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
              .catch();
          }
        })
        .catch();
    }
  };
  async function getPriceIN(data) {}

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
          settotalSupplyvalue(_factory);
        })
        .catch();
    }
  };

  async function getPriceOUT(data) {
    console.log("Getting Price");

    let amount = Number(data * 10 ** todecimal);

    const params = {
      sellToken: toAddress,
      buyToken: fromAddress,
      sellAmount: amount,
    };

    // Fetch the swap price.
    const response = await fetch(
      `https://api.0x.org/swap/v1/price?buyToken=${params.buyToken}&sellToken=${params.sellToken}&sellAmount=${amount}`
    );

    let swapPriceJSON = await response.json();
    console.log("Price: ", swapPriceJSON);

    setAmountIn(swapPriceJSON.buyAmount / 10 ** fromdecimmal);

    setestimatedGas(swapPriceJSON.estimatedGas);
  }

  //rendering Lists
  const renderList = list.map((item) => (
    <div className="list-route" key={item.index}>
      <p>{item.exchange}</p>
      <p>
        {item.return}
        <sup>-0.07%</sup>
      </p>
      <p>{item.price}</p>
      <p>≈${item.fees}</p>
      <Button onClick={() => swap()}>Swap</Button>
    </div>
  ));

  /**
 Author:- vikas
 Description:- this methods check allowance
 **/

  const checkAllowance = async (inputValue) => {
    let value;
    if (currentRouter == "uniswap") {
      value = await checkAllowanceForRouter(fromAddress, provider);
    } else {
      value = await checkAllowanceForRouterShib(fromAddress, provider);
    }
    setAllowance(value);
    if (fromBal == 0) {
      setTile("Insufficient Balance");
    } else if (parseFloat(inputValue) > parseFloat(value)) {
      setTile("Approve");
    } else {
      setTile("Swap");
    }
  };

  //rendering routes
  const renderRoute = (
    <Fragment>
      <div className={mode === "dark" ? "route dark" : "route"}>
        <div className="header-list-routes">
          <b>Exchange</b>
          <b>Return</b>
          <b>Price</b>
          <b>Fees</b>
        </div>
        {renderList}
      </div>
    </Fragment>
  );

  let methods = ["Direct", "SingleHop", "MultiHop"];

  /**
 Author:- vikas
 Description:- this methods used Radio Change
 **/

  const handleRadioChange = async (e) => {
    setMethodType(e.target.value);
    setAmountIn("");
    setAmountOut("");
  };

  //rendering methods
  const renderMethod = (
    <>
      {methods.map((method, i) => (
        <>
          <input
            key={i}
            type="radio"
            value={method}
            name="methods"
            autoComplete="off"
            checked={methodType === method}
            onChange={handleRadioChange}
          />
          &nbsp;
          <span className="radio-input">{method}</span>
        </>
      ))}
    </>
  );

  /**
 Author:- vikas
 Description:- this function used popup open and close
 **/

  const btn = () => {
    // alert("Hello")
    setAddshow(true);
  };
  const btn2 = () => {
    setAddshowCreate(true);
  };

  /**
Author:- vikas
Description:- this function used popup open and close
**/
  const btn1 = () => {
    // alert("Hello")
    setAddshow1(true);
  };

  /**
Author:- vikas
Description:- this function used popup open and close
**/
  const back = () => {
    // alert("Hello")
    setAddshow1(false);
  };

  return (
    <div className="container-fluid">
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
                <div className={mode === "light" ? "light" : "dark"}>
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
                                  <div
                                    className="swap-head card-header"
                                    id="liquidity"
                                  >
                                    Liquidity
                                  </div>
                                </Tab>
                              </div>
                            </TabList>

                            <div></div>

                            <TabPanel>
                              {/* <h2>Any content 1</h2> */}

                              <div className="appBody" id="swapid">
                                <div>
                                  <div
                                    style={{ backgroundColor: "#212429" }}
                                    className=""
                                  >
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

                                    <div
                                      className={
                                        mode === "dark"
                                          ? "card-input input-group dark"
                                          : "card-input input-group light"
                                      }
                                    >
                                      {renderForm}
                                      <div
                                        className={`oneInch ${
                                          mode === "dark" ? "dark" : "light"
                                        }    ${
                                          currentRouterOfEth !== "uniswap"
                                            ? "selectedBorder"
                                            : "nonselectedBorder"
                                        }`}
                                        onClick={() =>
                                          dispatch(
                                            addCurrentRouterOfEth("shibnobi")
                                          )
                                        }
                                      >
                                        <div>
                                          <Text>{"SHIBNOBI ROUTER"}</Text>
                                          <small
                                            className={
                                              mode === "dark"
                                                ? " dark"
                                                : " light"
                                            }
                                          >
                                            {DirectPairValue}
                                          </small>
                                        </div>
                                        {/* <div>
                                        <p>
                                          Get <span>227.78</span>
                                        </p>
                                        <small>~$225.58 (-0.33%)</small>
                                      </div> */}
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
                                            <span>{slippageAmount}%</span>
                                          </div>
                                        </div>
                                      </div>

                                      <Button
                                        type="primary"
                                        block
                                        disabled={
                                          title === "Insufficient Balance"
                                            ? true
                                            : false
                                        }
                                        onClick={async () => {
                                          swap(
                                            fromAddress,
                                            toAddress,
                                            amountIn,
                                            currentRouterOfEth == "shibnobi"
                                              ? eth.shibnobiRouter
                                              : eth.uniswapRouterAddress
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
                                    <p style={{ fontWeight: 600 }}>
                                      {fromCoin}{" "}
                                    </p>
                                    <div
                                      className={
                                        mode === "dark" ? "dark" : "light token"
                                      }
                                    >
                                      <p
                                        className={
                                          mode === "dark" ? "dark" : "light"
                                        }
                                      >
                                        {/* {navbarTokenAddress && navbarTokenAddress.slice(0, 10) + "...." + navbarTokenAddress.slice(-10)} */}
                                        {token0Address &&
                                          token0Address.slice(0, 10) +
                                            "...." +
                                            token0Address.slice(-10)}
                                      </p>
                                      <p>
                                        <CopyToClipboard
                                          text={token0Address}
                                          onCopy={() => alert("copied")}
                                        >
                                          <ContentCopyIcon />
                                        </CopyToClipboard>
                                      </p>
                                    </div>
                                    <br></br>
                                    <Amount mode={mode} />
                                    <hr />
                                    <Balance value={fromBal} mode={mode} />
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
                                          src="https://etherscan.io/assets/svg/logos/logo-etherscan.svg?v=0.0.2"
                                          alt="https://etherscan.io/"
                                          height={35}
                                          style={{ backgroundColor: "white" }}
                                        />
                                      </div>

                                      <div>
                                        {/* <TotalSupply /> */}
                                        <TotalSupply
                                          value={totalSupplyvalue}
                                          mode={mode}
                                        />
                                        <hr></hr>
                                        <MarketCap value={""} mode={mode} />
                                        <hr></hr>

                                        <Transaction
                                          transCount={transCount}
                                          value={transcation}
                                          mode={mode}
                                        />
                                        <hr></hr>

                                        <Holder
                                          apiHolderCount={apiHolderCount}
                                          value={holder}
                                          mode={mode}
                                        />

                                        {/* /_____________________________________________ */}
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
                                />
                              )}
                              {addshowCreate === true && (
                                <CreateliquidityEth
                                  setAddshowCreate={setAddshowCreate}
                                  fromdecimmal={fromdecimmal}
                                  todecimal={todecimal}
                                  slippageModel={handleShow}
                                  usingFor={usingFor}
                                  FromToken={liqFromToken}
                                  ToToken={liqToToken}
                                  provider={provider}
                                />
                              )}

                              {addshow === false && addshowCreate === false && (
                                <div className="yourLiq-pd">
                                  <Title level={4}>Your Liquidity</Title>
                                  <Divider />
                                  <Space wrap>
                                    <Button onClick={btn2}>
                                      {/* Remove liquidity to receive tokens back */}
                                      Create a pair
                                    </Button>

                                    <Button type="primary" onClick={btn}>
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
                                  {/* <div style={{ margin: 20 }}>
                                  <div className="gastracker">
                                    <div style={{ display: "flex" }}>
                                      <img
                                        style={{ marginRight: 10 }}
                                        src="https://swap.shibnobi.com/static/media/icon-car.33259258.svg"
                                      />
                                      <div style={{ marginRight: 0 }}>
                                        <p>{gasdata} GWEI</p>
                                        <p
                                          style={{
                                            fontSize: "13px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          fast
                                        </p>
                                      </div>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                      <img
                                        alt=""
                                        style={{ marginRight: 10 }}
                                        src="https://swap.shibnobi.com/static/media/icon-rocket.13006355.svg"
                                      />
                                      <div style={{ marginRight: 0 }}>
                                        <p>{averagegas} GWEI</p>
                                        <p
                                          style={{
                                            fontSize: "13px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          Average
                                        </p>
                                      </div>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                      <img
                                        style={{ marginRight: 10 }}
                                        alt=""
                                        src="https://swap.shibnobi.com/static/media/icon-snail.ee231b9b.svg"
                                      />
                                      <div style={{ marginRight: 0 }}>
                                        <p>{slowgas} GWEI</p>
                                        <p
                                          style={{
                                            fontSize: "13px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          Slow
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div> */}
                                </div>
                              )}

                              {/* create liquidity */}
                              {/* {
                  addshow1 ? (
                    <Createliquidity/>
                  ) : ''
                } */}
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

      <Tabs className="mobTabNav ">
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
                        {/* {renderRoute} */}
                      </>
                    )}
                  </div>

                  {/* <ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
      Swap
      </button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Market</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Staking</button>
  </li>
</ul> */}

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
                                  <div
                                    className="swap-head card-header"
                                    id="liquidity"
                                  >
                                    Liquidity
                                  </div>
                                </Tab>
                              </div>
                            </TabList>

                            <div></div>

                            <TabPanel>
                              {/* <h2>Any content 1</h2> */}

                              <div className="appBody" id="swapid">
                                <div>
                                  <div
                                    style={{ backgroundColor: "#212429" }}
                                    className=""
                                  >
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
                                        style={{ fontSize: "small" }}
                                        className={`oneInch ${
                                          mode === "dark" ? "dark" : "light"
                                        }    ${
                                          currentRouterOfEth !== "shibnobi"
                                            ? "selectedBorder"
                                            : "nonselectedBorder"
                                        }`}
                                      >
                                        <div>
                                          <p> {"SHIBNOBI ROUTER"}</p>
                                          <small>{DirectPairValue}</small>
                                        </div>
                                        {/* <div>
                                        <p>
                                          Get <span>227.78</span>
                                        </p>
                                        <small>~$225.58 (-0.33%)</small>
                                      </div> */}
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
                                            <span style={{ color: "white" }}>
                                              {slippageAmount}%
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      <Button
                                        type="primary"
                                        block
                                        disabled={
                                          title === "Insufficient Balance"
                                            ? true
                                            : false
                                        }
                                        onClick={async () => {
                                          swap(
                                            fromAddress,
                                            toAddress,
                                            amountIn,
                                            currentRouterOfEth == "shibnobi"
                                              ? eth.shibnobiRouter
                                              : eth.uniswapRouterAddress
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
                                    <p>{fromCoin} </p>
                                    <div className="token">
                                      <p>
                                        {fromAddress &&
                                          fromAddress.substring(0, 20) + "...."}
                                      </p>
                                      <p>
                                        <CopyToClipboard
                                          text={accountbalnced}
                                          onCopy={() => alert("copied")}
                                        >
                                          <ContentCopyIcon />
                                        </CopyToClipboard>
                                      </p>
                                    </div>
                                    <br></br>
                                    <Amount />
                                    <hr />
                                    <Balance value={fromBal} mode={mode} />
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
                                          src="https://etherscan.io/assets/svg/logos/logo-etherscan.svg?v=0.0.2"
                                          alt="https://etherscan.io/"
                                          height={35}
                                          style={{ backgroundColor: "white" }}
                                        />
                                      </div>

                                      <div>
                                        {/* <TotalSupply /> */}
                                        <TotalSupply
                                          value={totalSupplyvalue}
                                          mode={mode}
                                        />
                                        <hr></hr>
                                        <MarketCap value={""} mode={mode} />
                                        <hr></hr>

                                        <Transaction value={transcation} />
                                        <hr></hr>

                                        <Holder value={holder} />

                                        {/* /_____________________________________________ */}
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
                                />
                              )}
                              {addshowCreate === true && (
                                <CreateliquidityEth
                                  setAddshowCreate={setAddshowCreate}
                                  fromdecimmal={fromdecimmal}
                                  todecimal={todecimal}
                                  slippageModel={handleShow}
                                  usingFor={usingFor}
                                  FromToken={liqFromToken}
                                  ToToken={liqToToken}
                                  provider={provider}
                                />
                              )}

                              {addshow === false && addshowCreate === false && (
                                <div className="yourLiq-pd">
                                  <Title level={4}>Your Liquidity</Title>
                                  <Divider />
                                  <Space wrap>
                                    <Button onClick={btn2}>
                                      {/* Remove liquidity to receive tokens back */}
                                      Create a pair
                                    </Button>

                                    <Button type="primary" onClick={btn}>
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
                                  {/* <div style={{ margin: 20 }}>
                                  <div className="gastracker">
                                    <div style={{ display: "flex" }}>
                                      <img
                                        style={{ marginRight: 10 }}
                                        src="https://swap.shibnobi.com/static/media/icon-car.33259258.svg"
                                      />
                                      <div style={{ marginRight: 0 }}>
                                        <p>{gasdata} GWEI</p>
                                        <p
                                          style={{
                                            fontSize: "13px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          fast
                                        </p>
                                      </div>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                      <img
                                        alt=""
                                        style={{ marginRight: 10 }}
                                        src="https://swap.shibnobi.com/static/media/icon-rocket.13006355.svg"
                                      />
                                      <div style={{ marginRight: 0 }}>
                                        <p>{averagegas} GWEI</p>
                                        <p
                                          style={{
                                            fontSize: "13px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          Average
                                        </p>
                                      </div>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                      <img
                                        style={{ marginRight: 10 }}
                                        alt=""
                                        src="https://swap.shibnobi.com/static/media/icon-snail.ee231b9b.svg"
                                      />
                                      <div style={{ marginRight: 0 }}>
                                        <p>{slowgas} GWEI</p>
                                        <p
                                          style={{
                                            fontSize: "13px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          Slow
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div> */}
                                </div>
                              )}

                              {/* create liquidity */}
                              {/* {
                  addshow1 ? (
                    <Createliquidity/>
                  ) : ''
                } */}
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          className={mode === "dark" ? "dark" : "light"}
        >
          <Modal.Title className={mode === "dark" ? "dark" : "light"}>
            Transaction setting
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={mode === "dark" ? "dark" : "light"}>
          <div className={mode === "dark" ? "dark" : "light"}>
            <div className="modal-content">
              <div className="modal-body">
                <div className="row">
                  <label className="labelField">Slippage Tolerance</label>
                </div>
                <div className="row">
                  <ButtonGroup aria-label="">
                    <Button
                      className={setSlippageAmount == "0.1" ? "active" : ""}
                      variant="secondary"
                      onClick={() => {
                        setwarningMsg("Your transaction may fail");
                        setSlippageAmount("0.1");
                        dispatch(addETHPercentage("0.1"));
                      }}
                    >
                      0.1%
                    </Button>
                    <Button
                      className={setSlippageAmount == "0.1" ? "active" : ""}
                      variant="secondary"
                      onClick={() => {
                        setwarningMsg("");
                        setSlippageAmount("0.5");
                        dispatch(addETHPercentage("0.5"));
                      }}
                    >
                      0.5%
                    </Button>
                    <Button
                      variant="secondary"
                      className={setSlippageAmount == "0.1" ? "active" : ""}
                      onClick={() => {
                        setwarningMsg("");
                        setSlippageAmount("1");
                        dispatch(addETHPercentage("1"));
                      }}
                    >
                      1%
                    </Button>
                  </ButtonGroup>
                  <div className="col-md-12 inputFieldUnitsContainer">
                    <span>{warningMsg}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 fieldContainer">
                    <input
                      className="inputField"
                      value={slippageAmount}
                      onChange={(e) => {
                        setwarningMsg("");
                        setSlippageAmount(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <label className="labelField">Transaction Deadline</label>
                </div>
                <div className="row">
                  <div className="col-md-6 fieldContainer">
                    <input
                      className="inputField"
                      value={deadlineMinutes}
                      onChange={(e) => {
                        setDeadlineMinutes(e.target.value);
                        dispatch(addETHDealine(e.target.value));
                      }}
                    />
                  </div>
                  <div className="col-md-6 inputFieldUnitsContainer">
                    <span>minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <ModelAddToken
        status={tokenModel}
        setGetAddressData={getAddressData}
        className="d-none"
      />
    </div>
  );
}
