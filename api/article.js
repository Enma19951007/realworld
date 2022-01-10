import { request } from "../plugins/request";
import { catchError } from "./apiUtils";

// 获取公共文章列表
export const getArticles = (params) => {
  return catchError(
    request({
      method: "GET",
      url: "/api/articles",
      params,
    })
  );
};

// 获取关注的文章列表
export const getYourFeedArticles = (params) => {
  return catchError(
    request({
      method: "GET",
      url: "/api/articles/feed",
      params,
    })
  );
};

// 获取关注的文章列表
export const addFavorite = (slug) => {
  return catchError(
    request({
      method: "POST",
      url: `/api/articles/${slug}/favorite`,
    })
  );
};

// 获取关注的文章列表
export const deleteFavorite = (slug) => {
  return catchError(
    request({
      method: "DELETE",
      url: `/api/articles/${slug}/favorite`,
    })
  );
};

// 获取关注的文章列表
export const getArticle = (slug) => {
  return catchError(
    request({
      method: "GET",
      url: `/api/articles/${slug}`,
    })
  );
};

// 获取关注的文章列表
export const getComments = (slug) => {
  return catchError(
    request({
      method: "GET",
      url: `/api/articles/${slug}/comments`,
    })
  );
};

// 获取关注的文章列表
export const sendArticle = (data) => {
  return catchError(
    request({
      method: "POST",
      url: `/api/articles`,
      data
    })
  );
};
// 获取关注的文章列表
export const updateArticle = (data,slug) => {
  return catchError(
    request({
      method: "PUT",
      url: `/api/articles/${slug}`,
      data
    })
  );
};



 