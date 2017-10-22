/*
 * Revision History:
 *     Initial: 2017/10/22        Wang RiYu
 */

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = JSON.parse(JSON.stringify(array));
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      if (item.pid === item.id)
        result.push(item)
      else {
        !hashVP[children] && (hashVP[children] = [])
        hashVP[children].push(item)
      }
    } else {
      result.push(item)
    }
  })

  return result
}

module.exports = {
  arrayToTree,
}
