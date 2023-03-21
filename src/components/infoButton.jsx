import React from 'react';

/* UI Library Components */
import { Modal } from 'antd';

/* Icons */
import { InfoCircleOutlined } from '@ant-design/icons';

/* Utitlites */
import InfoText from '../utils/infoText';

const InfoButton = ({ title = 'Información', type, core }) => {
  const info = () => {
    Modal.info({
      title: title,
      content: <InfoText type={type} core={core} />,
      width: '700px',
      maskClosable: true,
    });
  };

  return (
    <InfoCircleOutlined
      onClick={info}
      style={{ color: 'white', fontSize: '20px' }}
    />
  );
};

export default InfoButton;
