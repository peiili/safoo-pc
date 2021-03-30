declare namespace ORGTYPE {
  type create = {
    address: string;
    code: string;
    id: string;
    name: string;
    areaName: string;
    areaCode: string;
    cityName: string;
    cityCode: string;
    provinceName: string;
    provinceCode: string;
  };
  type update = {
    id: string | number;
    code: string;
    name: string;
  };
}
