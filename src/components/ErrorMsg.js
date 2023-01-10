import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';
const { Paragraph, Text } = Typography;

const ErrorMsg = (props) => (
        <Result className='desc'
            status="500"
            title="Error"
            subTitle={props.error}
            extra={[<Button type="primary">Try again...!!!</Button>]}
        >

       
       
    </Result>
);

export default ErrorMsg;

