/*
 * Revision History:
 *     Initial: 2017/10/22        Wang RiYu
 */

import request from '../utils/request';
import config  from '../utils/config';

const { query, run } = config.api.node;

export async function Query (params) {
  return request({
    url: query,
    method: 'post',
    data: params
  })
}

export async function Run (params) {
  return request({
    url: run,
    method: 'post',
    data: params
  })
}
