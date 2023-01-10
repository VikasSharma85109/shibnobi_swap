import React, { useEffect, useState } from "react";
import { Tabs, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Slider from "@mui/material/Slider";
import Figure from "react-bootstrap/Figure";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { defaultCoins } from "./uniswap-default.tokenlist1";
import { approveRouter } from "./allowance";
import { addLiquidityToken } from "./liquidity";
import { tokenBalance } from "../Balance";
import { useConnect, useAccount } from "wagmi";
import { useSelector } from "react-redux";
import { providers } from "ethers";
function valuetext(value: number) {
  return `${value}°C`;
}
const RemoveliquidityEth = ({
  setAddshow,
  fromdecimmal,
  todecimal,
  slippageModel,
  usingFor,
  FromToken,
  ToToken,
  provider
}) => {
  // const Coins = useSelector((state) => state.counter.ethDetails.bscToken);

  const [addliquidity, setAddliquidity] = useState(false);
  const [showhide, setShowhide] = useState(false);
  const [coindata, setCoindata] = useState(defaultCoins);
  const [toCoinAddress, setToCoinAddress] = useState(defaultCoins[1].address);
  const [dropDownValue, setDropDownValue] = useState("");
  const [coindataChange, setCoindataChange] = useState(defaultCoins);
  const [showhideChange, setShowhideChange] = useState(false);
  const [dropDownValueChange, setDropDownValueChange] = useState(null);
  const { connector: activeConnector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const [fromCoinAddress, setFromCoinAddress] = useState(
    defaultCoins[0].address
  );
  const [frombal, setfrombal] = useState(0);
  const [tobal, settobal] = useState(0);
  const [show, setShow] = useState(false);
  const reduxValue = useSelector((state) => state);

/**
  Author:-vikas
  descrption:-this function used coin Address and symbol Address
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
    Author:-vikas
    descrption:-this function used popup open and closed
   **/

  const handleClose = () => {
    setShow(false);
    setShowhideChange(false);
  };

  /**
  Author:-vikas
  descrption:-this function used popup open
 **/

  const handleShow = () => setShow(true);

  const [inputin, setinputin] = useState("");
  const [inputout, setinputout] = useState("");

  const btnChange = () => {
    setShowhideChange(!showhideChange);
  };

  /**
 Author:-vikas
 descrption:-this function used add liquidity Function
**/

  const addliquidityFunction = () => {
    addLiquidityToken(
      fromCoinAddress,
      toCoinAddress,
      parseFloat(inputin * 10 ** fromdecimmal),
      parseFloat(inputout * 10 ** todecimal),
      reduxValue.transactionSetting.BSC.percentage,
      reduxValue.transactionSetting.BSC.deadline * 60,
      provider
    );
  };

  /**
 Author:-vikas
 descrption:-this function used check approveRouter function
**/
  
  const btn = () => {
    if (inputin !== "" && inputout !== "") {
      approveRouter(fromCoinAddress, parseFloat(inputin * 10 ** fromdecimmal),provider)
        .then(() => {
          //window
          approveRouter(toCoinAddress, parseFloat(inputout * 10 ** todecimal),provider)
            .then(() => {
              setAddliquidity(true);
            })
            .catch(() => {});
        })
        .catch(() => {});
    }

    // setShowhide(!showhide);
  };

  /**
Author:-vikas
descrption:-this function used symbol, balance etc...
**/

  const handleSymbol = (val) => {
    setDropDownValue(val.symbol);
    setFromCoinAddress(val.address);
    setShow(false);
    let balance = tokenBalance(val.address,provider);
    balance = balance / val.decimals;

    setfrombal(isNaN(balance) ? 0 : balance);
  };

  /**
Author:-vikas
descrption:-this function used symbol, balance etc...
**/
  
  const handleSymbolChange = (val) => {
    setDropDownValueChange(val.symbol);
    setToCoinAddress(val.address);
    setShowhideChange(false);
    let balance = tokenBalance(val.address,provider);
    balance = balance / val.decimals;

    settobal(isNaN(balance) ? 0 : balance);
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
              <p onClick={() => setAddshow(false)} style={{ color: "#F701F7" }}>
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
              <p>{usingFor == "2" ? "Remove" : "Add"} Liquidity</p>
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

          <p style={{ margin: "1rem" }}>Add liquidity to receive LP tokens</p>
          <hr></hr>
          <div style={{ margin: "1rem", padding: "10px" }}>
            <div
              className="spacing"
              style={{
                borderRadius: 10,
                padding: 10,
                display: "block",
                backgroundColor: "#212429",
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
                  <div style={{ marginLeft: "5px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {usingFor != "0" ? null : <p>Balance {frombal}</p>}
                    </div>
                    {/* <input
                      style={{
                        backgroundColor: "#212429",
                        outline: "none",
                        border: "none",
                        color: "white",
                      }}
                      autoComplete="off"
                      onChange={(e) => {
                        setinputin(e.target.value);
                      }}
                      type="text"
                      value={inputin}
                      name="amountIn"
                      placeholder="0.0"
                    /> */}
                <p>Cake/BNB</p>
                <p>0.09542</p>

                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <p
                      className="selectArrow"
                      onClick={usingFor == "0" ? handleShow : null}
                    >
                      {/* {dropDownValue ? dropDownValue : "Select a currency"}{" "}
                      {"  "} */}
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

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <p className="arrow">
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
              </p> */}
            </div>

           


           
          </div>

          {/* <div>
            {usingFor == "2" ? (
              <form>
                <></>
                <Box sx={{ width: 300 }}>
                  <Slider
                    aria-label="Temperature"
                    defaultValue={25}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={25}
                    marks
                    min={0}
                    max={100}
                  />
                </Box>
                <div className="priceBx">
                  <p>Price:</p>
                  <div className="conversion">
                    <p>1PLR = 0.000000879648 ETH</p>
                    <p>1ETH = 0.000000879648 PLR</p>
                  </div>
                </div>
                <div className="ApproveBtn">
                  <button className="walletConnect">Approved</button>
                  <button className="walletConnect">Remove</button>
                </div>
              </form>
            ) : null}
          </div> */}

          <div>
            {addliquidity === true ? (
              <button
                onClick={addliquidityFunction}
                 className="walletConnect"
              >
                Add liquidity
              </button>
            ) : (
              <button
                onClick={btn}
                className="walletConnect"
              >
                {isConnected ? "Enter Amount" : "Connect a wallet"}
              </button>
            )}
          </div>
        </TabPanel>
      </div>
      <Modal show={showhideChange} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Token</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Search"
                onChange={(e) => {
                  if (e.target.value === "") {
                    setCoindata(defaultCoins);
                  } else {
                    setCoindata(
                      defaultCoins.filter((data) =>
                        data.symbol.includes(e.target.value)
                      )
                    );
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
            );
          })}
        </Modal.Body>
      </Modal>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Token</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Search"
                onChange={(e) => {
                  if (e.target.value === "") {
                    setCoindata(defaultCoins);
                  } else {
                    setCoindata(
                      defaultCoins.filter((data) =>
                        data.symbol.includes(e.target.value)
                      )
                    );
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
                <Figure.Image
                  width={30}
                  height={30}
                  style={{ margin: 10 }}
                  alt=""
                  src={curVal.logoURI}
                />
                <div>
                  <Figure.Caption style={{ fontWeight: 700 }}>
                    {curVal.symbol}
                  </Figure.Caption>
                  <Figure.Caption>{curVal.name}</Figure.Caption>
                </div>
              </Figure>
            );
          })}
        </Modal.Body>
      </Modal>
    </Tabs>
  );
};

export default RemoveliquidityEth;
