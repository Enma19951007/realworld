import { request } from "../plugins/request";
import { catchError } from "./apiUtils";

// 获取标签列表
export const getTags = () => {
  return catchError(
    request({
      method: "GET",
      url: "/api/tags",
    })
  );
};
