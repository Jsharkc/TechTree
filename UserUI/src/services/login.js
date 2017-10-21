/*
 * Revision History:
 *     Initial: 2017/10/21        Wang RiYu
 */

import request from '../utils/request';

export async function login () {
  return request('/api/login');
}
