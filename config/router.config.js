export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/appManager' },

      // 应用管理
      {
        path: '/appManager',
        name: 'appManagerList',
        icon: 'appstore',
        // 直连阶段先删除，接入权限时候放开即可
        // authority: ['AppManagerList'],
        component: './config-center/AppManagerList',
      },
      // 配置项
      {
        path: '/appManager/configItem',
        name: 'configItemList',
        icon: 'minus',
        hideInMenu: true,
        // 直连阶段先删除，接入权限时候放开即可
        // authority: ['ConfigItemList'],
        component: './config-center/ConfigItemList',
      },
      // 公共配置
      {
        path: '/commonConfig',
        name: 'commonConfigList',
        icon: 'usergroup-add',
        // 直连阶段先删除，接入权限时候放开即可
        // authority: ['CommonConfigList'],
        component: './config-center/CommonConfigList',
      },
      // 公共配置的配置项
      {
        path: '/commonConfig/commonConfigItem',
        name: 'commonConfigItemList',
        icon: 'minus',
        hideInMenu: true,
        // 直连阶段先删除，接入权限时候放开即可
        // authority: ['ConfigItemList'],
        component: './config-center/CommonConfigItemList',
      },
      // 环境变量
      {
        path: '/profileManager',
        name: 'profileManagerList',
        icon: 'profile',
        // 直连阶段先删除，接入权限时候放开即可
        // authority: ['CenterAppManagerList'],
        component: './config-center/ProfileManagerList',
      },
      // 403
      {
        component: '403',
      },
      // 404
      {
        component: '404',
      },
    ],
  },
];
