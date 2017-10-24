/*
 * Revision History:
 *     Initial: 2017/10/21        Wang RiYu
 */

module.exports = {
  name: '管理后台',
  baseURL: 'http://172.27.13.196:8080', // 请求链接
  openPages: ['/login'],
  footerText: '2017 © Copyright by TechCat',
  api: { // 请求路径
    login: {
      login: '/login',
      register: '/user/register'
    }
  }
}
