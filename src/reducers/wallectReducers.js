import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wallectname: "",
  ethDetails: {
    ethToken: [
      {
        id: "shibnobi",
        chainId: 1,
        address: "0x7dac25b1a665e1c70f25f1fc37d88c99274984ed",
        name: "Shibnobi V2",
        symbol: "SHINJA",
        decimals: 9,
        logoURI: "https://etherscan.io/token/images/shibnobi_32.png?=v4",
      },

      // {
      //   chainId: 1,
      //   address: "0x22b59a7387f7d25fe2b1c692ee825e1802e6e3d5",
      //   name: "Coin view cap",
      //   symbol: "CVC",
      //   decimals: 9,
      //   token: "0x64106d77265825a7abe381da3dd8e886422028c0",
      //   logoURI:
      //     "https://s2.coinmarketcap.com/static/img/coins/64x64/19832.png",
      // },
      //0x3a1311b8c404629e38f61d566cefefed083b9670
      // {
      //   chainId: 1,
      //   address: "0x3a1311b8c404629e38f61d566cefefed083b9670",
      //   name: "Piccolo Inu",
      //   symbol: "PINU",
      //   decimals: 9,
      //   token: "0x3a1311b8c404629e38f61d566cefefed083b9670",
      //   logoURI:
      //     "https://s2.coinmarketcap.com/static/img/coins/64x64/13047.png",
      // },
      {
        id: "weth",
        name: "Ethereum",
        address: "0x0000000000000000000000000000000000000000",
        symbol: "ETH",
        decimals: 18,
        chainId: 1,
        logoURI:
          "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
      },
      {
        name: "Dai Stablecoin",
        address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        symbol: "DAI",
        decimals: 18,
        chainId: 1,
        logoURI:
          "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
      },

      {
        chainId: 1,
        address: "0xe4a16444133831a0fc84bfdd6bd01d6dcf5e69ea",
        name: "Grifters",
        symbol: "DELC",
        decimals: 9,
        logoURI:
          "https://www.dextools.io/resources/tokens/logos/ether/0xf3d4151ef04bbda5769ea6c8c0f357b872edd210.png",
      },
      {
        chainId: 1,
        address: "0xbe1fa1303e2979ab4d4e5df3d1c6e3656acab027",
        name: "Dripto",
        symbol: "DRYP",
        decimals: 18,
        logoURI:
          "https://s2.coinmarketcap.com/static/img/coins/64x64/19023.png",
      },
      {
        chainId: 1,
        address: "0x04a6b6de116fb8bf57e5ee8b05e0293ea3639fe8",
        name: "Proof of Memes",
        symbol: "ETH2.0",
        decimals: 18,
        logoURI:
          "https://s2.coinmarketcap.com/static/img/coins/64x64/22626.png",
      },

      {
        name: "Mission Helios",
        address: "0xc6d1f1d5a46de07e73091f1c8793293b203f01a1",
        symbol: "HELIOS",
        decimals: 18,
        chainId: 1,
        logoURI:
          "https://s2.coinmarketcap.com/static/img/coins/64x64/11887.png",
      },

      {
        chainId: 1,
        address: "0x2c33b28527a63cdf13c0b24ce4cf5bf9c9fb3bc6",
        name: "Shrodinger",
        symbol: "KITTYDINGER",
        decimals: 9,
        logoURI:
          "https://s2.coinmarketcap.com/static/cloud/img/dex/default-icon-day.svg?_=ca51806",
      },

      {
        chainId: 1,
        address: "0x616ef40d55c0d2c506f4d6873bda8090b79bf8fc",
        name: "Kounotori",
        symbol: "KTO",
        decimals: 9,
        logoURI:
          "https://s2.coinmarketcap.com/static/img/coins/64x64/15641.png",
      },

      {
        chainId: 1,
        address: "0x66571b3f5c925fd27aaff741c7b3bbb3f5e923a6",
        name: "Mivie Token",
        symbol: "MET",
        decimals: 18,
        logoURI:
          "https://s2.coinmarketcap.com/static/cloud/img/dex/default-icon-day.svg?_=ca51806",
      },

      {
        name: "Piccolo Token",
        address: "0x3a1311b8c404629e38f61d566cefefed083b9670",
        symbol: "PINU",
        decimals: 9,
        chainId: 1,
        logoURI:
          "https://s2.coinmarketcap.com/static/img/coins/64x64/13047.png",
      },
      {
        chainId: 1,
        address: "0xEc25e9E61D8cF73bd9Fd90E843e529334D5eBE65",
        name: "ProofOfMeta",
        symbol: "ProofOfMeta",
        decimals: 9,
        logoURI:
          "https://www.dextools.io/resources/tokens/logos/ether/0xec25e9e61d8cf73bd9fd90e843e529334d5ebe65.jpeg?1669673570342",
      },

      {
        name: "Saitanobi",
        address: "0x5e9f35e8163c44cd7e606bdd716abed32ad2f1c6",
        symbol: "SAITANOBI",
        decimals: 9,
        chainId: 1,
        logoURI:
          "https://s2.coinmarketcap.com/static/img/coins/64x64/17949.png",
      },

      {
        chainId: 1,
        address: "0x0e8d2eb7d6bdf28393c25a1966385ad32ff0259a",
        name: "Streamer Inu",
        symbol: "STREAMERINU",
        decimals: 18,
        logoURI:
          "https://s2.coinmarketcap.com/static/img/coins/64x64/18616.png",
      },

      {
        name: "YetiCoin",
        address: "0xdf96bde075d59e9143b325c75af38e208c986e6f",
        symbol: "YETIC",
        decimals: 9,
        chainId: 1,
        logoURI:
          "https://s2.coinmarketcap.com/static/img/coins/64x64/14718.png",
      },

      {
        chainId: 1,
        address: "0x2e922f84ec5bb9cedfbb1a99543b143aa43d94b6",
        name: "30H",
        symbol: "30H",
        decimals: 9,
        logoURI:
          "https://assets.coingecko.com/coins/images/26398/large/98052236.jpeg?1657770947",
      },
      {
        name: "TEST DONT USE",
        symbol: "SHINJA",
        address: "0x00B7db6B4431e345eee5cc23D21E8dbC1d5cADA3",
        chainId: 1,
        decimals: 18,
        logoURI:
          "https://s2.coinmarketcap.com/static/img/coins/64x64/19650.png",
      },
    ],
    bscToken: [
      {
        name: "Shibnobi V2",
        symbol: "SHINJA",
        address: "0x7DAc25b1A665e1c70F25F1fC37d88C99274984ed",
        chainId: 56,
        decimals: 18,
        logoURI:
          "https://s2.coinmarketcap.com/static/img/coins/64x64/22916.png",
      },
      {
        name: "BNB",
        symbol: "BNB",
        address: "0x0000000000000000000000000000000000000000",
        chainId: 56,
        decimals: 18,
        logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/7010.png",
      },
      {
        name: "WBNB Token",
        symbol: "WBNB",
        address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        chainId: 56,
        decimals: 18,
        logoURI:
          "https://tokens.pancakeswap.finance/images/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c.png",
      },
      {
        name: "PancakeSwap Token",
        symbol: "CAKE",
        address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
        chainId: 56,
        decimals: 18,
        logoURI:
          "https://tokens.pancakeswap.finance/images/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82.png",
      },
      {
        name: "Binance Pegged BUSD",
        symbol: "BUSD",
        address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
        chainId: 56,
        decimals: 18,
        logoURI:
          "https://tokens.pancakeswap.finance/images/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56.png",
      },
      {
        name: "Binance Pegged USDT",
        symbol: "USDT",
        address: "0x55d398326f99059fF775485246999027B3197955",
        chainId: 56,
        decimals: 18,
        logoURI:
          "https://tokens.pancakeswap.finance/images/0x55d398326f99059fF775485246999027B3197955.png",
      },
      {
        name: "Binance Pegged Bitcoin",
        symbol: "BTCB",
        address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
        chainId: 56,
        decimals: 18,
        logoURI:
          "https://tokens.pancakeswap.finance/images/0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c.png",
      },
      {
        name: "Binance Pegged ETH",
        symbol: "ETH",
        address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
        chainId: 56,
        decimals: 18,
        logoURI:
          "https://tokens.pancakeswap.finance/images/0x2170Ed0880ac9A755fd29B2688956BD959F933F8.png",
      },
      {
        name: "Bunny Token",
        symbol: "BUNNY",
        address: "0xC9849E6fdB743d08fAeE3E34dd2D1bc69EA11a51",
        chainId: 56,
        decimals: 18,
        logoURI:
          "https://tokens.pancakeswap.finance/images/0xC9849E6fdB743d08fAeE3E34dd2D1bc69EA11a51.png",
      },
      {
        name: "Venus Token",
        symbol: "XVS",
        address: "0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63",
        chainId: 56,
        decimals: 18,
        logoURI:
          "https://tokens.pancakeswap.finance/images/0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63.png",
      },
      {
        name: "Alpaca",
        symbol: "ALPACA",
        address: "0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F",
        chainId: 56,
        decimals: 18,
        logoURI:
          "https://tokens.pancakeswap.finance/images/0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F.png",
      },
      {
        name: "Polkadot Token",
        symbol: "DOT",
        address: "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402",
        chainId: 56,
        decimals: 18,
        logoURI:
          "https://tokens.pancakeswap.finance/images/0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402.png",
      },
      {
        name: "Refinable",
        symbol: "FINE",
        address: "0x4e6415a5727ea08aAE4580057187923aeC331227",
        chainId: 56,
        decimals: 18,
        logoURI:
          "https://tokens.pancakeswap.finance/images/0x4e6415a5727ea08aAE4580057187923aeC331227.png",
      },
      {
        name: "Binance Pegged DAI",
        symbol: "DAI",
        address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
        chainId: 56,
        decimals: 18,
        logoURI:
          "https://tokens.pancakeswap.finance/images/0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3.png",
      },
      {
        name: "Binance Pegged USD Coin",
        symbol: "USDC",
        address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
        chainId: 56,
        decimals: 18,
        logoURI:
          "https://tokens.pancakeswap.finance/images/0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d.png",
      },
      {
        name: "LunaOne",
        symbol: "LunaOne",
        address: "0x2e2EA48C9412E0ABb2D6accCeC571C6b6411725a",
        chainId: 56,
        decimals: 18,
        logoURI:
          "https://s2.coinmarketcap.com/static/img/coins/64x64/22670.png",
      },
      //Volt Inu V2
      {
        name: "Volt Inu V2",
        symbol: "VOLT",
        address: "0x7db5af2b9624e1b3b4bb69d6debd9ad1016a58ac",
        chainId: 56,
        decimals: 9,
        logoURI:
          "https://s2.coinmarketcap.com/static/img/coins/64x64/19650.png",
      },
      //PLNT MAX
      {
        name: "PLNT MAX",
        symbol: "PLNT",
        address: "0xef05cb2243e410c3a9498523babd5bad2e8f2dea",
        chainId: 56,
        decimals: 9,
        logoURI:
          "https://s2.coinmarketcap.com/static/img/coins/64x64/19650.png",
      },
      //0x33A773eb112dEca4C1b56bD2c6A15520305b5595
      {
        name: "1 V2",
        symbol: "SHINJA11",
        address: "0x5AF69DF134E712baC4a4354F238Ff765a7E2C14c",
        chainId: 97,
        decimals: 18,
        logoURI:
          "https://s2.coinmarketcap.com/static/img/coins/64x64/22916.png",
      },
      {
        name: "2 V2",
        symbol: "SHINJA1",
        address: "0x8b68Dd1a63a1b1442a1341df777FCE96692c0602",
        chainId: 97,
        decimals: 18,
        logoURI:
          "https://s2.coinmarketcap.com/static/img/coins/64x64/22916.png",
      },
    ],
  },

  ethSearchData: {
    name: "Shibnobi -SHINJA",
    value: "Shibnobi -SHINJA",
    chartValue: "UNISWAP:SHINJAWETH",

    symbol: "shinja",
    token0: "0x7dac25b1a665e1c70f25f1fc37d88c99274984ed",
    token1: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    pairAddress: "0x57ebc28df00ed93552af8fd81439700a95647b8d",
  },

  bscSearchData: {
    name: "SHINJA - SHINJA",
    value: "SHINJA - SHINJA",
    chartValue: "PANCAKESWAP:SHINJAUSD_A185CC",
    id: "SHINJA",
    symbol: "SHINJA",
    // address: "0x7DAc25b1A665e1c70F25F1fC37d88C99274984ed",
    token0: "0x7cc839f312092f480d1f0c0ef2c50debc23d54f6",
    token1: "",
    pairAddress: "0x3ef07716aabdd8723d74c9666e44c20842134512",
  },

  mode: "light",
  EthNavbarSearch: "0x57ebc28df00ed93552af8fd81439700a95647b8d",

  currentRouterOfEth: "shibnobi",

  currentRouterOfBsc: "shibnobi",
};

