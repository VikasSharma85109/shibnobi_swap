import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import TradingViewWidget, {
  Themes,
} from "react-tradingview-widget";
import price from "../bsc/assets/price.svg";
import vol from "../bsc/assets/vol.svg";
import transaction from "../bsc/assets/transaction.svg";
import totalliquidityImg from "../bsc/assets/totalliquidity.svg";
import Transactions from "./Transactions";
import { Button, Divider, Typography } from "antd";
const { Text, Title } = Typography;
const CenterPanelView = (props) => { 

  const data = useSelector(
    (state) => state.counter.ethSearchData.chartValue
  );
  const mode = useSelector((state) => state.counter.mode);
  const state = useSelector((state) => state);
  const [totalliquidity, settotalliquidity] = useState("");
  const [response, saveResponse] = useState([]);
  const [token0, setToken0] = useState("");
  const [token1, setToken1] = useState("");
  const [reserve0, setReserve0] = useState();

  const [reserve1, setReserve1] = useState();
  const [priceToken, setPriceToken] = useState();
  const [usdToken, setUsdToken] = useState();
  const [transactionToken, setTransactionToken] = useState();

  const pairAddress = useSelector(
    (state) => state.counter.ethSearchData.pairAddress
  );

  function numDifferentiation(value) {
    var val = Math.abs(value);
    if (val >= 10000000) {
      val = (val / 10000000).toFixed(2) + " Cr";
    } else if (val >= 100000) {
      val = (val / 100000).toFixed(2) + " Lac";
    }
    return val;
  }
  // console.log(numDifferentiation(-500000))

  useEffect(() => {
    getTotalLiquidity();
  }, [data]);

  /**
 Author:-vikas
 Description:- this function used to get Total Liquidity price etc...
 **/

  const getTotalLiquidity = async () => {
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
  pairs(where:{id: "${pairAddress}" }) {
  id
  txCount
  token0 {
    id
    symbol
    name
    totalLiquidity
    derivedETH
    __typename
  }
  token1 {
    id
    symbol
    name
    totalLiquidity
    derivedETH
    __typename
  }
  reserve0
  reserve1
  reserveUSD
  totalSupply
  trackedReserveETH
  reserveETH
  volumeUSD
  untrackedVolumeUSD
  token0Price
  token1Price
  createdAtTimestamp
  __typename
}


}
`,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        const res = response.data;
        console.log("res transactions1", res.data.pairs[0]);
        settotalliquidity(res.data.pairs[0].token0.totalLiquidity);
        saveResponse(res.data.pairs[0]);
        setToken0(res.data.pairs[0].token0.symbol);
        setToken1(res.data.pairs[0].token1.symbol);
        setReserve0(res.data.pairs[0].reserve0);
        setReserve1(res.data.pairs[0].reserve1);
        setPriceToken(res.data.pairs[0].token0Price);
        setUsdToken(res.data.pairs[0].untrackedVolumeUSD);
        setTransactionToken(res.data.pairs[0].txCount);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

   console.log(121212121, props.topView && props.topView.total_supply)

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
          <img src={totalliquidityImg} alt="" />

          <p className="price">
            {parseFloat(props.topView && props.topView.total_supply).toFixed(2)}
            <Text>Total liquidity</Text>
          </p>
          <p></p>
        </div>

        <div className="grphIcon-Section">
          <img src={price} alt="" />
          <p className="price">
            {props.topView && props.topView.current_price}
            <Text>Price</Text>
          </p>
          <p></p>
        </div>

        <div className="grphIcon-Section">
          <img src={vol} alt="" />

          <p className="price">
          {props.topView && props.topView.total_volume}
            <Text>Volume (24hrs)</Text>
          </p>
          <p></p>
        </div>
        <div className="grphIcon-Section">
          <img src={transaction} alt="" />
          <p className="price">
            {transactionToken !== undefined ? transactionToken : 0}
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
