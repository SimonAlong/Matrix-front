import React, { PureComponent } from 'react';
import { formatMessage, setLocale, getLocale } from 'umi/locale';
import { Menu, Icon, Dropdown } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

export default class SelectLang extends PureComponent {
  changeLang = ({ key }) => {
    setLocale(key);
  };

  render() {
    const { className } = this.props;
    const selectedLang = getLocale();
    const langMenu = (
      <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={this.changeLang}>
        <Menu.Item key="zh-CN">
          <span role="img" aria-label="简体中文">
            cn
          </span>{' '}
          简体中文
        </Menu.Item>
        <Menu.Item key="zh-TW">
          <span role="img" aria-label="繁体中文">
            hk
          </span>{' '}
          繁体中文
        </Menu.Item>
        <Menu.Item key="en-US">
          <span role="img" aria-label="English">
            gb
          </span>{' '}
          English
        </Menu.Item>
        <Menu.Item key="pt-BR">
          <span role="img" aria-label="Português">
            pt
          </span>{' '}
          Português
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={langMenu} placement="bottomRight">
        <Icon
          type="global"
          className={classNames(styles.dropDown, className)}
          title={formatMessage({ id: 'navBar.lang' })}
        />
      </Dropdown>
    );
  }
}
