import React, { useEffect, useState } from "react";
import { Tabs, TabPanel } from "react-tabs";
import { Button, Divider, Typography } from "antd";
import {
  ArrowLeftOutlined,
  SettingFilled,
  PlusCircleFilled,
} from "@ant-design/icons";
import Web3 from "web3";
import "react-tabs/style/react-tabs.css";

import { notification } from "antd";
import Slider from "@mui/material/Slider";
import Figure from "react-bootstrap/Figure";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { approveRouter, approveRouterShib } from "./allowance";

import { useConnect, useAccount } from "wagmi";
import { useSelector } from "react-redux";

import activeTick from "./assets/logo/Artboard.png";

import { fetchPairAddress } from "./pool";

import { fetchPoolForUser } from "./pool";

import {
  addLiquidityEth,
  addLiquidityEthShib,
  addLiquidityToken,
  addLiquidityTokenShib,
  removeLiquidityTokens,
} from "./liquidity";
import { Avatar } from "antd";
import axios from "axios";
import { liquidity } from "../bsc/liquidity";
import { Col, Row } from "antd";
import { constants, eth, ethTestnet } from "../../config";
import { onApprove } from "../bsc/approve";
const { Text, Title } = Typography;
function valuetext(value) {
  return `${value}°C`;
}

