import request from '@/services/request';

const basePath: string = '/cloud/api/safoo-portal/wxmp';

/**
 * 获取微信授权
 * @param {String} url 当前页面url
 */
export function getSecret(url: string) {
  return request(`${basePath}/getWxMpConfig?url=${url}`, { method: 'GET' });
}
/**
 * 解绑微信
 *  @param {Object} body
 *  @param {String} body.unionId
 */
export function ubBindWX(unionId: string) {
  return request(`${basePath}/unbind`, { method: 'POST', data: { unionId } });
}
