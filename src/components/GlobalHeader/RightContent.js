import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi/locale';
import { Spin, Tag, Menu, Icon, Dropdown, Avatar } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

export default class GlobalHeaderRight extends PureComponent {
  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  getUnreadData = noticeData => {
    const unreadMsg = {};
    Object.entries(noticeData).forEach(([key, value]) => {
      if (!unreadMsg[key]) {
        unreadMsg[key] = 0;
      }
      if (Array.isArray(value)) {
        unreadMsg[key] = value.filter(item => !item.read).length;
      }
    });
    return unreadMsg;
  };

  changeReadState = clickedItem => {
    const { id } = clickedItem;
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeNoticeReadState',
      payload: id,
    });
  };

  render() {
    const {
      currentUser,
      onMenuClick,
      theme,
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );

    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }

    // console.log('head-head');
    // console.log(JSON.stringify(currentUser));
    // return (
    //   <div className={className}>
    //       <Dropdown overlay={menu}>
    //         <span className={`${styles.action} ${styles.account}`}>
    //           <Avatar
    //             size="small"
    //             className={styles.avatar}
    //             /* eslint-disable-next-line global-require */
    //             src={require('../../assets/isyscore.png')}
    //             alt="avatar"
    //           />
    //           {currentUser.displayName ? (<span>{currentUser.displayName}</span>):(<span />)}
    //         </span>
    //       </Dropdown>
    //   </div>
    // );
    return (<span />);
  }
}
