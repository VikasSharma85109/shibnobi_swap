import { Button, Divider, Typography } from "antd";
const { Text, Title } = Typography;

const SlowTag = ({ gasdata, mode }) => {
  return (
    <div>
      <Text className={mode === "dark" ? "dark " : " light"}>
        {gasdata} GWEI
      </Text>
      <p style={{ fontSize: 15 }}>
        <img
          alt=""
          src="https://swap.shibnobi.com/static/media/icon-snail.ee231b9b.svg"
          width={15}
          style={{ marginRight: 5 }}
        />
        Slow
      </p>
    </div>
  );
};

export default SlowTag;
