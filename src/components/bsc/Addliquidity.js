import React, { useEffect, useState } from "react";
import { Tabs, TabPanel } from "react-tabs";

import Web3 from "web3";
import "react-tabs/style/react-tabs.css";
import { notification } from "antd";

import Slider from "@mui/material/Slider";
import activeTick from "./assets/logo/Artboard.png";
import Figure from "react-bootstrap/Figure";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { approveRouter, approveRouterShib } from "./allowance";
import { liquidity } from "./liquidity";
import { tokenBalance } from "../Balance";
import { useConnect, useAccount, useProvider } from "wagmi";

import {
  fetchPairAddress,
  fetchPoolForUser,
  fetchPoolForUserShib,
} from "./pool";

import { removeLiquidityTokens } from "./liquidity";
import { Avatar } from "antd";

import { useSelector } from "react-redux";
import {  bsc, bscTestnet, constants } from "../../config";
import { onApprove } from "./approve";
import { Divider } from "antd";

function valuetext(value) {
  return `${value}°C`;
}
const Addliquidity = ({
  setAddshow,
  fromdecimal,
  todecimal,
  slippageModel,
  usingFor,
  FromToken,
  ToToken,
  provider,
  fromCoin,
  toCoin,
}) => {
  // const Coins = useSelector((state) => state.counter.ethDetails.bscToken);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, error) => {
    api[type]({
      message: "Error",
      description: "All field are required",
    });
  };
  const Coins = useSelector((state) => state.counter.ethDetails.bscToken);
  const routerFromRedux = useSelector((state) => state.counter);
  const currentRouterOfBsc = routerFromRedux.currentRouterOfBsc;
  console.log("currentRouterOfBsc", currentRouterOfBsc);
  const currentRouterOfEth = routerFromRedux.currentRouterOfEth;
  const [addliquidity, setAddliquidity] = useState(false);

  const [from, setFrom] = useState({});
  const [to, setTo] = useState({});

  const [showhide, setShowhide] = useState(false);
  const [coindata, setCoindata] = useState(Coins);
  const [toCoinAddress, setToCoinAddress] = useState(Coins[1].address);
  const [dropDownValue, setDropDownValue] = useState("");
  const [coindataChange, setCoindataChange] = useState(Coins);
  const [showhideChange, setShowhideChange] = useState(false);
  const [dropDownValueChange, setDropDownValueChange] = useState(null);
  const { connector: activeConnector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const [fromCoinAddress, setFromCoinAddress] = useState(Coins[0].address);
  const [frombal, setfrombal] = useState("");
  const [pooldata, setPoolData] = useState([]);
  const [tobal, settobal] = useState("");
  const [show, setShow] = useState(false);
  const reduxValue = useSelector((state) => state);
  const [loading, setLoading] = useState(false);

  const [sliderData, setSliderData] = useState();

  const [disable, setDisable] = useState(false);

  const [slider, setSlider] = useState();

  const mode = useSelector((state) => state.counter.mode);

  /**
   Author:- vikas
  Description :- this method used set Coin addressand symbol
   **/

  useEffect(() => {
    if (usingFor != "0") {
      setToCoinAddress(ToToken.address);
      setFromCoinAddress(FromToken.address);
      setDropDownValue(FromToken.symbol);
      setDropDownValueChange(ToToken.symbol);
    }
  }, []);

  /**
   Author:- vikas
  Description :- this function used popup open and closed
   **/

  const handleClose = () => {
    setShow(false);
    setShowhideChange(false);
  };

  const handleShow = () => setShow(true);

  const [inputin, setinputin] = useState("");
  const [inputout, setinputout] = useState("");

  /**
     Author:- vikas
    Description :- this function used popup open and closed
     **/

  const btnChange = () => {
    setShowhideChange(!showhideChange);
  };

  /**
  Author:- vikas
  Description :- this function used add liquidity Function, data get coin address
   **/

  const addliquidityFunction = () => {};

  useEffect(() => {
    pooldatafun();
  }, [from.address, to.address]);

  const pooldatafun = async () => {
    if (currentRouterOfBsc === "shibnobi") {
      const data = await fetchPoolForUserShib(
        from.address,
        to.address,
        provider
      );
      setPoolData(data);
      console.log(
        111,
        await fetchPoolForUserShib(from.address, to.address, provider)
      );
    } else {
      const data = await fetchPoolForUser(from.address, to.address, provider);
      setPoolData(data);
      console.log(
        111,
        await fetchPoolForUser(from.address, to.address, provider)
      );
    }
  };
  /**
  Author:- vikas
  Description :- this function used approveRouter
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
  const btn = async () => {
    if (inputin !== "" && inputout !== "") {
      try {
        setLoading(true);

        onApprove(
          from.address,
          to.address,
          inputin,
          inputout,

          currentRouterOfBsc == "shibnobi"
            ? bsc.shibnobiRouter
            : bsc.pancakeRouterAddress   //change to mainnet
        );

        // liquidity(
        //   bscTestnet.shibnobiRouter,
        //   from.address,
        //   to.address,
        //   inputin,
        //   inputout,
        //   false
        // );
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("error");
    }

    // setShowhide(!showhide);
  };

  /**
    Author:- vikas
    Description :- this function used handleSymbol address, symbol and token address from input
     **/

  const handleSymbol = async (val) => {
    console.log("handleSymbol", val);
    setFrom(val);
    setDropDownValue(val.symbol);
    setFromCoinAddress(val.address);
    setShow(false);
    fromBalance(val.address, val.decimals);
  };

  /**
    Author:- vikas
    Description :- this function used handleSymbol address, symbol and token address To input
     **/

  const handleSymbolChange = async (val) => {
    console.log("handleSymbolChange", val);
    setTo(val);
    setDropDownValueChange(val.symbol);
    setToCoinAddress(val.address);
    setShowhideChange(false);
    toBalance(val.address, val.decimals);
  };

  return (
    <Tabs>
      <div>
        <TabPanel>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div className="TitleName">
              <p
                className="allfontsizeSet"
                onClick={() => setAddshow(false)}
                style={{ color: "#F701F7" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="sc-eAKXzc gEeWbb"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </p>
              <p className="allfontsizeSet">
                {usingFor == "2" ? "Remove" : "Add"} Liquidity
              </p>
              <div
                style={{ color: "#F701F7" }}
                className="gearContainer"
                onClick={slippageModel}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="sc-dyGzUR kJRiIj"
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </div>
            </div>
          </div>

          <Divider />
          {usingFor != "2" ? (
            <div>
              <div className="fredt">
                <div
                  className=""
                  style={{ border: "0px 0px 15px 15px", padding: "3px" }}
                >
                 
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div style={{ marginLeft: "5px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {usingFor != "0" ? null : (
                          <p className="allfontsizeSet">Balance {frombal}</p>
                        )}
                      </div>
                      <input
                        style={{
                          backgroundColor: "#212429",
                          outline: "none",
                          border: "none",
                        }}
                        autoComplete="off"
                        onChange={(e) => {
                          const value = e.target.value;
                          setinputin(value);
                        }}
                        type="text"
                        value={inputin}
                        name="amountIn"
                        placeholder="0.0"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <p
                        className="selectArrow allfontsizeSet"
                        onClick={usingFor == "0" ? handleShow : null}
                      >
                        {dropDownValue ? dropDownValue : "Select a currency"}{" "}
                        {"  "}
                        {usingFor != "0" ? null : (
                          <svg
                            width="12"
                            height="7"
                            viewBox="0 0 12 7"
                            fill="none"
                            class="sc-iFMziU lafdJM"
                          >
                            <path
                              d="M0.97168 1L6.20532 6L11.439 1"
                              stroke="#AEAEAE"
                            ></path>
                          </svg>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p className="arrow allfontsizeSet">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C3C5CB"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </p>
              </div>

              <div className="fredt">
                <div
                  className=""
                  style={{ border: "0px 0px 15px 15px", padding: "3px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div style={{ marginLeft: "5px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {usingFor != "0" ? null : (
                          <p className="allfontsizeSet">Balance {tobal}</p>
                        )}
                      </div>
                      <input
                        style={{
                          backgroundColor: "#212429",
                          outline: "none",
                          border: "none",
                        }}
                        type="text"
                        onChange={(e) => {
                          const value = e.target.value;
                          setinputout(value);
                        }}
                        value={inputout}
                        name="amountOut"
                        placeholder="0.0"
                      />
                    </div>
                    <div
                      className="selectArrow"
                      onClick={usingFor == "0" ? btnChange : null}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <p className="selectArrow allfontsizeSet">
                        {dropDownValueChange
                          ? dropDownValueChange
                          : "Select a currency"}

                        {usingFor != "0" ? null : (
                          <svg
                            width="12"
                            height="7"
                            viewBox="0 0 12 7"
                            fill="none"
                            class="sc-iFMziU lafdJM"
                          >
                            <path
                              d="M0.97168 1L6.20532 6L11.439 1"
                              stroke="#AEAEAE"
                            ></path>
                          </svg>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div style={{ dispay: "block" }}>

                 </div> */}
              </div>
            </div>
          ) : null}

          <div className="spacing">
            {usingFor == "2" ? (
              <form>
                <div>
                  <p className="allfontsizeSet allfontsizeSet">Cake/BNB</p>
                  <p className="allfontsizeSet">0.09542</p>
                </div>
                <Slider
                  aria-label="Range"
                  defaultValue={25}
                  getAriaValueText={valuetext}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={0}
                  max={100}
                  onChange={(e) => setSliderData(e.target.value)}
                />
                <div className="priceBx">
                  <p className="allfontsizeSet">Price:</p>
                  <div className="conversion">
                    <p className="allfontsizeSet">1PLR = 0.000000879648 ETH</p>
                    <p className="allfontsizeSet">1ETH = 0.000000879648 PLR</p>
                  </div>
                </div>
                <div className="ApproveBtn">
                  <button
                    className="walletConnect"
                    onClick={async () => {
                      const pairAddressget = await fetchPairAddress(
                        from.address,
                        to.address
                      );

                      const result = await fetchPoolForUser(
                        from.address,
                        to.address
                      );

                      let amount1 = result[2];

                      const resultData = (sliderData / 100) * amount1;

                      await approveRouter(
                        pairAddressget,
                        resultData * 10 ** 18,
                        provider
                      );
                    }}
                  >
                    Approved
                  </button>
                  <button
                    className="walletConnect"
                    onClick={async () => {
                      const result = await fetchPoolForUser(
                        from.address,
                        to.address
                      );

                      let amount1 = result[2];

                      removeLiquidityTokens(
                        from.address,
                        to.address,
                        amount1 * 10 ** 18,
                        0.5,
                        10 * 60
                      );
                    }}
                  >
                    Remove
                  </button>
                </div>
              </form>
            ) : null}
          </div>

          {/* <>
            <p>{JSON.stringify(pooldata)}</p>
          </> */}

          <div>
            <button onClick={() => btn()} className="walletConnect">
              {loading ? (
                <div class="spinner-border" role="status"></div>
              ) : null}
              {"Add Liquidity"}
            </button>
            {/* {addliquidity === true ? (
              <button onClick={addliquidityFunction} className="walletConnect">
                Add liquidity
              </button>
            ) : (
              <button onClick={() => btn()} className="walletConnect">
                {loading ? (
                  <div class="spinner-border" role="status"></div>
                ) : null}
                {isConnected ? "Enter Amount" : "Connect a wallet"}
              </button>
            )} */}
          </div>
        </TabPanel>
      </div>
      <Modal show={showhideChange} onHide={handleClose}>
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
                onChange={(e) => {
                  if (e.target.value === "") {
                    setCoindata(Coins);
                  } else {
                    setCoindata(
                      Coins.filter(
                        (data) =>
                          data.address.includes(e.target.value) ||
                          data.symbol.includes(
                            e.target.value.toLocaleUpperCase()
                          )
                      )
                    );
                  }
                }}
              />
            </Form.Group>
          </Form>

          {Coins.map((curVal, i) => {
            return (
              <Figure
                className="listData"
                onClick={() => handleSymbolChange(curVal)}
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
      <Modal show={show} onHide={handleClose}>
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
                onChange={(e) => {
                  if (e.target.value === "") {
                    setCoindata(Coins);
                  } else {
                    setCoindata(
                      Coins.filter(
                        (data) =>
                          data.address.includes(e.target.value) ||
                          data.symbol.includes(
                            e.target.value.toLocaleUpperCase()
                          )
                      )
                    );
                  }
                }}
              />
            </Form.Group>
          </Form>

          {Coins.map((curVal, i) => {
            return (
              <Figure
                className="listData"
                onClick={() => handleSymbol(curVal)}
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

                {/* <Figure.Image
                  width={30}
                  height={30}
                  style={{ margin: 10 }}
                  alt=""
                  src={curVal.logoURI}
                /> */}
                {/* <div>
                  <Figure.Caption style={{ fontWeight: 700 }}>
                    {curVal.symbol}
                  </Figure.Caption>
                  <Figure.Caption>{curVal.name}</Figure.Caption>
                </div> */}
              </Figure>
            );
          })}
        </Modal.Body>
      </Modal>
    </Tabs>
  );
};

//  if (currentRouterOfBsc === "shibnobi") {
//    if (from.symbol === "BNB" || to.symbol === "BNB") {
//      addLiquidityEthShib(
//        from.address === "BNB" ? toCoinAddress : from.address,
//        from.address === "BNB"
//          ? parseFloat(inputout * 10 ** to.decimals)
//          : parseFloat(inputin * 10 ** from.decimals),

//        from.address !== "BNB" ? inputout : inputin,

//        reduxValue.transactionSetting.BSC.percentage,
//        reduxValue.transactionSetting.BSC.deadline * 60,
//        provider
//      );
//    } else {
//      addLiquidityTokenShib(
//        from.address,
//        to.address,
//        parseFloat(inputin * 10 ** from.decimals),
//        parseFloat(inputout * 10 ** to.decimals),
//        reduxValue.transactionSetting.BSC.percentage,
//        reduxValue.transactionSetting.BSC.deadline * 60,
//        provider
//      );
//    }
//  } else {
//    if (from.symbol === "BNB" || to.symbol === "BNB") {
//      addLiquidityEth(
//        from.symbol === "BNB" ? to.address : from.address,
//        from.symbol === "BNB"
//          ? parseFloat(inputout * 10 ** to.decimals)
//          : parseFloat(inputin * 10 ** from.decimals),

//        from.symbol !== "BNB" ? inputout : inputin,

//        reduxValue.transactionSetting.BSC.percentage,
//        reduxValue.transactionSetting.BSC.deadline * 60,
//        provider
//      );
//    } else {
//      addLiquidityToken(
//        from.address,
//        to.address,
//        parseFloat(inputin * 10 ** from.decimals),
//        parseFloat(inputout * 10 ** to.decimals),
//        reduxValue.transactionSetting.BSC.percentage,
//        reduxValue.transactionSetting.BSC.deadline * 60,
//        provider
//      );
//    }
//  }

export default Addliquidity;
