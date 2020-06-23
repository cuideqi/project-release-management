import React from 'react';
import { Menu } from 'antd';
import { ChromeOutlined, CloudServerOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const Nav: React.FC = () => {
  return (
    <div className={`nav`}>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
      >
        <Menu.Item key="1" icon={<ChromeOutlined />}>
          <Link to="/frontend">前端</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<CloudServerOutlined />}>
          <Link to="/backend">后端</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};
export default Nav;
