import request from '@/utils/request';

// eslint-disable-next-line no-useless-concat
const path = '/api/core/config/config/item';

export async function add(params) {
  //console.log('configItemApi.add 发送的参数');
  //console.log(JSON.stringify(params));
  return request(`${path}/add`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function deleteData(params) {
  //console.log('configItemApi.deleteData 发送的参数');
  //console.log(JSON.stringify(params));
  return request(`${path}/delete/${params}`, {
    method: 'DELETE',
  });
}

export async function update(params) {
  //console.log('configItemApi.update 发送的参数');
  //console.log(JSON.stringify(params));
  return request(`${path}/update`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function getPage(params) {
  //console.log('configItemApi.pageList 发送的参数');
  //console.log(JSON.stringify(params));
  return request(`${path}/getPage`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function getListFromDynamicKey(params) {
  //console.log('configItemApi.getListFromDynamicKey 发送的参数');
  //console.log(JSON.stringify(params));
  return request(`${path}/getListFromDynamicKey`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}


export async function getOverViewFromDynamicKey(params) {
  //console.log('configItemApi.getOverViewFromDynamicKey 发送的参数');
  //console.log(JSON.stringify(params));
  return request(`${path}/getOverViewFromDynamicKey`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function getKeyListOfCommonFromProfileApp(params) {
  //console.log('configItemApi.getKeyListOfCommonFromProfileApp 发送的参数');
  //console.log(JSON.stringify(params));
  return request(`${path}/getKeyListOfCommonFromProfileApp`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function getConfigItemEntityFromAppKey(params) {
  //console.log('configItemApi.getConfigItemEntityFromAppKey 发送的参数');
  //console.log(JSON.stringify(params));
  return request(`${path}/getConfigItemEntityFromAppKey`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function addConfigItemFromCommon(params) {
  //console.log('configItemApi.addConfigItemFromCommon 发送的参数');
  //console.log(JSON.stringify(params));
  return request(`${path}/addConfigItemFromCommon`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}










