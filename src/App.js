import React, { useEffect, useState } from "react";
import "./App.css";
import "@rainbow-me/rainbowkit/styles.css";
import { ConfigProvider } from "antd";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EthTest from "./components/ethTest/EthTest";
import Bsc from "./components/bsc/Bsc";
import { useDispatch } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";

import {
  connectorsForWallets,
  darkTheme,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";

import {
  chain,
  configureChains,
  createClient,
  useNetwork,
  useProvider,
  useSigner,
  WagmiConfig,
} from "wagmi";

import { infuraProvider } from "wagmi/providers/infura";

import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
  ledgerWallet,
  argentWallet,
  braveWallet,
  coinbaseWallet,
  imTokenWallet,
  trustWallet,
  omniWallet,
} from "@rainbow-me/rainbowkit/wallets";

import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { changeName } from "./reducers/wallectReducers";
import ErrorMsg from "./components/ErrorMsg";
import { QueryClient } from "react-query";
import Web3 from "web3";

const queryClient = new QueryClient();

const bsc = {
  id: 56,
  name: "BSC",
  network: "BNB Smartchain",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB",
  },
  rpcUrls: {
    default: "https://bsc-dataseed2.defibit.io",
  },
  blockExplorers: {
    default: { name: "BscScan", url: "https://bscscan.com" },
  },
  testnet: false,
};

const bscTestnet = {
  id: 97,
  name: "BSC Testnet",
  network: "BNB Smartchain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB",
  },
  rpcUrls: {
    default: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  },
  blockExplorers: {
    default: { name: "BscScan", url: "https://testnet.bscscan.com" },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [bscTestnet, chain.mainnet],
  [
    infuraProvider({ apiKey: "dab1364f1304408b9d44f36d0773cf0a" }),
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== bscTestnet.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
  ]
);

// connect for wallets

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      rainbowWallet({ chains }),
      walletConnectWallet({ chains }),
      metaMaskWallet({ chains }),
      ledgerWallet({ chains }),
      argentWallet({ chains }),
      braveWallet({ chains }),
      coinbaseWallet({ chains }),
      imTokenWallet({ chains }),
      trustWallet({ chains }),
      omniWallet({ chains }),
    ],
  },
]);

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App() {
  const { chain, chains } = useNetwork();
  const providerETH = window.ethereum;
  const providerBSC = window.ethereum;

  const dispatch = useDispatch();
  const [topViewData, setTopviewData] = useState({});
  const mode = useSelector((state) => state.counter.mode);

  const settopViewData = (data) => {
    setTopviewData(data);
  };

  useEffect(() => {
    dispatch(changeName(chain ? chain.id : 1));
  });

  const OurFallbackComponent = ({
    error,
    componentStack,
    resetErrorBoundary,
  }) => {
    return (
      <div className="dark">
        <ErrorMsg error={error.message} />
      </div>
    );
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#fe01ff",
          fontFamily : "Montserrat",
        },
      }}
    >
      <ErrorBoundary FallbackComponent={OurFallbackComponent}>
        <WagmiConfig client={client}>
          <RainbowKitProvider
            showRecentTransactions={true}
            initialChain={1}
            theme={
              mode === "light"
                ? lightTheme({
                    accentColor: "#7b3fe4",
                    accentColorForeground: "white",
                    borderRadius: "small",
                    fontStack: "system",
                    overlayBlur: "small",
                  })
                : darkTheme({
                    accentColor: "#7b3fe4",
                    accentColorForeground: "white",
                    borderRadius: "small",
                    fontStack: "system",
                    overlayBlur: "small",
                  })
            }
            chains={chains}
          >
            <div className="dark">
              <Navbar
                provider={provider}
                chain={chain}
                topViewData={settopViewData}
              />
              {(chain && chain.id == "1") || chain == null ? (
                <EthTest
                  provider={providerETH}
                  chain={chain}
                  topViewData={topViewData}
                />
              ) : (
                <Bsc
                  provider={providerBSC}
                  chain={chain}
                  topViewData={topViewData}
                />
              )}
              <Footer />
            </div>
          </RainbowKitProvider>
        </WagmiConfig>
      </ErrorBoundary>
    </ConfigProvider>
  );
}
