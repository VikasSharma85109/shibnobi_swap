import React from "react";
import { useSelector } from "react-redux";
import { Button, Divider, Typography } from "antd";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

import price from "../bsc/assets/price.svg";
import vol from "../bsc/assets/vol.svg";
import transaction from "../bsc/assets/transaction.svg";
import totalliquidity from "../bsc/assets/totalliquidity.svg";
import Transactions from "./Transactions";
import { useState } from "react";
const { Text, Title } = Typography;
const CenterPanelView = (props) => {
  const data = useSelector((state) => state.counter.bscSearchData.chartValue);

  const [totalLiquidity, setTotalLiquidity] = useState();
  const [tokenPrice, setTokenPrice] = useState();
  const [priceData, setPricedata] = useState([]);
  const [tokenVolume, setTokenVolume] = useState();
  const [transactionToken, setTransactionToken] = useState();

  // const data = useSelector((state) => state.counter.bscSearchData);
  const mode = useSelector((state) => state.counter.mode);
  const state = useSelector((state) => state);

  // data get Redux pairAddress
  const pairAddress = useSelector(
    (state) => state.counter.bscSearchData.pairAddress
  );

  const endpoint =
    "https://data-platform.nodereal.io/graph/v1/8cbbea1b1cbb492a884581c08c847696/projects/pancakeswap";
  const headers = {
    "content-type": "application/json",
    Authorization: "<token>",
  };

  /** Author:- vikas
  Description:- this function call pairAddress get Token liquidity, price ...etc
  **/

  /** Author:- vikas
    Description:- method calls fetchData
    **/

  // const chart1 = createChart(document.body, { width: 400, height: 300 });
  // const lineSeries = chart1.addLineSeries();
  // lineSeries.setData(volumeData);

  return (
    <div>
      <div
        className={
          mode === "dark"
            ? "dark graphIcons scrollmenu"
            : "light graphIcons scrollmenu"
        }
      >
        <div className="grphIcon-Section">
          <img src={totalliquidity} alt="" />

          <p className="price">
            {/* {props.topView && props.topView.totalSupply} */}
            {totalLiquidity !== undefined && totalLiquidity}
            <Text>Total liquidity</Text>
          </p>
          <p></p>
        </div>
        <div className="grphIcon-Section">
          <img src={price} alt="" />
          <p className="price">
            {props.topView && props.topView.PRICE}
            <Text>Price</Text>
          </p>
          <p></p>
        </div>

        <div className="grphIcon-Section">
          <img src={vol} alt="" />

          <p className="price">
            {props.topView && props.topView.VOLUME24HOUR}
            <Text>Volume (24hrs)</Text>
          </p>
          <p></p>
        </div>
        <div className="grphIcon-Section">
          <img src={transaction} alt="" />
          <p className="price">
            <span>0</span>
            {/* {props.topView && props.topView.price.transfersCount}<span>Transactions (24hrs)</span> */}
            <Text>Transactions (24hrs)</Text>
          </p>
          <p></p>
        </div>
      </div>

      <div class="chartview">
        <TradingViewWidget
          theme={mode === "dark" ? Themes.DARK : Themes.LIGHT}
          locale="fr"
          autosize
          symbol={data}
          interval="30"
          withdateranges={true}
          timezone="Etc/UTC"
          hide_side_toolbar={false}
          style={"1"}
          locale="in"
        />
      </div>

      <Transactions />
    </div>
  );
};

export default CenterPanelView;
