import {
  getPage,
  add,
  importConfig,
  configInitShow,
  downLoadConfigInit,
  deleteData,
  getAppOverview,
  getGroupList,
  getAppListOfCommon,
  update
} from '@/services/config-center/appManagerApi';

import { notification } from 'antd';
export default {
  namespace: 'appManagerModel', // 这个是标示当前model的

  // 下面是定义的数据模型
  state: {
    // 数据
    tableList: [],
    tableLoading: false,
    searchParam: {},
    totalNumber: 0,
    profile: "default",
    // 总览的value
    currentValue: "",
    // 配置的分组
    groupList: [],
    // 应用开发者的应用的初始配置
    initConfigValue: "",
    // 公共应用名列表
    commonAppNameList: [],
    pager: {
      pageNo: 0,
      pageSize: 20,
    },
  },

  // 异步处理函数
  effects: {
    // 用于其他操作之后刷新界面
    // eslint-disable-next-line no-unused-vars
    *tableFresh({payload}, { put }) {
      //console.log('appManagerModel.tableFresh 参数：');
      //console.log(JSON.stringify(payload));
      yield put({
        type: 'getPage',
        payload: {
          pager: {
            pageNo: 0,
            pageSize: 20
          },
          searchParam: payload
        },
      });
    },

    // 增加组配置
    *add({ payload }, { call, put }) {
      // //console.log('appManagerModel.add 参数：');
      // //console.log(JSON.stringify(payload));
      const response = yield call(add, payload);
      // 调用失败
      if (response.code !== undefined) {
        // 提示失败的弹窗
        notification.error({
          message: `${response.message}`,
          description: `${response.detail}`,
        });
      }
      yield put({
        type: 'handleAddResult',
        payload: response,
      });

      // 调用界面刷新
      yield put({
        type: 'tableFresh',
        payload: {
          profile: payload.profile
        }
      });
    },

    // 导入配置
    *importConfig({ payload }, { call, put }) {
      // //console.log('appManagerModel.add 参数：');
      // //console.log(JSON.stringify(payload));
      const response = yield call(importConfig, payload);
      // 调用失败
      if (response.code !== undefined) {
        // 提示失败的弹窗
        notification.error({
          message: `${response.message}`,
          description: `${response.detail}`,
        });
      }
      yield put({
        type: 'handleImportConfig',
        payload: response,
      });

      // 调用界面刷新
      yield put({
        type: 'tableFresh',
        payload: {
          profile: payload.profile
        }
      });
    },

    // 部署应用的配置的展示
    *configInitShow({ payload }, { call, put }) {
      // console.log('appManagerModel.configInitShow 参数：');
      // console.log(JSON.stringify(payload));
      const response = yield call(configInitShow, payload);
      // console.log('appManagerModel.configInitShow res：');
      // console.log(JSON.stringify(response));
      // 调用失败
      if (response != undefined && response.code !== undefined) {
        // 提示失败的弹窗
        notification.error({
          message: `${response.message}`,
          description: `${response.detail}`,
        });
      }
      yield put({
        type: 'handleConfigInitShow',
        payload: response.showValue,
      });
    },

    *downLoadConfigInit({ payload }, { call, put }) {
      console.log('appManagerModel.downLoadConfigInit 参数：');
      console.log(JSON.stringify(payload));
      yield call(downLoadConfigInit, payload);
      yield put({
        type: 'emptyCall',
      });
    },

    // 删除组配置
    *delete({ payload }, { call, put }) {
      // //console.log('appManagerModel.delete 参数：');
      // //console.log(JSON.stringify(payload));
      const response = yield call(deleteData, payload.id);
      yield put({
        type: 'handleDeleteResult',
        payload: {
          response,
          id: payload.id,
        },
      });

      // 添加调用界面刷新
      yield put({
        type: 'tableFresh',
        payload: {
          profile: payload.profile
        }
      });
    },

    // 修改组配置
    *update({ payload }, { call, put }) {
      // //console.log('appManagerModel.update 参数：');
      // //console.log(JSON.stringify(payload));
      const response = yield call(update, payload);
      // 调用失败
      if (response.code !== undefined) {
        // 提示失败的弹窗
        notification.error({
          message: `${response.message}`,
          description: `${response.detail}`,
        });
      }
      yield put({
        type: 'handleUpdateResult',
        payload: {
          response,
          param: payload,
        },
      });

      // 调用界面刷新
      yield put({
        type: 'tableFresh',
        payload: {
          profile: payload.profile
        }
      });
    },

    // 获取配置列表
    *getPage({ payload }, { call, put }) {
      // //console.log('appManagerModel.getPage 参数：');
      // //console.log(JSON.stringify(payload));

      const values = {
        ...payload.pager,
        param: {
          ...payload.searchParam,
          commonFlag: 0
        }
      };

      // //console.log(JSON.stringify(values));
      const response = yield call(getPage, values);
      yield put({
        type: 'handleGetPageResult',
        payload: {
          response,
          ...payload,
        },
      });
    },

    // 获取配置列表
    *setProfile({ payload }, { put }) {
      //console.log('appManagerModel.setProfile 参数：');
      //console.log(JSON.stringify(payload));

      yield put({
        type: 'handleSetProfile',
        payload: payload
      });

      // 添加调用界面刷新
      yield put({
        type: 'tableFresh',
        payload: {
          profile: payload
        }
      });
    },

    // 获取配置列表
    *getAppOverview({ payload }, { call, put }) {
      //console.log('appManagerModel.getAppOverview 参数：');
      //console.log(JSON.stringify(payload));

      const response = yield call(getAppOverview, payload);
      yield put({
        type: 'handleGetAppOverview',
        payload: response
      });
    },

    // 获取应用名列表
    *getAppListOfCommon({ payload }, { call, put }) {
      //console.log('appManagerModel.getAppListOfCommon 参数：');
      //console.log(JSON.stringify(payload));

      const response = yield call(getAppListOfCommon, payload);
      yield put({
        type: 'handleGetAppListOfCommon',
        payload: response
      });
    },

    // 获取应用名列表
    *getGroupList({ payload }, { call, put }) {
      // console.log('appManagerModel.getGroupList 参数：');
      // console.log(JSON.stringify(payload));

      const response = yield call(getGroupList, payload);
      yield put({
        type: 'handleGetGroupList',
        payload: response
      });
    },
  },

  reducers: {
    emptyCall(state) {
      return {
        ...state,
      };
    },

    setSearchParam(state, action) {
      return {
        ...state,
        searchParam: action,
      };
    },

    setTableLoading(state) {
      return {
        ...state,
        tableLoading: true,
      };
    },

    // 设置命名空间
    handleSetProfile(state, action) {
      return {
        ...state,
        profile: action.payload,
      };
    },

    handleGetPageResult(state, action) {
      //console.log('appManagerModel.handleGetPageResult 返回的结果');
      //console.log(JSON.stringify(action));

      const pl = action.payload;
      const {response} = pl;
      if (response != null) {
        return {
          ...state,
          pager: {
            ...pl.pager,
            pageNo: pl.pager.pageNo
          },

          tableList: pl.response.dataList,
          totalNumber: pl.response.totalNum,
          searchParam: pl.searchParam,
          tableLoading: false
        };
      }
      return {
        ...state,
        pager: {
          ...pl.pager,
          pageNo: pl.pager.pageNo
        },

        searchParam: pl.searchParam,
        tableLoading: false
      };
    },

    handleAddResult(state) {
      return {
        ...state,
      };
    },

    handleImportConfig(state) {
      return {
        ...state,
      };
    },

    handleGetAppOverview(state, action) {
      //console.log('appManagerModel.handleGetAppOverview 返回的结果');
      //console.log(JSON.stringify(action));

      return {
        ...state,
        currentValue: action.payload.valueCode,
      };
    },

    handleConfigInitShow(state, action) {
      // console.log('appManagerModel.handleConfigInitShow 返回的结果');
      // console.log(JSON.stringify(action));

      return {
        ...state,
        initConfigValue: action.payload,
      };
    },

    setCurrentValue(state, action) {
      return {
        ...state,
        currentValue: action.payload,
      };
    },

    setConfigInitShow(state, action) {
      return {
        ...state,
        initConfigValue: action.payload,
      };
    },

    handleUpdateResult(state, action) {
      // //console.log('appManagerModel.handleUpdateResult 返回的结果');
      // //console.log(JSON.stringify(action.payload));

      // 若成功，则不不需要重新加载后端，而是直接修改前段的内存数据
      const {tableList} = state;
      if (action.payload.response === 1) {
        const newItem = action.payload.param;
        const dataIndex = tableList.findIndex(item => newItem.id === item.id);
        if (dataIndex > -1) {
          tableList.splice(dataIndex, 1, {
            ...tableList[dataIndex],
            ...newItem,
          });
        }
      }

      return {
        ...state,
        tableList,
        tableLoading: false
      };
    },

    handleDeleteResult(state, action) {
      // //console.log('appManagerModel.handleDeleteResult 返回的结果');
      // //console.log(action.payload);
      const {tableList} = state;
      const tableListTem = tableList.filter(item => item.id !== action.payload.id);

      return {
        ...state,
        tableList: tableListTem,
        tableLoading: false,
      };
    },

    handleGetAppListOfCommon(state, action) {
      //console.log('appManagerModel.handleGetAppListOfCommon 返回的结果');
      //console.log(action.payload);

      return {
        ...state,
        commonAppNameList: action.payload,
      };
    },

    handleGetGroupList(state, action) {
      // console.log('appManagerModel.handleGetGroupList 返回的结果');
      // console.log(action.payload);

      return {
        ...state,
        groupList: action.payload,
      };
    },

  },
//
//  subscriptions: {
//       setup({ dispatch,history }) {
//
//         // Subscribe history(url) change, trigger `load` action if pathname is `/`
//         history.listen(({ pathname, search }) {
//           if (typeof window.ga !== 'undefined') {
//             window.ga('send', 'pageview', pathname + search);
//           }
//           if (!pathname.indexOf('/welcome')) {
//             const ws = new WebSocket('ws://127.0.0.1:1234/websocket');
//             ws.onmessage = function(msg) {
//               console.log('接收服务端发过来的消息', msg);
//               // result += msg.data + '\n';
//               dispatch({
//                 type: 'saveNoticesWebsock',
//                 payload: JSON.parse(msg.data),
//               });
//             };
//             ws.onclose = function (e) {
//                 console.log('ws 连接关闭了');
//             }
//           }
//         });
//       }
//     },

};
