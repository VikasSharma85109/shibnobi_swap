import React, { useEffect, useState } from "react";
import { Tabs, TabPanel } from "react-tabs";
import { Button, Divider } from "antd";
import {
  ArrowLeftOutlined,
  SettingFilled,
  CaretDownFilled,
  PlusCircleFilled,
} from "@ant-design/icons";
import Web3 from "web3";
import "react-tabs/style/react-tabs.css";
import { Col, Row } from "antd";
import { notification } from "antd";
import Slider from "@mui/material/Slider";
import Figure from "react-bootstrap/Figure";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { approveRouter, approveRouterShib } from "./allowance";
import { Space, Typography } from "antd";
import { bsc } from "../../config";
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
import { constants, eth } from "../../config";
import { createPair } from "../bsc/approve";
const { Text, Title } = Typography;
function valuetext(value) {
  return `${value}°C`;
}
const CreateliquidityBsc = ({
  setAddshowCreate,
  fromdecimmal,
  todecimal,
  slippageModel,
  usingFor,
  FromToken,
  ToToken,
  provider,
}) => {
  const getCoinDataInRedux = useSelector(
    (state) => state.counter.ethDetails.bscToken
  );
  const routerFromRedux = useSelector((state) => state.counter);
  const currentRouterOfBsc = routerFromRedux.currentRouterOfBsc;
  const currentRouterOfEth = routerFromRedux.currentRouterOfEth;
  const mode = useSelector((state) => state.counter.mode);
  const [loading, setLoading] = useState(false);
  const [addliquidity, setAddliquidity] = useState(false);
  const [showhide, setShowhide] = useState(false);
  const [coindata, setCoindata] = useState(getCoinDataInRedux);
  const [toCoinAddress, setToCoinAddress] = useState(
    getCoinDataInRedux[1].address
  );
  // const routerFromRedux = useSelector((state) => state.counter);
  // const currentRouterOfBsc = routerFromRedux.currentRouterOfBsc;
  console.log("currentRouterOfBsc", currentRouterOfBsc);
  const [from, setFrom] = useState({});
  const [to, setTo] = useState({});
  const [dropDownValue, setDropDownValue] = useState("Select Currency");
  const [coindataChange, setCoindataChange] = useState(getCoinDataInRedux);
  const [showhideChange, setShowhideChange] = useState(false);
  const [dropDownValueChange, setDropDownValueChange] =
    useState("Select Currency");
  const { connector: activeConnector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const [fromCoinAddress, setFromCoinAddress] = useState("");

  const _loadlash = require("lodash");

  const [sliderData, setSliderData] = useState();
  const [searchtext, setSearchText] = useState("");

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



  /**
Author:- vikas
Description:- this function used check ApproveRouter
**/

  const btn = () => {
    try {
      setLoading(true);
      createPair(from.address, to.address, currentRouterOfBsc == "shibnobi"
        ? bsc.shibnobiRouter
        : bsc.pancakeRouterAddress);
    } catch (err) {
      console.error(err);
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
          <div
            className={mode == "dark" ? "dark" : "light"}
            style={{ textAlign: "center" }}
          >
            <div className="TitleName">
              <ArrowLeftOutlined onClick={() => setAddshowCreate(false)} />
              <Title level={4} style={{ marginBottom: 0 }}>
                {"Create"} Liquidity
              </Title>
              <SettingFilled onClick={slippageModel} />
            </div>
          </div>

          <Divider />
          {usingFor != "2" ? (
            <div style={{ margin: 10, paddingTop: 5, paddingBottom: 5 }}>
              <Text>From</Text>
              <p onClick={handleShow}>
                {dropDownValue}
                {usingFor != "0" ? null : <CaretDownFilled />}
              </p>

              <Divider />
              <Text>To</Text>
              <p
                onClick={() =>
                  usingFor == "0" ? setShowhideChange(true) : null
                }
              >
                {dropDownValueChange}
                {usingFor != "0" ? null : <CaretDownFilled />}
              </p>
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
              Create Liquidity
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

export default CreateliquidityBsc;
