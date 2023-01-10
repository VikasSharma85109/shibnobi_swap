import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { reverse, sortBy } from "lodash";
import { Table, Tag } from "antd";
const dollarUSLocale = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/**
 Author:-vikas
 Decription:- columns data
 **/

const columns = [
  {
    title: "All",
    dataIndex: "All",
    render: (_, record) => (
      <a>
        {record.__typename === "Swap" ? (
          <Tag color="#f50">{"Sell"}</Tag>
        ) : (
          <Tag color="#2db7f5">{"Buy"}</Tag>
        )}{" "}
        {record.pair.token0.symbol} for {record.pair.token1.symbol}
      </a>
    ),
  },
  {
    title: "Token Value",
    dataIndex: "address",
    align: "right",
    render: (_, record) => (
      <a>
        {record.__typename === "Swap"
          ? dollarUSLocale.format(record.amountUSD)
          : dollarUSLocale.format(record.amountUSD)}{" "}
      </a>
    ),
  },

  {
    title: "Token Value",
    dataIndex: "address",
    align: "right",
    render: (_, record) => (
      <a>
        {record.__typename === "Swap"
          ? parseFloat(record.amount0In) > 0 ? parseFloat(record.amount0In)  : parseFloat(record.amount1In) 
          : parseFloat(record.amount0)}{" "}
        {record.pair.token0.symbol}
      </a>
    ),
  },
  {
    title: "Token Value",
    dataIndex: "address",
    align: "right",
    render: (_, record) => (
      <a>
        {record.__typename === "Swap"
          ? parseFloat(record.amount1Out)  > 0 ? parseFloat(record.amount1Out)  : parseFloat(record.amount0Out) 
          : parseFloat(record.amount1)}{" "}
        {record.pair.token1.symbol}
      </a>
    ),
  },
  // {
  //   title: 'Address',
  //   dataIndex: 'address',
  //   render: (_, record) => <a>{record.to.slice(0, 5)} {"...."}{record.to.slice(-6)}</a>,
  // },
  {
    title: "Date",
    dataIndex: "address",
    align: "right",
    render: (_, record) => (
      <a>{new Date(record.transaction.timestamp * 1000).toLocaleString()}</a>
    ),
  },
];

function Transactions() {
  const [data, setData] = React.useState([]);
  const mode = useSelector((state) => state.counter.mode);

  const pairAddress = useSelector(
    (state) => state.counter.ethSearchData.pairAddress
  );

  /**
 Author:-vikas
 Decription:- this methods used call getTransactions function
 **/

  useEffect(() => {
    getTransactions();
  }, [pairAddress]);

  /**
   Author:-vikas
   Decription:- this methods used api call  render transaction tables 
   **/

  const getTransactions = async () => {
    const options = {
      method: "POST",
      url: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
      // headers: {
      //   'content-type': 'application/json',
      //   'x-rapidapi-host': 'geodb-cities-graphql.p.rapidapi.com',
      //   'x-rapidapi-key': process.env.REACT_PUBLIC_RAPIDAPI_KEY
      // },
      data: {
        query: `  {
  mints(first: 20, where: {pair: "${pairAddress}"}, orderBy: timestamp, orderDirection: desc) {
    transaction {
      id
      timestamp
      __typename
    }
    pair {
      token0 {
        id
        symbol
        __typename
      }
      token1 {
        id
        symbol
        __typename
      }
      __typename
    }
    to
    liquidity
    amount0
    amount1
    amountUSD
    __typename
  }
  burns(first: 20, where: {pair:  "${pairAddress}"}, orderBy: timestamp, orderDirection: desc) {
    transaction {
      id
      timestamp
      __typename
    }
    pair {
      token0 {
        id
        symbol
        __typename
      }
      token1 {
        id
        symbol
        __typename
      }
      __typename
    }
    sender
    liquidity
    amount0
    amount1
    amountUSD
    __typename
  }
  swaps(first: 30, where: {pair:  "${pairAddress}"}, orderBy: timestamp, orderDirection: desc) {
    transaction {
      id
      timestamp
      __typename
    }
    id
    pair {
      token0 {
        id
        symbol
        __typename
      }
      token1 {
        id
        symbol
        __typename
      }
      __typename
    }
    amount0In
    amount0Out
    amount1In
    amount1Out
    amountUSD
    to
    __typename
  }
  }`,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        const res = response.data;
        const data = res.data.swaps.concat(res.data.mints);
        // console.log('res transactions  data', sortBy(data, [function (o) { return o.transaction.timestamp; }]))
        setData(
          reverse(
            sortBy(data, [
              function (o) {
                return o.transaction.timestamp;
              },
            ])
          )
        );
        // Response received from the API
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className={mode === "dark" ? "dark" : "light"}>
      <h3 className="titlNm">Transactions</h3>
      <div className="mobileScroll">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
}

export default Transactions;
