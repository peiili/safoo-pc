import { history } from 'umi';
/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import request from 'umi-request';
import { notification } from 'antd';
import { getCacheValue } from '@/utils/local-data';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// request拦截器, 改变url 或 options.

request.interceptors.request.use((url, options) => {
  const Authorization = getCacheValue('token');
  return {
    options: {
      ...options,
      interceptors: true,
      headers: { ...options.headers, Authorization: Authorization || '' },
      getResponse: true,
    },
  };
});

// response拦截器, 处理response
request.interceptors.response.use(async (response) => {
  const res = await response.clone().json();
  if (!res) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  } else if (res.code !== 200) {
    switch (res.code) {
      case 401:
        history.replace('/user/login');
        break;
      default:
        notification.error({
          description: `错误${res.code}`,
          message: res.message || codeMessage[res.code],
        });
        break;
    }
  }
  return res;
});
export default request;
