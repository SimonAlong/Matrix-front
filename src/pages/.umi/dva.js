import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'appManagerModel', ...(require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/models/config-center/appManagerModel.js').default) });
app.model({ namespace: 'commonConfigModel', ...(require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/models/config-center/commonConfigModel.js').default) });
app.model({ namespace: 'configItemModel', ...(require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/models/config-center/configItemModel.js').default) });
app.model({ namespace: 'profileManagerModel', ...(require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/models/config-center/profileManagerModel.js').default) });
app.model({ namespace: 'demoModel', ...(require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/models/demo/demoModel.js').default) });
app.model({ namespace: 'global', ...(require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/models/login.js').default) });
app.model({ namespace: 'menu', ...(require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/models/menu.js').default) });
app.model({ namespace: 'project', ...(require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('/Users/zhouzhenyong/project/isyscore/isc-config-ui/src/models/user.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
