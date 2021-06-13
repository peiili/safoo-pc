import request from '@/services/request';

const basePath: string = '/cloud/api/safoo-portal/file';

export function getFileList(type: string) {
  return request(`${basePath}/list?type=${type}`, { method: 'GET' });
}

type fileData = any;
export function uploadFile(data: fileData) {
  return request(`${basePath}/upload`, { method: 'POST', data });
}
export function deleteFile(key: string) {
  return request(`${basePath}/delete?key=${key}`, { method: 'POST' });
}
