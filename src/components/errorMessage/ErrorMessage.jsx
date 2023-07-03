import React from 'react'
import { Alert, Space } from 'antd'

function ErrorMessage({ description }) {
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
      <Alert Alert className="error-message" description={description} type="error" closable />
    </Space>
  )
}

export default ErrorMessage
