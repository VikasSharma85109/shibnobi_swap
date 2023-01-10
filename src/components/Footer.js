import React from 'react'
import { useSelector } from 'react-redux'
import '../components/Footer.css'
import FooterLogoD from '../assests/dark-theme/swap-dark.png'
import FooterLogoW from '../assests/white-theme/swap.png'




function Footer() {
  const mode = useSelector((state) => state.counter.mode);
  
  return (
    <div className={`footer ${mode}`}>
      <div className="container ">
        <div className="row">
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="footerbox quickLinksMain">
              <div className="footerLogo">
                <img src={FooterLogoD} className="dark" />
                <img src={FooterLogoW} className="white" />
              </div>
              <ul className="quickLinksUl">
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://shibnobi.zendesk.com/hc/en-us"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://blog.shibnobi.com/"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://shibnobi.com/community/">
                    Community
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://shibnobi.com/shibnobi-branding/"
                  >
                    Brand Guideline
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://shibnobi.com/pdf/pitch-desk.pdf"
                  >
                    Pitch Deck
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://shibnobi.com/pdf/Shibnobi-white-paper.pdf"
                  >
                    Whitepaper
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="footerbox footerProductsMain">
              <ul className="footerProductsUl">
                <li>
                  <h4>Products</h4>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://play.shibnobi.com/"
                  >
                    Shibnobi Play
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://verse.shibnobi.com/">
                    Shibnobi Verse
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://swap.shibnobi.com/#/swap"
                  >
                    Shibnobi Swap
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://bridge.shibnobi.com/"
                  >
                    Shibnobi Bridge
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://versestake.shibnobi.com/"
                  >
                    Shibnobi Stake
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://store.shibnobi.com/#"
                  >
                    Shibnobi Store
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://nftmint.shibnobi.com/"
                  >
                    Shibnobi NFT
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="footerbox footerMoreMain">
              <ul className="footerMoreUl">
                <li>
                  <h4>More</h4>
                </li>
                <li>
                  <a href="https://shibnobi.com/aml-policy/">AML Policy</a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://etherscan.io/token/0xab167e816e4d76089119900e941befdfa37d6b32"
                  >
                    Etherscan
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://coinmarketcap.com/currencies/shibnobi/"
                  >
                    CoinMarketCap
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.coingecko.com/en/coins/shibnobi"
                  >
                    CoinGecko
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://medium.com/@Shibnobi"
                  >
                    Medium
                  </a>
                </li>
                <li>
                  <a href="https://shibnobi.com/contact-us/">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="footerbox footerSocialMain">
              <ul className="footerMoreUl">
                <li>
                  <h4>Social</h4>
                </li>
              </ul>
              <ul class="footer-links">
                <li>
                  <a
                    class="twitter-icon"
                    target="_blank"
                    href="https://twitter.com/Shib_nobi"
                  ></a>
                </li>
                <li>
                  <a
                    class="telegram-icon"
                    target="_blank"
                    href="https://t.me/ShibnobiCommunity"
                  ></a>
                </li>
                <li>
                  <a
                    class="reddit-icon"
                    target="_blank"
                    href="https://www.reddit.com/r/Shibnobi/"
                  ></a>
                </li>
                <li>
                  <a
                    class="discord-icon"
                    target="_blank"
                    href="https://discord.com/invite/shibnobi"
                  ></a>
                </li>
              </ul>
              <ul class="footer-links">
                <li>
                  <a
                    class="facebook-icon"
                    target="_blank"
                    href="https://www.facebook.com/Shibnobi"
                  ></a>
                </li>
                <li>
                  <a
                    class="youtube-icon"
                    target="_blank"
                    href="https://www.youtube.com/shibnobi"
                  ></a>
                </li>
                <li>
                  <a
                    class="insta-icon"
                    target="_blank"
                    href="https://www.instagram.com/shibnobi/"
                  ></a>
                </li>

                <li>
                  <a
                    class="linkdeen-icon "
                    target="_blank"
                    href="https://www.linkedin.com/company/shibnobi/"
                  ></a>
                </li>
              </ul>
              <div className="charitywalletBox">
                <h3>Charity wallet</h3>
                <p className="allfontsizeSet">
                  Please send in either USDC, USDT, ETH or BNB any amount you
                  are willing to contribute.
                </p>
                <a className="curPointer">Donate </a>
              </div>
            </div>
          </div>
        </div>

        <p className="copyrighttext">Copyright Swap 2022</p>
      </div>
    </div>
  );
}

export default Footer