import React, { Fragment } from 'react';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import GlobalFooter from '@/components/GlobalFooter';
import styles from './UserLayout.less';

const links = [
  {
    key: 'help',
    title: formatMessage({ id: 'layout.user.link.help' }),
    href: '',
  },
  {
    key: 'privacy',
    title: formatMessage({ id: 'layout.user.link.privacy' }),
    href: '',
  },
  {
    key: 'terms',
    title: formatMessage({ id: 'layout.user.link.terms' }),
    href: '',
  },
];

const copyright = (
  <Fragment>
    2020 Created by 杭州指令集智能科技有限公司
  </Fragment>
);

class UserLayout extends React.PureComponent {
  // @TODO title
  // getPageTitle() {
  //   const { routerData, location } = this.props;
  //   const { pathname } = location;
  //   let title = 'Ant Design Pro';
  //   if (routerData[pathname] && routerData[pathname].name) {
  //     title = `${routerData[pathname].name} - Ant Design Pro`;
  //   }
  //   return title;
  // }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.dividerTop} />
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                {/* eslint-disable-next-line global-require */}
                <img alt="logo" className={styles.logo} src={require('../assets/logo.png')} />
                <span className={styles.title}>杭州指令集智能科技</span>
              </Link>
            </div>
            <div className={styles.divider} />
          </div>
          {children}
        </div>
        <GlobalFooter className={styles.globalFooter} links={links} copyright={copyright} />
      </div>
    );
  }
}

export default UserLayout;
