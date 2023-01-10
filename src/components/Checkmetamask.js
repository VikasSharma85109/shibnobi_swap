
import React from 'react';
import { Button, Result } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { Suspense } from 'react';
import { Justify } from 'react-bootstrap-icons';
const Apps = React.lazy(() => import('../App'));
const Loader = (
    <LoadingOutlined
        style={{
            fontSize: 36,

        }}
        spin
    />

);
const metaMask = typeof window.ethereum
console.log(metaMask !== 'undefined')
const CheckMetaMask = () => {
    return metaMask === 'undefined' ?
        <Result
            status="404"
            title="Meta Mask Not installed"
            subTitle="Sorry, you have not install metamask to access this website."
            extra={<Button type="primary" onClick={() => window.location.reload(false)}>Refresh</Button>}
        /> : <Suspense fallback={<Spin style={{
            display: "flex", alignItems: "center",
            justifyContent: "center"
        }} indicator={Loader} />}>
            <Apps />
        </Suspense>
}

export default CheckMetaMask;