const Addliquidity = ({
  setAddshow,
  fromdecimmal,
  todecimal,
  slippageModel,
  usingFor,
  FromToken,
  ToToken,
  provider,
}) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, error) => {
    api[type]({
      message: "Error",
      description: "All field are required",
    });
  };
  const getCoinDataInRedux = useSelector(
    (state) => state.counter.ethDetails.ethToken
  );
  const routerFromRedux = useSelector((state) => state.counter);
  const currentRouterOfBsc = routerFromRedux.currentRouterOfBsc;
  const currentRouterOfEth = routerFromRedux.currentRouterOfEth;
  console.log("currentRouterOfEth", currentRouterOfEth);
  const mode = useSelector((state) => state.counter.mode);
  const [loading, setLoading] = useState(false);
  const [addliquidity, setAddliquidity] = useState(false);
  const [showhide, setShowhide] = useState(false);
  const [coindata, setCoindata] = useState(getCoinDataInRedux);
  const [toCoinAddress, setToCoinAddress] = useState(
    getCoinDataInRedux[1].address
  );
  const [from, setFrom] = useState({});
  const [to, setTo] = useState({});
  const [dropDownValue, setDropDownValue] = useState("Select a Currency");
  const [coindataChange, setCoindataChange] = useState(getCoinDataInRedux);
  const [showhideChange, setShowhideChange] = useState(false);
  const [dropDownValueChange, setDropDownValueChange] =
    useState("Select a Currency");
  const { connector: activeConnector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const [fromCoinAddress, setFromCoinAddress] = useState(
    getCoinDataInRedux[0].address
  );

  const _loadlash = require("lodash");

  const [sliderData, setSliderData] = useState();
  const [searchtext, setSearchText] = useState("");

  const [frombal, setfrombal] = useState("");
  const [tobal, settobal] = useState("");
  const [show, setShow] = useState(false);
  const reduxValue = useSelector((state) => state);

  const [disable, setDisable] = useState(false);

  const [slider, setSlider] = useState();

  /**
   Author:- vikas
   Description:- this function used set coin data and symbol Data Address
   **/

  useEffect(() => {
    if (usingFor != "0") {
      setToCoinAddress(ToToken.address);
      setFromCoinAddress(FromToken.address);
      setDropDownValue(FromToken.symbol);
      setDropDownValueChange(ToToken.symbol);
    }
  }, []);
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
  /**
 Author:- vikas
 Description:- this function used popup open and closed 
 **/
  const handleClose = () => {
    setShow(false);
    setShowhideChange(false);
  };

  /**
Author:- vikas
Description:- this function used open model  
**/

  const handleShow = () => setShow(true);

  const [inputin, setinputin] = useState("");
  const [inputout, setinputout] = useState("");

  /**
Author:- vikas
Description:- this function used popup open and closed 
**/

  const btnChange = () => {
    setShowhideChange(!showhideChange);
  };

  /**
Author:- vikas
Description:- this function used add liquidity Function get data coin address
**/

  const addliquidityFunction = () => {
    if (currentRouterOfBsc === "shibnobi") {
      if (from.symbol === "ETH" || to.symbol === "ETH") {
        addLiquidityEthShib(
          from.address === "ETH" ? to.address : from.address,
          from.address === "ETH"
            ? parseFloat(inputout * 10 ** to.decimals)
            : parseFloat(inputin * 10 ** from.decimals),

          from.address !== "ETH" ? inputout : inputin,

          reduxValue.transactionSetting.BSC.percentage,
          reduxValue.transactionSetting.BSC.deadline * 60,
          provider
        );
      } else {
        addLiquidityTokenShib(
          from.address,
          to.address,
          parseFloat(inputin * 10 ** from.decimals),
          parseFloat(inputout * 10 ** to.decimals),
          reduxValue.transactionSetting.BSC.percentage,
          reduxValue.transactionSetting.BSC.deadline * 60,
          provider
        );
      }
    } else {
      if (from.symbol === "ETH" || to.symbol === "ETH") {
        addLiquidityEth(
          from.symbol === "ETH" ? to.address : from.address,
          from.symbol === "ETH"
            ? parseFloat(inputout * 10 ** to.decimals)
            : parseFloat(inputin * 10 ** from.decimals),

          from.symbol !== "ETH" ? inputout : inputin,

          reduxValue.transactionSetting.BSC.percentage,
          reduxValue.transactionSetting.BSC.deadline * 60,
          provider
        );
      } else {
        addLiquidityToken(
          from.address,
          to.address,
          parseFloat(inputin * 10 ** from.decimals),
          parseFloat(inputout * 10 ** to.decimals),
          reduxValue.transactionSetting.BSC.percentage,
          reduxValue.transactionSetting.BSC.deadline * 60,
          provider
        );
      }
    }
  };

  /**
Author:- vikas
Description:- this function used check ApproveRouter
**/

  const btn = () => {
    if (inputin !== "" && inputout !== "") {
      try {
        setLoading(true);
        onApprove(
          from.address,
          to.address,
          inputin,
          inputout,
         currentRouterOfEth == "shibnobi"  ? ethTestnet.shibnobiRouter : ethTestnet.uniswapRouterAddress
        );
      } catch (err) {
        console.error(err);
      }
    } else {
      openNotificationWithIcon("error");
    }

    // setShowhide(!showhide);
  };

  /**
Author:- vikas
Description:- this function used set data symbol and address from input
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
Description:- this function used set data symbol and address To input
**/

  const handleSymbolChange = async (val) => {
    setTo(val);
    setDropDownValueChange(val.symbol);
    setToCoinAddress(val.address);
    setShowhideChange(false);
    toBalance(val.address, val.decimals);
  };

  const getTokenAddress = async (searchtext) => {
    axios
      .get(
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
      )
      .then(function (response) {
        if (response.data) {
          //  isModalOpenOne ? setModalStateOne(false) : setModalStateTwo(false);
          //  //ek
          //  setGetAddressData(response.data);
          //  setTokenModal(true);
        }
      })
      .catch(function (error) {
        // handle error
      })
      .finally(function () {
        // always executed
      });
  };

  return (
    <Tabs>
      <div>
        <TabPanel>
          <div className={mode == "dark" ? "dark" : "light"}>
            <div className="TitleName">
              <ArrowLeftOutlined onClick={() => setAddshow(false)} />
              <Title level={4} style={{ marginBottom: 0 }}>
                {usingFor == "2" ? "Remove" : "Add"} Liquidity
              </Title>
              <SettingFilled onClick={slippageModel} />
            </div>
          </div>

          <Divider />
          {usingFor != "2" ? (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  borderRadius: 10,
                  padding: 10,
                  display: "block",
                }}
              >
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
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text>Balance {frombal}</Text>
                      </div>
                      <input
                        style={{
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
                      <Text onClick={handleShow}>{dropDownValue}</Text>
                    </div>
                  </div>
                </div>
              </div>

              <PlusCircleFilled style={{ fontSize: "30px", color: "#08c" }} />

              <div
                className=""
                style={{
                  borderRadius: 10,
                  padding: 10,
                  display: "block",
                }}
              >
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
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {usingFor != "0" ? null : <Text>Balance {tobal}</Text>}
                      </div>
                      <input
                        style={{
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
                      <Text>{dropDownValueChange}</Text>
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
                  <p>Cake/ETH </p>
                  <p>0.09542</p>
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
                  <p>Price:</p>
                  <div className="conversion">
                    <p>1PLR = 0.000000879648 ETH</p>
                    <p>1ETH = 0.000000879648 PLR</p>
                  </div>
                </div>
                <div className="ApproveBtn">
                  <button
                    className="walletConnect"
                    onClick={async () => {
                      alert("Approve");

                      const pairAddressget = await fetchPairAddress(
                        fromCoinAddress,
                        to.address
                      );

                      const result = await fetchPoolForUser(
                        fromCoinAddress,
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
                    Approve
                  </button>
                  <button
                    className="walletConnect"
                    onClick={async () => {
                      alert("remove");
                      const result = await fetchPoolForUser(
                        fromCoinAddress,
                        to.address
                      );

                      let amount1 = result[2];

                      removeLiquidityTokens(
                        fromCoinAddress,
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

          <div style={{ margin: 10 }}>
            <Button type="primary" block onClick={() => btn()}>
              Add liquidity
            </Button>
          </div>
        </TabPanel>
      </div>
      <Modal
        closeButton
        className={mode === "dark" ? "dark" : "light"}
        show={showhideChange}
        onHide={handleClose}
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
                onChange={(e) => {
                  // if (e.target.value === "") {
                  //   setCoindata(getCoinDataInRedux);
                  // } else {
                  //   setCoindata(
                  //     getCoinDataInRedux.filter((data) =>
                  //       data.symbol.includes(e.target.value)
                  //     )
                  //   );
                  // }

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
                value={searchtext}
                onChange={(e) => {
                  // if (e.target.value === "") {
                  //   setCoindata(getCoinDataInRedux);
                  // } else {
                  //   setCoindata(
                  //     getCoinDataInRedux.filter((data) =>
                  //       data.symbol.includes(e.target.value)
                  //     )
                  //   );
                  // }

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

export default Addliquidity;
