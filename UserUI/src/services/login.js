/*
 * Revision History:
 *     Initial: 2017/10/21        Wang RiYu
 */

import request from '../utils/request';
import config  from '../utils/config';

const { login, register } = config.api.login;

export async function Login (params) {
  return request({
    url: login,
    method: 'post',
    data: params
  })
}

export async function Register (params) {
  return request({
    url: register,
    method: 'post',
    data: params
  })
}
