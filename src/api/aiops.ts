/* 标准api调用函数库,严格与后端接口一致 */
// aiops backend api

/* eslint-disable camelcase */

import { axiosAiops } from 'boot/axios'

export default {
  //  apis
  trend: {
    // 科技云通行证登录接口
    dns: {
      getDnsTrendData (payload?: {
        query?: {
          page_size?: number;
          page?: number;
          ordering?: string;
          start?: number;
          end?: number;
        }
      }) {
        const config = {
          params: payload?.query
        }
        return axiosAiops.get('v1/trend/dns/posture/', config)
      }
    },
    top: {
      getDnsTopData (payload?: {
        query?: {
          start?: number;
          end?: number;
        }
      }) {
        const config = {
          params: payload?.query
        }
        return axiosAiops.get('v1/trend/dns/top-domain/', config)
      }
    }
  }
}
