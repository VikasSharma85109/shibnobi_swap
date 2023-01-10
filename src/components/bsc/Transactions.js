import React, { useState } from "react";
import { useSelector } from "react-redux";
import { reverse, sortBy } from "lodash";
import { useEffect } from "react";
import axios from "axios";
import { Table, Tag } from "antd";

const columns = [
  {
    title: "All",
    dataIndex: "All",
    render: (_, record) => (
      <a>
        <Tag color={record.__typename == "Swap"? "#f50":"#2db7f5"}>{record.__typename == "Swap" ? "Sell" : "Buy"} </Tag>{" "}
        {record.token1.symbol} for {record.token0.symbol}
      </a>
    ),
  },
  {
    title: "Token Value",
    dataIndex: "address",
    render: (_, record) => <a>{parseFloat(record.amountUSD)}</a>,
  },
  {
    title: "Token Value",
    dataIndex: "address",
    render: (_, record) => <a>{parseFloat(record.amount1In)}</a>,
  },
  {
    title: "Token Value",
    dataIndex: "address",
    render: (_, record) => <a>{parseFloat(record.amount0Out)}</a>,
  },
  {
    title: "Address",
    dataIndex: "address",
    render: (_, record) => (
      <a>
        {record.to.slice(0, 5)} {"...."}
        {record.to.slice(-6)}
      </a>
    ),
  },
  {
    title: "Date",
    dataIndex: "address",
    render: (_, record) => (
      <a>{new Date(record.timestamp * 1000).toLocaleString()}</a>
    ),
  },
];
function Transactions() {
  const [data, setData] = React.useState([]);
  const mode = useSelector((state) => state.counter.mode);
  const pairAddress = useSelector(
    (state) => state.counter.bscSearchData.pairAddress
  );

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  /** 
   Author:- vikas
   Description:- this methods call pairAddress
  **/

  useEffect(() => {
    fetchData(pairAddress);
  }, [pairAddress]);

  /**
 Author:- vikas
 Description:-row Selection data
 **/

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      // Table.SELECTION_ALL,
      // Table.SELECTION_INVERT,
      // Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Buy",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "odd",
        text: "Sell",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Rent",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  /**
   Author:- vikas
   Description:-get data pairAddress 
   **/

  const fetchData = async (pairAddress) => {
    const endpoint =
      "https://data-platform.nodereal.io/graph/v1/8cbbea1b1cbb492a884581c08c847696/projects/pancakeswap";
    const headers = {
      "content-type": "application/json",
      Authorization: "<token>",
    };
    const graphqlQuery = {
      operationName: "fetchAuthor",
      query: `query fetchAuthor {mints(where:{pair:"${pairAddress}"})
    { 
      id
      token0
      {id symbol}
      token1{id
      symbol}
      to
      sender
      amount0
      amount1
      amountUSD
      timestamp
__typename
     
      
   }
   swaps(where:{pair:"${pairAddress}"})
    { 
      id
      from
      timestamp
      sender
      to
      token0
      {id symbol}
      token1{id symbol}
      amount0In
      amount1In
      amount0Out
      amountUSD
      amount1Out
      __typename
   }
}`,
      variables: {},
    };

    const response = await axios({
      url: endpoint,
      method: "post",
      headers: headers,
      data: graphqlQuery,
    });

   

    const res = response.data;
    const data = res.data.swaps.concat(res.data.mints);
   
    setData(
      reverse(
        sortBy(data, [
          function (o) {
            return o.timestamp;
          },
        ])
      )
    );
  };

  return (
    <div className={mode === "dark" ? "dark" : "light"} >
      <h3 className="titlNm">Transactions</h3>
      <div className="mobileScroll">
      <Table  columns={columns} dataSource={data} />
      </div>
      

    </div>
  );
}

export default Transactions;
