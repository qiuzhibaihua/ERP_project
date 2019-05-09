export default file => {
  return map[file] || null
}

const map = {
  Nested: () => import('@/views/layout/Layout'),

  // 审核 合作商审核 合作商审核1
  auditManage:()=> import('@/views/layout/Layout'),
  partnerReview:()=> import('@/views/auditManage/partnerReview/index.vue'),
  partnerReview1: ()=> import('@/views/auditManage/partnerReview/partnerReview1.vue'),
  
  // 例子
  example: () => import('@/views/layout/Layout'),
  common: () => import('@/views/example/common/index.vue'),
  table: () => import('@/views/example/common/table.vue'),

  Example: () => import('@/views/layout/Layout'),
  Table: () => import('@/views/table/index'),
  Tree: () => import('@/views/tree/index')
}
