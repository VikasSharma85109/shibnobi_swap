// import Balance1 from "../Balance";
import { useSelector } from "react-redux";
import { Typography } from "antd";
const { Text, Title } = Typography;
export const Amount = (props) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      paddingTop: 5,
    }}
    className="online"
  >
    <Text className={props.mode === "dark" ? "dark" : "light"}>Amount</Text>
    <Text className={props.mode === "dark" ? "dark" : "light"}>0</Text>
  </div>
);

export const Balance = (props) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      paddingTop: 5,
    }}
    className="online"
  >
    <Text className={props.mode === "dark" ? "dark" : "light"}>Balance</Text>
    <Text className={props.mode === "dark" ? "dark" : "light"}>{props.value}</Text>
  </div>
);

export const TotalSupply = (props) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      paddingTop: 5,
    }}
    className="online"
  >
    <Text className={props.mode === "dark" ? "dark" : "light"}>Total Supply</Text>
    <Text className={props.mode === "dark" ? "dark" : "light"}>{props.value}</Text>
  </div>
);
export const Transaction = (props) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      paddingTop: 5,
    }}
    className="online"
  >
    <Text className={props.mode === "dark" ? "dark" : "light"}>Transaction</Text>
    <Text className={props.mode === "dark" ? "dark" : "light"}>
      {props && props.transCount}
    </Text>
  </div>
);

export const MarketCap = (props) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      paddingTop: 5,
    }}
    className="online"
  >
    <Text className={props.mode === "dark" ? "dark" : "light"}>Market Cap</Text>
    <Text className={props.mode === "dark" ? "dark" : "light"}>
      {/* {props.apiHolderCount} */}
      {props.value}
    </Text>
  </div>
);

export const Holder = (props) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      paddingTop: 5,
    }}
    className="online"
  >
    <p className={props.mode === "dark" ? "dark" : "light"}>Holder</p>
    <p className={props.mode === "dark" ? "dark" : "light"}>
      {props.apiHolderCount}
    </p>
  </div>
);

export const ModelRows = ({ symbol, name, image, onclicks, mode }) => (
  <div className="p10 modeldata">
    <div style={{ display: "flex" }}>
      <div
        className="modeldata"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          class="icon-sm"
          src={image}
          alt={name}
          width={20}
          style={{ marginRight: 10 }}
        />
      </div>
      <div>
        <p>{symbol}</p>
        <p className={mode === "dark" ? "dark" : "light"}>{name}</p>
      </div>
    </div>
  </div>
);

export const convertExponentialToDecimal = (num) => {
  var nsign = Math.sign(num);
  //remove the sign
  num = Math.abs(num);
  //if the number is in scientific notation remove it
  if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
    var zero = "0",
      parts = String(num).toLowerCase().split("e"), //split into coeff and exponent
      e = parts.pop(), //store the exponential part
      l = Math.abs(e), //get the number of zeros
      sign = e / l,
      coeff_array = parts[0].split(".");
    if (sign === -1) {
      l = l - coeff_array[0].length;
      if (l < 0) {
        num =
          coeff_array[0].slice(0, l) +
          "." +
          coeff_array[0].slice(l) +
          (coeff_array.length === 2 ? coeff_array[1] : "");
      } else {
        num = zero + "." + new Array(l + 1).join(zero) + coeff_array.join("");
      }
    } else {
      var dec = coeff_array[1];
      if (dec) l = l - dec.length;
      if (l < 0) {
        num = coeff_array[0] + dec.slice(0, l) + "." + dec.slice(l);
      } else {
        num = coeff_array.join("") + new Array(l + 1).join(zero);
      }
    }
  }

  return nsign < 0 ? "-" + num : num;
};
