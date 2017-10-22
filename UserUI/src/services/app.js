/*
 * Revision History:
 *     Initial: 2017/10/22        Wang RiYu
 */

import request from '../utils/request';
import config  from '../utils/config';

const { addNode, addDoc } = config.api.app;

export async function AddNode (params) {
  return request({
    url: addNode,
    method: 'post',
    data: params
  })
}

export async function AddDoc (params) {
  return request({
    url: addDoc,
    method: 'post',
    data: params
  })
}
