import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import RendererWrapper0 from '/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/pages/.umi/LocaleWrapper.jsx';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/user',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import('../../layouts/UserLayout'),
          LoadingComponent: require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/UserLayout').default,
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
        exact: true,
      },
      {
        path: '/user/login',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/pages/User/models/register.js').then(
                  m => {
                    return { namespace: 'register', ...m.default };
                  },
                ),
              ],
              component: () => import('../User/Login'),
              LoadingComponent: require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/components/PageLoading/index')
                .default,
            })
          : require('../User/Login').default,
        exact: true,
      },
      {
        path: '/user/register',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/pages/User/models/register.js').then(
                  m => {
                    return { namespace: 'register', ...m.default };
                  },
                ),
              ],
              component: () => import('../User/Register'),
              LoadingComponent: require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/components/PageLoading/index')
                .default,
            })
          : require('../User/Register').default,
        exact: true,
      },
      {
        path: '/user/register-result',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/pages/User/models/register.js').then(
                  m => {
                    return { namespace: 'register', ...m.default };
                  },
                ),
              ],
              component: () => import('../User/RegisterResult'),
              LoadingComponent: require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/components/PageLoading/index')
                .default,
            })
          : require('../User/RegisterResult').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import('../../layouts/BasicLayout'),
          LoadingComponent: require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/BasicLayout').default,
    Routes: [require('../Authorized').default],
    routes: [
      {
        path: '/',
        redirect: '/appManager',
        exact: true,
      },
      {
        path: '/appManager',
        name: 'appManagerList',
        icon: 'appstore',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import('../config-center/AppManagerList'),
              LoadingComponent: require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/components/PageLoading/index')
                .default,
            })
          : require('../config-center/AppManagerList').default,
        exact: true,
      },
      {
        path: '/appManager/configItem',
        name: 'configItemList',
        icon: 'minus',
        hideInMenu: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import('../config-center/ConfigItemList'),
              LoadingComponent: require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/components/PageLoading/index')
                .default,
            })
          : require('../config-center/ConfigItemList').default,
        exact: true,
      },
      {
        path: '/commonConfig',
        name: 'commonConfigList',
        icon: 'usergroup-add',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import('../config-center/CommonConfigList'),
              LoadingComponent: require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/components/PageLoading/index')
                .default,
            })
          : require('../config-center/CommonConfigList').default,
        exact: true,
      },
      {
        path: '/commonConfig/commonConfigItem',
        name: 'commonConfigItemList',
        icon: 'minus',
        hideInMenu: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import('../config-center/CommonConfigItemList'),
              LoadingComponent: require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/components/PageLoading/index')
                .default,
            })
          : require('../config-center/CommonConfigItemList').default,
        exact: true,
      },
      {
        path: '/profileManager',
        name: 'profileManagerList',
        icon: 'profile',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import('../config-center/ProfileManagerList'),
              LoadingComponent: require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/components/PageLoading/index')
                .default,
            })
          : require('../config-center/ProfileManagerList').default,
        exact: true,
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import('../403'),
              LoadingComponent: require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/components/PageLoading/index')
                .default,
            })
          : require('../403').default,
        exact: true,
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import('../404'),
              LoadingComponent: require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
