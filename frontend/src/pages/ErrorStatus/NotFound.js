import React from 'react';

import { Result, Button } from 'antd';

const NotFound = ({ history }) => (
    <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button onClick={() => history.goBack()} type="primary">Back to previous page</Button>}
    />
);

export default NotFound;