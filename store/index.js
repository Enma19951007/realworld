
const cookieparser = process.server ? require('cookieparser') : undefined
// 为了防止服务端渲染期间运行都是同一个实例
// 为了防止数据冲突，务必把 state 定义成一个函数，返回数据对象
export const state = () => {
  return {
    user: null, // 当前用户登陆的基本数据
  };
};

export const mutations = {
  setUser(state, data) {
    state.user = data;
  },
};

export const actions = {
  // nuxt 特殊的action方法。
  // 这个 action 会在服务端期间自动调用，并且只会在服务端运行
  // 初始化 store 数据，传递数据给客户端使用
  nuxtServerInit({ commit }, { req }) {
    let user = null;
    if (req.headers.cookie) {
      // 使用包把 cookie 转换为 js 对象
      const parsed = cookieparser.parse(req.headers.cookie);
      try {
        user = JSON.parse(parsed.user);
      } catch (err) {}
    }
    commit("setUser", user);
  },
};
