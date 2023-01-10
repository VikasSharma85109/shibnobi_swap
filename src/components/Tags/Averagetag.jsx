import { Button, Divider, Typography } from "antd";
const { Text, Title } = Typography;

const AverageTag = ({ gasdata, mode }) => {
  return (
    <div>
      <Text className={mode === "dark" ? "dark  " : "  light"}>
        {gasdata} GWEI
      </Text>
      <p style={{ fontSize: 15 }}>
        <img
          alt=""
          src="https://swap.shibnobi.com/static/media/icon-rocket.13006355.svg"
          width={15}
          style={{ marginRight: 5 }}
        />
        Average
      </p>
    </div>
  );
};

export default AverageTag;
