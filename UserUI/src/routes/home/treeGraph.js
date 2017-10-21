/*
 * Revision History:
 *     Initial: 2017/10/21        Wang RiYu
 */

import React from 'react';

class TreeGraph extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      source: {
        label: 'Go',
        color: '#86D560',
        children: [{
          label: '语法',
          route: 'grammar',
          children: [{
            label: 'Graph',
            route: 'graph',
          }, {
            label: 'Net',
            route: 'net',
          }, {
            label: 'Tree',
            route: 'tree',
          }]
        }, {
          label: '框架',
          route: 'framework',
          children: [{
            label: 'Canvas',
            route: 'canvas',
          }, {
            label: 'Handler',
            route: 'handler'
          }, {
            label: 'Layout',
            route: 'layout',
            children: [{
              label: 'a',
              route: 'a'
            }, {
              label: 'b',
              route: 'b',
              children: [{
                label: 'a',
                route: 'a'
              }, {
                label: 'b',
                route: 'b'
              }]
            }]
          }]
        }, {
          label: '实例',
          route: 'sample',
          color: '#86D560',
          children: [{
            label: 'Matrix',
            route: 'matrix',
            color: '#86D560'
          }, {
            label: 'Color',
            route: 'color',
          }, {
            label: 'Util',
            route: 'util',
            size: 30
          }]
        }]
      }
    }
  }

  componentDidMount () {
    const { source } = this.state;

    // 配置G6图
    let layoutCfg = {
      "direction": "TB" // 方向布局
    };
    layoutCfg.getVGap = function (d) { // 垂直间隔
      return 48;
    };
    layoutCfg.getHGap = function (d) {
      return 6
    };
    var tree = new G6.Tree({ // 创建图形，各项配置见https://antv.alipay.com/g6/api/graph.html#fitview-string-object
      id: 'tree', // 绑定标签id
      height: 600,
      layoutCfg,
      forceFit: true,
      fitView: 'autoZoom',
      grid: {
        cell: 10
      },
      layoutFn: G6.Layout.CompactBoxTree,
    });
    tree.source(source); // 传入数据
    tree.edge().shape('smooth');
    tree.render();
  }

  render () {
    return (
      <div id='tree'></div>
    )
  }
}

export default TreeGraph
