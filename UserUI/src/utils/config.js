/*
 * Revision History:
 *     Initial: 2017/10/21        Wang RiYu
 */

module.exports = {
  baseURL: 'http://172.27.11.172:8080', // 请求链接
  openPages: ['/login'],
  footerText: '2017 © Copyright by TechCat',
  api: { // 请求路径
    login: {
      login: '/login',
      register: '/user/register'
    },
    home: {
      getNodes: '/node/list',
    },
    app: {
      addNode: '/node/add',
      addDoc: '/knowledge/list'
    },
    node: {
      query: '/question/list',
      run: '/user/run',
      vote: '/node/vote/add'
    }
  }
}
