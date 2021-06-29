import request from '@/utils/request';

// eslint-disable-next-line no-useless-concat
const path = '/api/core/config/profile';

export async function add(params) {
  //console.log('profileManagerApi.add 发送的参数');
  //console.log(JSON.stringify(params));
  return request(`${path}/add`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function deleteData(params) {
  //console.log('profileManagerApi.deleteData 发送的参数');
  //console.log(JSON.stringify(params));
  return request(`${path}/delete/${params}`, {
    method: 'DELETE',
  });
}

export async function update(params) {
  //console.log('profileManagerApi.update 发送的参数');
  //console.log(JSON.stringify(params));
  return request(`${path}/update`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function getPage(params) {
  //console.log('profileManagerApi.pageList 发送的参数');
  //console.log(JSON.stringify(params));
  return request(`${path}/getPage`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function getProfileList(params) {
  //console.log('profileManagerApi.getProfileList 发送的参数');
  //console.log(JSON.stringify(params));
  return request(`${path}/getProfileList`);
}







