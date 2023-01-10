import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { ModelRows } from "../Rows/Rows";
import { GearFill } from "react-bootstrap-icons";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";

const Createliquidity = () => {
  const Coins = useSelector((state) => state.counter.bscToken);
  const [showhide, setShowhide] = useState(false);
  const [coindata, setCoindata] = useState(Coins);

  const btn = () => {
    // alert("hello")
    setShowhide(!showhide);
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "2rem",
              }}
            >
              <p style={{ color: "#F701F7" }}>
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
              <p>Add cretae</p>
            </div>

            <div>
              <span
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
              </span>
            </div>
          </div>

          <p style={{ marginTop: "1rem" }}>
            Add liquidity to receive LP tokens
          </p>
          <hr></hr>
          <div style={{ marginBottom: "2rem", padding: "" }}>
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
                  <div style={{ marginLeft: "5px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p>$0.0</p>
                    </div>
                    <input
                      style={{
                        backgroundColor: "#212429",
                        outline: "none",
                        border: "none",
                        
                      }}
                      
                      type="text"
                      name="amountIn"
                      placeholder="0.0"
                    />
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p className="selectArrow">
                      Select a currency{" "}
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

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p style={{ color: "#F701F7" }}>
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
                  <div style={{ marginLeft: "5px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p>$0.0</p>
                    </div>
                    <input
                      style={{
                        backgroundColor: "#212429",
                        outline: "none",
                        border: "none",
                        
                      }}
                      type="text"
                      name="amountIn"
                      placeholder="0.0"
                    />
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p className="selectArrow">
                      Select a currency{" "}
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
            <button
              //   onClick={btn}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: 10,
                backgroundColor: "#F701F7",
                border: "none",
                outline: "none",
                marginBottom: "2rem",
               
                fontWeight: "bolder",
              }}
            >
              Connect a wallet
            </button>
          </div>
        </TabPanel>

        {showhide && (
          <div className="backdrop">
            <div className={"modal-coin"}>
              <div className="header-modal-select-coins">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <p>Select a token</p>
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowhide(!showhide)}
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
                      class="sc-kGXeez giNWeI"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </p>
                </div>
                <span style={{ cursor: "pointer" }} onClick={() => {}}></span>
              </div>

              <div className="search-input">
                <input
                  type="text"
                  placeholder="Search name or paste address"
                  autoComplete="off"
                />
              </div>
              <div
                style={{
                  height: "25rem",
                  overflow: "auto",
                  marginBottom: "1rem",
                }}
              >
                {coindata.map((curVal, i) => {
                  return (
                    <div key={i}>
                      {" "}
                      <ModelRows
                        symbol={curVal.symbol}
                        name={curVal.name}
                        image={curVal.logoURI}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </Tabs>
  );
};

export default Createliquidity;
