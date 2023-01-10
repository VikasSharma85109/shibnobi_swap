import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
const ModelAddTokenBsc = ({ status, setGetAddressData }) => {
    useEffect(() => {
        setIsModalOpen(status)
    }, [status])
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

    console.log(88799, status)
    console.log(88799, setGetAddressData)


    console.log(8987878, setGetAddressData !== undefined ? setGetAddressData[0].name : "")
    // console.log(8987878, status)

    return (
        <div>
            
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {/* <p>
                    {
                        getTokendata.map((curVal, i) => {
                            console.log(7676, curVal)
                            return <div key={i} >
                                <span><img style={{ width: "50px" }} src={curVal.logoURI} /></span>
                                <p>{curVal.name}</p>
                                <p>{curVal.symbol}</p>
                                <p>{curVal.address}</p>
                            </div>
                        })
                    }
                </p> */}

                <p>Name : {setGetAddressData !== undefined ? setGetAddressData[0].name : ""}</p>
                <p>symbol : {setGetAddressData !== undefined ? setGetAddressData[0].symbol : ""}</p>
                <p>address : {setGetAddressData !== undefined ? setGetAddressData[0].address : ""}</p>

            </Modal>
        </div>
    );
};
export default ModelAddTokenBsc;