import {
  getPage,
  add,
  deleteData,
  getListFromDynamicKey,
  getOverViewFromDynamicKey,
  getConfigItemEntityFromAppKey,
  getKeyListOfCommonFromProfileApp,
  addConfigItemFromCommon,
  update
} from '@/services/config-center/configItemApi';


import {
  getGroupList,
} from '@/services/config-center/appManagerApi';

import { notification } from 'antd';
export default {
  namespace: 'configItemModel', // 这个是标示当前model的

  // 下面是定义的数据模型
  state: {
    // 数据
    tableList: [],
    tableLoading: false,
    searchParam: {},
    appId: null,
    appName: null,
    profile: "default",
    totalNumber: 0,
    currentValue: "",
    // 当前使用的组
    currentGroup: "default",
    // 公共key列表
    configItemKeyList: [],
    // 选择的某个公共key
    commonInfoEntity: undefined,
    // 动态key搜索结果
    configItemKeyDynamicList: [],
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
      // //console.log('configItemModel.tableFresh 参数：');
      // //console.log(JSON.stringify(payload));
      yield put({
        type: 'getPage',
        payload: {
          pager: {
            pageNo: 0,
            pageSize: 20,
          },
          searchParam: payload
        },
      });
    },

    // 增加组配置
    *add({ payload }, { call, put }) {
      // //console.log('configItemModel.add 参数：');
      // //console.log(JSON.stringify(payload));
      const response = yield call(add, payload);
      console.log('configItemModel.add 参数：');
      console.log(JSON.stringify(payload));
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
          profile: payload.profile,
          appId: payload.appId,
          group: payload.group,
        }
      });
    },

    // 删除组配置
    *delete({ payload }, { call, put }) {
      //console.log('configItemModel.delete 参数：');
      //console.log(JSON.stringify(payload));
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
          profile: payload.profile,
          appId: payload.appId,
          group: payload.group,
        }
      });
    },

    // 修改组配置
    *update({ payload }, { call, put }) {
      console.log('configItemModel.update 参数：');
      console.log(JSON.stringify(payload));
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
          profile: payload.profile,
          appId: payload.appId,
          group: payload.group,
        }
      });
    },

    // 获取配置列表
    *getPage({ payload }, { call, put }) {
      //console.log('configItemModel.getPage 参数：');
      //console.log(JSON.stringify(payload));

      const values = {
        ...payload.pager,
        param: payload.searchParam,
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
      //console.log('configItemModel.setProfile 参数：');
      //console.log(JSON.stringify(payload));

      yield put({
        type: 'handleSetProfile',
        payload: payload.profile
      });

      // 添加调用界面刷新
      yield put({
        type: 'tableFresh',
        payload: {
          profile: payload.profile,
          appId: payload.appId
        }
      });
    },

    *getDynamicKeyList({ payload }, { call, put }) {
      //console.log('configItemModel.getDynamicKeyList 参数：');
      //console.log(JSON.stringify(payload));

      const response = yield call(getListFromDynamicKey, payload);
      yield put({
        type: 'handleGetDynamicKeyList',
        payload: response
      });
    },

    *getOverViewFromDynamicKey({ payload }, { call, put }) {
      //console.log('configItemModel.getOverViewFromDynamicKey 参数：');
      //console.log(JSON.stringify(payload));

      const response = yield call(getOverViewFromDynamicKey, payload);
      yield put({
        type: 'handleGetOverViewFromDynamicKey',
        payload: response
      });
    },

    *getKeyListOfCommonFromProfileApp({ payload }, { call, put }) {
      //console.log('configItemModel.getKeyListOfCommonFromProfileApp 参数：');
      //console.log(JSON.stringify(payload));

      const response = yield call(getKeyListOfCommonFromProfileApp, payload);
      yield put({
        type: 'handleGetKeyListOfCommonFromProfileApp',
        payload: response
      });
    },

    *getConfigItemEntityFromAppKey({ payload }, { call, put }) {
      //console.log('configItemModel.getConfigItemEntityFromAppKey 参数：');
      //console.log(JSON.stringify(payload));

      const response = yield call(getConfigItemEntityFromAppKey, payload);
      yield put({
        type: 'handleGetConfigItemEntityFromAppKey',
        payload: response
      });
    },

    *addConfigItemFromCommon({ payload }, { call, put }) {
      //console.log('configItemModel.addConfigItemFromCommon 参数：');
      //console.log(JSON.stringify(payload));

      const response = yield call(addConfigItemFromCommon, payload);
      // 调用失败
      if (response.code !== undefined) {
        // 提示失败的弹窗
        notification.error({
          message: `${response.message}`,
          description: `${response.detail}`,
        });
      }
      yield put({
        type: 'handleAddConfigItemFromCommon',
        payload: response
      });

      // 调用界面刷新
      yield put({
        type: 'tableFresh',
        payload: {
          profile: payload.profile,
          appId: payload.appId
        }
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

      if (response !== undefined) {
        // 获取当前的group，并查看配置项列表
        let currentGroup = "default";
        const groupList = response;
        if (groupList.length !== 0) {
          if (groupList.indexOf("default") === -1) {
            currentGroup = groupList[0];
          }
        }

        // 调用界面刷新
        yield put({
          type: 'tableFresh',
          payload: {
            profile: payload.profile,
            appId: payload.appId,
            group: currentGroup,
          }
        });
      }


    },
  },

  reducers: {
    setSearchParam(state, action) {
      //console.log('configItemModel.setSearchParam 参数：');
      //console.log(JSON.stringify(payload));
      return {
        ...state,
        appId: action.payload.appId,
        profile: action.payload.profile,
      };
    },

    saveProfileInfo(state, action) {
      //console.log('configItemModel.saveProfileInfo 参数：');
      //console.log(JSON.stringify(action));
      return {
        ...state,
        appId: action.payload.appId,
        appName: action.payload.appName,
        profile: action.payload.profile
      };
    },

    setTableLoading(state) {
      return {
        ...state,
        tableLoading: true,
      };
    },

    setCurrentValue(state, action) {
      return {
        ...state,
        currentValue: action.payload,
      };
    },

    handleGetPageResult(state, action) {
      //console.log('configItemModel.handleGetPageResult 返回的结果');
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

    // 设置命名空间
    handleSetProfile(state, action) {
      //console.log('configItemModel.handleSetProfile 返回的结果');
      //console.log(JSON.stringify(action.payload));
      return {
        ...state,
        profile: action.payload,
        configItemKeyDynamicList: []
      };
    },

    handleUpdateResult(state, action) {
      // //console.log('configItemModel.handleUpdateResult 返回的结果');
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
      // //console.log('configItemModel.handleDeleteResult 返回的结果');
      // //console.log(action.payload);
      const {tableList} = state;
      const tableListTem = tableList.filter(item => item.id !== action.payload.id);

      return {
        ...state,
        tableList: tableListTem,
        tableLoading: false,
      };
    },

    handleGetDynamicKeyList(state, action) {
      //console.log('configItemModel.handleGetDynamicKeyList 返回的结果');
      //console.log(action.payload);

      return {
        ...state,
        configItemKeyDynamicList: action.payload,
      };
    },

    handleGetOverViewFromDynamicKey(state, action) {
      //console.log('configItemModel.handleGetOverViewFromDynamicKey 返回的结果');
      //console.log(action.payload);

      return {
        ...state,
        currentValue: action.payload.valueCode,
      };
    },

    handleGetKeyListOfCommonFromProfileApp(state, action) {
      //console.log('configItemModel.handleGetKeyListOfCommonFromProfileApp 返回的结果');
      //console.log(action.payload);

      return {
        ...state,
        configItemKeyList: action.payload,
      };
    },

    handleGetConfigItemEntityFromAppKey(state, action) {
      //console.log('configItemModel.handleGetConfigItemEntityFromAppKey 返回的结果');
      //console.log(action.payload);

      return {
        ...state,
        commonInfoEntity: action.payload,
      };
    },

    handleAddConfigItemFromCommon(state, action) {
      //console.log('configItemModel.handleAddConfigItemFromCommon 返回的结果');
      //console.log(action.payload);
      return {
        ...state,
      };
    },

    clearCommonConfig(state, action) {
      // //console.log('configItemModel.clearCommonConfig 返回的结果');
      // //console.log(action.payload);
      return {
        ...state,
        commonInfoEntity: undefined
      };
    },

    setCurrentGroup(state, action) {
      // //console.log('configItemModel.setCurrentGroup 返回的结果');
      // //console.log(action.payload);
      return {
        ...state,
        currentGroup: action.payload
      };
    },

    handleGetGroupList(state, action) {
      console.log('configItemModel.handleGetGroupList 返回的结果');
      console.log(action.payload);

      let currentGroup = "default";
      const groupList = action.payload;
      if (groupList.length !== 0) {
        if (groupList.indexOf("default") === -1) {
          currentGroup = groupList[0];
        }
      }

      console.log(currentGroup);

      return {
        ...state,
        groupList: action.payload,
        currentGroup,
      };
    },

  },
};
