export default {
  namespace: 'demoModel', // 这个是标示当前model的

  // 下面是定义的数据模型
  state: {
    data: [],
  },


  reducers: {
    // 同步函数
    getFakeList(state,{payload}) {
      const temp = [];
      const loca = ["杭州","北京","上海"];
      // 取出参数
      const { pageSize , currentPage } = payload;
      // 生成数据
      for (let i = 1; i <= pageSize; i++) {
        const index = (currentPage-1) * pageSize + i;
        temp.push({
          key: index,
          name: `isyscore-${index}`,
          age: 20+Math.round(Math.random()*30),
          address: loca[Math.round(Math.random()*2.5)],
          description: `My name is John Brown, I am ${index}2 years old, living in New York No. ${index} Lake Park.`,
        });
      }
      temp.reverse();
      return {
        ...state,
        data: temp,
      };
    }
  }
};
