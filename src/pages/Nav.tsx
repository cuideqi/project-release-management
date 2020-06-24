import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { ChromeOutlined, CloudServerOutlined } from '@ant-design/icons';
import { NavLink, useLocation } from 'react-router-dom';
import { SafeAny } from '../http/http.service';
const Nav: React.FC = () => {
  const l = useLocation();
  let [current, setCurrent] = useState('1');
  useEffect(() => {
    if (l.pathname === '/backend') {
      setCurrent('2')
    }
  }, [l.pathname]);
  function handleClick(params: SafeAny) {
    setCurrent(params.key)
  }
  return (
    <div className={`nav`} style={{height: '100%'}}>
      <Menu
        defaultSelectedKeys={['1']}
        onClick={handleClick}
        selectedKeys={[current]}
        mode="inline"
        theme="dark"
        style={{height: '100%'}}
      >
        <Menu.Item key="1" icon={<ChromeOutlined />} className="nav-item">
          <NavLink to="/frontend" >前端</NavLink>
        </Menu.Item>
        <Menu.Item key="2" icon={<CloudServerOutlined />} className="nav-item">
          <NavLink to="/backend">后端</NavLink>
        </Menu.Item>
      </Menu>
    </div>
  );
};
export default Nav;
