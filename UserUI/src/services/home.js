/*
 * Revision History:
 *     Initial: 2017/10/22        Wang RiYu
 */

import request from '../utils/request';
import config  from '../utils/config';

const { getNodes } = config.api.home;

export async function GetNodes () {
  return request({
    url: getNodes,
    method: 'get',
  })
}
