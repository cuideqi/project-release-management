import React from 'react';
import styles from './Header.module.scss';
import logo from '../icon_logo.png';
const Header: React.FC = () => {
  return (
    <div className={`${styles.header} display-flex flex-align-item-center`}>
      <img src={logo} className={styles.img} alt="logo" />
      <span className={styles.title}>右上角版本发布平台</span>
    </div>
  );
};
export default Header;
