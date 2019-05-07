<template>
  <g 
    :transform="wzTransfrom"
  >
    <foreignObject 
      :ref="`node-${nodeData.id}`"
      :x="foreignX" 
      :y="foreignY" 
      :width="nodeLabel.nodeWidth" 
      :height="nodeLabel.nodeHeight" 
    >
      <createElement :nodeData="nodeData" :nodeLabel="nodeLabel"/>
    </foreignObject>
    <g v-if="!nodeLabel.JT">
      <polygon 
        points="0,15 5,5 -5,5" 
        stroke-width="1" 
        :stroke="colors" 
        :fill="colors"
        :strike="colors"
      />
      <line 
        x1="0" y1="0" x2="0"  y2="20" 
        :stroke-width="nodeLabel.lineWidth" 
        :stroke="colors" 
      />
    </g>
    <g v-if="nodeData.children" :transform="gTransfrom" :ref="`open-${nodeData.id}`">
      <circle r="10" :fill="nodeLabel.color"></circle>
      <polyline 
        points="-5,0 5,0 0,0 0,5 0,-5" 
        stroke-width="2" 
        stroke="#FFFFFF" 
        fill="none" 
        v-if="nodeData.nodeType==false"
      />
      <line 
        x1="-5" y1="0" x2="5" y2="0" 
        stroke-width="2" 
        stroke="#FFFFFF" 
        v-else
      />
    </g>
  </g> 
</template>

<script>
import {select, event } from "d3";
import createElement from './createElement'
import {jcNodeData} from './assist'
export default {
    name:'node',
    components:{createElement},
    props:{
      // 数据信息
      nodeData: Object,
      // 配置信息
      nodeLabel: Object
    },
    data() {
      return {
        colors: '#666666'
      }
    },
    created(){
      this.colors = this.nodeLabel.color + ' ';
    },
    methods:{
      pdOrient(def,che){
        let n = this.nodeLabel, t = def;
        if(n.orient&&n.orient == 'Top'){
          t = che;
        }
        return t;
      }
    },
    computed:{
      wzTransfrom(){
        let b = this.nodeData.endPoint;
        return `translate(${b.x},${b.y+this.pdOrient(0,-20)})`
      },
      gTransfrom(){
        let n = this.nodeLabel;
        let t = this.pdOrient(n.nodeHeight+30,-n.nodeHeight-10)
        return `translate(0,${t})`;
      },
      foreignX(){
        let n = this.nodeLabel;
        return n.x?n.x:(-(n.nodeWidth/2))
      },
      foreignY(){
        let n = this.nodeLabel;
        return n.y?n.y:this.pdOrient(20,-n.nodeHeight);
      }
    },
    mounted(){
      
      let n = this.nodeData, color = this.nodeLabel.color+' ';
      if(n.id != 'firstNode'){
        // 设置移入移出事件
        select(this.$refs[`node-${n.id}`]).on('mouseover',()=>{
          this.$emit('on-handOver',n);
          this.colors= '#03aff8'
        }).on('mouseout',()=>{
          this.$emit('on-handOut',n,color);
          this.colors = color
        }).on('click',()=>{
          this.$emit('on-nodeClick',n);
        })
      }
      if(n.children&&n.children.length>0){
        // 展开方法
        if(n.nodeType&&n.nodeType=='open') {
          this.$emit('on-handOpen',n);
        }
        // 设置点击事件
        select(this.$refs[`open-${n.id}`]).on('click',()=>{
          if(n.nodeType==false){
            n.nodeType = 'open';
            this.$emit('on-handClick',n);
          } else if(n.nodeType=='open'){
            n.nodeType = false;
            this.$emit('on-handClick',n);
          } 
        })
      }
    }
}
</script>

