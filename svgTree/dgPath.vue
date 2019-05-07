<template>
    <path :d="pathCount" 
         :ref="`path-${pathData.id}`"
         :stroke="colors" 
         :stroke-width="widths" 
         :fill="fill" />
</template>

<script>
export default {
    name:'dgPath',
    data() {
        return {
            colors: '#D8DCE5',
            widths: 2,

        }
    },
    created(){
        this.colors = this.color + ' ';
        this.widths = this.width + ' ';
    },
    props:{
        pathData: Object,
        color:{
            type: String,
            default: '#D8DCE5'
        },
        width:{
            type: Number,
            default: 2
        },
        fill:{
            type:String,
            default:'none'
        }
    },
    methods:{
        // 斜率方程式 
        // 传入横坐标返回纵坐标
        xl(x,t){
            let [s,e] = [this.pathData.startPoint,this.pathData.endPoint];
            let [zx,zy] = [(e.x-s.x),(e.y-s.y)]
            let [a,b] = [
                {x: s.x-(e.x-s.x)/2, y: s.y},
                {x: e.x, y: (s.y+e.y)/2}
            ]
            let y = (((x-a.x)*(b.y-a.y))/(b.x-a.x))+a.y;
            if(t){
                //k=(y2-y1)/(x2-x1)斜率公式
                //y=-x/k+(x1+x2)/2k+(y1+y2)/2 垂线公式
                let k = (b.y-a.y)/(b.x-a.x)
                y=-x/k+(a.x+b.x)/2*k+(a.y+b.y)/2;
            }
            return [x,y].join(',')
        },
        changeColor(t){
            this.colors = t
        }
    },
    computed:{
        // svg路径函数两个
        pathCount(){
            let [a,b] = [this.pathData.startPoint,this.pathData.endPoint];
            if(a.x==b.x){
                return `M${a.x},${a.y} ${b.x},${b.y}`
            }
            return [
                `M${a.x},${a.y}`,
                `Q${this.xl(a.x)}`,
                `${this.xl(b.x-(b.x-a.x)/2)}`,
                `Q${this.xl(b.x)}`,
                `${b.x},${b.y}`
            ].join(' ')
        }
    }
}
</script>

