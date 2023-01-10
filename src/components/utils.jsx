import { convertExponentialToDecimal } from "./Rows/Rows";

export const containsOnlyNumbers = (str) => {
  return /^\d+$/.test(str);
};

export const subscript = (r) => {
  if (r === "" || r === "0") {
    return false;
  }
  r = convertExponentialToDecimal(r);
 
  if (r.toString().startsWith("0.")) {
    let count = 0;
    const splited = r.split(".")[1];
    const initalValue = r.split(".")[0];
    let lastDigits = "";

    for (var i = 0; i < splited.length; i++) {
      if (splited[i] === 0) {
        count++;
      } else {
        lastDigits = splited[i];
        break;
      }
    }
    return [`${initalValue}.0`, count, lastDigits];
  } else {
    return [parseFloat(r).toFixed(2), 0, 0];
  }
};
// 0  .00   8
