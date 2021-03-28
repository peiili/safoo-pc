import request from '@/services/request';

type areaItem = {
  areaCode: string;
  areaName: string;
  id: string;
  level: number;
  parentCode: string;
};

const basePath: string = '/cloud/api/safoo-portal';
export function getProvince(provinceName?: string) {
  return request<{ data: areaItem[] }>(`${basePath}/provinces?provinceName=${provinceName}`, {
    method: 'GET',
  });
}
export function getCity(provinceCode: string, cityName?: string) {
  return request<{ data: areaItem[] }>(
    `${basePath}/cities?provinceCode=${provinceCode}&cityName=${cityName}`,
    { method: 'GET' }
  );
}
export function getArea(cityCode: string, areaName?: string) {
  return request<{ data: areaItem[] }>(
    `${basePath}/areas?cityCode=${cityCode}&areaName=${areaName}`,
    { method: 'GET' }
  );
}
