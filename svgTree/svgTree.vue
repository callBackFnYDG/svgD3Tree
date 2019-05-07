<template>
    <svg-d3tree 
    :treeData="treeData"
    @on-nodeClick="nodeClick"
    @on-addClick="addClick"></svg-d3tree>
</template>

<script>
import svgD3tree from '@/components/svgTree/tree'
export default {
  name: 'svgTree',
  data(){
    return {
      treeData:{
        lable:{
          nodeHeight: 60,             // 节点高度
          nodeWidth: 200,             // 节点宽度
          attr: {class:'node_class'} ,// 节点样式名称
          nodeJL: 20 ,                // 节点间距
          lineWidth: 2 ,              // 连线的宽度
          color: "#666666",           // 线颜色
          formart:function(t){        // 节点内容设置
            return {
              p:{                     //生成一个 <p> 标签
                attr:{class:'create_p',style:{color:'red'}}, //设置p标签的属性 可设置class样式在外部设置
                content: t.name//设置 p 标签的文字
              },
              a:{
                attr:{class:'create_a',style:{color:'red'},href:'http://www.baidu.com'},
                content: '我是a标签容'
              }
            }
          }
        },
        parent:[
          {name:'奸商1'},
          {name:'奸商2'}
        ],
        children:[
          {
            name:'我的公司',
            nodeType: 'open',
            children: [
              {name:'我的公司'},
              {name:'我的公司'},
              {name:'我的公司',
                nodeType: false,
                children: [
                  {name:'我的公司'},
                  {name:'我的公司'},
                  {name:'我的公司'}
                ]},
              {name:'我的公司'},
              {name:'我的公司'},
              {name:'我的公司'},
              {name:'我的公司'},
              {name:'我的公司'},
              {name:'我的公司'}
            ]
          },
          {name:'我的公司'},
          {name:'我的公司'},
          {name:'我的公司',
            nodeType: false,
            children: [
              {name:'我的公司'},
              {name:'我的公司'},
              {name:'我的公司'},
              {name:'我的公司'},
              {name:'我的公司'},
              {name:'我的公司'},
              {name:'我的公司',
                nodeType: 'open',
                children: [
                  {name:'我的公司'},
                  {name:'我的公司'},
                  {name:'我的公司'}
                ]},
              {name:'我的公司'},
              {name:'我的公司'}
            ]},
          {name:'我的公司'},
          {name:'我的公司'},
          {name:'我的公司'}
        ]
      }
    }
  },
  methods:{
    // 节点被点击
    nodeClick(){},
    // 加号被点击
    addClick(){}
  },
  components:{
    svgD3tree
  }
}
</script>