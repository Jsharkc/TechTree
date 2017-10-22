/*
 * Revision History:
 *     Initial: 2017/10/21        Wang RiYu
 */

import React from 'react';

var tree;

class TreeGraph extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    const { source, onRoute } = this.props;

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
    tree = new G6.Tree({ // 创建图形，各项配置见https://antv.alipay.com/g6/api/graph.html#fitview-string-object
      id: 'tree', // 绑定标签id
      height: 600,
      layoutCfg,
      forceFit: true,
      fitView: 'cc',
      animate: true,
      layoutFn: G6.Layout.CompactBoxTree,
    });
    tree.tooltip({
      split: ': '
    });
    tree.node().tooltip('intro');
    tree.source(source); // 传入数据
    tree.edge().shape('smooth');
    tree.on('dblclick', function(ev){ // 双击跳转路由
      let item = ev.item;
      if(tree.isNode(item) && item.get('model').label){
        onRoute(item.get('model').label)
      }
    });
    tree.render();
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.source !== this.props.source) {
      const { source } = this.props;

      tree.changeData(source);
      tree.autoZoom();
    }
  }

  render () {
    return (
      <div id='tree'></div>
    )
  }
}

export default TreeGraph
