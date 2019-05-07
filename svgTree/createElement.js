export default {
    name: 'createElement',
    props: {
        nodeLabel: Object,
        nodeData: Object
    },
    created() {
        let _vm = this,
            _h = _vm.$createElement,
            _c = _vm._self._c || _h,
            l = _vm.nodeLabel,
            n = _vm.nodeData,
            attr,
            content;
        // 查看当前节点是否单独设置 lable
        if(n.lable&&n.lable.formart){l = n.lable}
        let _node = l.formart(n),domArr = [];
        // 设置lable
        // formart得到的参数必须未Object
        if(l.formart&&(typeof _node == 'object')){
            // 节点内容循环
            for(let i in _node){
                attr = _node[i].attr?_node[i].attr:{};
                content = _node[i].content?_node[i].content:'请设置content';
                domArr.push(_c(i,{attrs:{...attr}},[_vm._v(content)]))
            }
            // 生成动态模板
            _vm.$options.render = h => _c('div',{attrs:{...(l.attr)}},[...domArr])
        }
    }
}