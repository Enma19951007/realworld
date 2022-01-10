// 解决错误
export function catchError(api) {
  return api
    .then((res) => {
      return [res, null];
    })
    .catch((error) => {
      return [null, error.response || {}];
    });
}