import { query as queryUsers, queryCurrent } from '@/services/user';
import { getUserInfo } from '@/utils/userInfo';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      //console.log('查看当前的用户');
      //console.log(JSON.stringify(queryCurrent));
      const response = yield call(queryCurrent);
      //console.log('结果');
      //console.log(JSON.stringify(response));
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      const userInfo = getUserInfo();
      //console.log('user=');
      //console.log(JSON.stringify(userInfo));
      return {
        ...state,
        currentUser: action.payload || { ...userInfo },
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
