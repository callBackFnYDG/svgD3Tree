// 查询字节的个数
function findLength(data,name,id){
  let j = 0;
  function jsNode(d){
    for(let i=0;i<d.length;i++){
      d[i].parentId = id;
      if(d[i][name]&&d[i][name].length>1&&d[i].nodeType){
        j--;
        jsNode(d[i][name])
      }
      j++;
    }
  }
  jsNode(data)
  return j;
}

// 传入参数匹配
export function seek (value, valueList) {
  for (let i = 0; i < valueList.length; i++) {
    if (value === valueList[i]) {
      return true
    }
  }
  return false
}

/**
 * 格式化节点位置
 * @param {*} lable 设置
 * @param {*} data 数据
 * @param {*} name 需要遍历的名字
 * @param {*} start 起点
 */
export function jsTreeData (lable,data,name,start = {x:0,y:0}) {
  let nodeJL = lable.nodeJL,
    nodeWidth = lable.nodeWidth,
    r = [1,-1],
    d = data[name],
    l = d.length,dress = 0;
  if(l%2==0){dress = (nodeJL+nodeWidth)/2}
  for(let i = 0;i<d.length;i++){
    let j = i%2,
      c = d[i][name], 
      w , wx;
    // 设置id
      d[i].id = i+'-'+ Math.random()*10000000000;

    if(c&&d[i].nodeType&&c.length>1){
      w = d[i].childWidth = (nodeWidth + nodeJL) * findLength(c,name,d[i].id)
    } else {
      w = d[i].childWidth = (nodeWidth + nodeJL)
    }
    
    // 计算位置
    if(i == 0){
      wx = start.x + dress;
    } else if (i == 1 || l%2==0){
      wx = d[i-1].endPoint.x + r[j]*d[i-1].childWidth/2 + r[j]*w/2
    } else if(i > 1 ){
      wx = d[i-2].endPoint.x + r[j]*d[i-2].childWidth/2 + r[j]*w/2
    } 
    
    // 设置开始位置
    d[i].startPoint = {...start};
    // 设置结束位置
    d[i].endPoint = { 
      // x: (t*nodeJL + t*nodeWidth/2) + r[j]*start.x , 
      x: wx,
      y: start.y + 200*(lable.orient=='Top'?-1:1)
    };

    // 设置节点属性
    if(name == 'parent'){
      d[i].lable = lable;
    }
    
    // 设置子节点
    if(d[i].nodeType&&c){
      console.log('==============我进来了==============')
      jsTreeData(
        lable,
        d[i],
        name,
        {
          x: d[i].endPoint.x, 
          y: d[i].endPoint.y + lable.nodeHeight + 20
        }
      )
    }
  }
  return data;
}
// 检测数据信息
export function jcNodeData (value) {
  let data = value? value: {};
  if(!data.formart)   data.formart = function(t){return {p:{content: t.name}}; };
  if(!data.attr)      data.attr = {class:'node_class'};
  if(!data.color)     data.color = '#D8DCE5';
  if(!data.nodeJL)    data.nodeJL = 20;
  if(!data.lineWidth) data.lineWidth = 2;
  if(!data.nodeWidth) data.nodeWidth = 100;
  if(!data.nodeHeight) data.nodeHeight = 40;
  return data;
}

export function findParent(){
  
}
