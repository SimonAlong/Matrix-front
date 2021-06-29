
<h1 align="center">ibo-front-base</h1>

该项目来自业内流行的基于React的集大成框架Ant design pro。公司采用2.1.1版本作为基线版本，后续开发前端项目，请以当前项目为模板进行新建自己的前端项目，禁止在该项目上直接开发业务（操作方式如下）。

## 一、前端创建
#### 1.创建自己的前端项目
去 gitlab http://10.30.30.3 创建一个空项目

#### 2.进入ibo-front-base项目
> cd ibo-front-base

#### 3.切换到master分支
> git checkout master

#### 4.添加模板项目与自己业务前端项目关联（其中xxx可以为自己的业务名，对应的git为自己创建的git）
> git remote add origin-xxx ssh://xxxx/xxx.git

#### 5.推送到自己的项目
> git push -u origin-xxx master

#### 6.删除模板的这个远端（将自己的远端再删除掉）
> git remote remove origin-xxx


### 2.配置业务
#### 1.拉取自己的界面新业务
> git clone ssh://xxxx/xxx.git xxx <br/>
> cd xxx<br/>

安装前端的依赖
> npm install <br/>

注意：
这里安装有点慢，可以采用 npm install -g 这个试试，如果没有安装npm，则请先安装Nodejs，具体方法不详述。如果npm install执行出现问题，见下面的五

至此前端已经安装完毕
## 二、前端配置
到这里其实就可以去看项目"ibo-robot"中的说明了。在执行前后端生成之后，就可以启动了，先将后端启动，然后启动前端

## 三、启动前端
当前后端都配置完成后，启动后端后，启动前端
> npm run start

即可实现增删改查的功能

