/*
 * Revision History:
 *     Initial: 2017/10/21        Wang RiYu
 */

import React from 'react';

class TreeGraph extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    const { source } = this.props;

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
      fitView: 'cc',
      layoutFn: G6.Layout.CompactBoxTree,
    });
    tree.tooltip({
      split: '=>'
    });
    tree.node().tooltip(obj => obj.route ? [['点击跳转', obj.label]] : '');
    tree.source(source); // 传入数据
    tree.edge().shape('smooth');
    tree.on('click', function(ev){ // 双击跳转路由
      console.log(ev.item.get('model'));
    });
    tree.render();
  }

  render () {
    return (
      <div id='tree'></div>
    )
  }
}

export default TreeGraph
