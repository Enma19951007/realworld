import axios from "axios";

export const request = axios.create({
  baseURL: "https://api.realworld.io",
});

// 插件必须按需导出
export default ({ store }) => {
  const { user } = store.state;
  if (user && user.token) {
    // 请求拦截器
    request.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Token ${user.token}`;
        return config;
      },
      (err) => {
        // 请求还没发出去就失败了。这种情况比较少见
        return Promise.reject(err);
      }
    );
  }
};
