import { request } from "../plugins/request";
import { catchError } from "./apiUtils";

// 用户登陆
export const login = (data) => {
  return catchError(
    request({
      method: "POST",
      url: "/api/users/login",
      data,
    })
  );
};

// 用户注册
export const register = (data) => {
  return catchError(
    request({
      method: "POST",
      url: "/api/users",
      data,
    })
  );
};
