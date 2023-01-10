import { Button, Divider, Typography } from "antd";
const { Text, Title } = Typography;

const FastTag = ({ gasdata, mode }) => {
  return (
    <div>
      <Text className={mode === "dark" ? "dark " : " light"}>
        {gasdata} GWEI
      </Text>
      <p style={{ fontSize: 15 }}>
        <img
          alt=""
          src="https://swap.shibnobi.com/static/media/icon-car.33259258.svg"
          width={15}
          style={{ marginRight: 5 }}
        />
        Fast
      </p>
    </div>
  );
};

export default FastTag;
