import React, { useEffect, useState } from "react";
import { Modal } from "antd";
const ModelAddToken = ({ status, setGetAddressData }) => {
  useEffect(() => {
    setIsModalOpen(status);
  }, [status]);
  const [isModalOpen, setIsModalOpen] = useState(status);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const getDataToken = useSelector((state) => state.counter.ethDetails.bscToken);

  // console.log(56556, getDataToken)

  // console.log(8987878, status)

  return (
    <div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Name :{" "}
          {setGetAddressData !== undefined ? setGetAddressData[0].name : ""}
        </p>
        <p>
          symbol :{" "}
          {setGetAddressData !== undefined ? setGetAddressData[0].symbol : ""}
        </p>
        <p>
          address :{" "}
          {setGetAddressData !== undefined ? setGetAddressData[0].address : ""}
        </p>
      </Modal>
    </div>
  );
};
export default ModelAddToken;
