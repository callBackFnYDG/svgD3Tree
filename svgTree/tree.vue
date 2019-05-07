<template>
    <div :class="classes"
    style="width:100%;height:600px; cursor: -webkit-grab;">
        <svg  width="100%" 
              height="100%" 
              ref="ref-svg">
            <transition>
                <g :transform="setTranslate" ref="ref-g">
                    <dg-path 
                        v-for="item in trees" 
                        :pathData="item"
                        :color="setPath(item,'color')"
                        :width="setPath(item,'lineWidth')"
                        :ref="`path-${item.id}`"
                        :key="`p-${item.id}`"
                    >
                    </dg-path>
                    <dg-node 
                        v-for="item in nodes" 
                        :nodeData="item"
                        :nodeLabel="setNodeLable(item)"
                        @on-handOpen="handOpen"
                        @on-handOver="handOver"
                        @on-handOut="handOut"
                        @on-nodeClick="nodeClick"
                        @on-handClick="handClick"
                        :key="`n-${item.id}`"></dg-node>
                </g>
            </transition>
            
        </svg>
    </div>
</template>

<script>
const baseCSS = 'base-svg'
import { tree, hierarchy, select, event, zoom } from "d3";
import {jsTreeData,jcNodeData} from './assist'
import dgPath from './dgPath'
import dgNode from './dgNode'
export default {
    name:'dgtree',
    components:{dgPath,dgNode},
    data () {
        return {
            setTranslate:'',
            parentLable: Object,
            trees: [],
            nodes: []
        }
    },
    provide() {
        return {
            $$tree: this
        };
    },
    props:{
        classNmae:{
            type:String
        },
        treeData: Object
    },
    computed:{
        classes () {
            return [
                `${baseCSS}`,
                {
                    [`${this.classNmae}`]: !!this.classNmae
                }
            ]
        }
    },
    methods:{
        wzTransfrom () {
            let _this = this.$refs['ref-svg']
            this.setTranslate = `translate(${_this.clientWidth/2},${_this.clientHeight/2}) scale(1)`
        },
        handOpen(node){
            this.$nextTick(()=>{
                this.trees = [...this.trees,...node.children];
                this.nodes = [...this.nodes,...node.children];
            })
        },
        handOver(node){
            this.$refs[`path-${node.id}`][0].changeColor('#03aff8')
        },
        handOut(node,t){
            this.$refs[`path-${node.id}`][0].changeColor(t)
        },
        nodeClick(node){
            this.$emit('on-nodeClick',node);
        },
        handClick(node){
            this.trees = null;
            this.nodes = null;
            this.$nextTick(()=>{
                this.setData();
                this.addFirstNode();
            });
            this.$emit('on-addClick',node);
        },
        bindZoomListener() {
            let r = this.$refs['ref-svg'],
            svg = select(r);
            svg.call(
                zoom()
                .scaleExtent([0.1, 1])
                .on("zoom", () => {
                    // TODO: 当scale !== 1 时，首次触发zoom会有bug
                    const [lastX, lastY] = [r.clientWidth/2, r.clientHeight/2];
                    const { x, y, k} = event.transform;
                    this.setTranslate = `translate(${lastX + x},${lastY + y}) scale(${k})`
                })
            );
        },
        setNodeLable(t){
            let l = this.treeData;
            if(t&&t.lable){return t.lable;} 
            else if(l&&l.lable) {return l.lable;}
            else {r = {};}
        },
        setPath(t,name){
            let l = this.treeData;
            if(t&&t.lable&&t.lable[name]){return t.lable[name]}
            else if(l&&l.lable&&l.lable[name]){return l.lable[name]}
            else {return null}
        },
        addFirstNode(){
            let lable = jcNodeData({
                y: -40,
                x: -100,
                nodeWidth: 200,
                attr: {class:'create_title'} ,
                formart:function(t){
                    return {p:{content: '第一个节点'}}
                },
                JT: true
            })
            this.nodes.push({
                id: 'firstNode',
                name: '第节点',
                lable: lable,
                endPoint: {x: 0, y: 0}
            })
        },
        _JSON(t){
            return JSON.parse(JSON.stringify(t))
        },
        setData(){
            this.parentLable = {...(this.treeData.lable)}
            // 子项
            let t = jsTreeData(this.treeData.lable,this.treeData,'children');

            // 父项
            this.parentLable.orient = 'Top';
            let p = jsTreeData(this.parentLable,this.treeData,'parent',{x:0, y:-40});

            this.trees = [...t.children,...p.parent]
            this.nodes = [...t.children,...p.parent]
        }
    },
    mounted(){
        this.wzTransfrom()
        this.$nextTick(()=>{
            this.setData();
            this.addFirstNode();
            this.bindZoomListener();
        })
    }
}
</script>

<style>
    .create_title,.node_class{
        width: 100%;
        height: 100%;
        border: 1px solid #03aff8;
        box-shadow: 0 0 5px #999999;
        box-sizing: border-box;
        padding: 5px 10px;
        text-align: center;
        color: red;
    }
    .create_title {
        line-height: 30px;
        background-color: #0ca9ec48;
        color: #03aff8;
    }
    .node_class{
        line-height: 25px;
        text-align: left;
        border-color: #666666;
        cursor: initial;
    }
    .node_class:hover{
        border-color: #03aff8;
        background-color: #0ca9ec48;
    }
</style>


