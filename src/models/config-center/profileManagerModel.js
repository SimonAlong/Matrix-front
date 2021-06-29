import {
  getPage,
  add,
  deleteData,
  getProfileList,
  update
} from '@/services/config-center/profileManagerApi';

import { notification } from 'antd';

export default {
  namespace: 'profileManagerModel', // 这个是标示当前model的

  // 下面是定义的数据模型
  state: {
    // 数据
    tableList: [],
    tableLoading: false,
    searchParam: {},
    totalNumber: 0,
    // 命名空间列表
    profileList: [],
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
      // //console.log('profileManagerModel.tableFresh 参数：');
      // //console.log(JSON.stringify(payload));
      yield put({
        type: 'getPage',
        payload: {
          pager: {
            pageNo: 0,
            pageSize: 20,
          },
        },
      });
    },

    // 增加组配置
    *add({ payload }, { call, put }) {
      // //console.log('profileManagerModel.add 参数：');
      // //console.log(JSON.stringify(payload));
      const response = yield call(add, payload);
      if(response.code !== undefined) {
        notification.error({
          message: `${response.message}`,
          description:`${response.detail}`,
        });
      }
      yield put({
        type: 'handleAddResult',
        payload: response,
      });

      // 调用界面刷新
      yield put({
        type: 'tableFresh',
      });
    },

    // 删除组配置
    *delete({ payload }, { call, put }) {
      // //console.log('profileManagerModel.delete 参数：');
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
      });
    },

    // 修改组配置
    *update({ payload }, { call, put }) {
      // //console.log('profileManagerModel.update 参数：');
      // //console.log(JSON.stringify(payload));
      const response = yield call(update, payload);
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
      });
    },

    // 获取配置列表
    *getPage({ payload }, { call, put }) {
      //console.log('profileManagerModel.getPage 参数：');
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

    // 获取命名空间列表
    *getProfileList({ payload }, { call, put }) {
      //console.log('profileManagerModel.getProfileList 参数：');
      //console.log(JSON.stringify(payload));

      const response = yield call(getProfileList);
      //console.log('profileManagerModel.response 参数：');
      //console.log(JSON.stringify(response));
      yield put({
        type: 'handleGetProfileList',
        payload: {
          response,
          ...payload,
        },
      });
    },

  },

  reducers: {
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

    handleGetPageResult(state, action) {
      //console.log('profileManagerModel.handleGetPageResult 返回的结果');
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

    handleGetProfileList(state, action) {
      //console.log('profileManagerModel.handleGetProfileList 返回的结果');
      //console.log(JSON.stringify(action));

      const pl = action.payload;
      return {
        ...state,
        profileList: pl.response
      };
    },

    handleGetProfileInfoList(state, action) {
      //console.log('profileManagerModel.handleGetProfileInfoList 返回的结果');
      //console.log(JSON.stringify(action));

      const pl = action.payload;
      return {
        ...state,
        profileInfoList: pl.response
      };
    },

    handleAddResult(state) {
      return {
        ...state,
      };
    },

    handleUpdateResult(state, action) {
      // //console.log('profileManagerModel.handleUpdateResult 返回的结果');
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
      // //console.log('profileManagerModel.handleDeleteResult 返回的结果');
      // //console.log(action.payload);
      const {tableList} = state;
      const tableListTem = tableList.filter(item => item.id !== action.payload.id);

      return {
        ...state,
        tableList: tableListTem,
        tableLoading: false,
      };
    },
  },
};
