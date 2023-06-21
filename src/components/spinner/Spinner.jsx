import React from 'react'
import { Space, Spin } from 'antd'
import './spinner.css'

function Spinner() {
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      {/* <Space>
        <Spin tip="Loading..." size="large">
          <div className="content" />
        </Spin>
      </Space> */}

      <Spin tip="Loading..." size="large">
        <div className="content" />
        {/* <Alert
        // message="Alert message title"
        // description="Further details about the context of this alert."
        // type="info"
        /> */}
      </Spin>
    </Space>
  )
}

export default Spinner