## 四、说明文档
其中对于该项目中的文档相关的介绍如下：<br/>
[项目说明文档](https://www.yuque.com/simonalong/jishu/war7do) （目前说明文档还是在公网中，后续迁移到公司文档库）<br/>
[官方文档](https://pro.ant.design/)<br/>
[官方组件文档](https://ant.design/components/button-cn/)<br/>

## 五、问题
#### 1.如果出现 sh: cross-env: command not found
安装下即可：
> npm install cross-env --save-dev

#### 2.npm ERR! zlib: unexpected end of file
则配置国内淘宝的cnpm即可
> npm config set registry https://registry.npm.taobao.org <br />
> npm i

上面是公司这边的使用情况。对于Ant Design Pro怎么进行学习，这里之前自己写了一篇文章作为入门即可。为了方便我把文档迁移到下面。如果嫌太长，可以去[项目说明文档](https://www.yuque.com/simonalong/jishu/war7do)
<br/>
<br/>
<br/>
# Ant Design Pro 说明

前端采用蚂蚁金服的前端集成框架：ant-design-pro， 官网：[https://pro.ant.design/](https://pro.ant.design/)

前端采用ant-design，其中是用react写的，所以针对后端开发人员而言，学习也不是那么快，该文章用于能够快速的让后端人员上手。

<a name="kagzla"></a>
# 一、主要文件
这里主要介绍，平常开发中可能用到的一些文件，这里分为两类：
> 配置文件
> 界面文件


<a name="uggozh"></a>
## 1.配置文件
该文件用于非界面文件，用于项目中的配置的介绍

1. 后端配置文件

2. 菜单中文设置文件

3. 菜单层级设置文件


<a name="4tm6wg"></a>
### 1.后端配置文件
这里在当前的ant-design版本中文件为
> /src/config.js

```javascript
// 其中最重要的是这里
proxy: {
    // 下面是在遇到这种路径的时候进行替换
  '/businessName/': {
    // 自己的路径，其中8084是后端的端口号
    target: 'http://localhost:8080/',
    changeOrigin: true,
    pathRewrite: { '^/businessName': '' },
  },
},
```

其中该配置文件主要用于 xxxxApi.js 文件针对后端的url的替换

注意：<br />这里面最后请求的路径会自动修改掉，但是在浏览器下面查看的ip是不会变的，参考（[这里](https://github.com/ant-design/ant-design-pro/issues/2779)），但是实际的链接已经被代理成，而且能够获取数据，请注意

在console中展示的可能还是Http://localhost:8000/xxxxx，但是实际上已经替换为我们自己的这个了，比如：[http://localhost:8080/like/tina/api/v1//user/table](http://localhost:8080/like/tina/api/v1//user/table)

<a name="rvxurv"></a>
### 2.菜单中文设置文件
文件为（其中我们只考虑中文的转换，其他的暂时不考虑）：
> /src/locales/zh-CN/menu.js


文件介绍，该文件主要是给左侧菜单中的中文展示使用
```javascript
export default {
  'menu.home': '首页',
  'menu.dashboard': 'Dashboard',
  'menu.dashboard.analysis': '分析页',
  'menu.dashboard.monitor': '监控页',
  'menu.dashboard.workplace': '工作台',
  'menu.form': '表单页',
  'menu.form.basicform': '基础表单',
  'menu.form.stepform': '分步表单',
  'menu.form.stepform.info': '分步表单（填写转账信息）',
  'menu.form.stepform.confirm': '分步表单（确认转账信息）',
  'menu.form.stepform.result': '分步表单（完成）',
  'menu.form.advancedform': '高级表单',
  'menu.list': '列表页',
  'menu.list.searchtable': '查询表格',
  'menu.list.basiclist': '标准列表',
  'menu.list.cardlist': '卡片列表',
  'menu.list.searchlist': '搜索列表',
  'menu.list.searchlist.articles': '搜索列表（文章）',
  'menu.list.searchlist.projects': '搜索列表（项目）',
  'menu.list.searchlist.applications': '搜索列表（应用）',
  'menu.config': '配置',
  'menu.config.configgrouplist': '配置组',
  'menu.config.configitemlist': '配置项',
  'menu.profile': '详情页',
  'menu.profile.basic': '基础详情页',
  'menu.profile.advanced': '高级详情页',
  'menu.result': '结果页',
  'menu.result.success': '成功页',
  'menu.result.fail': '失败页',
  'menu.exception': '异常页',
  'menu.exception.not-permission': '403',
  'menu.exception.not-find': '404',
  'menu.exception.server-error': '500',
  'menu.exception.trigger': '触发错误',
  'menu.account': '个人页',
  'menu.account.center': '个人中心',
  'menu.account.settings': '个人设置',
  'menu.account.trigger': '触发报错',
  'menu.account.logout': '退出登录',
  'menu.task': '调度',
  'menu.task.tasklist': '任务调度',
};
```

比如其中的一条数据：menu.task.tasklist：‘任务调度’，该条数据用于在菜单层级设置中，比如如下，其中就是在界面展示的
```javascript
export default [
  ...
      {
        path: '/task',
        icon: 'project',
        name: 'task',
        routes: [
          {
            path: '/task/task-list',
            // 这里就是跟中文对应的文件名
            name: 'tasklist',
            component: './like/TaskList',
          },
        ],
      },
  ...
];
```

<a name="izfkvf"></a>
### 3.菜单层级设置文件
文件为：
> /config/router.config.js


该文件用于显示菜单，还是比较重要的，但是要展示自己的菜单的话，还是要自己进行单独设置，不过一键式工具中我们已经可以直接生成了，下面主要针对文件进行介绍下，全量文件如下
```javascript
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
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis' },
      {
        path: '/config',
        icon: 'setting',
        name: 'config',
        routes: [
          {
            path: '/config/config-group-list',
            name: 'configgrouplist',
            component: './config/ConfigGroupList',
          },
          {
            path: '/config/config-item-list',
            name: 'configitemlist',
            component: './config/ConfigItemList',
          },
        ],
      },
      {
        path: '/task',
        icon: 'project',
        name: 'task',
        routes: [
          {
            path: '/task/task-list',
            name: 'tasklist',
            component: './like/TaskList',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
```

其中如果有routes则就表示是父级菜单，可以进行测试下，其中内部的为子菜单，而子菜单还是可以继续向下拆分，其中component就是指向我们自己的component，就是界面xxxList.js文件

<a name="h0xhiw"></a>
## 2.界面文件
<a name="lnfrnv"></a>
### 1.界面展示文件（默认用List结尾）
自动生成工具会直接生成对应的表名+List.js，该文件就是直接在界面上展示的文件，下面主要介绍下这文件的结构
```javascript
import React, { PureComponent } from 'react';
import { connect } from 'dva';
 
// 引入antdesign的组件
import {
  Row,
  Col,
  Card,
  Badge,
  Form,
  Input,
  Button,
  Table,
  Icon,
  Select,
  Divider,
  Drawer,
  Pagination,
  InputNumber,
  Tabs,
  Modal,
} from 'antd';
 
 
// 引用第三方文件
import 'codemirror/theme/solarized.css';
 
// 下面@connect 这个是将Model文件中的数据和当前界面List关联起来
/* eslint react/no-multi-comp:0 */
@connect(({ taskModel, loading }) => ({
  // 这里是Model文件的namespace（注意：一定要保持一致）
  taskModel,
  loading: loading.models.taskModel,
}))
// @Form.create() 是一个注解，就简化了xxx = Form.create(xxx);export xxx
@Form.create()
class TaskList extends PureComponent {
  // 这个是List的一些数据，也可以放到Model中
  state = {
    addModalVisible: false,
    editModalVisible: false,
    item: {},
  };
 
  // 界面展示的列
  columns = [
    {
      name: 'id',
      title: 'index',
      dataIndex: 'id',
      width: '8%',
    },
  ];
 
  // 界面初始化
  componentDidMount() {
    ...
  }
 
  // 普通的函数
  onClose = () => {
    // 重要：当我们要调用Model中的函数的时候，应该通过dispatch来调用
    const { dispatch } = this.props;
 
    // 其中
    dispatch({
      type: 'configItem/getListCount',
      payload: {
        paneIndex: index,
        searchParam: param,
      },
    });
  };
 
  // 界面加载，每次数据有更新，该函数都会执行
  render() {
    // 变量引用：props方式，props是外部数据引用过来的变量，比如Model文件，我们这里引入，Model中的数据就应该这样使用
    const {
      taskModel: { selectState, groupAllCodeList, drawerRecord, resultOfRun, drawerVisible },
    } = this.props;
 
    // 变量引用：state方式，这个其中的变量都是自己内部的
    const { addModalVisible, editModalVisible, item } = this.state;
 
    // 定义的一些定量
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
 
    // 封装的表格
    const tabPanes = panes.map(pane => (
      <Tabs.TabPane tab={pane.title} key={pane.name}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            {/*这里是搜索框部分*/}
            <div className={styles.tableListForm}>{this.renderSearchForm()}</div>
            <div className={styles.tableListOperator} />
 
            {/*这是表格*/}
            <Table
              rowKey={record => record.id}
              dataSource={pane.content.tableList}
              columns={this.columns}
              loading={pane.content.tableLoading}
              pagination={false}
              expandedRowRender={this.expandedRowRender}
            />
            <br />
            {/*这里是页面分页部分*/}
            <Pagination
              showQuickJumper
              onChange={this.onChange}
              defaultCurrent={1}
              total={pane.content.totalNumber}
              current={pane.content.pager.pageNo}
              defaultPageSize={pane.content.pager.pageSize}
            />
          </div>
        </Card>
      </Tabs.TabPane>
    ));
 
    // 这里返回界面元素
    return (
      // 该标签为antdesign的的标签，用于菜单和界面显示
      <PageHeaderWrapper>
        <Tabs
          onChange={this.onTabChange}
          activeKey={activePaneName}
          defaultActiveKey="1"
          type="editable-card"
          onEdit={this.onEdit}
        >
          {tabPanes}
        </Tabs>
      </PageHeaderWrapper>
    );
  }
}
 
export default TaskList;java
```

<a name="d8d3dm"></a>
### 2.界面数据文件（默认用Model结尾）
```javascript
// 引入Api文件
import {
  pageList,
  add,
  deleteData,
  update,
  pageCount,
  getCodeList,
  getAllCodeList,
  disable,
  enable,
  run,
  handRun,
} from '@/services/taskApi';
 
export default {
  namespace: 'taskModel', // 这个是标示当前model的，用于跟List文件关联
 
  // 下面是定义的数据模型
  state: {
    maxTabIndex: 1, // 最大的标签页索引，用于标签新增计数用
    activePaneName: '1', // tabPane 的激活的key
    tabIndexList: ['1'], // 当前存在的标签的列表
    panes: [
      {
        name: '1',
        title: '任务调度1',
        content: {
          tableList: [],
          tableLoading: false,
          searchParam: {},
          totalNumber: 0,
          pager: {
            pageNo: 1,
            pageSize: 20,
          },
        },
      },
    ],
  },
 
  // 异步处理函数
  effects: {
 
    // 增加组配置，payload为List调度过来的参数，call为调用Api函数的方法，put为调用其他异步或者同步的方法
    *add({ payload }, { call, put }) {
      console.log('task.add 参数：');
      // 打印复杂函数
      console.log(JSON.stringify(payload));
 
      // 调用Api文件中的某个函数add，这里
      const response = yield call(add, payload);
      yield put({
        type: 'handleAddResult',
        payload: response,
      });
 
      // 调用其他的函数，同步或者异步函数均可
      yield put({
        type: 'tableFresh',
        payload: {
          paneIndex: payload.paneIndex,
        },
      });
    },
 
    // 其他函数
    ...
  },
 
  // 同步函数
  reducers: {
     
    // 同步函数xxx
    setTableLoading(state) {
      const newPanes = state.panes;
      const index = newPanes.findIndex(pane => pane.name === state.activePaneName);
      newPanes[index].content.tableLoading = true;
 
      // 下面这个retuen 在同步函数中必须存在
      return {
        ...state, // 这里...是不修改除了下面这个panes之外的其他数据，注意：...state必须有，否则其他的数据都会被清空
        panes: newPanes, // 这里是更新state中的panes字段
      };
    },
     
    // 其他函数
    ...
 
  },
};
```

<a name="wsbqpi"></a>
### 3.跟后端交互文件（默认用Api结尾）
该文件是跟后端发送url的地方
```javascript
import request from '@/utils/request';
 
// 这里我用一个变量统一表示，这个正好可以给config.js文件中的代理进行替换
const path = '/like/tina/api/v1';
 
export async function add(params) {
  console.log('taskApi.add 发送的参数');
  console.log(JSON.stringify(params));
   
  // request是框架封装的函数，body为对应的参数，method不填写，则默认为GET
  return request(`${path}/task/add`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
 
export async function deleteData(params) {
  console.log('taskApi.deleteData 发送的参数');
  console.log(JSON.stringify(params));
  return request(`${path}/task/delete/${params}`, {
    method: 'DELETE',
  });
}
 
//
export async function getCodeList() {
  console.log('taskApi.getCodeList 发送');
  return request(`${path}/task/codeList`);
}
 
 
export async function update(params) {
  console.log('taskApi.update 发送的参数');
  console.log(JSON.stringify(params));
  return request(`${path}/task/update`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
```

<a name="7zctps"></a>
# 二、页面加载流程
整体的流程是这样的：
> List->Model→Api——>后端


其中Model中放置的是数据，发起方是List模块的dispatch，一旦数据获取到更新到Model中，List界面会自动刷新，整体的流程图是这样的<br />![](https://cdn.nlark.com/yuque/0/2019/png/126182/1550191730864-e78196b3-df6d-47ea-80de-f0e26ec23213.png#align=left&display=inline&height=235&originHeight=508&originWidth=1614&status=done&style=none&width=747)<br />解释：
> connect ：对应@connect这个注解
> dispatch：对应的是dispatch函数
> action：新的版本中已经将action这个模块删除掉了，早期的写法中是还有一层Action，List那边dispatch的其实是Action这一层中的函数，而这一层再调用Model，现在新的版本中已经直接采用dispatch调用Model中的函数了，Action层已经嵌入到内核中
> Model：对应的就是我们的Model文件
> Effect：这个是Model中的异步函数，用于界面中调用获取数据比较耗时的操作，一般用于调用后端数据
> Reducer：同步函数，用于界面中的数据，一般用于在界面处理后可以直接更新，并展示到界面中，是阻塞性函数
> Subscriptioin：这个函数我们这边用的不多，主要是一种订阅，详细可参考这里：[https://dvajs.com/guide/concepts.html#effect](https://dvajs.com/guide/concepts.html#effect)

> Server：就是我们的后端


<a name="8zm6wv"></a>
# 三、文件数据用法
其中主要介绍下List怎么调用Model中的数据，其实在上面的List文件中已经介绍了，下面简单介绍下
```javascript
// 变量引用：props方式，props是外部数据引用过来的变量，比如Model文件，我们这里引入，Model中的数据就应该这样使用
const {
  taskModel: { selectState, groupAllCodeList, drawerRecord, resultOfRun, drawerVisible },
} = this.props;
```
要这样写才行，引用某个变量的数据

<a name="vi6utq"></a>
# 四、注意事项（重要）
主要介绍一些语法糖，很多都是小细节，小坑，网上资料也较少，建议关注下

<a name="tdecbe"></a>
### 1.变量的...含义
```javascript
// 同步函数xxx
setTableLoading(state) {
  const newPanes = state.panes;
  const index = newPanes.findIndex(pane => pane.name === state.activePaneName);
  newPanes[index].content.tableLoading = true;
 
  // 下面这个retuen 在同步函数中必须存在
  return {
    ...state, // 这里...是不修改除了下面这个panes之外的其他数据，注意：...state必须有，否则其他的数据都会被清空
    panes: newPanes, // 这里是更新state中的panes字段
  };
},
```
在代码中经常会见到这种“...”三个点的变量，这种表示是将变量的key展示出来

比如如果一个类型是这种：tem:{"key1":123,"key2":222}，这个变量为tem，...tem 这个就表示：“key1”:123, "key2":222，其实就是将外层剥离

<a name="rzamut"></a>
### 2.变量，这种写法
在代码中有时候会见到这种写法，如下
```javascript
dispatch({
  type: 'configItem/getPageList',
  payload: {
    paneIndex: index,
    pager,   // 这里其实就是pager:pager, 这个的简化版，就是key和value的名字相同，就可以这样写，而且建议这样写，否则核查会有告警
    searchParam: param,
  },
});
```

<a name="yi7cty"></a>
### 3.变量的打印
在日志中打印平常都是使用console.log(xxxx) 即可，但是对于复杂类型，这个打印就显示有点复杂，这里建议使用JSON打印，如下这样
```
console.log(JSON.stringify(item));
```

注意：
其中不能这么写，如下：
```
console.log("变量为："+JSON.stringify(item));
```
不能将JSON的解析和前面的字符链接，这样后来发现，就是这个JSON不生效

<a name="mwmsdw"></a>
### 4.函数的写法
函数的写法跟旧的js写法不一样，没有function关键字，平常函数都这么写
```javascript
// 没有参数
renderSearchForm = () => {
   
};
 
// 一个参数
enable = record => {
   
};
 
// 多个参数
contain = (object1, object2) => {
   
};
```

<a name="z08mrh"></a>
### 5.列中属性函数调用写法
在column中可能会添加Button或者Icon等控件，进行函数的跳转，在写的时候一定要注意使用如下的方式
```javascript
{
  key: 'delete',
  title: '删除',
  dataIndex: 'delete',
  editable: false,
  width: '5%',
  render: (text, row) => (
    <span>
      <Button type="danger" icon="delete" onClick={() => this.showDeleteConfirm(row)} />
    </span>
  ),
},
```

注意：<br />其中函数调用一定要写成
```javascript
onClick={() => this.fun()}
```
而不能写成如下： 下面这个会自动调用函数fun()
```javascript
onClick={this.fun()}
```

<a name="ca2yvs"></a>
### 6.js文件中的注释
其中"//"之后要添加一个空格，否则会报错<br />

<a name="u0ozkm"></a>
### 7.List页面调用
这个页面可以调用异步也可以调用同步函数，但是异步一般用于获取数据耗时比较长的，一般用于从后端获取数据并覆盖前端数据，同步函数用于直接将进行数据操作
<a name="61ovqq"></a>
### 8.Model页面函数调用
Model页面中有两种函数，异步函数和同步函数，但是异步函数可以调用同步函数也可以调用异步函数，而同步函数不可以调用其他的函数。

<a name="k7xrdl"></a>
# 五、参考
dva概念：[https://dvajs.com/guide/concepts.html#effect](https://dvajs.com/guide/concepts.html#effect)<br />react语法：[https://www.jianshu.com/p/7e872afeae42](https://www.jianshu.com/p/7e872afeae42)<br />antdesign官网：[https://pro.ant.design/docs/getting-started-cn](https://pro.ant.design/docs/getting-started-cn)<br />antdesign组件库：[https://ant.design/docs/react/introduce-cn](https://ant.design/docs/react/introduce-cn)<br />antdesign目录解释：<br />[https://pro.ant.design/docs/getting-started-cn](https://pro.ant.design/docs/getting-started-cn)<br />[http://www.cnblogs.com/bjlhx/p/8973658.html](http://www.cnblogs.com/bjlhx/p/8973658.html)<br />antdesignpro详细介绍：[https://www.ctolib.com/topics-134955.html](https://www.ctolib.com/topics-134955.html)

<a name="n99fpe"></a>
# 六、学习参考：
[https://blog.csdn.net/luo1055120207/article/details/78953381](https://blog.csdn.net/luo1055120207/article/details/78953381)<br />[https://blog.csdn.net/qietingfengdeyanse/article/details/81206292](https://blog.csdn.net/qietingfengdeyanse/article/details/81206292)<br />[https://zhuanlan.zhihu.com/p/36134136](https://zhuanlan.zhihu.com/p/36134136)<br />[https://pro.ant.design/index-cn](https://pro.ant.design/index-cn)<br />[http://www.cnblogs.com/bjlhx/p/9009056.html](http://www.cnblogs.com/bjlhx/p/9009056.html)<br />[https://www.ru23.com/note/ab0115f0.html](https://www.ru23.com/note/ab0115f0.html)





