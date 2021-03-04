import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { Variant } from 'react-bootstrap/esm/types';

interface Props {
  variant?: Variant;
}
const Message: React.FC<Props> = ({ variant = 'info', children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
