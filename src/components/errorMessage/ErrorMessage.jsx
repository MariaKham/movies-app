import React from 'react'
import { Alert, Space } from 'antd'

function ErrorMessage() {
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
        paddingTop: 20,
        alignItems: 'center',
        margin: 10,
      }}
    >
      {/* <Alert
                message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
                type="warning"
                closable
            /> */}
      <Alert description="Nothing found, please check your request" type="error" closable />
    </Space>
  )
}

export default ErrorMessage
