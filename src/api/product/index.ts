import request from '@/utils/request'
import { TradeMark, TradeMarkResponseData } from './type'

enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  //添加品牌
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  //修改已有品牌
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  //删除已有品牌
  DELETE_URL = '/admin/product/baseTrademark/remove/',
}

export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )

export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  if (data.id) {
    // 编辑
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  } else {
    // 新增
    return request.post<any, any>(API.UPDATETRADEMARK_URL, data)
  }
}

//删除某一个已有品牌的数据
export const reqDeleteTrademark = (id: number) =>
  request.delete<any, any>(API.DELETE_URL + id)
