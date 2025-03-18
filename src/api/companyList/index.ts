import request from '@/utils/request'
enum API {
  // 获取公司
  CONPANY_LIST = '/api/dsp/company/list',
}

export const getCompanyList = (data: any) =>
  request.post<any, any>(API.CONPANY_LIST, data)

// export const reqAddOrUpdateTrademark  = (data:TradeMark) =>{
//     if(data.id) {
//         // 编辑
//         return request.post<any,any>(API.ADDTRADEMARK_URL,data)
//     } else {
//         // 新增
//         return request.post<any,any>(API.UPDATETRADEMARK_URL,data)
//     }
// }

// //删除某一个已有品牌的数据
// export const reqDeleteTrademark = (id: number) => request.delete<any, any>(API.DELETE_URL + id)
