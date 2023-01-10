import React, { useEffect, useState } from "react";
import "./navbar.css";
import axios from "axios";
import darklogo from "../assests/logo-dark-mode.png";
import lightlogo from "../assests/logo-light-mode.png";
import MobileLogo from "../assests/menu-icons/swap_ico.svg";
import imagetwo from '../assests/imagetwo.png'
import { ethSearchList } from "./ethSearchList";
import { Button, Popover } from "antd";
import { AutoComplete, Carousel } from "antd";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useSelector, useDispatch } from "react-redux";
import {
  changeName,
  changeMode,
  getEthSearchData,
  getBscSearchData,
} from "../reducers/wallectReducers";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { ConnectButton } from "@rainbow-me/rainbowkit";

// wallet
import { bscSearchList } from "./bscSearchList";

const Navbar = (props) => {
  const [provider, setProvider] = useState();


  const chain = useSelector((state) => state.counter.wallectname);

  const mode = useSelector((state) => state.counter.mode);
  const [searchValue, setSearchValue] = useState("");
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [gasdata, setGasdata] = useState("0");
  const [averagegas, setAveragegas] = useState("0");
  const [slowgas, setSlowgas] = useState("0");
  const [navbarToken, setNavbarToken] = useState(
    (props.chain == undefined && "1") || props.chain.id == 1
      ? ethSearchList
      : bscSearchList
  );
  const [searchItem, setSearchItem] = useState("");

  const [videoData, setVideoData] = useState([]);

  const [getImage, setGetImage] = useState([])

  const [usdprice, setUsdprice] = useState(0.0);
  const [shinjaUSD, setShinjaUSD] = useState(0.0);

  const [gettingChartData, setGettingChartData] = useState(true);
  const [ethTopViewData, setEthTopViewData] = useState([]);
  const dispatch = useDispatch();

  const content = (
    <div>
      <p className="allfontsizeSet"> {gasdata} Fastest</p>
      <p className="allfontsizeSet">{averagegas} Averga</p>
      <p className="allfontsizeSet">{slowgas} Slow</p>
    </div>
  );


  const contentStyle = {
    // height: '160px',
    color: '#fff',
    // lineHeight: '160px',
    // textAlign: 'center',
    // background: '#364d79',
  };





  /**
   Author:-vikas
   Description:-this methods used eth Top View
   **/





  useEffect(() => {
    const url =
      // props.chain.id == undefined && "1" == 1
      props.chain == undefined || props.chain.id == 1
        ? "https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=KMRND4UZ3YVBXWDIHFEXKA3F6IPETNXIEC"
        : "https://api.bscscan.com/api?module=gastracker&action=gasoracle&apikey=71J64U623PK3QCEMRRHNGKYJ1WC946S2NS";

    axios
      .get(url)
      .then(function (response) {
        setGasdata(response.data.result.FastGasPrice);
        setAveragegas(response.data.result.ProposeGasPrice);
        setSlowgas(response.data.result.SafeGasPrice);
      })
      .catch(function () {
        // handle error
      })
      .finally(function () {
        // always executed
      });

    //  tokenapi()
  }, [props]);

  /**
   Author:- vikas
   description:- check dark and light mode
   **/
  const changemode = () => {
    if (mode === "light") dispatch(changeMode("dark"));
    else dispatch(changeMode("light"));
  };

  // const searchHandle = (e) => {
  //   setSearchValue(e.target.value);
  // };


  console.log(6436, 'uerd', getImage)
  const fetchImage = () => {
    axios.post(`http://ec2-34-207-128-251.compute-1.amazonaws.com:8081/api/clientBasedVideos/get-client-based-videos-by-client-id/25`).then((response) => {
      // console.log(6436, response.data.data.reverse()[0].video_id)
      let data = response.data.data.filter(element => element.product_id == 8).map(data => data)
      data = data.reverse();
      console.log(11111, data[0].video_id)
      setGetImage(data[0].video_id)
    })

  }

  useEffect(() => {
    fetchImage()
  }, [])


  /**
     Author:- vikas
     Description:- this function used get Chart Data table 
     **/

  const getChartData = (data) => {
    if (props.chain === undefined || props.chain.id == "1")
      dispatch(getEthSearchData(data));
    else dispatch(getBscSearchData(data));
    //https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=shibnobi&order=market_cap_desc&per_page=100&page=1&sparkline=false

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=${data.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .then((response) => {
        if (response.data.length > 0)
          console.log(121212, response.data[0])
        props.topViewData(
          response.data[0]
        );
      });
  };

  /**
       Author:- vikas
       description:- this useEefect used bsc and eth coin 
       **/

  React.useEffect(() => {
    if ((props.chain == undefined && "1") || props.chain.id == 1)
      getChartData(ethSearchList[0]);
    else getChartData(bscSearchList[0]);
  }, [(props.chain == undefined && "1") || props.chain.id == 1]);

  /**
    Author:- vikas
    description:- this useEffect used shinja price and Bnb price
         **/
  useEffect(() => {
    if (
      // props.chain.id == 1
      (props.chain == undefined && "1") ||
      props.chain.id == 1
    ) {
      axios
        .get(
          `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=2e42f86bf533950e84569f24c3418971aed54f31dc4786ca577a724d744b46c6`
        )
        .then((response) => {
          setUsdprice(response.data.USD);
        });
    } else {
      axios
        .get(
          `https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD&api_key=2e42f86bf533950e84569f24c3418971aed54f31dc4786ca577a724d744b46c6`
        )
        .then((response) => {
          setUsdprice(response.data.USD);
        });
    }



    axios
      .get(
        `https://min-api.cryptocompare.com/data/price?fsym=SHINJA&tsyms=USD&api_key=2e42f86bf533950e84569f24c3418971aed54f31dc4786ca577a724d744b46c6`
      )
      .then((response) => {
        setShinjaUSD(response.data.USD);
      });


  }, [(props.chain == undefined && "1") || props.chain.id == 1]);

  /**
 Author:- vikas
 description:- this function used page reload
 **/

  /**
   Author:- vikas
   description:- this account used Accounts Changed,Chain Changed and Disconnect
   **/

  const settings = {
    // dots: true,
    // fade: true, 
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 20000,
    cssEase: "linear",
  };

  const url = `http://ec2-34-207-128-251.compute-1.amazonaws.com:8081/videos/`;


  return (
    <>
      <div className={mode === "dark" ? "dark top-bar" : "light top-bar"}>
        <div className="addBanner" >
          <Slider {...settings} className="slider__part">
            {getImage.length > 0 && getImage.split(" ").map((curVal, index) => {
              if (index != 0) {
                return (
                  <img height={100} src={"http://ec2-34-207-128-251.compute-1.amazonaws.com:8081/videos/" + curVal} alt="banner_image" />
                );
              }


            })}
          </Slider>
        </div>


        <nav style={{ marginTop: 50 }} className=" top-bar-nav navbar navbar-expand-lg navbar nv-text">
          <div className="logo">
            <a className="navbar-brand" href="#">
              <img src={MobileLogo} className="mobile-logo" />
              <img src={mode === "dark" ? darklogo : lightlogo} alt="" />
            </a>
          </div>

          <ul className="navbar-nav shibnobi-nav-menu ">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle icon-squared-menu"
                href="#"
                id="navbardrop"
                data-toggle="dropdown"
              ></a>
              <div className="dropdown-menu shibnobi-dropdown-menu">
                <ul className="nav">
                  <li>
                    <a
                      className="dropdown-item"
                      href="https://swap.shibnobi.com/#/swap"
                      target="_blank"
                    >
                      <i className="icon-swap"></i>Shibnobi Swap
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="https://nftmint.shibnobi.com/"
                      target="_blank"
                    >
                      <i className="icon-nft"></i>Shibnobi NFT
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="https://shibnobi.com/#"
                      target="_blank"
                    >
                      <i className="icon-bridge"></i>Advertise with us
                    </a>
                  </li>

                  <li>
                    <a
                      className="dropdown-item"
                      href="https://bridge.shibnobi.com/"
                      target="_blank"
                    >
                      <i className="icon-bridge"></i>Shibnobi Bridge
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="https://play.shibnobi.com/"
                      target="_blank"
                    >
                      <i className="icon-play"></i>Shibnobi Play
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="https://shibnobi.com/#"
                      target="_blank"
                    >
                      <i className="icon-support"></i>
                      <span>Refer a friend</span>{" "}
                      <span className="cms">Coming soon</span>
                    </a>
                  </li>

                  <li>
                    <a
                      className="dropdown-item"
                      href="https://luckdraw.io/"
                      target="_blank"
                    >
                      <i className="icon-swap"></i>Luckdraw
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="https://verse.shibnobi.com/"
                      target="_blank"
                    >
                      <i className="icon-verse"></i>
                      <span>Shibanobi Verse</span>
                      <span className="cms">Coming soon</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="https://shibnobi.com/#"
                      target="_blank"
                    >
                      <i className="icon-support"></i>
                      <span>Community</span>{" "}
                      <span className="cms">Coming soon</span>
                    </a>
                  </li>

                  <li>
                    <a
                      className="dropdown-item"
                      href="https://versestake.shibnobi.com/"
                      target="_blank"
                    >
                      <i className="icon-stock"></i>Shibanobi Stake
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="https://shibnobi.com/#"
                      target="_blank"
                    >
                      <i className="icon-software"></i>
                      <span>Shibanobi Software</span>{" "}
                      <span className="cms">Coming soon</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="https://dao.shibnobi.com/"
                      target="_blank"
                    >
                      <i className="icon-dao"></i>Shibanobi DAO
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>

          <AutoComplete
            className="searchTop"
            style={{
              width: 300,
            }}
            placeholder={"Search token by name, ticker or token address"}
            allowClear
            onSelect={(value, option) => getChartData(option)}
            options={
              // props.chain.id == 1
              chain == 1 ? ethSearchList : bscSearchList
            }
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1 ||
              option.token0.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1 ||
              option.token1.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1 ||
              option.pairAddress
                .toUpperCase()
                .indexOf(inputValue.toUpperCase()) !== -1
            }
          />

          <Popover content={content} title="Gas Tracker">
            <Button type="primary" className="gweiBtn">
              {gasdata} GWEI
            </Button>
          </Popover>

          <div className="middle">
            <p style={{ fontWeight: 700 }} className="allfontsizeSet">
              {
                // props.chain.id !== 1
                props.chain == undefined || props.chain.id == 1 ? (
                  <img
                    src="https://etherscan.io/images/ethereum-icon.png"
                    alt=""
                    width={20}
                  ></img>
                ) : (
                  <img
                    src="https://tokens.pancakeswap.finance/images/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c.png"
                    width={20}
                    alt=""
                  ></img>
                )
              }
              <span> </span>
              {usdprice}
            </p>
            &nbsp;
            <p style={{ fontWeight: 700 }} className="allfontsizeSet">
              <img
                src="https://s2.coinmarketcap.com/static/img/coins/64x64/14774.png"
                width={20}
                alt=""
              ></img>

              <span> </span>

              {parseFloat(shinjaUSD).toFixed(6)}
            </p>
          </div>
          <div className="rght">
            <ConnectButton />

            <div
              className={mode === "dark" ? "dark modeicon" : "light modeicon"}
            >
              <div onClick={changemode}>
                {mode === "light" ? (
                  <span>
                    <LightModeIcon />
                  </span>
                ) : (
                  <span>
                    <DarkModeOutlinedIcon />{" "}
                  </span>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
