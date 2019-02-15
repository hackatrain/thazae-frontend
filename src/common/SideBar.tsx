import * as React from 'react'
import {useState} from 'react'
import {Link, navigate} from '@reach/router'

import {Layout, Menu, Icon} from 'antd'

interface SideBarProps {
  children: React.ReactChild;
}

const {Sider} = Layout

export function SideBar({children}: SideBarProps) {
  const [collapsed, setCollapse] = useState(false)

  const toggleCollapse = () => setCollapse(!collapsed)

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapse}>
        <img className="logo" />

        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Link to="/">
              <Icon type="dashboard" />
              <span>A</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="2">
            <Link to="/">
              <Icon type="table" />
              <span>B</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="3">
            <Link to="/">
              <Icon type="pie-chart" />
              <span>C</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>{children}</Layout>
    </Layout>
  )
}
