import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Tabs, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Figure, Form } from "react-bootstrap";
import { fetchPoolForUser, fetchPairAddress } from "./pool";
import activeTick from "./assets/logo/Artboard.png";
import { Avatar } from "antd";
import { ModelRows } from "../Rows/Rows";

import { Coins } from "./coinList1";

import { addLiquidityToken, addLiquidityEth } from "./liquidity";

import Addliquidity from "./Addliquidity";
import { Button, ButtonGroup, Modal } from "react-bootstrap";

const ImportHeader = ({ back, setAddshow1, provider }) => {
  // const Coins = useSelector((state) => state.counter.bscToken);
  const [title, setTile] = useState("Select Token");
  const [showhide, setShowhide] = useState(false);
  const [coindata, setCoindata] = useState(Coins);
  const [showhide1, setShowhide1] = useState(false);
  const [selectdata, setSelectData] = useState("Select a currency ");
  const [selectdata1, setSelectData1] = useState("Select a currency ");

  const [fromAddress, setFromAddress] = useState();
  const [toAddress, setToAddress] = useState();

  const [tokenDataA, setTokenDataA] = useState();
  const [tokenDataB, setTokenDataB] = useState();
  const [poolBalance, setPoolBalance] = useState();
  const [totalSupplyLpData, setTotalSupplyLpData] = useState();
  const [lpTokenA, setLpTokenA] = useState();
  const [lpTokenB, setLpTokenB] = useState();
  const [isModalOpenOne, setModalStateOne] = useState(false);
  const [isModalOpenTwo, setModalStateTwo] = useState(false);
  const [toggle, setToggle] = useState(false);

  const [showOption, setShowOption] = useState(false);

  const [addshow, setAddshow] = useState(false);

  const mode = useSelector((state) => state.counter.mode);

  const modelClose = () => {
    setModalStateOne(false);
    setModalStateTwo(false);
  };
  /**
 Author:- vikas
 Description:- this function used popup open and close
 **/
  const btn = (data) => {
    setShowhide(!showhide);
  };
  const handleModal = (res) => {
    if (isModalOpenOne) {
      setModalStateOne(false);
      setShowhide(false);
      // setFromCoin(res.symbol);
      // setFromAddress(res.address);
      // setFromImage(res.logoURI);
    } else {
      setModalStateTwo(false);
      setShowhide1(false);
      // setToCoin(res.symbol);
      // setToImage(res.logoURI);
      // setToAddress(res.address);
    }

    modelClose();
  };
  /**
 Author:- vikas
 Description:- this function used popup open and close
 **/
  const btn1 = (data) => {
    setShowhide1(!showhide1);
  };

  /**
 Author:- vikas
 Description:- this function used popup open and close
 **/
  const btnmodel = () => {
    setAddshow(true);
  };

  /**
   Author:- vikas
   Description:- this function used model open
   **/

  const datapart = (curval) => {
    setFromAddress(curval.address);
    setSelectData(curval.symbol);
    setShowhide(false);
  };

  /**
   Author:- vikas
   Description:- this function used model open
   **/
  const datapart1 = (curval) => {
    setSelectData1(curval.symbol);
    setToAddress(curval.address);
    setShowhide1(false);
    setTile("Import");
  };

  return (
    <>
      <Tabs>
        {addshow ? (
          <Addliquidity setAddshow={setAddshow} provider={provider} />
        ) : (
          <div>
            <TabPanel>
              <div className="import1">
                <div>
                  <p
                    onClick={() => setAddshow1(false)}
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
                </div>
                <div>
                  <p>Import Pool</p>
                </div>
                <div>
                  <p
                    style={{ color: "#F701F7" }}
                    className="gearContainer"
                    onClick={() => {}}
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
                  </p>
                </div>
              </div>

              <div style={{ margin: "1rem", padding: "" }}>
                <p style={{ margin: "1rem" }}>
                  Tip: Use this tool to find pairs that don't automatically
                  appear in the interface.
                </p>
                <div
                  className="input-card-top input-eth"
                  style={{
                    borderRadius: 10,
                    padding: 10,
                    display: "block",
                    lineHeight: 2,
                  }}
                >
                  <div
                    className="input-card-top input-eth"
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
                      {/* <div style={{ marginLeft: "5px" }}>
                    <input
                      style={{
                        backgroundColor: "#212429",
                        outline: "none",
                        border: "none",
                        color: "white",
                      }}
                      type="text"
                      name="amountIn"
                      placeholder="0.0"
                    />
                  </div> */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          cursor: "pointer",
                        }}
                        onClick={btn}
                      >
                        <p className="selectArrow">{selectdata}</p>
                        <p>
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
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p class="arrow">
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

                <div
                  className="input-card-top input-eth"
                  style={{
                    borderRadius: 10,
                    padding: 10,
                    display: "block",
                    lineHeight: 2,
                  }}
                >
                  {/* <div style={{ marginLeft: "5px" }}>
                    <input
                      style={{
                        backgroundColor: "#212429",
                        outline: "none",
                        border: "none",
                        color: "white",
                      }}
                      type="text"
                      name="amountIn"
                      placeholder="0.0"
                    />
                  </div> */}
                  <div
                    className="input-card-top input-eth"
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
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          cursor: "pointer",
                        }}
                        onClick={btn1}
                      >
                        <p className="selectArrow">{selectdata1}</p>
                        <p>
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
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <div style={{ dispay: "block" }}>
        
      </div> */}
                </div>
              </div>
              {/* <hr></hr> */}

              <div>
                {showOption === false ? (
                  <button
                    onClick={async () => {
                      if (title === "Manage Pool") {
                        setShowOption(true);
                        return false;
                      }

                      const values = await fetchPoolForUser(
                        fromAddress,
                        toAddress
                      );
                      if (values !== false) {
                        const TokenDataA = values[0];
                        const TokenDataB = values[1];
                        const PoolBalance = values[2];
                        const totalSupplyLpData = values[3];
                        const TokenADataA = values[4];
                        const TokenADataB = values[5];

                        if (PoolBalance == 0) {
                          setTile("No Liquidity Found");
                        } else {
                          setTile("Manage Pool");
                        }

                        setTokenDataA(TokenDataA);
                        setTokenDataB(TokenDataB);
                        setPoolBalance(PoolBalance);
                        setTotalSupplyLpData(totalSupplyLpData);
                        setLpTokenA(TokenADataA);
                        setLpTokenB(TokenADataB);

                        setToggle(true);
                      }
                    }}
                    style={{ margin: "1rem", width: "93%" }}
                    className="walletConnect"
                  >
                    {title}
                  </button>
                ) : null}

                {showOption === true && (
                  <div className="btnstyle">
                    <button className="btn1" onClick={btnmodel}>
                      Add liquidity
                    </button>

                    <button onClick={btnmodel} className="btn1">
                      Remove liquidity
                    </button>
                  </div>
                )}

                {toggle && (
                  <div className="import_box">
                    <div className="import_box1">
                      <p>Your Position</p>
                    </div>

                    <div className="import_box1">
                      <p>SLEEP/ETH</p>
                      <p>{tokenDataA / tokenDataB}</p>
                    </div>
                    <div className="import_box1">
                      <p>Your pool share</p>
                      <p>{(poolBalance / totalSupplyLpData) * 100}</p>
                    </div>

                    <div className="import_box1">
                      <p>SLEEP</p>
                      <p>{lpTokenA}</p>
                    </div>

                    <div className="import_box1">
                      <p>ETH</p>
                      <p>{lpTokenB}</p>
                    </div>
                  </div>
                )}
              </div>
            </TabPanel>

            <Modal
              className={mode === "dark" ? "dark" : "light"}
              show={showhide}
              onHide={() => setShowhide(false)}
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
                      // value={searchtext}
                      className={mode === "dark" ? "dark" : "light"}
                      onChange={(e) => {
                        // setSearchText(e.target.value)
                        // if (e.target.value === "") {
                        //   setCoindata(Coins);
                        // } else {
                        //   setCoindata(
                        //     Coins.filter((data) => data.symbol.includes(e.target.value))
                        //   );
                        // }
                      }}
                    />
                  </Form.Group>
                </Form>

                {coindata.map((curVal, i) => {
                  return (
                    <Figure
                      className="listData"
                      onClick={() => handleModal(curVal)}
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
                        style={{
                          margin: 5,
                          objectFit: "contain",
                        }}
                        alt=""
                        src={activeTick}
                      />
                    </Figure>
                  );
                })}
              </Modal.Body>
            </Modal>
            <Modal
              className={mode === "dark" ? "dark" : "light"}
              show={showhide1}
              onHide={() => setShowhide1(false)}
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
                      // value={searchtext}
                      className={mode === "dark" ? "dark" : "light"}
                      onChange={(e) => {
                        // setSearchText(e.target.value)
                        // if (e.target.value === "") {
                        //   setCoindata(Coins);
                        // } else {
                        //   setCoindata(
                        //     Coins.filter((data) => data.symbol.includes(e.target.value))
                        //   );
                        // }
                      }}
                    />
                  </Form.Group>
                </Form>

                {coindata.map((curVal, i) => {
                  return (
                    <Figure
                      className="listData"
                      onClick={() => handleModal(curVal)}
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
                                    <Figure.Caption>
                                      {curVal.name}
                                    </Figure.Caption>
                                  </div> */}
                    </Figure>
                  );
                })}
              </Modal.Body>
            </Modal>
          </div>
        )}
      </Tabs>
    </>
  );
};

export default ImportHeader;
