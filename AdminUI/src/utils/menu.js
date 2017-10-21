/*
 * Revision History:
 *     Initial: 2017/10/22        Wang RiYu
 */

module.exports = [
  {
    id: 1,
    bpid: 0,
    name: '用户管理',
    icon: 'team',
    router: '/manageUser'
  }, {
    id: 2,
    bpid: 0,
    name: '节点管理',
    icon: 'appstore',
  }, {
    id: 21,
    bpid: 2,
    mpid: 2,
    icon: 'star',
    name: '新增节点',
    router: '/manageNode/submitNode'
  }, {
    id: 22,
    bpid: 2,
    mpid: 2,
    icon: 'star',
    name: '修改节点',
    router: '/manageNode/modifyNode'
  }, {
    id: 3,
    bpid: 0,
    icon: 'book',
    name: '知识点管理',
  }, {
    id: 31,
    bpid: 3,
    mpid: 3,
    icon: 'star',
    name: '新增文档',
    router: '/manageDoc/submitDoc'
  }, {
    id: 32,
    bpid: 3,
    mpid: 3,
    icon: 'star',
    name: '修改文档',
    router: '/manageDoc/modifyDoc'
  }, {
    id: 4,
    bpid: 0,
    icon: 'solution',
    name: '考题管理',
  }, {
    id: 41,
    bpid: 4,
    mpid: 4,
    icon: 'star',
    name: '新增题库',
    router: '/manageTest/submitTest'
  }, {
    id: 42,
    bpid: 4,
    mpid: 4,
    icon: 'star',
    name: '修改题库',
    router: '/manageTest/modifyTest'
  },
]
