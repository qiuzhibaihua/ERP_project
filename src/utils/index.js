import store from '../store'

// 权限校验
// export function permit(e) {
//   return store.getters.roles.includes(e)
// }
// 数组转树 data:数据  parentId id 做好对应
const arrayToTree = (data,parentId,id)=>{
  data.sort((a,b)=>{
      return a[parentId]-b[id]
  })
  // 存储对象
  let midObj = {}
  // 从后向前遍历
  for(let i = data.length-1; i>=0; i--){
      let item = data[i]
      // 当前的父id
      let nowPid = item[parentId]
      // 当前id
      let nowId = item[id]

      // 建立当前节点的父节点的children数组
      // 如果父节点已经存在就往原数组中添加
      if(midObj[nowPid]){
          midObj[nowPid].push(item)
      }else {
          midObj[nowPid] = []
          midObj[nowPid].push(item)
      }

      // 将children放入合适的位置
      if(midObj[nowId]){
          item.children = midObj[nowId]
          delete midObj[nowId]
      }
  }
  data.filter((list)=>{
      return list[parentId] == 0
  })
  return data
}

// 日期格式化
const DateFormat = function (format = 'yyyy-MM-dd hh:mm:ss') {
  let o = {
      "M+": this.getMonth() + 1,
      "d+": this.getDate(),
      "h+": this.getHours(),
      "m+": this.getMinutes(),
      "s+": this.getSeconds(),
      "q+": Math.floor((this.getMonth() + 3) / 3),
      "S": this.getMilliseconds()
  };
  if (/(y+)/.test(format))
      format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
      if (new RegExp("(" + k + ")").test(format))
          format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return format;
}

// 克隆对象
const Clone = (source) => {
   return JSON.parse(JSON.stringify(source))
}

// 判断对象
const isRepeat = ()=>{
  return (new Set(arr).size !== arr.length)?true :false
}
// 生成随机数
const randombetween = (min, max) =>{
  return min + (Math.random() * (max-min +1));
}
// 将时间戳转化为yyyy-MM-dd HH:mm:ss
const returnTimestamp=(strTime)=>{
  let middleDate=new Date(strTime)
  return middleDate.toLocaleString('zh-CN',{hour12:false}).replace(/\b\d\b/g, '0$&').replace(new RegExp('/','gm'),'-')
}
export {
  arrayToTree,
  DateFormat,
  Clone,
  isRepeat,
  randombetween,
  returnTimestamp
}


