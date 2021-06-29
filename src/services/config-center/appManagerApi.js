import request from '@/utils/request';

// eslint-disable-next-line no-useless-concat
const path = '/api/core/config/app';

export async function add(params) {
  //console.log('appManagerApi.add 发送的参数');
  //console.log(JSON.stringify(params));
  return request(`${path}/add`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function importConfig(params) {
  //console.log('appManagerApi.importConfig 发送的参数');
  //console.log(JSON.stringify(params));
  return request(`${path}/importConfig`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function configInitShow(params) {
  // console.log('appManagerApi.configInitShow 发送的参数');
  // console.log(JSON.stringify(params));
  return request(`${path}/configInitShow`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function downLoadConfigInit(params) {
  //console.log('appManagerApi.downLoadConfigInit 发送的参数');
  //console.log(JSON.stringify(params));
  return request(`${path}/download/configInit`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function deleteData(params) {
  //console.log('appManagerApi.deleteData 发送的参数');
  //console.log(JSON.stringify(params));
  return request(`${path}/delete/${params}`, {
    method: 'DELETE',
  });
}

export async function update(params) {
  //console.log('appManagerApi.update 发送的参数');
  //console.log(JSON.stringify(params));
  return request(`${path}/update`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function getPage(params) {
  //console.log('appManagerApi.pageList 发送的参数');
  //console.log(JSON.stringify(params));
  return request(`${path}/getPage`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function getAppOverview(params) {
  //console.log('appManagerApi.getAppOverview 发送的参数');
  //console.log(JSON.stringify(params));
  return request(`${path}/getAppOverview`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function getGroupList(params) {
  //console.log('appManagerApi.getGroupList 发送的参数');
  //console.log(JSON.stringify(params));
  return request(`${path}/getGroupList`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function getAppListOfCommon(params) {
  //console.log('appManagerApi.getAppListOfCommon 发送的参数');
  //console.log(JSON.stringify(params));
  return request(`${path}/getAppListOfCommon/` + params);
}