export const wallet = createSlice({
  name: "moduleDetails",
  initialState,
  reducers: {
    changeName: (state, action) => {
      state.wallectname = action.payload;
    },
    accountno: (state, action) => {
      state.walletbalanced = action.payload;
    },
    addEthDetails: (state, action) => {
      state.ethDetails = action.payload;
    },
    addEth: (state, action) => {
      // state.ethDetails.ethToken.push(action.payload);
    },
    addBsc: (state, action) => {
      // state.ethDetails.bscToken.push(action.payload);
    },
    addEthReset: (state, action) => {
      // state.ethDetails.ethToken = action.payload;
    },
    addBscReset: (state, action) => {
      // state.ethDetails.bscToken = action.payload;
    },
    addEthNewToken: (state, action) => {
      state.ethToken.data.push(action.payload);
    },

    addBscNewToken: (state, action) => {
      state.bscToken.data.push(action.payload);
    },
    getTokenData: (state, action) => {
      state.navbarToken = action.payload;
    },

    changeMode: (state, action) => {
      state.mode = action.payload;
    },

    getNavbarTokenSymbol: (state, action) => {
      state.EthNavbarSearch = action.payload;
    },

    getNavbarTokenSymbolBsc: (state, action) => {
      state.navbarTokenSymbolBsc = action.payload;
    },

    getEthSearchData: (state, action) => {
      state.ethSearchData = action.payload;
    },

    getBscSearchData: (state, action) => {
      state.bscSearchData = action.payload;
    },
    addTokenAddress: (state, action) => {
      // state.ethDetails.ethToken.push(action.payload);
    },

    addTokenAddressBsc: (state, action) => {
      // state.ethDetails.bscToken.push(action.payload);
    },

    addCurrentRouterOfEth: (state, action) => {
      state.currentRouterOfEth = action.payload;
    },

    addCurrentRouterOfBsc: (state, action) => {
      state.currentRouterOfBsc = action.payload;
    },
  },
});

export const {
  changeName,
  accountno,
  addEthDetails,
  addEth,
  addBsc,
  addEthReset,
  addBscReset,
  addEthNewToken,
  addBscNewToken,

  addNavbarApiData,
  getTokenData,
  changeMode,
  getNavbarTokenSymbol,
  getNavbarTokenSymbolBsc,
  getTokenDataBsc,
  getEthNavbarSearch,
  ethSearch,
  bscSearch,
  getEthSearchData,
  getBscSearchData,
  addTokenAddress,
  addTokenAddressBsc,
  addCurrentRouterOfEth,
  addCurrentRouterOfBsc,
} = wallet.actions;

export default wallet.reducer;
