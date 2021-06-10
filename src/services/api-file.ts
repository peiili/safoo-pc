import request from '@/services/request';

const basePath: string = '/cloud/api/safoo-portal/file';

export function getFileList(type: string) {
  return request(`${basePath}/list?type=${type}`, { method: 'GET' });
}
